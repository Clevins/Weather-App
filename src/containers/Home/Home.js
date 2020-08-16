import React, {Component} from 'react';
import Axios from 'axios';

import AuxHoc from '../../hoc/AuxHoc';
import SearchLocation from '../../components/SearchLocation/SearchLocation';
import Weather from '../../components/Weather/Weather';
import classes from './Home.module.css';

//API Key Should be on Server or Enviroment Variable
//Located here for simplicity when grading
const OPEN_WEATHER_API_KEY = '3f0a31522745e3d107ebffb0b32cc4b5';

class Home extends Component {


  constructor(props) {
    super(props)

    //Used to call the saveState Function before the page refreshed/Closes.
    //Save state used to save the currrent Sate.
    //Ensures user does not lose locations on refresh
    window.addEventListener('beforeunload', this.saveState);

    //Boolean Check if geolocation is avaialble
    const geoLocAvailable = "geolocation" in navigator ? true : false;

    const InitialState = {
      geoLocAvailable,
      latitude: 0,
      longitude: 0,
      searchError: false,
      searchErrorMsg: '',
      weathers:[]
    }

    //If there is an exsiting state saved in localStorege will assign that to the current state.
    //Otherwise will Assign the state to the default intial state
    this.state = localStorage.getItem("prevState") ? JSON.parse(localStorage.getItem("prevState")) : InitialState;

    //Create and interval that will update the state every 10 seconds.
    this.interval = setInterval(() => {
      this.updateWeathers();
    }, 10000);
  }

  componentDidMount() {

    if(this.state.geoLocAvailable){
      try {
        navigator.geolocation.getCurrentPosition( (position) => {
          const {latitude, longitude} = position.coords;
          this.setState({latitude, longitude}, () => {

            //Creates an Axios Get Request for the weather at the Users Location.
            Axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_API_KEY}&units=metric`)
              .then( (res) => {

                //Creates a copy of state
                const copyState = this.state;
                let found = false;

                //Loops through the array and Checks if the Result of the Request is
                //already in the array. If True. Then updates the state at the index
                //that the match was found. If False. Prepends the result into the array.
                //Ensures Weather at users location is always present in the array
                for(let i = 0 ; i < this.state.weathers.length ; i++){
                  if(this.state.weathers[i].name === res.data.name){
                    copyState.weathers[i] = res.data;
                    this.setState(copyState);
                    found = true;
                  }
                }

                if(!found){
                  copyState.weathers.unshift(res.data);
                  this.setState(copyState);
                }
              })

          })
        })

      } catch (e) {
        console.log(e)
      }
    }
  }

  saveState = () => {
    localStorage.setItem('prevState', JSON.stringify(this.state));
  }

  searchLocationHandler = (location) => {

    //Checks the location entered is valid
    if(this.validateSearchLocation(location)){
      Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${OPEN_WEATHER_API_KEY}&units=metric`)
        .then( (res) => {
          const copyState = this.state;
          copyState.weathers[this.state.weathers.length] = res.data;
          this.setState(copyState);
        }).catch( (e) => {
          //Check 4: Checks if Location was not found
          if(e.response.status === 404){
            this.setState({
              searchError: true,
              searchErrorMsg: 'Location Not Found'
            });
          }
        })
    }
    //console.log(this.state)
  }

  removeLocationHandler = (location) => {
    const copyState = this.state;
    copyState.weathers = copyState.weathers.filter( e =>  e.name.toLowerCase().trim() !== location.toLowerCase().trim());
    this.setState({copyState});
  }

  validateSearchLocation = (location) => {

    //Validation Methid for the seach input
    const validChars = /^[A-Z a-z .]+$/;

    //Check 1: If the Location is already in the array, Using the name as a key
    if (this.state.weathers.some(e => e.name.toLowerCase().trim() === location.toLowerCase().trim() )) {
      this.setState({
        searchError: true,
        searchErrorMsg: 'Location Already Displayed'
      });
      return false;
    } else if(!location){
      //Check 2: If the Location is empty
      this.setState({
        searchError: true,
        searchErrorMsg: 'Enter Location'
      });
      return false;
    } else if(!location.match(validChars)){
      //Check 3: Uses a RegEx match to match only valid Characters
      //Could Run into issues with special characters, ie San José
      this.setState({
        searchError: true,
        searchErrorMsg: 'Enter Only Letters'
      });
      return false;
    } else {
      this.setState({searchError: false});
      return true;
    }
  }

  updateWeathers = () => {
    //Updates the state with new data from every location in the array;
    const weathersLength = this.state.weathers.length;
    if (weathersLength !== 0) {
      for (let i = 0 ; i < weathersLength ; i++){
        Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.weathers[i].name}&appid=${OPEN_WEATHER_API_KEY}&units=metric`)
          .then( (res) => {
            const copyState = this.state;
            copyState.weathers[i] = res.data;
            this.setState(copyState);
          })
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {

    //initilize weathers
    let weathers = null

    //Check if the weathers array is empty
    if (this.state.weathers.length !== 0) {
      //Creates Wether Component Dynamically
      weathers = this.state.weathers.map( (weather) => {
        return <Weather onclick={this.removeLocationHandler} key={weather.name} weather={weather}/>
      })
    }

    return (
      <AuxHoc>
        <SearchLocation
          onclick={this.searchLocationHandler}
          searchError={this.state.searchError}
          searchErrorMsg={this.state.searchErrorMsg}
        />
      {weathers !== null ?
        weathers :
        <div className={classes.AddMsg}>
          <h3>Search Location To Add</h3>
        </div>
      }
      </AuxHoc>
    )
  }
}

export default Home;
