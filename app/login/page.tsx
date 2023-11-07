import React from "react";
import Image from "next/image";
import LoginForm from "@/components/LoginForm";

export default function page() {
  return (
    <div className="">
      {/* Background */}
      <div className="absolute m-auto left-0 right-0 z-50">
        <LoginForm />
      </div>
      <div className="w-full left-0 top-0 z-0">
        <div className="flex ">
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
    </div>
  );
}
