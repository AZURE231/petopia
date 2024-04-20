import Popup from 'reactjs-popup';
import { FaPlus } from 'react-icons/fa';
import CreatePetPostForm from './CreatePetPostForm';

export default function CreatePetPostButton() {
  return (
    <Popup
      modal
      className="max-w-xl w-96"
      overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
      trigger={
        <button className="p-3 flex items-center w-fit font-medium bg-yellow-300 rounded-full hover:bg-yellow-400">
          <span className="mr-2">
            <FaPlus />
          </span>
          Tạo bài đăng
        </button>
      }
    >
      <CreatePetPostForm />
    </Popup>
  );
}
