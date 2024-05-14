import Popup from 'reactjs-popup';
import ReportForm from '../user/ReportForm';
import { GoReport } from 'react-icons/go';
import { useState } from 'react';
import { useQuery } from '@/src/utils/hooks';
import { IApiResponse } from '@/src/interfaces/common';
import { QUERY_KEYS, REPORT_ENTITY } from '@/src/utils/constants';
import { getPreReport } from '@/src/services/user.api';
import { Alert } from './Alert';

interface IReportBlock {
  id: string,
  type: REPORT_ENTITY,
}

export const ReportBlock = (props: IReportBlock) => {
  const { id, type } = props;

  const [showReport, setShowReport] = useState(false);
  const [alertShow, setAlertShow] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertFailed, setAlertFailed] = useState<boolean>(false);

  // QUERY
  const getPreReportQuery = useQuery<IApiResponse<boolean>>(
    [QUERY_KEYS.GET_PRE_REPORT],
    () => getPreReport({ id: id, entity: type }),
    {
      onSuccess: (res) => {
        const data = res.data.data;
        if (data) {
          setShowReport(true);
        } else {
          setAlertShow(true);
          setAlertFailed(true);
          setAlertMessage('Bạn không thể report nội dung này.');
        }
      },
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  return (
    <>
      <Popup
        modal
        overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
        open={showReport}
        onClose={() => setShowReport(false)}
      >
        <ReportForm
          id={id}
          type={type}
          handleClose={() => setShowReport(false)}
        />
      </Popup>

      <button
        className="hover:bg-gray-100 p-2 rounded-full border"
        onClick={() => getPreReportQuery.refetch()}
      >
        <GoReport size={30} className="" />
      </button>
      <Alert
        message={alertMessage}
        show={alertShow}
        setShow={setAlertShow}
        failed={alertFailed}
      />
    </>
  );
};