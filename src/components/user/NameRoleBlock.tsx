import { ORG_TYPE, USER_ROLE } from '@/src/utils/constants';
import Link from 'next/link';
import { RiVerifiedBadgeFill } from 'react-icons/ri';

interface INameRoleBlock {
  role: USER_ROLE;
  name: string;
  type: ORG_TYPE;
  website: string;
}

export const NameRoleBlock = (props: INameRoleBlock) => {
  const { role, name, type, website } = props;
  const renderRole = () => {
    switch (type) {
      case ORG_TYPE.RESCUE:
        return (
          <div className="ml-5 rounded-lg bg-blue-600 p-3 text-white font-semibold ita">
            Cứu hộ động vật
          </div>
        );
      case ORG_TYPE.VET:
        return (
          <div className="ml-5 rounded-lg bg-blue-600 p-3 text-white font-semibold ita">
            Thú y
          </div>
        );
      case ORG_TYPE.BUSINESS:
        return (
          <div className="ml-5 rounded-lg bg-blue-600 p-3 text-white font-semibold ita">
            Doanh nghiệp
          </div>
        );
      default:
        return '';
    }
  };

  return (
    <div className='flex-1'>
      <h1 className="font-bold text-4xl ml-5 relative w-fit">
        {name}
        {
          role !== USER_ROLE.STANDARD_USER &&
          <span className="bg-blue-600 w-fit rounded-full p-1 absolute -right-8">
            <RiVerifiedBadgeFill size={16} color="white" />
          </span>
        }
      </h1>
      <div className="mt-4 w-fit flex">
        {role === USER_ROLE.ORGANIZATION && (<>
          {
            renderRole()
          }
          {
            website &&
            <Link
              className="ml-5 rounded-lg p-3 bg-yellow-300 border border-black hover:bg-yellow-400"
              href={website}>
              Website
            </Link>
          }
        </>)}
        {role === USER_ROLE.SYSTEM_ADMIN && (
          <div className="ml-5 rounded-lg bg-blue-600 p-3 text-white">
            {' Quản trị viên'}
          </div>
        )}
      </div>
    </div>
  );
};
