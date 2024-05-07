import { getPetAgeText, getPetSexText } from '@/src/helpers/getPetTextDetails';
import { IPetResponse } from '@/src/interfaces/pet';
import Image from 'next/image';
import Link from 'next/link';
import { MdDelete } from 'react-icons/md';
import { Alert } from '../general/Alert';
import { useState } from 'react';
import { useMutation } from '@/src/utils/hooks';
import { deletePet } from '@/src/services/pet.api';
import { CiEdit } from 'react-icons/ci';
import Popup from 'reactjs-popup';
import PetProfileForm from '../pet/PetProfileForm';
import { FaShieldDog } from 'react-icons/fa6';
import { Tooltip, Button } from '@material-tailwind/react';

interface IPetCard extends IPetResponse {
  isEditable?: boolean;
  simple?: boolean;
}

export function PetCard(props: IPetCard) {
  const { id, name, breed, sex, age, image, isEditable = false, simple = false, isOrgOwned } =
    props;
  const [showAlert, setShowAlert] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleClose = () => {
    window.location.reload();
  };

  const handleDelete = () => {
    setShowAlert(true);
  };

  const handleEdit = () => {
    setShowEdit(!showEdit);
  };

  const deletePetMutation = useMutation(deletePet, {
    onSuccess: () => {
      console.log('Delete pet success');
      window.location.reload();
    },
  });

  const deletePetFunc = () => {
    deletePetMutation.mutate({ id: id });
  };

  return (
    <div className="relative">
      <Link href={`/pet/${id}`}>
        <div className="max-w-xs p-2 bg-white border border-gray-200 rounded-2xl shadow-lg ">
          <div className="flex flex-col">
            <div className="w-full relative pt-[100%]">
              <Image
                src={image}
                alt="profile"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full h-full top-0 left-0 object-cover rounded-2xl"
              ></Image>
            </div>
            <div className="p-2 md:p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                <div className="flex flex-row gap-2 items-center">
                  {name}{' '}
                  {isOrgOwned && (
                    <Tooltip content="Cộng tác viên">
                      <Button className="p-0 shadow-none bg-white">
                        <FaShieldDog color="green" size={20} />
                      </Button>
                    </Tooltip>
                  )}
                </div>
              </h5>
              {!simple && (
                <div className="">
                  <h4 className="font-bold text-md md:text-lg">{breed}</h4>
                  <div className="flex flex-col text-md md:text-lg">
                    <div className="text-gray-600">
                      Giới tính:{' '}
                      <span className="font-medium">{getPetSexText(sex)}</span>
                    </div>
                    <div className="text-gray-600">
                      Tuổi:{' '}
                      <span className="font-medium">{getPetAgeText(age)}</span>
                    </div>
                  </div>
                </div>
              )}
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
