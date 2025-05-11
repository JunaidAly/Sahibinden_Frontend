import React from "react";

function SessionsAndDevices() {
  return (
    <div className="max-w-4xl w-full mx-auto font-poppins">
      <h1 className="text-xl font-medium text-black">
        Active Sessions and Trusted Devices
      </h1>
      <div className="shadow-custom-right rounded-lg w-full p-5 mt-5">
        <p className="text-lg text-black font-normal mb-4">
          All sessions you have opened with mhagdp1542@gmail.com are listed
          below. For your security, we recommend that you close open sessions on
          devices you are not currently using.
        </p>

        <h1 className="text-xl font-semibold text-black">My Active Device</h1>

        <div className="grid grid-cols-3 gap-1 shadow-custom-diagonal p-5 rounded-lg mt-5">
          <div className="flex gap-3 items-center">
            <img src="/assets/desktop.png" className="w-12 h-12" />
            <h3 className="font-normal text-black text-lg">Windows</h3>
          </div>

          <div className="flex gap-3 items-center">
            <img src="/assets/chrome.png" className="w-12 h-12" />
            <h3 className="font-normal text-black text-lg">Google Chrome</h3>
          </div>

          <div className="flex ml-10 items-center">
            <h3 className="font-normal text-black text-lg">Islamabad</h3>
          </div>
        </div>

        <h1 className="text-xl mt-4 font-semibold text-black">
          My Other Devices
        </h1>

        <div className="grid grid-cols-3 gap-1 shadow-custom-diagonal p-5 rounded-lg mt-5">
          <div className="flex gap-3 items-center">
            <img src="/assets/desktop.png" className="w-12 h-12" />
            <h3 className="font-normal text-black text-lg">Windows</h3>
          </div>

          <div className="flex gap-3 items-center">
            <img src="/assets/chrome.png" className="w-12 h-12" />
            <h3 className="font-normal text-black text-lg">Google Chrome</h3>
          </div>

          <div className="flex ml-10 items-center">
            <h3 className="font-normal text-black text-lg">Punjab</h3>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1 shadow-custom-diagonal p-5 rounded-lg mt-5">
          <div className="flex gap-3 items-center">
            <img src="/assets/desktop.png" className="w-12 h-12" />
            <h3 className="font-normal text-black text-lg">Windows</h3>
          </div>

          <div className="flex gap-3 items-center">
            <img src="/assets/chrome.png" className="w-12 h-12" />
            <h3 className="font-normal text-black text-lg">Google Chrome</h3>
          </div>

          <div className="flex ml-10 items-center">
            <h3 className="font-normal text-black text-lg">Punjab</h3>
          </div>
        </div>
      </div>

      <div className="w-full flex gap-2 mt-3 justify-end">
        <button
          type="button"
          className="px-5 py-2 mt-2 bg-white text-[#1544AB] border border-[#1544AB] font-medium rounded-full"
        >
          Logout
        </button>
        <button
          type="button"
          className="px-5 py-2 mt-2 bg-[#1544AB] text-white font-medium rounded-full"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default SessionsAndDevices;
