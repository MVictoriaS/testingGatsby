import React, { useState } from 'react'
import Titles from '../components/Titles'
import Form from '../components/Form'
import Weather from '../components/Weather'
import Header from "../components/Header"
import Footer from "../components/Footer"
import sunsetImgSrc from "../images/pic.jpeg"
import "./style.css"

// styles
const htmlStyles = {
  padding: "7px",
  margin: "1px",
  boxsizing: "borderbox",
  fontFamily: "Montserrat, sans-serif",
  textAlign: "center",
  backgroundColor: "#d3d3d3",
  fontSize: "0.9rem",
}

const headerStyle= {
  color:  "#00008b",
  fontSize: "1rem",
}

const footerStyle = {
  position: "absolute",
  textAlign: "center",
  fontSize: "0.4rem",
  color:  "#00008b",
}

// markup
const API_KEY = ""  

const Carousel = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[1])

  const clickHandler = () => {
    const filteredImages = images.filter(image => image !== activeImage)
    const randomPosition = Math.floor(Math.random() * filteredImages.length)
    setActiveImage(filteredImages[randomPosition]);
  }
  
  return (
    <>
      <img className="pic" src={activeImage} alt= "img"/>
      <div>
        <button onClick={clickHandler}>Next</button>
     </div>
    </>
  )
}

function App() {

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [ error, setError ] = useState(null);
  const [ temp, setTemp ] = useState();
  const [ humidity, setHumidity ] = useState();
  const [ desc, setDesc ] = useState();
  const images = [
    "https://c4.wallpaperflare.com/wallpaper/843/278/463/rainbow-sky-cloud-clouds-wallpaper-preview.jpg",
    "https://www.publicdomainpictures.net/pictures/340000/velka/himmel-wolken-sonnenschein-tag.jpg",
    sunsetImgSrc,
  ]
const fetchWeather = async (ev) => {
    try {
      ev.preventDefault();
      const [city, country] = Array.from(ev.target).filter(el => el.nodeName === "INPUT")

      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city.value},${country.value}&appid=${API_KEY}&units=metric`);
      
      const data = await api_call.json();
      console.log(data)
      if (data) {
        setCity(data.name);
        setCountry(data.sys.country);
        setTemp(data.main.temp);
        setHumidity(data.main.humidity);
        setDesc(data.weather[0].description);
        setError('');
      }
    } catch(err) {
      console.log(err);
      setError('Please enter city and country');
    }
  }

  return (
    <main style={htmlStyles} >
    <div>
    <div style={headerStyle}  >
        <Header />
    </div>   
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-xs-5 title-container">
                <span > <Titles /> </span>
              </div>
              <div className="col-xs-7 form-container">
                <Form  fetchWeather={fetchWeather}/>
                <Weather 
                  temp={temp}
                  city={city}
                  country={country}
                  humidity={humidity}
                  desc={desc}
                  error={error}
                />
              </div>
            </div>
          <Carousel images={images} />
          </div>
        </div>
      </div>
      <div>
      <div style = {footerStyle} >
        <Footer  />
      </div>
      </div>
    </div>
    </main>
  );
}

export default App;
