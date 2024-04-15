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

export interface IAdoptCardResponse {
  id: string;
  lastUpdatedAt: string;
  isSeen: boolean;
  status: number;
  name: string;
}
