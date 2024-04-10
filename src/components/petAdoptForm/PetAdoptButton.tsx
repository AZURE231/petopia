"use client"; // Assuming this is for client-side code

import React, { useState } from "react";
import Popup from "reactjs-popup";
import PetAdoptForm from "./PetAdoptForm";
import { observer } from "mobx-react-lite";
import { useStores } from "@/src/stores";
import { Alert } from "../general/Alert";
import { set } from "mobx"; // Not sure if this import is necessary

export const PetAdoptButton = observer(() => {
  const [open, setOpen] = useState(false); // State to control the popup visibility
  const [alertShow, setAlertShow] = useState(false); // State to control the alert visibility
  const { userStore } = useStores(); // Accessing the userStore from MobX

  // Function to handle closing the popup
  const handleClose = () => setOpen(false);

  // Function to check if the user is logged in before opening the popup
  const checkLoggedIn = () => {
    if (!userStore.userContext) {
      setAlertShow(true); // Showing the alert when user is not logged in
    } else {
      setOpen(true); // Opening the popup if the user is logged in
    }
  };

  return (
    <div>
      {/* Rendering the alert component */}
      <Alert
        failed
        message="Vui lòng đăng nhập để nhận nuôi"
        show={alertShow}
        title="Đăng nhập"
        setShow={setAlertShow}
        action={() => {
          // Redirecting to the login page when the alert is closed
          window.location.href = "/login";
        }}
      />
      <button
        className="w-fit p-3 px-8 rounded-full font-bold shadow-md bg-yellow-300 hover:bg-yellow-400 my-5"
        onClick={checkLoggedIn}
      >
        Nhận nuôi
      </button>
      {/* Rendering the button with the popup trigger */}
      <Popup
        modal
        overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
        open={open} // Uncomment this if you want to control the popup visibility with state
        onClose={handleClose} // Uncomment this if you want to close the popup with the handleClose function
        onOpen={checkLoggedIn} // Triggering the checkLoggedIn function when the popup opens
      >
        {/* Rendering the pet adopt form inside the popup */}
        <PetAdoptForm handleClose={handleClose} />
      </Popup>
    </div>
  );
});
