import { UserInformation } from '@/src/components/user/UserInformation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hồ sơ người dùng - Petopia',
  description: 'Nền tảng nhận nuôi thú cưng trực tuyến',
};

export default function page() {
  return (
    <div>
      <UserInformation />
    </div>
  );
}
