import React, { useContext, useState } from "react";
import { JwtContext } from "./../../Context/JwtContext";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { authContext } from "../../Context/AuthContext";

export default function AccountDetails() {
  let { userName } = useContext(JwtContext);
  let { setuserToken } = useContext(authContext);
  const [ApiError, setApiError] = useState("");
  const [ApiErrorPass, setApiErrorPass] = useState("");
  const [ApiSuccess, setApiSuccess] = useState(false);
  const [ApiSuccessPass, setApiSuccessPass] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [IsLoadingPass, setIsLoadingPass] = useState(false);
  const [editOpenInfo, setEditOpenInfo] = useState(false);
  const [editOpenPass, setEditOpenPass] = useState(false);

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  async function updateUserData(editObj) {
    setApiError("");
    setIsLoading(true);
    return await axios
      .put(`https://ecommerce.routemisr.com/api/v1/users/updateMe/`, editObj, {
        headers,
      })
      .then((res) => {
        setApiSuccess(res.data.message);
        setIsLoading(false);
        formik.setValues({
          name: res.data.user.name,
          email: res.data.user.email,
          phone: formik.values.phone,
        });
        return res;
      })
      .catch((err) => {
        setIsLoading(false);
        setApiSuccess("");
        setApiError(err.response.data.errors.msg);
        return err;
      });
  }

  async function updateUserPassword(passObj) {
    setApiErrorPass("")
    setIsLoadingPass(true);
    return await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
        passObj,
        {
          headers,
        },
      )
      .then((res) => {
        setApiSuccessPass(res.data.message);
        setIsLoadingPass(false);
        setuserToken(res.data.token)
        localStorage.setItem("userToken" , res.data.token)
        formik2.resetForm()
        return res;
      })
      .catch((err) => {
        setIsLoadingPass(false);
        setApiSuccessPass("");
        setApiErrorPass(err.response.data.message);
        return err;
      });
  }

  let validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "Min Length is 3")
      .max(10, "Max Length is 10")
      .required("Name is required"),

    email: yup.string().email("Invalid Email").required("Email is required"),

    phone: yup
      .string()
      .required()
      .matches(/^01[0125][0-9]{8}$/, "Please Enter Egyption Number"),
  });

  let validationPassword = yup.object().shape({
    currentPassword: yup
      .string()
      .min(6, "Min Length is 6")
      .required("Name is required"),

    password: yup
          .string()
          .min(6, "Min Length is 6")
          .required("Password is required"),
    
        rePassword: yup
          .string()
          .required("rePassword Is Required")
          .oneOf([yup.ref("password")], "Not Matched With Password"),
  });

  let formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: updateUserData,
  });

  let formik2 = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema:validationPassword,
    onSubmit: updateUserPassword,
  });

  return (
    <>
      <section className="m-auto flex w-5/6 flex-col border border-gray-200 shadow lg:w-1/2">
        <div className="flex flex-col items-center justify-center">
          <h2 className="p-4 text-center text-3xl font-bold text-emerald-700">
            Edit Info
          </h2>
        </div>

        <div className="flex items-center justify-between p-3">
          <p className="text-gray-400">Name,Email,Phone</p>
          <button
            onClick={() => {
              setEditOpenInfo(!editOpenInfo);
            }}
            className="mb-3 cursor-pointer rounded-3xl border border-gray-400 px-8 py-2 hover:border-transparent hover:bg-gray-200"
          >
            Edit
          </button>
        </div>

        {editOpenInfo && (
          <div className="min-w-400px flex items-center justify-between bg-gray-100 p-6">
            <form
              onSubmit={formik.handleSubmit}
              className="mx-auto max-w-2xl px-8 py-2"
            >
              <div className="group relative z-0 mb-5 w-full">
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="name"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-emerald-600 focus:ring-0 focus:outline-none"
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-emerald-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
                >
                  Enter Your New Name
                </label>
                {formik.errors.name && formik.touched.name ? (
                  <div
                    className="rounded-lg p-2 text-sm text-red-800"
                    role="alert"
                  >
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>

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
                  Enter Your New Email
                </label>
                {formik.errors.email && formik.touched.email ? (
                  <div
                    className="rounded-lg p-2 text-sm text-red-800"
                    role="alert"
                  >
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>

              <div className="group relative z-0 mb-5 w-full">
                <input
                  type="tel"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="phone"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-emerald-600 focus:ring-0 focus:outline-none"
                  placeholder=" "
                />
                <label
                  htmlFor="phone"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-emerald-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
                >
                  Enter Your New Phone
                </label>
                {formik.errors.phone && formik.touched.phone ? (
                  <div
                    className="rounded-lg p-2 text-sm text-red-800"
                    role="alert"
                  >
                    {" "}
                    {formik.errors.phone}
                  </div>
                ) : null}
              </div>

              {ApiError && (
                <div className="text-md m-4 mx-auto rounded-md border-2 border-red-600 p-2 text-center font-semibold text-black">
                  {ApiError}
                </div>
              )}

              {ApiSuccess && (
                <div className="text-md m-4 mx-auto rounded-md border-2 border-emerald-600 p-2 text-center font-semibold text-black">
                  <span className="text-2xl font-bold text-emerald-700">
                    {ApiSuccess}
                  </span>

                  <h3 className="text-gray-700">
                    <span className="font-[600] text-black">Name:</span>{" "}
                    {formik.values.name}{" "}
                  </h3>
                  <h3 className="text-gray-700">
                    <span className="font-[600] text-black">Email:</span>{" "}
                    {formik.values.email}{" "}
                  </h3>
                  <h3 className="text-gray-700">
                    <span className="font-[600] text-black">Phone:</span>{" "}
                    {formik.values.phone}{" "}
                  </h3>
                </div>
              )}

              <button
                type="submit"
                className="m-auto mx-auto my-2 block w-full rounded-lg bg-emerald-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-300 focus:outline-none sm:w-sm"
              >
                {IsLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Update"
                )}
              </button>
            </form>
          </div>
        )}

        <div className="flex items-center justify-between p-3">
          <p className="text-gray-400">Password</p>
          <button
            onClick={() => {
              setEditOpenPass(!editOpenPass);
            }}
            className="mb-3 cursor-pointer rounded-3xl border border-gray-400 px-8 py-2 hover:border-transparent hover:bg-gray-200"
          >
            Edit
          </button>
        </div>

        {editOpenPass && (
          <div className="min-w-400px flex items-center p-6 justify-between bg-gray-100">
            <form
              onSubmit={formik2.handleSubmit}
              className="mx-auto max-w-2xl px-8 py-2"
            >

    <div className="group relative z-0 mb-5 w-full">
          <input
            type="password"
            name="currentPassword"
            value={formik2.values.currentPassword}
            onChange={formik2.handleChange}
            onBlur={formik2.handleBlur}
            id="currentPassword"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-emerald-600 focus:ring-0 focus:outline-none"
            placeholder=" "
          />
          <label
            htmlFor="currentPassword"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-emerald-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Enter Your CurrentPassword
          </label>
          {formik2.errors.currentPassword && formik2.touched.currentPassword ? (
            <div className="rounded-lg p-2 text-sm text-red-800" role="alert">
              {formik2.errors.currentPassword}
            </div>
          ) : null}
        </div>

        <div className="group relative z-0 mb-5 w-full">
          <input
            type="password"
            name="password"
            value={formik2.values.password}
            onChange={formik2.handleChange}
            onBlur={formik2.handleBlur}
            id="password"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-emerald-600 focus:ring-0 focus:outline-none"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-emerald-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Enter Your New Password
          </label>
          {formik2.errors.password && formik2.touched.password ? (
            <div className="rounded-lg p-2 text-sm text-red-800" role="alert">
              {formik2.errors.password}
            </div>
          ) : null}
        </div>

        <div className="group relative z-0 mb-5 w-full">
          <input
            type="password"
            name="rePassword"
            value={formik2.values.rePassword}
            onChange={formik2.handleChange}
            onBlur={formik2.handleBlur}
            id="rePassword"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-emerald-600 focus:ring-0 focus:outline-none"
            placeholder=" "
          />
          <label
            htmlFor="rePassword"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-emerald-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Enter Your rePassword
          </label>
          {formik2.errors.rePassword && formik2.touched.rePassword ? (
            <div className="rounded-lg p-2 text-sm text-red-800" role="alert">
              {formik2.errors.rePassword}
            </div>
          ) : null}
        </div>




              {ApiErrorPass && (
                <div className="text-md mx-auto m-4 rounded-md border-2 border-red-600 p-2 text-center font-semibold text-black">
                  {ApiErrorPass}
                </div>
              )}

              {ApiSuccessPass && (
                <div className="text-md mx-auto m-4  rounded-md border-2 border-emerald-600 p-2 text-center font-semibold text-black">
                  <span className="text-emerald-700 text-2xl font-bold">{ApiSuccessPass}</span>
                </div>
              )}

              <button
                type="submit"
                className="m-auto mx-auto my-2 block w-full rounded-lg bg-emerald-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-300 focus:outline-none sm:w-sm"
              >
                {IsLoadingPass ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Update Password"
                )}
              </button>
            </form>
          </div>
        )}
      </section>
    </>
  );
}