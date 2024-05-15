import PetProfileForm from '@/src/components/pet/PetProfileForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cho thú cưng - Petopia',
  description: 'Nền tảng nhận nuôi thú cưng trực tuyến',
};

export default function Adopt() {
  return (
    <div className="container max-w-3xl p-5 mx-auto">
      <h1 className="text-2xl font-bold mb-10">Tạo hồ sơ thú cưng</h1>
      <PetProfileForm />
    </div>
  );
}
