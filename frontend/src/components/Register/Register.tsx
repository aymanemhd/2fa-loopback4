import { Link } from "react-router-dom";
import { FormEvent, SetStateAction, useState } from "react";
import axios from "axios";
import Countries from "../Countries/Countries";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      username,
      email,
      organization,
      phoneNumber,
    };

    try {
      const response = await axios.post("http://[::1]:8000/register", data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-2xl text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              placeholder="User Name"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Countries
              onPhoneNumberChange={(value: SetStateAction<string>) => setPhoneNumber(value)}
            />
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              placeholder="Organisation"
              value={organization}
              onChange={(event) => setOrganization(event.target.value)}
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="text-white bg-green-600 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
              >
                Register
              </button>
            </div>
          </form>
        </div>

        <div className="text-grey-dark mt-6"></div>
      </div>
    </div>
  );
}

export default Register;
