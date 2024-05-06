import { http } from "./http";

export const getAdTypes = async () => await http.get('/Payment/AdvertisementType');

