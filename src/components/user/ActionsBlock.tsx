import Popup from 'reactjs-popup';
import { UserUpgradeForm } from './UserUpgradeForm';
import Link from 'next/link';
import { FaRegEdit } from 'react-icons/fa';
import { useQuery } from '@/src/utils/hooks';
import { IApiResponse } from '@/src/interfaces/common';
import { QUERY_KEYS } from '@/src/utils/constants';
import { getPreUpgrade } from '@/src/services/user.api';
import { Dispatch, SetStateAction, useState } from 'react';
import { Alert } from '../general/Alert';

interface IActionsBlock {
  showUpgrade: boolean;
  setShowEdit: Dispatch<SetStateAction<boolean>>;
}

export const ActionsBlock = (props: IActionsBlock) => {
  const { showUpgrade, setShowEdit } = props;

  // STATES
  const [alowUpgrade, setAllowUpgrade] = useState<boolean>(false);
  const [upgradeClicked, setUpgradeClicked] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  // HANDLERS
  const handleClickUpgrade = () => {
    if (alowUpgrade) {
      setUpgradeClicked(true);
    } else {
      setShowAlert(true);
    }
  };

  // QUERIES
  const preUpgradeQuery = useQuery<IApiResponse<boolean>>([QUERY_KEYS.GET_PRE_UPGRADE], getPreUpgrade, {
    onSuccess: (res) => {
      setAllowUpgrade(res.data.data);
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div className="mt-5 w-full flex flex-col md:flex-row items-end justify-end gap-2 md:gap-3">
      {showUpgrade && !preUpgradeQuery.isLoading && (
        <div>
          <button
          test-id="show-upgrade-button"
            className="w-fit border border-black hover:bg-gray-100 font-medium rounded-lg text-md md:text-lg px-5 py-2.5 text-center"
            onClick={handleClickUpgrade}
          >
            Trở thành cộng tác viên
          </button>
          <Popup
            modal
            open={upgradeClicked}
            overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
          >
            <UserUpgradeForm handleClose={() => setUpgradeClicked(false)} />
          </Popup>
        </div>
      )}

      <Link
        href={'user/change-password'}
        className="w-fit border border-black bg-yellow-300 hover:bg-yellow-400 font-medium rounded-lg text-md md:text-lg px-5 py-2.5 text-center"
      >
        Đổi mật khẩu
      </Link>

      <button
        test-id="show-edit-button"
        onClick={() => setShowEdit((pre) => !pre)}
        className="border border-black bg-yellow-300 hover:bg-yellow-400 px-5 py-2.5 text-center rounded-lg"
      >
        <FaRegEdit className="text-2xl md:right-10" />
      </button>

      <Alert
        testId="already-submit-org-alert"
        failed={true}
        message={'Bạn đã gửi yêu cầu cộng tác viên rồi!'}
        show={showAlert}
        setShow={setShowAlert}
      />
    </div>
  );
};
