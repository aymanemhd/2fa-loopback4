import { ChangeEvent, SetStateAction, useEffect, useState } from "react";

interface CountryCode {
  name: string;
  dialCode: string;
}
interface CountriesProps {
  onPhoneNumberChange: (value: SetStateAction<string>) => void;
}

function Countries(props: CountriesProps) {
  const [countryCodes, setCountryCodes] = useState<CountryCode[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState<CountryCode>({
    name: "",
    dialCode: "",
  });
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

  return (
    <div>
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
    </div>
  );
}

export default Countries;
