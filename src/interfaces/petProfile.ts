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
