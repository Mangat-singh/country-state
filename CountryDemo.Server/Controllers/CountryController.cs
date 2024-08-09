using AutoMapper;
using CountryDemo.Server.Data;
using CountryDemo.Server.Entities;
using CountryDemo.Server.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace CountryDemo.Server.Controllers
{
    [Route("api/[controller]")]
    //[Route("api/[controller]/[action]")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public CountryController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("GetCountries")]
        public async Task<ActionResult<IEnumerable<CountryDto>>> GetCountries()
        {
            var countries = await _context.Countries.ToListAsync();
            var countryDtos = _mapper.Map<List<CountryDto>>(countries);
            return Ok(countryDtos);
        }
        [HttpGet("GetCountry/{id}")]
        public async Task<ActionResult<Country>> GetCountry(int id)
        {
            var country = await _context.Countries.FindAsync(id);

            if (country == null)
            {
                return NotFound();
            }

            return country;
        }

        [HttpPost("AddCountry")]
        public async Task<ActionResult<CountryDto>> PostCountry(CountryDto countryDto)
        {
            var country = _mapper.Map<Country>(countryDto);

            _context.Countries.Add(country);
            await _context.SaveChangesAsync();

            countryDto.CountryId = country.CountryId;

            return CreatedAtAction("GetCountry", new { id = country.CountryId }, countryDto);
        }
       
        [HttpPut("UpdateCountry/{id}")]
        public async Task<IActionResult> PutCountry(int id, CountryDto countrymodel)
        {
            try
            {
                var countryRes = await _context.Countries.FindAsync(id);

                if (countryRes == null)
                {
                    return NotFound();
                }
                countryRes.Name=countrymodel.Name;
                countryRes.Code = countrymodel.Code;
                _context.Countries.Update(countryRes);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CountryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("DeleteCountry/{id}")]
        public async Task<IActionResult> DeleteCountry(int id)
        {
            var country = await _context.Countries.FindAsync(id);
            if (country == null)
            {
                return NotFound();
            }

            _context.Countries.Remove(country);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("GetStates")]
        public async Task<ActionResult<IEnumerable<StateDto>>> GetStates()
        {
            var states = await _context.States.Include(s => s.Country).ToListAsync();
            var stateDtos = _mapper.Map<List<StateDto>>(states);
            return Ok(stateDtos);
        }

        [HttpGet("GetState/{id}")]
        public async Task<ActionResult<StateDto>> GetState(int id)
        {
            var state = await _context.States.Include(s => s.Country)
                                             .FirstOrDefaultAsync(s => s.StateId == id);

            if (state == null)
            {
                return NotFound();
            }

            var stateDto = _mapper.Map<StateDto>(state);
            return Ok(stateDto);
        }

        [HttpPost("AddState")]
        public async Task<ActionResult<StateDto>> PostState(StateDto stateDto)
        {
            var country = await _context.Countries.FindAsync(stateDto.CountryId);
            if (country == null)
            {
                return BadRequest("Country not found.");
            }

            var state = _mapper.Map<State>(stateDto);
            state.Country = country;
            _context.States.Add(state);
            await _context.SaveChangesAsync();

            stateDto.StateId = state.StateId;

            return CreatedAtAction("GetStates", stateDto);
        }

        [HttpPut("UpdateState/{id}")]
        public async Task<IActionResult> PutState(int id, StateDto stateDto)
        {
            try
            {
                var stateRes = await _context.States.FindAsync(id);

                if (stateRes == null)
                {
                    return NotFound();
                }
                stateRes.Name = stateDto.Name;
                stateRes.Code = stateDto.Code;
                stateRes.CountryId = stateDto.CountryId;
                _context.States.Update(stateRes);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StateExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("DeleteState/{id}")]
        public async Task<IActionResult> DeleteState(int id)
        {
            var state = await _context.States.FindAsync(id);
            if (state == null)
            {
                return NotFound();
            }

            _context.States.Remove(state);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StateExists(int id)
        {
            return _context.States.Any(e => e.StateId == id);
        }
        private bool CountryExists(int id)
        {
            return _context.Countries.Any(e => e.CountryId == id);
        }
    }
}
