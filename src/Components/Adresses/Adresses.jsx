import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

export default function AddressManager() {
  const [addresses, setAddresses] = useState([]);
  const [ApiError, setApiError] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const [IsLoadingDel, setIsLoadingDel] = useState(false);
  const [currentIdBtn, setCurrentIdBtn] = useState("");

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  const baseAPI = "https://ecommerce.routemisr.com/api/v1/addresses";

  function addAddress(addressData) {
    setIsLoading(true);
    axios
      .post(baseAPI, addressData, { headers })
      .then((res) => {
        setCurrentIdBtn()
        setApiError("");
        setIsLoading(false);
        toast.success(res.data.message);
        allAddresses();
        return res;
      })
      .catch((err) => {
        setIsLoading(false);
        return err;
      });
  }
  function allAddresses() {
    axios
      .get(baseAPI, { headers })
      .then((res) => {
        setApiError("");
        setAddresses(res.data.data);
        return res;
      })
      .catch((err) => {
        return err
      });
  }

  function deleteAddress (id)  {
    setCurrentIdBtn(id)
    setIsLoadingDel(true);
    axios.delete(`${baseAPI}/${id}`, { headers })
    .then((res) => {
      toast.success(res.data.message);
      setIsLoadingDel(false);
      setApiError("");
      allAddresses();
      return res;
    })
    .catch((err) => {
      setIsLoadingDel(false);
      return err 
    })
  };

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      allAddresses();
    }
  }, []);


  let validationSchema =  Yup.object().shape({
    name: Yup.string().required("Name is required"),
    details: Yup.string().required("Details are required"),
    phone: Yup.string()
      .matches(/^(01)[0-9]{9}$/, "Invalid phone number")
      .required("Phone is required"),
    city: Yup.string().required("City is required"),
  })

  const formik = useFormik({
    initialValues: { name: "", details: "", phone: "", city: "" },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      addAddress(values);
      resetForm();
    },
  });

  return (
    <div>
      <h1 className="text-center font-[700] text-2xl">Manage Addresses</h1>

      <form
        onSubmit={formik.handleSubmit}
        className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg"
      >
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            {...formik.getFieldProps("name")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.name}
            </div>
          )}
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="details"
            placeholder="Details"
            {...formik.getFieldProps("details")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none"
          />
          {formik.touched.details && formik.errors.details && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.details}
            </div>
          )}
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            {...formik.getFieldProps("phone")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none"
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.phone}
            </div>
          )}
        </div>

        <div className="mb-6">
          <input
            type="text"
            name="city"
            placeholder="City"
            {...formik.getFieldProps("city")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none"
          />
          {formik.touched.city && formik.errors.city && (
            <div className="mt-1 text-sm text-red-500">
              {formik.errors.city}
            </div>
          )}
        </div>

        {ApiError && (
          <div className="text-md mx-auto mt-2 w-1/2 rounded-md border-2 border-red-600 p-2 text-center font-semibold text-black">
            {ApiError}
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-white transition duration-300 hover:bg-emerald-600"
        >
          {IsLoading ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            "Add Address"
          )}
        </button>
      </form>

      <ul className="space-y-4 p-6">
        {addresses?.length > 0 ? 
        <>
        {addresses?.map((address) => (
          <li
            key={address._id}
            className="flex items-center justify-between rounded-lg bg-gray-50 p-4 shadow-sm"
          >
            <div>
              <p className="font-semibold">{address.name}</p>
              <p className="text-gray-600"><span className="font-[600]">Details:</span> {address.details}</p>
              <p className="text-gray-600">{address.city}</p>
              <p className="text-gray-600">{address.phone}</p>
            </div>
            <button
              onClick={() => deleteAddress(address._id)}
              className="rounded-lg bg-emerald-500 px-3 py-1 text-sm font-medium text-white transition duration-300 hover:bg-emerald-600"
            >
              {IsLoadingDel && currentIdBtn == address._id ? <i className="fas fa-spinner fa-spin"></i> : "Delete"}
              
            </button>
          </li>
        ))}
        </> : 
        <p className="p-8 font-bold text-2xl text-center"> Your List Empty.. </p>
        }
      </ul>
    </div>
  );
}
