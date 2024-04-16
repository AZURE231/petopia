import { getPetAgeText, getPetSexText } from '@/src/helpers/getPetTextDetails';
import { IPetResponse } from '@/src/interfaces/pet';
import Image from 'next/image';
import Link from 'next/link';
import { MdDelete } from 'react-icons/md';
import { Alert } from '../general/Alert';
import { useState } from 'react';
import { useMutation, useQuery } from '@/src/utils/hooks';
import { deletePet } from '@/src/services/pet.api';
import { CiEdit } from 'react-icons/ci';
import Popup from 'reactjs-popup';
import PetProfileForm from '../pet/PetProfileForm';

type IPetCard = IPetResponse & { isEditable?: boolean };

export function PetCard(props: IPetCard) {
  const { id, name, breed, sex, age, image, isEditable } = props;
  const [showAlert, setShowAlert] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleClose = () => {
    window.location.reload();
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowAlert(true);
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowEdit(!showEdit);
  };

  const deletePetMutation = useMutation(deletePet, {
    onSuccess: () => {
      console.log('Delete pet success');
      window.location.reload();
    },
  });

  const deletePetFunc = () => {
    console.log('Delete pet', id);
    deletePetMutation.mutate({ id: id });
  };

  return (
    <div className="relative">
      <Link href={`/pet/${id}`}>
        <div className="max-w-xs p-2 bg-white border border-gray-200 rounded-2xl shadow-lg ">
          <div className="flex flex-col">
            <div className="w-full relative pt-[100%]">
              {image ? (
                <Image
                  src={image}
                  alt="profile"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-full top-0 left-0 object-cover rounded-2xl"
                ></Image>
              ) : null}
            </div>
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {name}
              </h5>
              <h4 className="font-bold">{breed}</h4>
              <div className="flex flex-row justify-between">
                <div>{`Giới tính: ${getPetSexText(sex)}`}</div>
                <div>{`Tuổi: ${getPetAgeText(age)}`}</div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      {isEditable && (
        <div className="absolute top-2 right-2 flex gap-1">
          <Popup
            modal
            overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
            trigger={
              <button
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                onClick={handleEdit}
              >
                <CiEdit size={20} />
              </button>
            }
          >
            <PetProfileForm id={id} handleClose={handleClose} />
          </Popup>

          <button
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            onClick={handleDelete}
          >
            <MdDelete size={20} />
          </button>
        </div>
      )}
      <Alert
        message={'Bạn có chắc muốn xoá không?'}
        failed={true}
        show={showAlert}
        title="Xác nhận xoá"
        setShow={setShowAlert}
        action={deletePetFunc}
      />
    </div>
  );
}
