'use client';
import { QueryProvider } from '@/src/components/general/QueryProvider';
import PaymentDropIn from '@/src/components/payment/PaymentDropIn';
import { IApiResponse } from '@/src/interfaces/common';
import { IPaymentTypes } from '@/src/interfaces/payment';
import { getAdTypes } from '@/src/services/payment.api';
import { QUERY_KEYS } from '@/src/utils/constants';
import { useQuery } from '@/src/utils/hooks';
import React, { useState } from 'react';

const BlogAdPage = QueryProvider(() => {
  const [adTypes, setAdTypes] = useState<IPaymentTypes[]>([]);

  useQuery<IApiResponse<IPaymentTypes[]>>(
    [QUERY_KEYS.GET_AD_TYPES],
    () => getAdTypes(),
    {
      onSuccess: (data) => {
        setAdTypes(data.data.data);
      },
    }
  );

  return (
    <div className="container mx-auto px-4 py-8 w-3/4">
      {/* <h1 className="font-bold text-3xl mb-4">Bảng Gía Quảng Cáo Blog</h1> */}
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Quảng cáo bài viết của bạn ngay hôm nay!
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Hãy để bài viết của bạn được mọi người trên Petopia biết đến nhiều
              hơn với dịch vụ quảng cáo của chúng tôi.
            </p>
          </div>
          <div className="space-y-8 lg:grid lg:grid-cols-4 sm:gap-6 xl:gap-10 lg:space-y-0">
            {adTypes.map((adType) => {
              return (
                <div
                  className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow"
                  key={adType.id}
                >
                  <h3 className="mb-4 text-2xl font-semibold">
                    {adType.monthDuration} tháng
                  </h3>
                  <p className="font-light h-10 text-gray-500 sm:text-lg ">
                    {adType.description}
                  </p>
                  <div className="flex justify-center items-baseline my-8">
                    <span className="mr-2 text-3xl font-extrabold">
                      {adType.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                      VND
                    </span>
                  </div>
                  <button
                    className="w-full text-black bg-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-yellow-400"
                    // onClick={checkLoggedIn}
                  >
                    Thanh toán
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <PaymentDropIn />
    </div>
  );
});

export default BlogAdPage;
