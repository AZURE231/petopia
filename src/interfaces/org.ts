import { ORG_TYPE } from '../utils/constants';

export interface IOrgUpgradeRequest {
  entityName: string;
  email: string;
  organizationName: string;
  phone: string;
  provinceCode: string;
  districtCode: string;
  wardCode: string;
  street: string;
  website: string;
  taxCode: string;
  type: ORG_TYPE;
  description: string;
}
