import ReactMapGL from "react-map-gl";
import { useState, useEffect } from "react";
import { Marker, Popup } from "react-map-gl";
import axios from "axios";
function App() {
  const [countries, setCountries] = useState();
  const [viewport, setViewport] = useState({
    width: "fit",
    height: "100vh",
    latitude: 24.97393057661664,
    longitude: 2.156883421379434,
    zoom: 3.909629491061953,
  });
  const [pop, setPop] = useState({ show: false });
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        "https://disease.sh/v3/covid-19/countries"
      );
      console.log(data);
      setCountries(data);
    };
    getData();
  }, []);
  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport) => {
        setViewport(nextViewport);
      }}
      mapboxApiAccessToken={process.env.REACT_APP_TOKEN}
      mapStyle="mapbox://styles/akram25/cjyummsdt092r1cs4fsivp0tu"
    >
      {countries &&
        countries.map((country) => {
          return (
            <Marker
              key={country.country}
              offsetTop={-48}
              offsetLeft={-24}
              latitude={country.countryInfo.lat}
              longitude={country.countryInfo.long}
            >
              <img
                style={{ width: "30px", height: "30px" }}
                src={country.countryInfo.flag}
                onMouseOver={() => setPop({ ...country, show: true })}
                onMouseEnter={() => setPop({ ...country, show: true })}
                onMouseMove={() => setPop({ ...country, show: true })}
                onMouseLeave={() => setPop({ show: false })}
              />
            </Marker>
          );
        })}
      {pop.show && (
        <Popup
          className={`${pop.todayCases < 1000 ? "div2" : "div1"}`}
          offsetTop={-60}
          offsetLeft={-10}
          tipSize={0}
          dynamicPosition={false}
          longitude={pop.countryInfo.long}
          latitude={pop.countryInfo.lat}
          closeButton={false}
        >
          <div
            style={{
              textAlign: "center",
            }}
          >
            <h1>{pop.country}</h1>
            <p>Today cases : {pop.todayCases}</p>
          </div>
        </Popup>
      )}
    </ReactMapGL>
  );
}

export default App;
