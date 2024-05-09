import Popup from 'reactjs-popup';
import { FaPlus } from 'react-icons/fa';
import CreatePetPostForm from './CreatePetPostForm';
import { useState } from 'react';

export default function CreatePetPostButton({
  petId,
  query,
  show,
}: {
  petId: string;
  query: any;
  show: boolean;
}) {
  const [open, setOpen] = useState(false);
  return !show
    ? <></>
    : (<div>
      <Popup
        modal
        overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
        open={open}
      >
        <CreatePetPostForm
          petId={petId}
          query={query}
          action={() => setOpen(false)}
        />
      </Popup>
      <button
        className="p-3 flex items-center w-fit font-medium bg-yellow-300 rounded-full hover:bg-yellow-400"
        onClick={() => setOpen(true)}
      >
        <span className="mr-2">
          <FaPlus />
        </span>
        Tạo bài đăng
      </button>
    </div>);
}
