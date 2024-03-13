export interface ICreatePetProfileRequest {
  petInfo: {
    name: string;
    species: string;
    breed: string;
    sex: string;
    age: string;
    color: string;
    size: string;
    isVaccinated: string;
    isNeutered: string;
  };
  userInfo: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
}

export interface ILocationResponse {
  name: string;
  code: string;
}

export interface ILocationRequest {
  Level: 1 | 2 | 3;
  Code?: string;
}
