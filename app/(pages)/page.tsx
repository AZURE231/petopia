import { STATIC_URLS } from '@/src/utils/constants';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Trang chủ - Petopia',
  description: 'Nền tảng nhận nuôi thú cưng trực tuyến',
};

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="flex flex-col md:flex-row" data-testid="homepage-hero">
        <div className="basis-2/5 relative">
          <div className="relative h-96 w-96 md:h-[600px] md:w-[600px] bg-yellow-300 rounded-full">
            <Image
              src={STATIC_URLS.CAT_HERO}
              alt="cat_hero"
              fill
              className="mx-auto object-contain z-10"
            />
          </div>
          <div className="absolute top-12 right-5 bg-white p-4 rounded-lg shadow-lg z-20">
            Nhận nuôi
          </div>
          <div className="absolute bottom-12 left-5 bg-white p-4 rounded-lg shadow-lg z-20">
            Chia sẻ kiến thức
          </div>
        </div>

        <div className="basis-3/5 p-5 md:p-20 space-y-5 my-auto">
          <div className="text-6xl sm:text-8xl  bg-white flex flex-col items-center justify-center">
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
      <div
        className="bg-cover bg-right bg-no-repeat p-5 md:p-20 space-y-5 "
        style={{
          backgroundImage: `url("${STATIC_URLS.CAT_INTRO}")`,
          height: '600px',
        }}
      >
        <div className="text-4xl sm:text-5xl md:text-6xl ">
          <div>Nơi từ bỏ</div>
          <div className="pl-6">
            trở thành <span className="text-yellow-300">yêu thương</span>
          </div>
        </div>
        <div className="text-md max-w-xs lg:max-w-3xl bg-white p-3 rounded-lg opacity-80">
          Tại Petopia chúng tôi đặt tâm huyết vào việc tạo ra một môi trường an
          lành và yêu thú cưng cho các bạn động vật bị hoàn cảnh khó khăn. Chúng
          tôi tin rằng mỗi con thú cưng xứng đáng có một gia đình yêu thương và
          chăm sóc, và chúng tôi cam kết cung cấp những cơ hội đó cho họ.
        </div>
      </div>

      {/* Service */}
      <div className="flex flex-col items-center justify-center bg-orange-50 py-5 p-5">
        <div className="text-2xl md:text-4xl my-5 font-bold">
          Các dịch vụ của chúng tôi
        </div>
        <div className="flex flex-row gap-3">
          <div className="flex flex-col w-fit justify-center items-center">
            <div className="bg-white relative rounded-full h-16 w-16 md:h-36 md:w-36 flex items-center justify-center shadow-lg">
              <Image
                src={STATIC_URLS.ADOPT}
                alt="adopt pet"
                fill
                className="rounded-full object-cover"
              ></Image>
            </div>
            <div className="font-medium flex text-center items-center justify-center ">
              Cho thú cưng
            </div>
          </div>
          <div className="flex flex-col w-fit justify-center items-center">
            <div className="bg-white relative rounded-full h-16 w-16 md:h-36 md:w-36 flex items-center justify-center shadow-lg">
              <Image
                src={STATIC_URLS.RECEIVE}
                alt="adopt pet"
                fill
                className="rounded-full object-cover"
              ></Image>
            </div>
            <div className="font-medium flex text-center items-center justify-center w-full ">
              Nhận nuôi
            </div>
          </div>
          <div className="flex flex-col w-fit justify-center items-center">
            <div className="bg-white relative rounded-full h-16 w-16 md:h-36 md:w-36 flex items-center justify-center shadow-lg">
              <Image
                src={STATIC_URLS.BLOG}
                alt="adopt pet"
                fill
                className="rounded-full object-cover"
              ></Image>
            </div>
            <div className="font-medium flex text-center items-center justify-center w-full ">
              Chia sẽ kiến thức
            </div>
          </div>
        </div>
      </div>

      {/* Adopt step */}
      <div className="flex flex-col items-center justify-center p-4">
        <div className="text-2xl md:text-4xl my-5 font-bold">
          Quy trình nhận nuôi
        </div>
        <div className="flex space-x-10">
          <div className="flex flex-col justify-center items-center">
            <Image
              src={STATIC_URLS.CAT_AND_DOG}
              alt="cat and dog"
              height={400}
              width={400}
            ></Image>
            <div className="font-bold">Tìm boss</div>
            <div className="text-center">
              Tìm “boss” mà bạn ưng ý và phù hợp với bản thân.
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Image
              src={STATIC_URLS.CAT_ATRONAULT}
              alt="cat and dog"
              height={400}
              width={400}
            ></Image>
            <div className="font-bold ">Liên hệ</div>
            <div className="text-center">
              Nộp đơn cho chủ của thú cưng mà bạn muộn nhận.
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Image
              src={STATIC_URLS.CAT_VASE}
              alt="cat and dog"
              height={400}
              width={400}
            ></Image>
            <div className="font-bold">Cập nhật</div>
            <div className="text-center">
              Cập nhập tình trạng “boss” của bạn đến mọi người.
            </div>
          </div>
        </div>
      </div>
      {/* CTA */}
    </div>
  );
}
