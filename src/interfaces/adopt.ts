export interface IAdoptPetRequest {
  phone: string;
  petId: string;
  street: string;
  adoptTime: number;
  houseType: number;
  message: string;
  isOwnerBefore: boolean;
  provinceCode: string;
  districtCode: string;
  wardCode: string;
}