'use client';
import React, { use, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@/src/utils/hooks';
import { QueryProvider } from '@/src/components/general/QueryProvider';
import PaymentDropIn from '@/src/components/payment/PaymentDropIn';
import { IApiResponse } from '@/src/interfaces/common';
import { IPayment, IPaymentTypes } from '@/src/interfaces/payment';
import { createPayment, getAdTypes } from '@/src/services/payment.api';
import { QUERY_KEYS } from '@/src/utils/constants';
import QueryButton from '@/src/components/general/QueryButton';
import { set, useForm } from 'react-hook-form';
import { Alert } from '@/src/components/general/Alert';
const BlogAdPage = QueryProvider(({ params }: { params: { id: string } }) => {
  const [adTypes, setAdTypes] = useState<IPaymentTypes[]>([]);
  const [selectedAdType, setSelectedAdType] = useState<string>('');
  const [alertShow, setAlertShow] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertFailed, setAlertFailed] = useState<boolean>(false);
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const [alertAction, setAlertAction] = useState<() => void>(() => () => {});

  useQuery<IApiResponse<IPaymentTypes[]>>(
    [QUERY_KEYS.GET_AD_TYPES],
    () => getAdTypes(),
    {
      onSuccess: (data) => {
        setAdTypes(data.data.data);
      },
    }
  );

  const handleSelect = (adTypeId: string) => () => {
    setSelectedAdType(adTypeId);
    paymentForm.setValue('advertisementId', adTypeId);
  };

  const paymentForm = useForm<IPayment>({
    defaultValues: {
      blogId: params.id,
      advertisementId: selectedAdType,
      nonce: '',
    },
  });

  const createPaymentMutation = useMutation<IApiResponse<boolean>, IPayment>(
    createPayment,
    {
      onError: (err) => {
        setAlertMessage('Thanh toán thất bại. Kiểm tra lại thông tin nhập.');
        setAlertFailed(true);
        setAlertShow(true);
      },
      onSuccess: () => {
        setAlertMessage('Thanh toán thành công');
        setAlertFailed(false);
        setAlertShow(true);
        setAlertAction(() => () => {
          window.location.href = `/blog/${params.id}`;
        });
      },
    }
  );

  const handlePayment = () => {
    createPaymentMutation.mutate(paymentForm.getValues());
  };

  useEffect(() => {
    if (paymentForm.getValues().nonce && selectedAdType) {
      setShowBtn(true);
    }
  }, [paymentForm.watch('nonce'), selectedAdType]);

  return (
    <div className="container mx-auto px-4 py-8 w-3/4">
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
                  className={`flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border ${
                    selectedAdType === adType.id
                      ? 'border-yellow-300 border-4 bg-gray-300'
                      : 'bg-white'
                  } shadow hover:bg-gray-100 cursor-pointer`}
                  key={adType.id}
                  onClick={handleSelect(adType.id)}
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
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <PaymentDropIn
        setNonce={(nonce) => paymentForm.setValue('nonce', nonce)}
      />
      {showBtn && (
        <div className="flex justify-center mt-10">
          <div className="w-64">
            <QueryButton
              name={'Thanh toán'}
              isLoading={false}
              action={handlePayment}
            />
          </div>
        </div>
      )}
      <Alert
        message={alertMessage}
        show={alertShow}
        setShow={setAlertShow}
        failed={alertFailed}
        action={alertAction}
        showCancel={false}
      />
    </div>
  );
});

export default BlogAdPage;
