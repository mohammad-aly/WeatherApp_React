import React, { useState, useEffect } from "react";
import { IoApps } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import { IoLocationSharp } from "react-icons/io5";
import { MdSunny } from "react-icons/md";
import { TbWorldLatitude } from "react-icons/tb";
import { TbWorldLongitude } from "react-icons/tb";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import axios from "axios";

const Heading = ({ temp }) => {
  return (
    <div className="heading">
      <MdSunny />
      <p></p>
      <h2>
        {temp}
        <span
          style={{
            fontSize: "50px",
            fontWeight: "300",
            color: "rgba(244, 244, 244, 0.683)",
          }}
        >
          &#176;C
        </span>
      </h2>
    </div>
  );
};

const Header = ({ name }) => {
  return (
    <nav className="nav">
      <IoApps />
      <p>
        <IoLocationSharp />
        {name}
      </p>
      <CiMenuKebab />
    </nav>
  );
};

const Home = () => {
  const apiKey = "db534ff9bb3e04ae762b14f2669dde3b";
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

  const [text, setText] = useState("Hyderabad");
  const [name, setName] = useState(text);
  const [temp, setTemp] = useState("0");
  const [humidity, setHumidity] = useState("0");
  const [wind, setWind] = useState("0");
  const [lat, setLat] = useState("0");
  const [lon, setLon] = useState("0");

  const search = () => {
    setName(text);
  };

  useEffect(() => {
    const fetchData = async () => {
      const {
        data,
        data: { main },
        data: { wind },
        data: { coord },
      } = await axios.get(apiUrl + name + `&appid=${apiKey}`);

      console.log(data);
      setTemp(Math.round(main.temp));
      setWind(wind.speed);
      setHumidity(main.humidity);
      setLat(coord.lat);
      setLon(coord.lon);
    };
    fetchData();
  }, [name]);

  return (
    <div className="container">
      <div className="main">
        <div className="application">
          <div className="icons">
            <Header name={name} />
            <Heading temp={temp} />
            <div className="lon-lat">
              <span id="longitude">
                <TbWorldLatitude />
                <p>long: {lon} </p>
              </span>
              <span id="latitude">
                <TbWorldLongitude />
                <p>lat: {lat}</p>
              </span>
            </div>
          </div>

          <hr />
          <div className="details">
            <div className="wind">
              <span className="left">
                <FaWind />
              </span>
              <span className="right">
                Wind
                <p>{wind} Km/h</p>
              </span>
            </div>
            <div className="humidity">
              <span className="left">
                <WiHumidity />
              </span>
              <span className="right">
                Humidity
                <p>{humidity}%</p>
              </span>
            </div>
          </div>

          <div className="search">
            <input
              type="text"
              placeholder="Enter city name"
              //   value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button onClick={search}>search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
