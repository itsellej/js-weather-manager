const fetch = require('node-fetch')
require('dotenv').config()



export class Weather {

  async londonWeatherForOneDay() {
    const url = 'https://api.openweathermap.org/data/2.5/find?q=London,UK&units=metric'
    const response = await fetch(url + '&appid=' + process.env.API_KEY);
    const londonData = await response.json();
    const londonTemp = londonData.list[0].main.temp;
    const londonTempDescription = londonData.list[0].weather[0].description;
    const todayWeather = [londonTemp, londonTempDescription];

    return todayWeather
  }

  async londonWeather5Days() {
    const url = 'https://api.openweathermap.org/data/2.5/forecast?q=London,UK&units=metric&'
    const response = await fetch(url + '&appid=' + process.env.API_KEY);
    const londonData = await response.json();
    return londonData
  }

  getDates() {
    const oneDay = 1000 * 60 * 60 * 24
    const today = new Date();
    const todayPlus1 = new Date(today.getTime() + (oneDay));
    const todayPlus2 = new Date(today.getTime() + (oneDay * 2));
    const todayPlus3 = new Date(today.getTime() + (oneDay * 3));
    const todayPlus4 = new Date(today.getTime() + (oneDay * 4));

    const nextFiveDays = [today, todayPlus1, todayPlus2, todayPlus3, todayPlus4]
    let dateStrings = []

    nextFiveDays.forEach(function(date) {
      let day = date.getDate();
      let month = (date.getMonth() + 1);
      let year = date.getFullYear();

      if(day < 10){
        day = "0" + date.getDate()
      };
      if(month < 10){
        month = "0" + (date.getMonth() + 1)
      };

      dateStrings.push(`${year}-${month}-${day}`)

    });

    return dateStrings
  }




}
