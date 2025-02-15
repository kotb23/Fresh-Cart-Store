import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";

export default function Login() {
  let navigate = useNavigate();
  const [ApiError, setApiError] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const { setuserToken } = useContext(authContext);

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
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="mx-auto max-w-2xl px-8 py-2"
      >
        <div className="group relative z-0 mb-5 w-full">
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-emerald-600 focus:ring-0 focus:outline-none"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-emerald-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Enter Your Email
          </label>
          {formik.errors.email && formik.touched.email ? (
            <div className="rounded-lg p-2 text-sm text-red-800" role="alert">
              <span className="font-medium">Danger alert!</span>{" "}
              {formik.errors.email}
            </div>
          ) : null}
        </div>

        <div className="group relative z-0 mb-5 w-full">
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="password"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-emerald-600 focus:ring-0 focus:outline-none"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-emerald-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Enter Your Password
          </label>
          {formik.errors.password && formik.touched.password ? (
            <div className="rounded-lg p-2 text-sm text-red-800" role="alert">
              <span className="font-medium">Danger alert!</span>{" "}
              {formik.errors.password}
            </div>
          ) : null}
        </div>

        {ApiError && (
          <div className="text-md mx-auto mt-2 w-1/2 rounded-md border-2 border-red-600 p-2 text-center font-semibold text-black">
            {ApiError}
          </div>
        )}
        <button
          type="submit"
          className="m-auto mx-auto my-2 block w-full rounded-lg bg-emerald-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-300 focus:outline-none sm:w-sm"
        >
          {IsLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
        </button>
        <div className="mx-auto">
          <h6 className="text-center">
            New to FrechCart?{" "}
            <Link to={"/register"}>
              {" "}
              <span className="font-semibold underline">Register</span> now
            </Link>
          </h6>

          <h6 className="text-center">
            Forget Password?{" "}
            <Link to={"/forgetpassword"}>
              {" "}
              <span className="font-semibold underline">Forget Password</span>
            </Link>
          </h6>
        </div>
      </form>
    </>
  );
}