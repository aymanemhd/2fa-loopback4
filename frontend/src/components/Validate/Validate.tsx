import { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";

function Validate() {
  const [otpCode, setOtpCode] = useState("");

  useEffect(() => {
    axios
      .post("http://[::1]:8000/otp/validateotp")
      .then((res) => {
        const { otpCode } = res.data;
        setOtpCode(otpCode);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error retrieving OTP code:", error);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 1.5 }}
      className="bg-grey-lighter min-h-screen flex flex-col"
    >
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-2xl text-black w-full">
          <h1 className="mb-2 text-3xl text-center">Validate</h1>
          <h2 className="mb-8 text-2xl text-center">
            Validate OTP Code By QR Code
          </h2>
          <div className="flex justify-center">
            <QRCodeSVG value={otpCode} />
          </div>
        </div>
        <div className="text-grey-dark mt-6"></div>
      </div>
    </motion.div>
  );
}

export default Validate;
