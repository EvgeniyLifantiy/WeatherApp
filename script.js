$(window).on('load',function(){
    $('#myModal').modal('show');
});

class Forecast {
    constructor (MinTemp,MaxTemp, Description, Day, Icon) {
      this.MinTemp = MinTemp
      this.MaxTemp = MaxTemp
      this.Description = Description
      this.Day = Day
      this.Icon = Icon
    }
}

function showForecast(City){
    fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + City + '&appid=701bd4cbe98492ced20181dc39ae5329') //get Api and parse to json
    .then(function(resp) {
        return resp.json()
    })
    .then(function(data)

    {
      getForecast(data)
    })
}

function getForecast (data) {
    for (let i = 0; i < data.list.length; i= i+8) { // we take values in 24 hours from the current moment
      const forecastOfWeather = new Forecast(
        data.list[i].main.temp_min,
        data.list[i].main.temp_max,
        data.list[i].weather[0].description,
        data.list[i].dt_txt,
        data.list[i].weather[0].icon
      )
      addCards(forecastOfWeather)
    }
}

function addCards(forecastOfWeather){
    cardholdplace.prepend(createCard({
    MinTemp:forecastOfWeather.MinTemp,
    MaxTemp:forecastOfWeather.MaxTemp,
    Icon:forecastOfWeather.Icon,
    Day:forecastOfWeather.Day,
    Description:forecastOfWeather.Description,
  }));
}

const createCard = ({ MinTemp,MaxTemp,Description,Day,Icon }) => {
    document.getElementById('location').innerHTML = 'Погода в городе ' + document.getElementById('text').value;
    const template = document.createElement('section');
    template.innerHTML = `
    <div class="card text-white bg-primary mb-3" id="Card" style="width: 22rem;">
    <h2 id="dat">${reverseDate(Day)}</h2> <!--for date-->
    <h2 id="DoW">${getWeekDay(Day)}</h2> <!--for Day of Week-->
    <div class="card-body">
      <img src="http://openweathermap.org/img/wn/${Icon}@2x.png" class="weather-icon0">
      <h2  id="description">${Description}</h2 >
      <h2 id="temp">${((MaxTemp+MinTemp)/2-272.1).toFixed(1)}c&deg   </h2>
    </div>
  </div>
    `;

    return template.children[0];
};

function reverseDate(date) {
    return (date.slice(0, 10).split('-').reverse().join('-'))
}

function getWeekDay(date) {
   let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
   let ddate = new Date(date)//convert our input to the date
   return days[ddate.getDay()];
}
