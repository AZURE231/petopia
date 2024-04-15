import { MdNotifications } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { QUERY_KEYS } from '@/src/utils/constants';
import { IApiResponse } from '@/src/interfaces/common';
import { useQuery } from '@/src/utils/hooks';
import { INotification } from '@/src/interfaces/notification';
import {
  clearAll,
  getNotifications,
  markAsRead,
} from '@/src/services/notification.api';
import { set } from 'mobx';

export default function NavNotification() {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleButtonClick = () => {
    setShowNotifications(!showNotifications);
    markAsRead();
    setIsNewNotification(false);
  };

  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [error, setError] = useState(false);
  const [isNewNotification, setIsNewNotification] = useState(false);

  // GET NOTIFICATIONS
  useQuery<IApiResponse<INotification[]>>(
    [QUERY_KEYS.GET_NOTIFICATION],
    getNotifications,
    {
      onSuccess: (res) => {
        setNotifications(res.data.data);
      },
      onError: () => setError(true),
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (notifications.length > 0) {
      const newNotification = notifications.find(
        (notification) => !notification.isChecked
      );
      if (newNotification) {
        setIsNewNotification(true);
      } else {
        setIsNewNotification(false);
      }
    }
  }, [notifications]);

  const getTimeAgo = (createdAt: string): string => {
    const currentTime = new Date();
    const sentTime = new Date(createdAt);
    const timeDifference = Math.abs(currentTime.getTime() - sentTime.getTime());
    const minutesAgo = Math.floor(timeDifference / (1000 * 60));
    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (minutesAgo < 60) {
      return `${minutesAgo} phút trước`;
    } else if (hoursAgo < 24) {
      return `${hoursAgo} giờ trước`;
    } else {
      return `${daysAgo} ngày trước`;
    }
  };

  const clearAll = () => {
    if (notifications.length === 0) return;
    clearAll();
    setNotifications([]);
  };

  return (
    <div className="relative font-[sans-serif] w-max mx-auto">
      <button
        className="text-black bg-yellow-300 rounded-full py-2 px-4 hover:bg-yellow-400"
        onClick={handleButtonClick}
      >
        <MdNotifications />
      </button>
      {isNewNotification && (
        <div className="absolute bg-red-500 text-white w-2 h-2 rounded-full flex items-center justify-center -top-0.5 -right-1">
          <div className="w-1 h-1 bg-red-500 rounded-full"></div>
        </div>
      )}
      {showNotifications && (
        <div className="absolute shadow-lg bg-white py-2 z-[1000] min-w-full rounded-lg w-[380px] max-h-[500px] overflow-auto">
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
}
