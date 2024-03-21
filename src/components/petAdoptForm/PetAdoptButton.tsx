'use client';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import PetAdoptForm from './PetAdoptForm';

export default function PetAdoptButton() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const checkLoggedIn = () => {
    {
      /*#TODO: Check if User is Logged in, if not: inform and direct to loggin page */
    }
    // if (localStorage.getItem("token")) {
    //   setOpen(true);
    // } else {
    //   alert("Vui lòng đăng nhập để nhận nuôi thú cưng");
    //   window.location.href = "/login";
    //   setOpen(false);
    // }
    setOpen(true);
  };
  return (
    <Popup
      modal
      overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
      open={open}
      onClose={handleClose}
      trigger={
        <button
          className="w-fit p-3 px-8 rounded-full font-bold shadow-md bg-yellow-300 hover:bg-yellow-400 my-5"
          onClick={checkLoggedIn}
        >
          Nhận nuôi
        </button>
      }
    >
      <PetAdoptForm handleClose={handleClose} />
    </Popup>
  );
}
