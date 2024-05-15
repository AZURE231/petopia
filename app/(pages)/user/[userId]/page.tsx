import { OtherUserInformation } from '@/src/components/user/OtherUserInformation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hồ sơ người dùng - Petopia',
  description: 'Nền tảng nhận nuôi thú cưng trực tuyến',
};

export default function page({ params }: { params: { userId: string } }) {
  return (
    <div>
      <OtherUserInformation userId={params.userId} />
    </div>
  );
}
