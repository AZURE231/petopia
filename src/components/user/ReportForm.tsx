import React, { use, useEffect, useState } from 'react';
import QueryButton from '../general/QueryButton';
import { REPORT_ENTITY, REPORT_TYPE } from '@/src/utils/constants';
import { useForm } from 'react-hook-form';
import { IReportRequest } from '@/src/interfaces/user';
import { IApiErrorResponse, IApiResponse } from '@/src/interfaces/common';
import { report } from '@/src/services/user.api';
import { useMutation } from '@/src/utils/hooks';
import { Alert } from '../general/Alert';
import { UseQueryResult } from 'react-query';
import { AxiosResponse } from 'axios';

export default function ReportForm({
  id,
  type,
  handleClose,
  preCheckQuery,
}: {
  id: string;
  type: REPORT_ENTITY;
  handleClose: () => void;
  preCheckQuery: UseQueryResult<
    AxiosResponse<IApiResponse<boolean>, any>,
    AxiosResponse<IApiErrorResponse, any>
  >;
}) {
  const [alertShow, setAlertShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertFailed, setAlertFailed] = useState(false);

  const { getValues, setValue, watch } = useForm<IReportRequest>({
    defaultValues: {
      id: id,
      entity: type,
      reportTypes: [],
    },
  });

  const reportMutation = useMutation<IApiResponse<boolean>, IReportRequest>(
    report,
    {
      onError: (err) => {
        setAlertMessage('Đã có lỗi xảy ra');
        setAlertFailed(true);
        setAlertShow(true);
      },
      onSuccess: () => {
        preCheckQuery.refetch();
        setAlertMessage('Báo cáo thành công');
        setAlertFailed(false);
        setAlertShow(true);
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    reportMutation.mutate(getValues());
  };
  return (
    <div className="container p-5 mx-auto">
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-2xl bg-blue-200 p-5"
      >
        <h1 className="text-2xl font-bold mb-5">Báo cáo</h1>
        <div
          className="w-full p-5 mb-5 bg-gray-50 rounded-lg overflow-auto"
          style={{ maxHeight: '400px' }}
        >
          {/* Spam */}
          <div className="flex">
            <div className="flex items-center h-5">
              <input
                id="spam"
                aria-describedby="helper-checkbox-text"
                type="checkbox"
                value={REPORT_TYPE.SPAM}
                onChange={(e) => {
                  if (e.target.checked) {
                    setValue('reportTypes', [
                      ...getValues('reportTypes'),
                      Number(e.target.value),
                    ]);
                  } else {
                    setValue(
                      'reportTypes',
                      getValues('reportTypes').filter(
                        (value) => value !== Number(e.target.value)
                      )
                    );
                  }
                }}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   focus:ring-2 "
              />
            </div>
            <div className="ms-2 text-lg">
              <label
                htmlFor="helper-checkbox"
                className="font-medium text-gray-900 "
              >
                Tin rác
              </label>
              <p
                id="helper-checkbox-text"
                className="text-md font-normal text-gray-500 "
              >
                Người dùng này đăng thông tin không liên quan
              </p>
            </div>
          </div>
          {/* Scam */}
          <div className="flex">
            <div className="flex items-center h-5">
              <input
                id="scam"
                aria-describedby="helper-checkbox-text"
                type="checkbox"
                value={REPORT_TYPE.SCAM}
                onChange={(e) => {
                  if (e.target.checked) {
                    setValue('reportTypes', [
                      ...getValues('reportTypes'),
                      Number(e.target.value),
                    ]);
                  } else {
                    setValue(
                      'reportTypes',
                      getValues('reportTypes').filter(
                        (value) => value !== Number(e.target.value)
                      )
                    );
                  }
                }}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   focus:ring-2 "
              />
            </div>
            <div className="ms-2 text-lg">
              <label
                htmlFor="helper-checkbox"
                className="font-medium text-gray-900 "
              >
                Lừa đảo
              </label>
              <p
                id="helper-checkbox-text"
                className="text-md font-normal text-gray-500 "
              >
                Người dùng có dấu hiệu lừa đảo
              </p>
            </div>
          </div>
          {/* InappropriateContent */}
          <div className="flex">
            <div className="flex items-center h-5">
              <input
                id="InappropriateContent"
                aria-describedby="helper-checkbox-text"
                type="checkbox"
                value={REPORT_TYPE.INAPPROPRIATE_CONTENT}
                onChange={(e) => {
                  if (e.target.checked) {
                    setValue('reportTypes', [
                      ...getValues('reportTypes'),
                      Number(e.target.value),
                    ]);
                  } else {
                    setValue(
                      'reportTypes',
                      getValues('reportTypes').filter(
                        (value) => value !== Number(e.target.value)
                      )
                    );
                  }
                }}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   focus:ring-2 "
              />
            </div>
            <div className="ms-2 text-lg">
              <label
                htmlFor="helper-checkbox"
                className="font-medium text-gray-900 "
              >
                Nội dung không phù hợp
              </label>
              <p
                id="helper-checkbox-text"
                className="text-md font-normal text-gray-500 "
              >
                Nội dung vi phạm tiêu chuẩn cộng đồng
              </p>
            </div>
          </div>
          {/* Other */}
          <div className="flex">
            <div className="flex items-center h-5">
              <input
                id="other"
                aria-describedby="helper-checkbox-text"
                type="checkbox"
                value={REPORT_TYPE.OTHER}
                onChange={(e) => {
                  if (e.target.checked) {
                    setValue('reportTypes', [
                      ...getValues('reportTypes'),
                      Number(e.target.value),
                    ]);
                  } else {
                    setValue(
                      'reportTypes',
                      getValues('reportTypes').filter(
                        (value) => value !== Number(e.target.value)
                      )
                    );
                  }
                }}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   focus:ring-2 "
              />
            </div>
            <div className="ms-2 text-lg">
              <label
                htmlFor="helper-checkbox"
                className="font-medium text-gray-900 "
              >
                Khác
              </label>
              <p
                id="helper-checkbox-text"
                className="text-md font-normal text-gray-500 "
              >
                Báo cáo vi phạm khác
              </p>
            </div>
          </div>
          <div className="mt-3">
            <QueryButton name="Báo cáo" isLoading={reportMutation.isLoading} />
          </div>
        </div>
      </form>
      <Alert
        message={alertMessage}
        show={alertShow}
        setShow={setAlertShow}
        failed={alertFailed}
        action={handleClose}
      />
    </div>
  );
}
