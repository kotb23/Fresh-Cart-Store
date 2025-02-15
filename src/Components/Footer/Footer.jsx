import React from "react";
import amazonLogo from "../../assets/Payment_Methods/amazon_card_cash_icon.svg";
import americanExpressLogo from "../../assets/Payment_Methods/amex-svgrepo-com.svg";
import mastercardLogo from "../../assets/Payment_Methods/mastercard_payment_icon.svg";
import paypalLogo from "../../assets/Payment_Methods/payment_paypal_icon.svg";
import appStore from "../../assets/Payment_Methods/download-on-the-app-store.svg";
import googlePlay from "../../assets/Payment_Methods/google-play-badge.svg";

export default function Footer() {
  return (
    <footer className="mx-auto min-w-full border-t border-gray-200/60 bg-gray-100 px-6 pt-5 pb-12">
      <div className="">
        <div className="grid grid-cols-12 border-b-2 border-gray-300/90 px-8 py-4">
          <div className="col-span-12">
            <h2 className="text-xl font-normal md:ps-0.5">
              Get the FreshCart app
            </h2>
            <p className="text-justify text-gray-600">
              We will send you a link, open it on your phone to download the
              app.
            </p>
          </div>

          <div className="col-span-12 grid grid-cols-12 justify-start gap-y-2 py-2 ps-2">
            <input
              type="email"
              placeholder="Email .."
              className="col-span-12 rounded-md border border-gray-300 px-3 py-1 focus:ring-2 focus:ring-green-500 focus:outline-none md:col-span-9 lg:ms-6 xl:ms-0"
            />
            <button className="col-span-12 mx-auto block w-fit rounded-md bg-green-500 px-6 py-1 text-white hover:bg-green-600 md:col-span-3 md:col-start-10 md:inline xl:col-start-10 xl:col-end-12 xl:grid-cols-subgrid">
              Share App Link
            </button>
          </div>
        </div>

        <div className="gird grid-cols-12 border-b-2 border-gray-300/90 text-gray-600">
          <div className="grid grid-cols-12">
            <div className="col-span-12 mx-auto grid grid-cols-12 items-center gap-3 md:grid-cols-10 xl:col-span-5 xl:justify-items-start">
              <h6 className="col-span-12 mx-auto w-fit pt-2 text-center text-xl font-light md:col-span-2">
                Payment Partners
              </h6>

              <div className="col-span-12 grid grid-cols-12 justify-items-center gap-2 md:col-span-8">
                <figure className="col-span-3">
                  <img src={amazonLogo} alt="Amazon Pay" className="" />
                </figure>

                <figure className="col-span-3">
                  <img
                    src={americanExpressLogo}
                    alt="American Express"
                    className=""
                  />
                </figure>

                <figure className="col-span-3">
                  <img src={mastercardLogo} alt="Mastercard" className="" />
                </figure>

                <figure className="col-span-3">
                  <img src={paypalLogo} alt="PayPal" className="" />
                </figure>
              </div>
            </div>

            <div className="col-span-12 grid grid-cols-12 items-center justify-items-center gap-x-1.5 xl:col-span-7 xl:col-start-8">
              <h6 className="col-span-12 text-xl font-medium md:col-span-6 lg:col-span-4 lg:col-start-2 xl:col-span-5 xl:col-start-1 xl:justify-self-end">
                Get deliveries with FreshCart
              </h6>

              <div className="col-span-12 grid grid-cols-2 gap-x-2 md:col-span-6 lg:col-span-7 lg:col-start-6 xl:justify-self-start">
                {" "}
                <figure className="col-span-1">
                  <img src={googlePlay} alt="Google Play" className="" />
                </figure>
                <figure className="col-span-1">
                  <img src={appStore} alt="App Store" className="" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

{
  /* <nav className="bg-emerald-500 py-5 fixed inset-x-0 bottom-0 text-center text-white font-bold">
          Footer
        </nav> */
}
