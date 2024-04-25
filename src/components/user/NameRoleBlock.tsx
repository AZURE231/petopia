import { USER_ROLE } from '@/src/utils/constants';
import { RiAdminFill, RiVerifiedBadgeFill } from 'react-icons/ri';

interface INameRoleBlock {
  role: USER_ROLE,
  name: string,
}

export const NameRoleBlock = (props: INameRoleBlock) => {
  const { role, name } = props;

  return (
    <div>
      <h1 className="font-bold text-5xl ml-5">
        {/* {userInfo &&
          userInfo.attributes.firstName +
          ' ' +
          userInfo.attributes.lastName} */}
        {
          name
        }
      </h1>
      <div className=" ml-5 mt-4 ">
        {role === USER_ROLE.ORGANIZATION && (
          <div className="bg-green-600 w-fit rounded-full p-2">
            <RiVerifiedBadgeFill size={30} color="white" />
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