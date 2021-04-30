import React, { Component } from 'react';
import './Weather.css';
import ReactCountryFlag from 'react-country-flag';
import moment from 'moment-timezone';
// Import sys

const apikey  = "6486085a849f33ab16d294ebe45ac73d"; // Oles Odynets
const reqcity = "Veracruz";

const icons = {
  "thunderstorm":{
    "day": "https://image.flaticon.com/icons/svg/143/143787.svg",
    "night": "https://image.flaticon.com/icons/svg/143/143787.svg"
  },
  "drizzle":{
    "day": "https://image.flaticon.com/icons/svg/143/143786.svg",
    "night": "https://image.flaticon.com/icons/svg/577/577598.svg"
  },
  "rain":{
    "day": "https://image.flaticon.com/icons/svg/143/143784.svg",
    "night": "https://image.flaticon.com/icons/svg/577/577592.svg"
  },
  "snow":{
    "day": "https://image.flaticon.com/icons/svg/143/143785.svg",
    "night": "https://image.flaticon.com/icons/svg/577/577594.svg"
  },
  "atmosphere":{
    "day": "https://image.flaticon.com/icons/svg/143/143772.svg",
    "night": "https://image.flaticon.com/icons/svg/143/143772.svg"
  },
  "clouds":{
    "day": "https://image.flaticon.com/icons/svg/143/143790.svg",
    "night": "https://image.flaticon.com/icons/svg/414/414967.svg"
  },
  "clear":{
    "day":"https://image.flaticon.com/icons/svg/414/414926.svg",
    "night":"https://image.flaticon.com/icons/svg/414/414942.svg"
  },
  "mist":{
    "day": "https://image.flaticon.com/icons/svg/143/143772.svg",
    "night": "https://image.flaticon.com/icons/svg/143/143772.svg"
  },
  "err":{
    "text":"Sorry, service is temporarily unavailable...",
    "icon":"https://image.flaticon.com/icons/svg/148/148766.svg"
  }
}

const background = { // storm, sky, sad, night, atmnight, stormnight // All names must be in lowerCase
  "day":{
    "thunderstorm":"storm",
    "drizzle":"sky",
    "rain":"storm",
    "snow":"sad",
    "atmosphere":"sky",
    "clouds":"sky",
    "clear":"sky"
  },
  "night":{
    "snow":"atmnight",
    "thunderstorm":"stormnight",
    "rain":"stormnight"
  }
}
//const noteDate = moment.tz(moment.tz.guess()).zoneAbbr();
const ct = require('countries-and-timezones');
const timezones = ct.getTimezonesForCountry('MX');
const zona_name = timezones[0].name;
console.log(timezones[0].name);
// App

function Preloader({ show }) {
  return(
    <div className={ `preloader${ (show) ? " display" : "" }` }>
      <div></div>
    </div>
  );
}

class Weather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temp: "Loading...",
      sub: "",
      icon: "",
      background: "error",
      loading: true,
      value: 'Veracruz'
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    //this.setState({value: event.target.value});
    let value = event.target.value;
    this.setState({
      loading: true,
      value: event.target.value
    });
    let a =
          `https://api.openweathermap.org/data/2.5/weather?q=${ value }&APPID=${ apikey }&units=metric`; // json
    fetch(a)
      .then(res => res.json())
        .then(
          (eresponse) => {
            console.log(eresponse)
            let b = (eresponse.main.temp).toString().substring(0, 4) + "°",
                c = eresponse.weather[0].main.toLowerCase(),
                d = new Date().getHours(),
                e = (d >= 9 && d <= 21) ? "day" : "night",
                f = icons[c][e],
                g = background[e][c],
                pais = (eresponse.sys.country).toString(),
                h = (g === undefined) ? "night" : g;
                
            if(f === undefined) {
              let aa = icons.err;
              b = aa.text;
              c = "";
              f = aa.icon;
            }
            const ct = require('countries-and-timezones');
            let ab_pais = pais 
            const timezones = ct.getTimezonesForCountry(ab_pais);
            const zona_name = timezones[0].name;
            const zonahoraria = moment().tz(timezones[0].name).format()

            this.setState({
              temp: b,
              sub: c,
              icon: f,
              background: h,
              pais: pais,
              zona: zonahoraria,
              zona_name: zona_name,
              loading: false
            });
          },
          (err) => { // err
            // alert(err);
            let b = icons.err,
                c = b.text,
                d = "",
                e = b.icon;
            this.setState({
              temp: c,
              sub: d,
              icon: e,
              loading: false
            });
          });
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    const reqcity = this.state.value;
    event.preventDefault();
  }

  getWeather = () => {


    this.setState({
      loading: true
    });
    let a =
          `https://api.openweathermap.org/data/2.5/weather?q=${ reqcity }&APPID=${ apikey }&units=metric`; // json
    fetch(a)
      .then(res => res.json())
        .then(
          (eresponse) => {
            console.log(eresponse)
            let b = (eresponse.main.temp).toString().substring(0, 4) + "°",
                c = eresponse.weather[0].main.toLowerCase(),
                d = new Date().getHours(),
                e = (d >= 9 && d <= 21) ? "day" : "night",
                f = icons[c][e],
                g = background[e][c],
                pais = (eresponse.sys.country).toString(),
                h = (g === undefined) ? "night" : g;
                
            if(f === undefined) {
              let aa = icons.err;
              b = aa.text;
              c = "";
              f = aa.icon;
            }
            const ct = require('countries-and-timezones');
            let ab_pais = pais 
            const timezones = ct.getTimezonesForCountry(ab_pais);
            const zona_name = timezones[0].name;
            const zonahoraria = moment().tz(timezones[0].name).format()

            this.setState({
              temp: b,
              sub: c,
              icon: f,
              background: h,
              pais: pais,
              zona: zonahoraria,
              zona_name: zona_name,
              loading: false
            });
          },
          (err) => { // err
            // alert(err);
            let b = icons.err,
                c = b.text,
                d = "",
                e = b.icon;
            this.setState({
              temp: c,
              sub: d,
              icon: e,
              loading: false
            });
          });
  }

  componentDidMount() {
    this.getWeather();
    setInterval(() => { // Update weather every hour
      this.getWeather();
    }, 3600000); // 3600000ms <- 3600s <- 60m <- 1h
  }
  

  render() {
    
    return(
      <React.Fragment>
       
       <form onSubmit={this.handleSubmit}>
        <label>
          Selecciona Pais:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="Veracruz">Mexico</option>
            <option value="Japon">Japon</option>
            <option value="Londres">Londres</option>
          </select>
        </label>
      </form>
          
        <Preloader show={ this.state.loading } />
        <div id="app" >
          <h1>{this.state.zona} {this.state.zona_name}</h1>
          <h2></h2>
 
        </div>
        <div id="app" className={ this.state.background }>
          {/* <p className="reqcity hud">{ reqcity }</p> */}
          <img className="icon hud" src={ this.state.icon } alt={ this.state.temp } />
          <h1 className="temp hud">{ this.state.temp }</h1>
          <h3 className="sub hud">{ this.state.sub }</h3>
        </div>
        <div id="app2"className={ this.state.background } >
          <p className="reqcity hud">Pais :{ this.state.pais }</p>
          <ReactCountryFlag
              className="emojiFlag"
              countryCode={ this.state.pais }
              style={{
                  fontSize: '7em',
                  lineHeight: '2em',
              }}
          />
        
        

        </div>
        
      </React.Fragment>
    );
  }
}

export default Weather;