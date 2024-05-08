import { MdNotifications } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import { QUERY_KEYS } from '@/src/utils/constants';
import { IApiResponse } from '@/src/interfaces/common';
import { useClickOutside, useQuery } from '@/src/utils/hooks';
import { INotification } from '@/src/interfaces/notification';
import {
  deleteNoti,
  getNotifications,
  markAsRead,
} from '@/src/services/notification.api';
import { getTimeAgo } from '@/src/helpers/getTimeAgo';

export const NavNotificationBlock = () => {
  // STATES
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isNewNotification, setIsNewNotification] = useState(false);

  // HANDLERS
  const handleButtonClick = async () => {
    setShowNotifications(!showNotifications);
    isNewNotification && (await markAsRead());
    setIsNewNotification(false);
  };

  const clearAll = async () => {
    if (notifications.length === 0) return;
    await deleteNoti();
    setNotifications([]);
  };

  // QUERIES AND MUTATIONS
  useQuery<IApiResponse<INotification[]>>(
    [QUERY_KEYS.GET_NOTIFICATION],
    getNotifications,
    {
      onSuccess: (res) => {
        setNotifications(res.data.data);
      },
      refetchOnWindowFocus: false,
    }
  );

  // EFFECTS
  const buttonRef = useRef<HTMLButtonElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  useClickOutside(() => {
    setShowNotifications(false);
  }, [buttonRef, divRef]);

  useEffect(() => {
    setIsNewNotification(!notifications.every((value) => value.isChecked));
  }, [notifications]);

  return (
    <div className="relative font-[sans-serif] w-max mx-auto">
      <button
        ref={buttonRef}
        className="flex flex-col items-center bg-yellow-300 rounded-full h-8 w-8 py-2 px-4 hover:bg-yellow-400"
        onClick={handleButtonClick}
      >
        <MdNotifications color="#000000" />
      </button>

      {isNewNotification && (
        <div className="absolute bg-red-500 text-white animate-ping w-2 h-2 rounded-full flex items-center justify-center -top-0.5 -right-1">
          <div className="w-1 h-1 bg-red-500 rounded-full "></div>
        </div>
      )}

      {showNotifications && (
        <div
          ref={divRef}
          className="absolute shadow-lg bg-white py-2 z-[1000] right-0 min-w-full rounded-lg w-[380px] max-h-[500px] overflow-auto"
        >
          <div className="flex items-center justify my-4 px-4">
            <p
              className="text-xs text-blue-500 cursor-pointer"
              onClick={clearAll}
            >
              Xóa tất cả
            </p>
          </div>
          {notifications.length === 0 ? (
            <p className="text-sm text-gray-400 px-4">Không có thông báo mới</p>
          ) : (
            <ul className="divide-y">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className="py-4 px-4 flex items-center hover:bg-gray-50 text-black text-sm cursor-pointer"
                >
                  <div className="ml-6">
                    <h3 className="text-sm text-[#333] font-semibold">
                      {notification.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-2">
                      {notification.content}
                    </p>
                    <p className="text-xs text-blue-500 leading-3 mt-2">
                      {getTimeAgo(notification.isCreatedAt)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
