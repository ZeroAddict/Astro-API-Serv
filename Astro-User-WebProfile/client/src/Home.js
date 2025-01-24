import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import CardItem from "../CardItem";
import 'flatpickr/dist/themes/material_green.css';
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { google_search } from "google_search";
import { useApi } from "@react-api/core";
import firestore from firestore;
import Flatpickr from 'react-flatpickr';
import Footer from "./components/Footer";
import Main from "./components/Main";
import SideBar from "./components/SideBar";
import Filters from "../Filters";

const astronomyCoursesData = [
  {
    id: 1,
    title: "Introduction to Astronomy",
    description:
      "This course explores the fundamentals of astronomy...",
    imageUrl: "https://source.unsplash.com/astronomy",
    navigationAPI: "https://www.google.com/maps/search/...", // Placeholder for actual API URL
    satelliteInfoAPI: "https://api.nasa.gov/planetary/satellites", // Placeholder 
    simulationAPI: "https://stellarium-web.org/api/", // Placeholder
  },
  {
    id: 2,
    title: "Solar System Exploration",
    description: "This course delves into the wonders of our solar system...",
    imageUrl: "https://source.unsplash.com/solar-system",
    navigationAPI: "", // No specific navigation API for this course yet
    satelliteInfoAPI: "https://api.nasa.gov/planetary/satellites",
    simulationAPI: "https://solarsystem.nasa.gov/glenn-nasa/webb-space-telescope/index.html",
  },
  // More astronomy courses to be added here
];

const Home = () => {
  const [stack, setStack] = useState(astronomyCoursesData);
  const [swiped, setSwiped] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState("");
  const [showCourses, setShowCourses] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);

  const rotate = useTransform(cardX, [-300, 0, 300], [-50, 0, 50]);
  const opacity = useTransform(cardX, [-300, 0, 300], [0, 1, 0]);

  useEffect(() => {
    if (stack.length === 0) {
      setStack(astronomyCoursesData);
    }
  }, [stack]);

  const onSwipe = (direction) => {
    // Handle matching/disliking logic here (e.g., record swipe in database)
    if (direction === "right") {
      setShowCourses(true);
      setTimeout(() => setShowCourses(false), 2500);
    }
    setStack((prevStack) => prevStack.slice(1));
    setSwipeDirection(direction);
    setSwiped(true);
  };
 
  const handleMatch = () => {
    onSwipe("right");
  };

  const handleDislike = () => {
    onSwipe("left");
  };

  const handleNavigation = async (course) => {
    if (course.navigationAPI) {
      window.open(course.navigationAPI, "_blank"); // Open navigation app in a new tab
    } else {
      const searchTerm = "directions to learn " + course.title.split(" ")[1];
      const results = await google_search(searchTerm);
      console.log("Navigation results:", results); // Display or use the search results
    }
  };

  const fetchSatelliteInfo = useApi(async (course) => {
    if (course.satelliteInfoAPI) {
      const response = await fetch(course.satelliteInfoAPI);
      const data = await response.json();
      return data;
    }
    return null;
  }, []);

  const handleSatelliteInfo = async (course) => {
    const satelliteData = await fetchSatelliteInfo.invoke(course);
    if (satelliteData) {
      console.log("Satellite information:", satelliteData); // Use or display the data
    } else {
      const searchTerm = "satellites around " + course.title.split(" ")[1];
      const results = await google_search(searchTerm);
      console.log("Satellite information:", results); // Display or use the search results
    }
  };

  const handleSimulation = (course) => {
    if (course.simulationAPI) {
      window.open(course.simulationAPI, "_blank"); // Open simulation in a new tab
    }
  };

const handleCardSelect = (course) => {
  setSelectedCourse(course); // Update selected course state
  // Add functionality to display details of the selected course
  console.log("Selected course:", course); // For development purposes
};

// Additional functionalities for the selected course
const handleShowNavigation = async (course) => {
  await handleNavigation(course);
};

const handleShowSatelliteInfo = async (course) => {
  await handleSatelliteInfo(course);
};

const handleShowSimulation = (course) => {
  handleSimulation(course);
};

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    // Filter courses based on search text
    const filteredCourses = astronomyCoursesData.filter((course) =>
      course.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setStack(filteredCourses);
  };

// New component for AstronomyCourseCard
const AstronomyCourseCard = ({ course }) => {
  // ... display course details and potentially integrate with simulation APIs
  return (
<div className="card">
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      {/* Buttons or links to launch simulations */}
      {course.simulationAPI && (
        <button onClick={() => window.open(course.simulationAPI, "_blank")}>
          Launch Simulation
        </button>
      )}
    </div>  );
};

// component for Navigation or Satellite Information
const NavigationSatelliteInfo = (views) => {
  // Use NASA NEO APIs to fetch data
  const [neoData, setNeoData] = useState(null);

  useEffect(() => {
    const fetchNeoData = async () => {
      try {
        const response = await axios.get('https://api.nasa.gov/neo/rest/v1/feed?start_date=2024-01-01&end_date=2024-01-08&api_key=YOUR_NASA_API_KEY'); // Replace with your actual NASA API key
        setNeoData(response.data);
      } catch (error) {
        console.error("Error fetching NEO data:", error);
      }
    };

    fetchNeoData();
  }, []);
  return (
<div>
      <h3>Near-Earth Object Information</h3>
      {neoData && (
        <ul>
          {/* Display relevant NEO data from the API response */}
          {neoData.near_earth_objects && Object.keys(neoData.near_earth_objects).map((date) => (
            <li key={date}>
              <h4>{date}</h4>
              <ul>
                {neoData.near_earth_objects[date].map((neo) => (
                  <li key={neo.id}>{neo.name}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
   );
};

// Component for Navigation or Satellite Information
const NavigationSpaceXInfo = () => {
  // Use SpaceX APIs to fetch data
const [spaceXData, setSpaceXData] = useState({
    rockets: [],
    capsules: [],
    launches: [],
  });

  useEffect(() => {
    const fetchSpaceXData = async () => {
      try {
        const [rocketsResponse, capsulesResponse, launchesResponse] = await Promise.all([
          axios.get('https://api.spacexdata.com/v4/rockets'),
          axios.get('https://api.spacexdata.com/v4/capsules'),
          axios.get('https://api.spacexdata.com/v4/launches'),
        ]);

        setSpaceXData({
          rockets: rocketsResponse.data,
          capsules: capsulesResponse.data,
          launches: launchesResponse.data,
        });
      } catch (error) {
        console.error("Error fetching SpaceX data:", error);
      }
    };

    fetchSpaceXData();
  }, []); 
 
 return (
   <div>
      <h3>SpaceX Information</h3>
      <h4>Rockets:</h4>
      <ul>
        {spaceXData.rockets.map((rocket) => (
          <li key={rocket.id}>{rocket.name}</li>
        ))}
      </ul>
      <h4>Capsules:</h4>
      <ul>
        {spaceXData.capsules.map((capsule) => (
          <li key={capsule.id}>{capsule.serial}</li>
        ))}
      </ul>
      <h4>Launches:</h4>
      <ul>
        {spaceXData.launches.map((launch) => (
          <li key={launch.id}>{launch.name}</li>
        ))}
      </ul>
    </div>
  );
};


//  Component for Worldview Information
//  const NavigationWVInfo = () => {
  // Implement Worldview API integration here
//   return (
//     <div>
//       Display Worldview information
//     </div>
//   );
// };

 // Enter components for NASA Missions Information
const TrackingInfo = () => {
  const [nasaMissions, setNasaMissions] = useState([]);

  useEffect(() => {
    const fetchNasaMissions = async () => {
      try {
        const response = await axios.get('https://api.nasa.gov/planetary/apod?api_key=YOUR_NASA_API_KEY'); // Replace with your actual NASA API key
        setNasaMissions(response.data);
      } catch (error) {
        console.error("Error fetching NASA Missions data:", error);
      }
    };

    fetchNasaMissions();
  }, []);

  return (
    <div>
      <h3>NASA Missions Information</h3>
      {nasaMissions && (
        <div>
          {/* Display relevant mission data from the API response */}
          {/* Example: */}
          <p>{nasaMissions.explanation}</p>
          <img src={nasaMissions.url} alt={nasaMissions.title} />
        </div>
      )}
    </div>
  );
};
};


return (
    <div className="main">
      <div className="top">
        <div className="leftTop">
          <City className="topItem" />
          <Filters className="topItem" />
        </div>
        <img className="middleTop" src={bgImage} height="100px" />
        <div className="rightTop">
          <TextField
            className="homeTextField topItem"
            label="Search astronomy courses"
            variant="filled"
            sx={{ borderRadius: "5px", width: "100%", marginLeft: "auto" }}
            InputProps={{
              startAdornment: (
                <InputAdornment className="homeTextField" position="start">
                  <SearchIcon className="search-icon" />
                </InputAdornment>
),
              endAdornment: (
                <InputAdornment position="end">
                  {searchText && ( // Shows Clear button only if there is search text
                    <IconButton onClick={() => setSearchText('')}>
                      <ClearIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      <div className="bottom">
        <AnimatePresence>
          {/* For Hanndling the card stack and selected course(s) */}
          {stack.length > 0 && (
            <motion.div
              key={stack[0].id}
              className="card"
              style={{ x: cardX, y: cardY, rotate, opacity }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(event, info) => {
                if (Math.abs(info.point.x) > 100) {
                  const direction = info.point.x > 1000 ? "right" : "left";
                  onSwipe(direction);
                } else {
                  cardX.set(0);
                  cardY.set(0);
                }
              }}
              transition={{ duration: 0.2 }}
            >
              <div id="CardItemHolder">
                <CardItem
                  image={stack[0].imageUrl}
                  name={stack[0].title}
                  description={stack[0].description}
                  // ... other card item props
                  onPress={() => handleCardSelect(stack[0])} // Call handleCardSelect on card press
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {selectedCourse && (
          <div className="selected-course-details">
            <h2>{selectedCourse.title}</h2>
            <p>{selectedCourse.description}</p>
            {/* Display buttons or links for functionalities */}
            <button onClick={() => handleShowNavigation(selectedCourse)}>
              Show Navigation
            </button>
            <button onClick={() => handleShowSatelliteInfo(selectedCourse)}>
              Show Satellite Information
            </button>
            <button onClick={() => handleShowSimulation(selectedCourse)}>
              Show Simulation
            </button>
            {/* ... other details like payment etc*/}
          </div>
        )}
      </div>
    </div>
  );

export default Home;