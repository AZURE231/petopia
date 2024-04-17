'use client';
import { QueryProvider } from '@/src/components/general/QueryProvider';
import SeeMore from '@/src/components/general/SeeMore';
import { PetAdoptButton } from '@/src/components/adopt/PetAdoptButton';
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
import ImageCarousel from '@/src/components/general/Carousel';
import PetDetailSkeleton from '@/src/components/general/PetDetailSkeleton';
import { NoResultBackground } from '@/src/components/general/NoResultBackground';
import Link from 'next/link';
import { FaHouseUser } from 'react-icons/fa';
import { Button, Tooltip } from '@material-tailwind/react';
import { FaShieldDog } from 'react-icons/fa6';

const page = QueryProvider(({ params }: { params: { id: string } }) => {
  const [petDetail, setPetDetail] = useState<IPetDetailResponse>();
  const [error, setError] = useState<boolean>(false);
  const [displayedImage, setDisplayedImage] = useState<string>('');

  const getPetQuery = useQuery<IApiResponse<IPetDetailResponse>>(
    [QUERY_KEYS.GET_PET_DETAIL],
    () => getPetDetail({ id: params.id }),
    {
      onSuccess: (res) => {
        setPetDetail(res.data.data);
        setDisplayedImage(res.data.data.images[0]);
      },
      onError: () => setError(true),
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div>
      {getPetQuery.isLoading && <PetDetailSkeleton />}
      {!getPetQuery.isLoading && petDetail && (
        <div>
          <div className="container mx-auto p-5 shadow-2xl rounded-2xl">
            <div className="grid md:grid-cols-2 grid-cols-1">
              <div>
                <div className="w-full relative pt-[100%]">
                  <Image
                    alt="pet-avatar"
                    src={displayedImage}
                    objectFit="cover"
                    fill
                    className="w-full h-3/4 top-0 left-0 object-cover rounded-lg"
                  ></Image>
                </div>
                {petDetail.images.length > 1 && (
                  <div className="p-5">
                    <ImageCarousel
                      images={petDetail.images}
                      setDisplayedImage={setDisplayedImage}
                      disPlayedImage={displayedImage}
                    />
                  </div>
                )}
              </div>
              <div className="md:pl-10">
                <div className="flex flex-row gap-2">
                  <h1 className="text-2xl font-bold">{petDetail.name}</h1>
                  <div className="flex flex-row gap-2">
                    {petDetail.isOrgOwned && (
                      <Tooltip content="Cộng tác viên">
                        <Button className="p-0 shadow-none">
                          <FaShieldDog color="green" size={25} />
                        </Button>
                      </Tooltip>
                    )}
                  </div>
                  {petDetail.isAvailable && <PetAdoptButton />}
                  <Link
                    href={`/user/${petDetail.ownerId}`}
                    className="w-fit flex items-center border border-black hover:bg-gray-100 p-3 px-8 rounded-full font-bold shadow-md my-5"
                  >
                    <span className="mr-2">
                      <FaHouseUser size={30} />
                    </span>
                    Xem trang cá nhân
                  </Link>
                </div>
                <div className="flex flex-col divide-y">
                  <div className="flex flex-row py-2">
                    <div className="w-1/3 font-bold">Giống</div>
                    <div className="w-2/3">
                      <span>: </span>
                      {petDetail.breed}
                    </div>
                  </div>
                  <div className="flex flex-row py-2">
                    <div className="w-1/3 font-bold">Giới tính</div>
                    <div className="w-2/3">
                      <span>: </span>
                      {getPetSexText(petDetail.sex)}
                    </div>
                  </div>
                  <div className="flex flex-row py-2">
                    <div className="w-1/3 font-bold">Tuổi</div>
                    <div className="w-2/3">
                      <span>: </span>
                      {getPetAgeText(petDetail.age)}
                    </div>
                  </div>
                  <div className="flex flex-row py-2">
                    <div className="w-1/3 font-bold">Kích thước</div>
                    <div className="w-2/3">
                      <span>: </span>
                      {getPetSizeText(petDetail.size)}
                    </div>
                  </div>
                  <div className="flex flex-row py-2">
                    <div className="w-1/3 font-bold">Màu</div>
                    <div className="w-2/3">
                      <span>: </span>
                      {getPetColorText(petDetail.color)}
                    </div>
                  </div>
                  <div className="flex flex-row py-2">
                    <div className="w-1/3 font-bold">Tiêm chủng</div>
                    <div className="w-2/3">
                      <span>: </span>
                      {getPetMedicalStatusText(petDetail.isVaccinated)}
                    </div>
                  </div>
                  <div className="flex flex-row py-2">
                    <div className="w-1/3 font-bold">Triệt sản</div>
                    <div className="w-2/3">
                      <span>: </span>
                      {getPetSterillizedText(petDetail.isSterillized)}
                    </div>
                  </div>
                  <div className="flex flex-row py-2">
                    <div className="w-1/3 font-bold">Địa chỉ</div>
                    <div className="w-2/3">
                      <span>: </span>
                      {petDetail.address}
                    </div>
                  </div>
                  <div className="flex flex-row py-2">
                    <div className="w-1/3 font-bold">Ngày đăng</div>
                    <div className="w-2/3">
                      <span>: </span>
                      {new Date(petDetail.isCreatedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex flex-row py-2">
                    <div className="w-1/3 font-bold">Đôi nét</div>
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
      {error && (
        <NoResultBackground className="h-fit-screen w-full items-center" />
      )}
    </div>
  );
});
export default page;
