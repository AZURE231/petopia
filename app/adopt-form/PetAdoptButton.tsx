'use client';
import React from "react";
import Popup from "reactjs-popup";
import PetAdoptionForm from "./PetAdoptionForm";

export default function PetAdoptButton() {
  return (
    <Popup modal trigger={<button>Adopt Me</button>}>
      <PetAdoptionForm />
    </Popup>
  );
}
