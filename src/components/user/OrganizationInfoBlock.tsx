import { ORG_TYPE } from '@/src/utils/constants';

interface IOrganizationInfoBlock {
  entityName: string,
  type: ORG_TYPE,
  description: string,
  taxCode: string,
  website: string,
  show: boolean,
}

export const OrganizationInfoBlock = (props: IOrganizationInfoBlock) => {
  const { entityName, type, description, taxCode, website, show } = props;

  return (
    <>
      {
        show &&
        <div className="md:px-10">
          <div className="flex mb-2">
            <div className="block text-gray-700 text-lg font-bold">
              Tên pháp nhân
            </div>
            <div className="text-lg ml-2">
              {props.entityName}
            </div>
          </div>
          <div className="flex mb-2">
            <div className="block text-gray-700 text-lg font-bold">
              Website
            </div>
            <a className="text-lg ml-2 text-blue-600 font-semibold" href={props.website}>
              {props.website}
            </a>
          </div>
          <div className="flex">
            <div className="block text-gray-700 text-lg font-bold">
              Mã số thuế
            </div>
            <div className="text-lg ml-2">
              {props.taxCode}
            </div>
          </div>
        </div>
      }
    </>
  );
};