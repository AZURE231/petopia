import { OtherUserInformation } from '@/src/components/user/OtherUserInformation';

export default function page({ params }: { params: { userId: string } }) {
  return (
    <div>
      <OtherUserInformation userId={params.userId} />
    </div>
  );
}
