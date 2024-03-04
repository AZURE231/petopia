"use client";
import React from "react";
import Popup from "reactjs-popup";
import PetAdoptForm from "./PetAdoptForm";

export default function PetAdoptButton() {
  return (
    <Popup
      modal
      trigger={
        <button className="w-fit p-3 px-8 rounded-full font-bold shadow-md bg-yellow-300 hover:bg-yellow-400 my-5">
          Nhận nuôi
        </button>
      }
    >
      {/*#TODO: Check if User is Logged in, if not: inform and direct to loggin page */}
      <PetAdoptForm />
    </Popup>
  );
}
