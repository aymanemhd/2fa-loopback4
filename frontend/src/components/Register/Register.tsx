import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

type RegisterProps = {
  onRegister: (email: string) => void;
};

function Register(props: RegisterProps) {
  const nav = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleRegister = () => {
    props.onRegister(email);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      firstname,
      lastname,
      username,
      email,
      organization,
      phoneNumber,
    };
    axios
      .post("http://[::1]:8000/register", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    nav("/activate");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 300 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -300 }}
      transition={{ duration: 1.5 }}
      className="bg-grey-lighter min-h-screen flex flex-col"
    >
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-2xl text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <motion.input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                placeholder="First Name"
                value={firstname}
                onChange={(event) => setFirstname(event.target.value)}
                whileHover={{ scale: 1.05 }}
                whileFocus={{ scale: 1.05 }}
              />
              <motion.input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                placeholder="Last Name"
                value={lastname}
                onChange={(event) => setLastname(event.target.value)}
                whileHover={{ scale: 1.05 }}
                whileFocus={{ scale: 1.05 }}
              />
            </div>
            <motion.input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              placeholder="User Name"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              whileHover={{ scale: 1.05 }}
              whileFocus={{ scale: 1.05 }}
            />
            <motion.input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              whileHover={{ scale: 1.05 }}
              whileFocus={{ scale: 1.05 }}
            />
            <div className="flex justify-center">
              <div className="flex-auto w-32">
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  value="+212"
                  readOnly
                />
              </div>
              <motion.div
                className="flex-auto w-64"
                whileHover={{ scale: 1.05 }}
                whileFocus={{ scale: 1.05 }}
              >
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                />
              </motion.div>
            </div>
            <motion.input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              placeholder="Organization"
              value={organization}
              onChange={(event) => setOrganization(event.target.value)}
              whileHover={{ scale: 1.05 }}
              whileFocus={{ scale: 1.05 }}
            />
            <div className="flex justify-center">
              <motion.button
                type="submit"
                className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                onClick={handleRegister}
                whileHover={{ scale: 1.05 }}
              >
                Request a Confirmation Code
              </motion.button>
            </div>
          </form>
        </div>
        <div className="text-grey-dark mt-6"></div>
      </div>
    </motion.div>
  );
}

export default Register;
