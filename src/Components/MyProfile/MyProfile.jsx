import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import LoadingAndErrorHandler from "../LoadingAndErrorHandler/LoadingAndErrorHandler";

export default function MyProfile() {
  const { userToken, setuserToken } = useContext(authContext);
  const [accountBtn, setAccountBtn] = useState(false);
  const [ApiError, setApiError] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  function setErrorNull() {
    setApiError("");
  }

  async function submitData(loginObj) {
    setIsLoading(true);
    await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, loginObj)
      .then((res) => {
        setIsLoading(false);
        if (res.data.message) {
        }
        setErrorNull();
        localStorage.setItem("userToken", res.data.token);
        setuserToken(res.data.token);
        navigate("/");
      })
      .catch((res) => {
        setApiError(res.response.data.message);
        setIsLoading(false);
      });
  }

  let validationSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("Email is required"),

    password: yup
      .string()
      .min(6, "Min Length is 6")
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: submitData,
  });

  return (
    <div className="p-6">
      <h2 className="mb-6 text-center text-3xl font-bold text-emerald-700">
        My Profile 🖤
      </h2>

      <div className="mx-auto grid cursor-pointer grid-cols-1 justify-center gap-6 sm:grid-cols-2 md:grid-cols-3">
        <Link
          to={"/allorders"}
          className="rounded-lg border border-gray-200 p-8 text-center shadow-md transition-transform hover:scale-105"
        >
          <h3 className="text-xl font-semibold text-gray-800 md:text-2xl">
            Your Orders
          </h3>
        </Link>

        <Link
          to={"/accountdetails"}
          className="rounded-lg border border-gray-200 p-8 text-center shadow-md transition-transform hover:scale-105"
        >
          <h3 className="text-xl font-semibold text-gray-800 md:text-2xl">
            Login & Security
          </h3>
        </Link>

        <Link
          to={"/adresses"}
          className="rounded-lg border border-gray-200 p-8 text-center shadow-md transition-transform hover:scale-105"
        >
          <h3 className="text-xl font-semibold text-gray-800 md:text-2xl">
            Your Adresses
          </h3>
        </Link>
      </div>
    </div>
  );
}
