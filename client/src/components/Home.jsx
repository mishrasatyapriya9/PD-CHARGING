import { useNavigate } from "react-router-dom";
import laptopImg from "../assets/laptop.jpg";
import phoneImg from "../assets/mobile.jpg";
import tabletImg from "../assets/tablet.jpg";

const Home = () => {
  const navigate = useNavigate();

  const handleCardClick = (type) => {
    navigate(`/devices/${type}`);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col space-y-4 md:space-y-6 lg:space-y-8">
        <div
          onClick={() => handleCardClick("laptop")}
          className="bg-gray-200 p-4 rounded md:p-6 lg:p-8 h-80 flex flex-col justify-between cursor-pointer"
        >
          <img
            src={laptopImg}
            alt="Laptop"
            className="w-full h-48 object-contain"
          />
          <h2 className="text-xl font-bold mt-2 md:text-2xl lg:text-3xl">
            Laptop
          </h2>
        </div>

        <div
          onClick={() => handleCardClick("mobile")}
          className="bg-gray-200 p-4 rounded md:p-6 lg:p-8 h-80 flex flex-col justify-between cursor-pointer"
        >
          <img
            src={phoneImg}
            alt="Phone"
            className="w-full h-48 object-contain"
          />
          <h2 className="text-xl font-bold mt-2 md:text-2xl lg:text-3xl">
            Phone
          </h2>
        </div>

        <div
          onClick={() => handleCardClick("tablet")}
          className="bg-gray-200 p-4 rounded md:p-6 lg:p-8 h-80 flex flex-col justify-between cursor-pointer"
        >
          <img
            src={tabletImg}
            alt="Tablet"
            className="w-full h-48 object-contain"
          />
          <h2 className="text-xl font-bold mt-2 md:text-2xl lg:text-3xl">
            Tablet
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
