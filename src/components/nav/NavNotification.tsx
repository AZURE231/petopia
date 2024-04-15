import { MdNotifications, MdNotificationsActive } from "react-icons/md";
import { useState } from "react";

export default function NavNotification() {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleButtonClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="relative font-[sans-serif] w-max mx-auto">
      <button
        className="text-black bg-yellow-300 rounded-full py-2 px-4 hover:bg-yellow-400"
        onClick={handleButtonClick}
      >
        <MdNotifications />
      </button>
      {showNotifications && (
        <div className="absolute shadow-lg bg-white py-2 z-[1000] min-w-full rounded-lg w-[410px] max-h-[500px] overflow-auto">
          <div className="flex items-center justify-between my-4 px-4">
            <p className="text-xs text-blue-500 cursor-pointer">Clear all</p>
            <p className="text-xs text-blue-500 cursor-pointer">Mark as read</p>
          </div>
          <ul className="divide-y">
            <li className="py-4 px-4 flex items-center hover:bg-gray-50 text-black text-sm cursor-pointer">
              <img
                src="https://readymadeui.com/profile_2.webp"
                className="w-12 h-12 rounded-full shrink-0"
              />
              <div className="ml-6">
                <h3 className="text-sm text-[#333] font-semibold">
                  Your have a new message from Yin
                </h3>
                <p className="text-xs text-gray-400 mt-2">
                  Hello there, check this new items in from the your may
                  interested from the motion school
                </p>
                <p className="text-xs text-blue-500 leading-3 mt-2">
                  10 minutes ago
                </p>
              </div>
            </li>
            <li className="py-4 px-4 flex items-center hover:bg-gray-50 text-black text-sm cursor-pointer">
              {/* <img
                src="https://readymadeui.com/profile_3.webp"
                className="w-12 h-12 rounded-full shrink-0"
              /> */}
              <div className="ml-6">
                <h3 className="text-sm text-[#333] font-semibold">
                  Your have a new message from Haper
                </h3>
                <p className="text-xs text-gray-400 mt-2">
                  Hello there, check this new items in from the your may
                  interested from the motion school
                </p>
                <p className="text-xs text-blue-500 leading-3 mt-2">
                  2 hours ago
                </p>
              </div>
            </li>
            <li className="py-4 px-4 flex items-center hover:bg-gray-50 text-black text-sm cursor-pointer">
              <img
                src="https://readymadeui.com/profile_4.webp"
                className="w-12 h-12 rounded-full shrink-0"
              />
              <div className="ml-6">
                <h3 className="text-sm text-[#333] font-semibold">
                  Your have a new message from San
                </h3>
                <p className="text-xs text-gray-400 mt-2">
                  Hello there, check this new items in from the your may
                  interested from the motion school
                </p>
                <p className="text-xs text-blue-500 leading-3 mt-2">
                  1 day ago
                </p>
              </div>
            </li>
            <li className="py-4 px-4 flex items-center hover:bg-gray-50 text-black text-sm cursor-pointer">
              <img
                src="https://readymadeui.com/profile_4.webp"
                className="w-12 h-12 rounded-full shrink-0"
              />
              <div className="ml-6">
                <h3 className="text-sm text-[#333] font-semibold">
                  Your have a new message from San
                </h3>
                <p className="text-xs text-gray-400 mt-2">
                  Hello there, check this new items in from the your may
                  interested from the motion school
                </p>
                <p className="text-xs text-blue-500 leading-3 mt-2">
                  1 day ago
                </p>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
