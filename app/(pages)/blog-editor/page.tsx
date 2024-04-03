"use client";
import React from "react";
import dynamic from "next/dynamic";

const CustomEditor = dynamic(
  () => import("@/src/components/general/CustomEditor"),
  { ssr: false }
);

export default function page() {
  return (
    <CustomEditor initialData="" />
  );
}
