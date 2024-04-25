import { ORG_TYPE, USER_ROLE } from '@/src/utils/constants';
import { RiAdminFill, RiVerifiedBadgeFill } from 'react-icons/ri';

interface INameRoleBlock {
  role: USER_ROLE;
  name: string;
  type?: ORG_TYPE;
}

export const NameRoleBlock = (props: INameRoleBlock) => {
  const { role, name, type } = props;
  const renderRole = () => {
    switch (type) {
      case ORG_TYPE.RESCUE:
        return (
          <div className="ml-5 rounded-lg bg-green-600 p-3 text-white">
            {' '}
            Cứu hộ động vật
          </div>
        );
      case ORG_TYPE.VET:
        return (
          <div className="ml-5 rounded-lg bg-green-600 p-3 text-white">
            {' '}
            Thú y
          </div>
        );
      case ORG_TYPE.BUSINESS:
        return (
          <div className="ml-5 rounded-lg bg-green-600 p-3 text-white">
            {' '}
            Doanh nghiệp
          </div>
        );
      default:
        return '';
    }
  };

  return (
    <div>
      <h1 className="font-bold text-5xl ml-5">
        {/* {userInfo &&
          userInfo.attributes.firstName +
          ' ' +
          userInfo.attributes.lastName} */}
        {name}
      </h1>
      <div className=" ml-5 mt-4 ">
        {role === USER_ROLE.ORGANIZATION && (
          <div className="flex">
            <div className="bg-green-600 w-fit rounded-full p-2">
              <RiVerifiedBadgeFill size={30} color="white" />
            </div>
            {renderRole()}
          </div>
        )}
        {role === USER_ROLE.SYSTEM_ADMIN && (
          <div className="bg-blue-600 w-fit rounded-full p-2">
            <RiAdminFill size={30} color="white" />
          </div>
        )}
      </div>
    </div>
  );
};
