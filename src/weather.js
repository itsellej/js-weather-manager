const fetch = require('node-fetch')
require('dotenv').config()



export class Weather {

  constructor(board) {
    this.datesAndTimes = []
  }

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

  getDatesAndTimes() {
    const times = ['00:00:00', '06:00:00', '12:00:00', '18:00:00']
    const oneDay = 1000 * 60 * 60 * 24
    const today = new Date();
    const todayPlus1 = new Date(today.getTime() + (oneDay));
    const todayPlus2 = new Date(today.getTime() + (oneDay * 2));
    const todayPlus3 = new Date(today.getTime() + (oneDay * 3));
    const todayPlus4 = new Date(today.getTime() + (oneDay * 4));

    const nextFiveDays = [todayPlus1, todayPlus2, todayPlus3, todayPlus4]
    let dateStrings = []

    nextFiveDays.forEach(function(date) {
      const dateToString = JSON.stringify(date)
      dateStrings.push(dateToString.substring(1, 11))
    });


    dateStrings.forEach((date) => {
      times.forEach((time) => {
        this.datesAndTimes.push(date + ' ' + time)
      })
    })
    return this.datesAndTimes
  };

  async getForecast(){
    const timeStamps = this.getDatesAndTimes()
    const londonData = await this.londonWeather5Days()

    const datalist = londonData.list
    let result = []

    datalist.forEach((date) => {
      timeStamps.forEach((timestamp) => {
        if(date.dt_txt === timestamp){
          let dateTime = date.dt_txt.split(' ');
          let dateFormatted = dateTime[0].split('-');
          let timeFormatted = dateTime[1].split(':')
          let day = ""
          let temp = Math.round(date.main.temp)

          switch (new Date(dateFormatted[0], dateFormatted[1] - 1, dateFormatted[2]).getDay()) {
            case 0:
            day = "Sunday";
            break;
            case 1:
            day = "Monday";
            break;
            case 2:
            day = "Tuesday";
            break;
            case 3:
            day = "Wednesday";
            break;
            case 4:
            day = "Thursday";
            break;
            case 5:
            day = "Friday";
            break;
            case 6:
            day = "Saturday";
          }

          if(temp === -0){
            temp = 0
          }

          result.push({
            day: day,
            date: `${dateFormatted[2]}/${dateFormatted[1]}/${dateFormatted[0]}`,
            time: `${timeFormatted[0]}:${timeFormatted[1]}`,
            temp: temp,
            description: date.weather[0].description,
          })
        }
      })
    })
    console.log(result)
    return result

  }






}
