'use client';
import { QueryProvider } from '@/src/components/general/QueryProvider';
import SeeMore from '@/src/components/general/SeeMore';
import PetAdoptButton from '@/src/components/petAdoptForm/PetAdoptButton';
import {
  getPetAgeText,
  getPetColorText,
  getPetMedicalStatusText,
  getPetSexText,
  getPetSizeText,
  getPetSterillizedText,
} from '@/src/helpers/getPetTextDetails';
import { IApiResponse } from '@/src/interfaces/common';
import { IPetDetailResponse } from '@/src/interfaces/pet';
import { getPetDetail } from '@/src/services/pet.api';
import { QUERY_KEYS } from '@/src/utils/constants';
import { useQuery } from '@/src/utils/hooks';
import { useState } from 'react';
import Image from 'next/image';
import Carousel from '@/src/components/general/Carousel';

const page = QueryProvider(({ params }: { params: { id: string } }) => {
  const [petDetail, setPetDetail] = useState<IPetDetailResponse>();

  const getUserQuery = useQuery<IApiResponse<IPetDetailResponse>>(
    [QUERY_KEYS.GET_GOOGLE_RECAPTCHA_TOKEN],
    () => getPetDetail({ id: params.id }),
    {
      onSuccess: (res) => {
        setPetDetail(res.data.data);
      },
      onError: (err) => console.log(err),
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div>
      {petDetail && (
        <div>
          <div className="container mx-auto p-5 shadow-2xl rounded-2xl">
            <div className="grid md:grid-cols-2 grid-cols-1">
              <div>
                <div className="w-full relative pt-[100%]">
                  <Image
                    alt="pet-avatar"
                    src={petDetail.images[0]}
                    objectFit="cover"
                    fill
                    className="w-full h-3/4 top-0 left-0 object-cover rounded-lg"
                  ></Image>
                </div>
                {petDetail.images.length > 1 && (
                  <div className="p-5">
                    <Carousel images={petDetail.images}></Carousel>
                  </div>
                )}
              </div>
              <div className="md:pl-10">
                <h1 className="text-2xl font-bold">{petDetail.name}</h1>
                {petDetail.isAvailable && <PetAdoptButton />}
                <div className="flex flex-col divide-y">
                  <div className="flex flex-row py-2">
                    <div className="w-1/3">Giống</div>
                    <div className="w-2/3">
                      <span>: </span>
                      {petDetail.breed}
                    </div>
                  </div>
                  <div className="flex flex-row py-2">
                    <div className="w-1/3">Giới tính</div>
                    <div className="w-2/3">
                      <span>: </span>
                      {getPetSexText(petDetail.sex)}
                    </div>
                  </div>
                  <div className="flex flex-row py-2">
                    <div className="w-1/3">Tuổi</div>
                    <div className="w-2/3">
                      <span>: </span>
                      {getPetAgeText(petDetail.age)}
                    </div>
                  </div>
                  <div className="flex flex-row py-2">
                    <div className="w-1/3">Kích thước</div>
                    <div className="w-2/3">
                      <span>: </span>
                      {getPetSizeText(petDetail.size)}
                    </div>
                  </div>
                  <div className="flex flex-row py-2">
                    <div className="w-1/3">Màu</div>
                    <div className="w-2/3">
                      <span>: </span>
                      {getPetColorText(petDetail.color)}
                    </div>
                  </div>
                  <div className="flex flex-row py-2">
                    <div className="w-1/3">Tiêm chủng</div>
                    <div className="w-2/3">
                      <span>: </span>
                      {getPetMedicalStatusText(petDetail.isVaccinated)}
                    </div>
                  </div>
                  <div className="flex flex-row py-2">
                    <div className="w-1/3">Triệt sản</div>
                    <div className="w-2/3">
                      <span>: </span>
                      {getPetSterillizedText(petDetail.isSterillized)}
                    </div>
                  </div>
                  <div className="flex flex-row py-2">
                    <div className="w-1/3">Địa chỉ</div>
                    <div className="w-2/3">
                      <span>: </span>
                      {petDetail.address}
                    </div>
                  </div>
                  <div className="flex flex-row py-2">
                    <div className="w-1/3">Ngày đăng</div>
                    <div className="w-2/3">
                      <span>: </span>
                      {new Date(petDetail.isCreatedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex flex-row py-2">
                    <div className="w-1/3">Đôi nét</div>
                    <div className="w-2/3">
                      <span>: </span>
                      {petDetail.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SeeMore petList={petDetail.seeMore} />
        </div>
      )}
    </div>
  );
});
export default page;
