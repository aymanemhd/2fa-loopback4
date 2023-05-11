import { Link } from "react-router-dom";
import { ChangeEvent, FormEvent, SetStateAction, useEffect, useState } from "react";
import axios from "axios";

interface CountryCode {
  name: string;
  dialCode: string;
}

type RegisterProps = {
  onRegister: (email: string) => void;
}

function Register(props: RegisterProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCodes, setCountryCodes] = useState<CountryCode[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState<CountryCode>({name: "",dialCode: "",});
  const [contryv, setContryv] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    async function fetchCountryCodes() {
      const response = await fetch("https://restcountries.com/v2/all");
      const data = await response.json();
      const countryCodes = data.map(
        (country: { name: string; callingCodes: string[] }) => ({
          name: country.name,
          dialCode: `+${country.callingCodes[0]}`,
        })
      );
      setCountryCodes(countryCodes);
      setSelectedCountryCode(countryCodes[0]);
    }
    fetchCountryCodes();
  }, []);


  const handleRegister = () => {
    props.onRegister(email);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      username,
      email,
      organization,
      phoneNumber,
    };
    axios.post("http://[::1]:8000/register", data)
  .then((res) => { 
    console.log(res.data);
  }) 
  .catch(err => { 
    console.error(err);
  })
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
            <select
        id="countries"
        className="block border border-grey-light w-full p-3 rounded mb-4"
        value={selectedCountryCode.dialCode}
        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
          const selectedDialCode = event.target.value;
          const selectedCountry = countryCodes.find(
            (country) => country.dialCode === selectedDialCode
          );
          if (selectedCountry) {
            setSelectedCountryCode(selectedCountry);
          }
        }}
      >
        <option value="">Choose countries</option>
        {countryCodes.map((country, index) => (
          <option key={index} value={country.dialCode}>
            {country.name} ({country.dialCode})
          </option>
        ))}
      </select>

      <input
        type="tel"
        placeholder={selectedCountryCode.dialCode}
        className="block border border-grey-light w-full p-3 rounded mb-4"
        value={phone}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setPhone(event.target.value);
        }}
      />
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              placeholder="Organisation"
              value={organization}
              onChange={(event) => setOrganization(event.target.value)}
            />
            <div className="flex justify-center">
            <Link to="/activate">
              <button
                type="submit"
                className="text-white bg-green-600 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                onClick={handleRegister}
              >
                Request a Confirmation code
              </button>
              </Link>
            </div>
          </form>
        </div>

        <div className="text-grey-dark mt-6"></div>
      </div>
    </div>
  );
}

export default Register;
