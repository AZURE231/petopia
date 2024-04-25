import { OtherUserInformation } from '@/src/components/user/OtherUserInformation';

export default function page({ params }: { params: { userId: string } }) {
  return (
    <div className="mt-30 h-fit-screen">
      <OtherUserInformation userId={params.userId} />
    </div>
  );
}
