import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { CartContext } from "../../Context/CartContext";
import { ordersContext } from "./../../Context/OrdersContext";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

export default function CashOrder() {
  let { cashOrderCart } = useContext(ordersContext);
  let { cartId } = useContext(CartContext);
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  let validationSchema = yup.object().shape({
    details: yup
      .string()
      .min(12, "min length is 12 letter")
      .max(30, "max length is 30 letter")
      .required("details required"),

    phone: yup
      .string()
      .required()
      .matches(/^01[0125][0-9]{8}$/, "Please Enter Egyption Number"),

    city: yup.string().min(3).max(12).required("city Name required"),
  });

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: () => {
      submitCashOrder(cartId);
    },
  });

  async function submitCashOrder(cartId) {
    setLoading(true);
    try {
      await cashOrderCart(cartId, formik.values);
    } finally {
      setLoading(false);
      navigate("/allorders");
    }
  }

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="mx-auto max-w-2xl px-8 py-2"
      >
        <div className="group relative z-0 mb-5 w-full">
          <input
            type="text"
            name="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="details"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-emerald-600 focus:ring-0 focus:outline-none"
            placeholder=" "
          />
          <label
            htmlFor="details"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-emerald-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Enter Your Location Details
          </label>
          {formik.errors.details && formik.touched.details ? (
            <div className="rounded-lg p-2 text-sm text-red-800" role="alert">
              {" "}
              {formik.errors.details}
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
            Enter Your Phone
          </label>
          {formik.errors.phone && formik.touched.phone ? (
            <div className="rounded-lg p-2 text-sm text-red-800" role="alert">
              {" "}
              {formik.errors.phone}
            </div>
          ) : null}
        </div>

        <div className="group relative z-0 mb-5 w-full">
          <input
            type="text"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="city"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-emerald-600 focus:ring-0 focus:outline-none"
            placeholder=" "
          />
          <label
            htmlFor="city"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-emerald-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Enter Your City
          </label>
          {formik.errors.city && formik.touched.city ? (
            <div className="rounded-lg p-2 text-sm text-red-800" role="alert">
              {" "}
              {formik.errors.city}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="m-auto mx-auto my-2 block w-full rounded-lg bg-emerald-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-300 focus:outline-none sm:w-sm"
        >
          {loading ? <i className="fas fa-spinner fa-spin"></i> : `CashOrder`}
        </button>
      </form>
    </>
  );
}
