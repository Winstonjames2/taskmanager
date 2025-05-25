import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSwipeable } from "react-swipeable";
import { MdArrowForward, MdArrowBack } from "react-icons/md";
import { useTranslation } from "react-i18next";

type WeatherData = {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
};


const WeatherCard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [index, setIndex] = useState(0);
  const { t }  = useTranslation();

  const cities = [
    { key: "Insein", query: "Insein,Yangon,MM" },
    { key: "Myawaddy", query: "Myawaddy,MM" },
    { key: "Hpa-An", query: "Hpa-An,MM" },
  ];

  const cityNameMap: Record<string, string> = {
    Insein: t("insein"),
    Myawaddy: t("myawaddy"),
    "Hpa-An": t("hpa-an"),
  };

  const fetchWeather = async () => {
    try {
      const apiKey = "a2e745d959b377a33aad73b1fc4d5a11";
      const results = await Promise.all(
        cities.map((city) =>
          axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city.query}&appid=${apiKey}&units=metric`
          )
        )
      );
      setWeatherData(results.map((res) => res.data));
    } catch (err) {
      console.error(t('weatherFetch_error'), err);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setIndex((prev) => (prev + 1) % weatherData.length),
    onSwipedRight: () =>
      setIndex((prev) => (prev === 0 ? weatherData.length - 1 : prev - 1)),
    trackMouse: true,
  });

  if (weatherData.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="text-gray-500">{t('loadingWeather')}</span>
      </div>
    );
  }

  return (
    <div
      {...swipeHandlers}
      className="relative w-full max-w-md mx-auto overflow-hidden"
    >
      {/* Indicators */}
      <div className="flex justify-center mt-2 mb-4 gap-2">
        {weatherData.map((_, i) => (
          <div
        key={i}
        className={`w-2 h-2 rounded-full ${
          i === index ? "bg-green-600" : "bg-gray-300"
        }`}
          ></div>
        ))}
      </div>
      {/* Carousel Track */}
      <div
        className="flex transition-transform duration-500 ease-in-out "
        style={{
          transform: `translateX(-${index * 100}%)`,
          width: `${weatherData.length * 33}%`,
        }}
      >
       
        {weatherData.map((weather, i) => (
          <div
            key={i}
            className="w-full flex-shrink-0 flex justify-center items-center"
            style={{ minWidth: "100%" }}
          >
            <div className="bg-white w-full mx-2 p-4 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-lg font-bold text-center text-green-800 mb-2">
                {cityNameMap[weather.name] || weather.name}
              </h2>
              <div className="flex flex-col items-center">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  className="w-16 h-16"
                />
                <p className="text-center text-gray-700 capitalize mt-2">
                  {weather.weather[0].description}
                </p>
                <p className="text-center text-gray-700 capitalize mt-2">
                   {t('temperature')}: {weather.main.temp}°C
                </p>
                <p className="text-center text-gray-500 capitalize mt-2">
                  {t('humidity')}: {weather.main.humidity}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4 px-6  mb-4 ">
        <button
          onClick={() =>
            setIndex((prev) => (prev === 0 ? weatherData.length - 1 : prev - 1))
          }
          className="bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 cursor-pointer"
        >
          <MdArrowBack className="text-xl text-white" />
        </button>
        <button
          onClick={() => setIndex((prev) => (prev + 1) % weatherData.length)}
          className="bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 cursor-pointer"
        >
          <MdArrowForward className="text-xl text-white" />
        </button>
      </div>

   
    </div>
  );
};

export default WeatherCard;
