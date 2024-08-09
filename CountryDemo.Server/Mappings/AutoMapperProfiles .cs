using CountryDemo.Server.Entities;
using CountryDemo.Server.ViewModels;
using AutoMapper;

namespace CountryDemo.Server.Mappings
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Country, CountryDto>().ReverseMap();
            CreateMap<State, StateDto>()
                .ForMember(dest => dest.CountryName, opt => opt.MapFrom(src => src.Country.Name))
                .ReverseMap();
        }
    }
}
