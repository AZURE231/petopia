import axios from "axios";
import { useEffect, useState } from "react";
import { IUserRegister } from "@/interface/IUserRegister";

export default function RegisterApi({
  firstname,
  lastname,
  email,
  password,
}: IUserRegister) {
  const url = `https://48af-203-205-32-159.ngrok-free.app/api/Authentication/Register`;
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsError("");
      setIsLoading(true);
      try {
        const data = {
          firstName: firstname,
          lastName: lastname,
          email: email,
          password: password,
          googleRecaptchaToken: "stinky",
        };
        axios
          .request({
            method: "POST",
            data: data,
            url: url,
          })
          .then((response) => {
            setData(response.data);
          });
      } catch (error: any) {
        setIsError(error.message);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return [{ data, isLoading, isError }];
}
