"use client";
import { useState } from "react";
import { IUserRegister } from "@/interface/IUserRegister";
import RegisterApi from "@/api/RegisterApi";
import SuccessToast from "./SuccessToast";

export default function RegisterForm() {
  const [message, setMessage] = useState("");
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleConfirmPassword = (event: any) => {
    let { name, value } = event.target;
    if (value !== registerData.password) {
      setError("Mật khẩu không khớp");
    } else {
      setError("");
    }
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setRegisterData((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
    handleConfirmPassword(event);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      let res = await fetch("https://httpbin.org/post", {
        method: "POST",
        body: JSON.stringify({
          firstName: registerData.firstName,
          lastName: registerData.lastName,
          email: registerData.email,
          password: registerData.password,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setMessage("User created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto my-auto h-screen">
      <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="flex justify-between">
            <div>
              <h2 className="">
                <span className="text-yellow-300 font-bold">Pet</span>opia xin
                chào
              </h2>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl ">
                Đăng ký
              </h1>
            </div>
            <div>
              <p>Đã có tài khoản?</p>
              <a className="text-yellow-600" href="/login">
                Đăng nhập
              </a>
            </div>
          </div>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            {/* Họ */}
            <div>
              <label
                htmlFor="text"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Họ của bạn
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 "
                placeholder="Nguyễn Văn"
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Tên */}
            <div>
              <label
                htmlFor="text"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Tên của bạn
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 "
                placeholder="A"
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Email của bạn
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 "
                placeholder="name@company.com"
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Mật khẩu */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Mật khẩu
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Nhập lại mật khẩu
              </label>
              <input
                type="password"
                name="repeatPassword"
                id="repeatPassword"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                onChange={handleInputChange}
                required
              />
              {error && <span className="text-sm text-red-500">{error}</span>}
            </div>

            <button
              type="submit"
              className="w-full text-black bg-yellow-300 hover:bg-primary-700 focus:ring-4 focus:outline-none 
                focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Đăng ký
            </button>
            <p>{message}</p>
            <button className="w-full content-end py-2 border flex border-slate-200  rounded-lg text-slate-700  hover:border-slate-400  hover:text-slate-900  hover:shadow transition duration-150">
              <div className="flex gap-2 mx-auto">
                <img
                  className="w-6 h-6"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  loading="lazy"
                  alt="google logo"
                />
                <span className="">Đăng nhập với Google</span>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
