import Image from 'next/image';

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="flex flex-col md:flex-row">
        <div className="basis-2/5 bg-red-600 relative">
          <Image
            src={'/img/cat_hero.png'}
            alt="cat_hero"
            width={400}
            height={500}
            className="mx-auto object-contain"
          />
          <div className="absolute top-12 right-5 bg-white p-4 rounded-lg shadow-lg">
            Nhận nuôi
          </div>
          <div className="absolute bottom-12 left-5 bg-white p-4 rounded-lg shadow-lg">
            Chia sẻ kiến thức
          </div>
        </div>

        <div className="basis-3/5 bg-green-600 p-20 space-y-5 my-auto">
          <div className="text-8xl bg-white flex flex-col items-center justify-center">
            <div>
              Tìm <span className="text-yellow-300 uppercase">Boss</span>
            </div>
            <div className="pl-15">
              cho <span className="text-yellow-300 uppercase">Sen</span>
            </div>
          </div>
          <div>
            Chào mừng bạn đến với Petopia - nơi bạn có cơ hội nhận nuôi một
            người bạn bốn chân. Tại đây, chúng tôi kết nối bạn với những con thú
            cưng đáng yêu và cung cấp thông tin hữu ích để biến cuộc sống của họ
            trở nên hạnh phúc hơn.
          </div>
          <div className="bg-gradient-to-r from-yellow-300 to-yellow-600 text-white w-fit p-4 rounded-lg uppercase px-6 shadow-lg">
            Nhận nuôi ngay
          </div>
        </div>
      </div>
      {/* Introduction */}
      {/* Features */}
      {/* CTA */}
      {/* Footer */}
    </div>
  );
}
