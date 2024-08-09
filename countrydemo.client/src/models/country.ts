export interface Country {
    countryId: number;
    name: string;
    code: string;
  }
  export interface State {
    stateId: number;
    name: string;
    code: string;
    countryId: number;
    countryName?: string;
  }