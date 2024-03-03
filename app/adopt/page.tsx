import PetProfileForm from '@/src/components/PetProfileForm';

export default function Adopt() {
  return (
    <div className="container max-w-3xl p-5 mx-auto">
      <h1 className="text-2xl font-bold mb-10">Tạo hồ sơ thú cưng</h1>
      <PetProfileForm />
    </div>
  );
}
