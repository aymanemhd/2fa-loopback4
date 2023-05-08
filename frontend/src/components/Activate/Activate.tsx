

function Activate() {
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <div className="bg-white px-6 py-8 rounded shadow-2xl text-black w-full">
        <h1 className="mb-8 text-3xl text-center">Activate</h1>
        <input
          type="text"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          placeholder="Email"
        />
       
        <input
          type="text"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          placeholder="Code"
        />
        <div className="flex justify-center">
          <button
            type="button"
            className="text-white bg-green-600 hover:bg-green-600  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
          >
            Activate the account
          </button>
        </div>
      </div>

      <div className="text-grey-dark mt-6"></div>
    </div>
  </div>
  )
}

export default Activate