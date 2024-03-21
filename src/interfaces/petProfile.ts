export interface ICreatePetProfileRequest {
  name: string;
  description: string;
  sex: number;
  age: number;
  color: number;
  species: number;
  size: number;
  isSterillized: number;
  isVaccinated: number;
  isAvailable: boolean;
  address: string;
  breed: string;
  files: string[];
  imagesFile: FileList | null;
  images: string[];
}

export interface ILocationResponse {
  name: string;
  code: string;
}

export interface ILocationRequest {
  Level: 1 | 2 | 3;
  Code?: string;
}
