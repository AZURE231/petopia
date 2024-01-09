import { url } from 'inspector';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="flex flex-col md:flex-row">
        <div className="basis-2/5 relative">
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

        <div className="basis-3/5 p-20 space-y-5 my-auto">
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
        className="bg-cover bg-center bg-no-repeat p-20 space-y-5"
        style={{
          backgroundImage: 'url("/img/cat_intro.png")',
          height: '600px',
          objectFit: 'cover',
        }}
      >
        <div className="text-4xl sm:text-5xl md:text-6xl ">
          <div>Nơi từ bỏ</div>
          <div className="pl-6">
            trở thành <span className="text-yellow-300">yêu thương</span>
          </div>
        </div>
        <div className="max-w-xl lg:max-w-3xl">
          Tại Petopia chúng tôi đặt tâm huyết vào việc tạo ra một môi trường an
          lành và yêu thú cưng cho các bạn động vật bị hoàn cảnh khó khăn. Chúng
          tôi tin rằng mỗi con thú cưng xứng đáng có một gia đình yêu thương và
          chăm sóc, và chúng tôi cam kết cung cấp những cơ hội đó cho họ.
        </div>
      </div>

      {/* Service */}
      <div className="flex flex-col items-center justify-center bg-orange-50 py-5">
        <div className="text-4xl my-5">Các dịch vụ của chúng tôi</div>
        <div className="flex space-x-10">
          <div className="flex flex-col justify-center items-center space-y-3">
            <div className="bg-white rounded-full h-36 w-36 flex items-center justify-center shadow-lg">
              <Image
                src={'/img/Adopt.svg'}
                alt="adopt pet"
                height={144}
                width={144}
              ></Image>
            </div>
            <div>Cho thú cưng</div>
          </div>
          <div className="flex flex-col justify-center items-center space-y-3">
            <div className="flex bg-white rounded-full h-36 w-36 items-center justify-center shadow-lg">
              <Image
                src={'/img/Receive.svg'}
                alt="adopt pet"
                height={128}
                width={128}
              ></Image>
            </div>
            <div>Nhận nuôi</div>
          </div>
          <div className="flex flex-col justify-center items-center space-y-3">
            <div className="bg-white rounded-full h-36 w-36 flex items-center justify-center shadow-lg">
              <Image
                src={'/img/Blog.svg'}
                alt="adopt pet"
                height={128}
                width={128}
              ></Image>
            </div>
            <div>Chia sẻ kiến thức</div>
          </div>
        </div>
      </div>

      {/* Adopt step */}
      <div className="flex flex-col items-center justify-center p-4">
        <div className="text-4xl my-5">Quy trình nhận nuôi</div>
        <div className="flex space-x-10">
          <div className="flex flex-col justify-center items-center">
            <Image
              src={'/img/Cat_and_dog.png'}
              alt="cat and dog"
              height={400}
              width={400}
            ></Image>
            <div className="font-bold">Tìm boss</div>
            <div>Tìm “boss” mà bạn ưng ý và phù hợp với bản thân.</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Image
              src={'/img/Cat_astronaut.png'}
              alt="cat and dog"
              height={400}
              width={400}
            ></Image>
            <div className="font-bold ">Liên hệ</div>
            <div>Nộp đơn cho chủ của thú cưng mà bạn muộn nhận.</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Image
              src={'/img/Cat_throwing_vase.png'}
              alt="cat and dog"
              height={400}
              width={400}
            ></Image>
            <div className="font-bold">Cập nhật</div>
            <div>Cập nhập tình trạng “boss” của bạn đến mọi người.</div>
          </div>
        </div>
      </div>
      {/* CTA */}
      {/* Footer */}
    </div>
  );
}
