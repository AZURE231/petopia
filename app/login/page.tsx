import React from "react";
import Image from "next/image";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";

export default function page() {
  return (
    <div className="">
      <div className="absolute m-auto left-0 right-0 z-50">
        <RegisterForm />
      </div>
      {/* Background */}
      <div className="flex">
        <div className="bg-white h-screen w-1/2">
          <div className="h-screen relative">
            <Image
              className="object-cover"
              alt="girl and dog"
              src={"/img/girl_dog.webp"}
              fill={true}
            ></Image>
          </div>
        </div>
        <div className="bg-yellow-300 h-screen w-1/2">
          <div className="h-screen relative">
            <Image
              className="object-cover"
              alt="golden_retriever"
              src={"/img/pexels-gilberto-reyes.png"}
              fill={true}
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
}
