import { OtherUserInformation } from '@/src/components/user/OtherUserInformation';

export default function page({ params }: { params: { userId: string } }) {
  console.log(params.userId);
  return (
    <div className="mt-30">
      <OtherUserInformation userId={params.userId} />
    </div>
  );
}
