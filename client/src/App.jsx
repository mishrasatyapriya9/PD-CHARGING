import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPopup from "./components/SearchPopup";
import Home from "./components/Home";
import DeviceDetails from "./components/DeviceDetails";
import AdminPanel from "./components/AdminPanel";
import DeviceList from "./components/DeviceList";
const App = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-gray-800 text-white p-4 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-xl font-bold mb-2 md:mb-0">
            Device Compatibility Checker
          </h1>
          <div className="flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
            <button
              onClick={() => setSearchOpen(true)}
              className="bg-blue-500 px-4 py-2 rounded w-full md:w-auto"
            >
              Search
            </button>
            <a
              href="/admin"
              className="bg-red-500 px-4 py-2 rounded w-full md:w-auto"
            >
              Admin Panel
            </a>
          </div>
        </header>

        {/* Search Popup */}
        <SearchPopup isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

        <main className="p-4">
          <Routes>
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/device/:id" element={<DeviceDetails />} />
            <Route path="/devices/:type" element={<DeviceList />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
