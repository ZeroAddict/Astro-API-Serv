import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Body from "./components/Body";
import SideBar from "./components/SideBar";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';

function App() {
  const [data, setData] = useState(null); // Keep it null to properly check for loading state
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [apod, setApod] = useState({}); // Start as an empty object

  const handleDateChange = (selectedDates) => {
    setDate(selectedDates[0]);
    getApod(selectedDates[0]);
  };

  const getApod = async (date) => {
    const response = await fetch(`http://localhost:3001/apod?date=${date.toISOString().split('T')[0]}`);
    const apodata = await response.json();
    setApodata(apodata);
  };

  function handleToggleMdl() {
    setShowModal(!showModal);
  }

  useEffect(() => {
    async function getAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;

      const today = new Date().toDateString();
      const localKey = `NASA-${today}`;
      
      if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey));
        setData(apiData);
        console.log('cached APOD');
        return;
      }
      
      localStorage.clear()

      try {
        const res = await fetch(url);
        const apiData = await res.json();
        localStorage.setItem(localKey, JSON.stringify(apiData));
        setApodata(apiData);
        console.log('APOD from NASA API');
      } catch (error) {
        console.log(error.message);
      }
    }
    getAPIData();
  }, []);

  return (
    <>
      {apodata ? (
        <Body apodata={apodata} />
      ) : (
        <div className="loading">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && (
        <SideBar apodata={apodata} handleToggleMdl={handleToggleMdl} />
      )}
      {apodata && (
        <Footer apodata={apodata} handleToggleMdl={handleToggleMdl} />
      )}

      {/* Ensure proper conditional rendering for date picker and APOD */}
      {apod && apod.hdurl ? (
        <div className="max-w-md mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Astronomy Picture of the Day</h1>
          <Flatpickr
            value={date}
            onChange={handleDateChange}
            options={{
              altInput: true,
              altFormat: 'F j, Y',
              dateFormat: 'Y-m-d',
            }}
          />
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">{apod.title}</h2>
            <img src={apod.hdurl} alt={apod.title} className="w-full mb-4" />
            <p className="text-gray-600">{apod.explanation}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default App;
