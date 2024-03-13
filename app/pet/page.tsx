'use client';
import Carousel from '@/src/components/Carousel';
import SeeMore from '@/src/components/SeeMore';
import Image from 'next/image';

const images = [
  'https://placekitten.com/800/400',
  'https://placekitten.com/801/400',
  'https://placekitten.com/802/400',
  'https://placekitten.com/803/400',
  'https://placekitten.com/806/400',
  'https://placekitten.com/806/400',
  'https://placekitten.com/806/400',
];

export default function page() {
  return (
    <div>
      <div className="container mx-auto p-5 shadow-2xl rounded-2xl">
        <div className="grid md:grid-cols-2 grid-cols-1">
          <div>
            <div className="w-full relative pt-[100%]">
              <Image
                alt="pet-avatar"
                src={'/img/cat-pet-detail.jpg'}
                objectFit="cover"
                fill
                className="w-full h-3/4 top-0 left-0 object-cover rounded-lg"
              ></Image>
            </div>
            <div className="p-5">
              <Carousel images={images}></Carousel>
            </div>
          </div>
          <div className="md:pl-10">
            <h1 className="text-2xl font-bold">Yasuoba</h1>
            <button className="w-fit p-3 px-8 rounded-full font-bold shadow-md bg-yellow-300 hover:bg-yellow-400 my-5">
              Nhận nuôi
            </button>
            <div className="flex flex-col divide-y">
              <div className="flex flex-row py-2">
                <div className="w-1/3">Giống</div>
                <div className="w-2/3">
                  <span>: </span>Chó Shiba
                </div>
              </div>

              <div className="flex flex-row py-2">
                <div className="w-1/3">Giới tính</div>
                <div className="w-2/3">
                  <span>: </span>Cái
                </div>
              </div>

              <div className="flex flex-row py-2">
                <div className="w-1/3">Tuổi</div>
                <div className="w-2/3">
                  <span>: </span>1 năm
                </div>
              </div>

              <div className="flex flex-row py-2">
                <div className="w-1/3">Kích thước</div>
                <div className="w-2/3">
                  <span>: </span>Nhỏ
                </div>
              </div>

              <div className="flex flex-row py-2">
                <div className="w-1/3">Màu</div>
                <div className="w-2/3">
                  <span>: </span>Vàng
                </div>
              </div>

              <div className="flex flex-row py-2">
                <div className="w-1/3">Tiêm chủng</div>
                <div className="w-2/3">
                  <span>: </span>Có
                </div>
              </div>

              <div className="flex flex-row py-2">
                <div className="w-1/3">Triệt sản</div>
                <div className="w-2/3">
                  <span>: </span>Không
                </div>
              </div>
              <div className="flex flex-row py-2">
                <div className="w-1/3">Địa chỉ</div>
                <div className="w-2/3">
                  <span>: </span>497 Hoà Hảo
                </div>
              </div>
              <div className="flex flex-row py-2">
                <div className="w-1/3">Ngày đăng</div>
                <div className="w-2/3">
                  <span>: </span>12/10/2023
                </div>
              </div>
              <div className="flex flex-row py-2">
                <div className="w-1/3">Đôi nét</div>
                <div className="w-2/3">
                  <span>: </span>Chó ngon, thịt chắc
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SeeMore />
    </div>
  );
}
