import { Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

type ActivateProps = {
  email: string;
};

function Activate(props: ActivateProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-2xl text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Activate</h1>
          <h3 className="mb-8 text-xl text-center"> {props.email}</h3>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="Code"
          />
          <div className="flex justify-center">
            <Link to="/validate">
              <button
                type="button"
                className="text-white bg-green-600 hover:bg-green-600  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
              >
                Activate the account
              </button>
            </Link>
            <button
              onClick={() => setIsModalOpen(!isModalOpen)}
              className="text-white bg-green-600 hover:bg-green-600  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
              type="button"
            >
              verify QRCode
            </button>
            {isModalOpen ? (
              <div className="fixed top-0 left-0 right-0 bottom-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex">
                <div className="relative bg-white rounded-lg w-full max-w-md mx-auto my-6 shadow-lg">
                  <div className="px-4 py-4">
                    <div className="flex justify-between items-center pb-2">
                      <h2 className="text-lg font-medium text-gray-900">
                        Verify QRCode
                      </h2>
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-600 hover:text-gray-900 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Close"
                      >
                        <svg
                          className="h-6 w-6 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path
                            className="heroicon-ui"
                            d="M6.7 5.3a1 1 0 0 0-1.4 1.4L10.6 12l-5.3 5.3a1 1 0 1 0 1.4 1.4L12 13.4l5.3 5.3a1 1 0 0 0 1.4-1.4L13.4 12l5.3-5.3a1 1 0 0 0-1.4-1.4L12 10.6l-5.3-5.3z"
                          />
                        </svg>
                      </button>
                    </div>
                    <QRCodeSVG value={value}  />
                    <input
                      type="text"
                      className="block border border-grey-light w-full p-3 rounded mb-4"
                      placeholder="Code"
                      value={value} 
                      onChange={(e) => setValue(e.target.value)}
                    />
                    <div className="mt-6">
                      <button
                        onClick={() => setIsModalOpen(false)}
                        type="button"
                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      >
                        Verify & Activate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activate;
