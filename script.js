const Api = '701bd4cbe98492ced20181dc39ae5329';

let City = 'Ростов-на-Дону';

document.getElementById('location').innerHTML = 'Погода в городе ' + City;

fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + City + '&appid=' + Api) //get Api and parse to json
    .then(function(resp) {
        return resp.json()
    })
    .then(function(data)

        {
            GetForecast(data)
        })


function GetForecast(data) {

    const today = new Date();
    let LastDay = today.getDate() + 4; // Last date of forecast

    const Temperatures = []
    const Icons = []
    const Descriptions = []
    const Days = []

    for (i = 0; LastDay > (data.list[i].dt_txt).slice(8, 10); i++) { //choosing days between today and the fourth

        let date = (data.list[i].dt_txt).slice(8, 10)

        if (today.getDate() < date || today.getDate() > 25) { //skip today`s temperature and for february /beginning of mounth

            Temperatures.push((data.list[i].main.temp - 272.1) / 8); // it doesn't matter if you divide the sum,or divide each element to add it up later

            Icons.push(data.list[i].weather[0].icon);

            Descriptions.push(data.list[i].weather[0].description);

            Days.push(data.list[i].dt_txt);

        }

    }

    let SupArt = [4, 12, 20]//a matching array for selecting a time interval

    for (i = 0; i < 3; i++) {

        let Temperature = Temperatures.slice(i * 8, i * 8 + 8).reduce((x, y) => x + y).toFixed(1); // entering the average data
        let Description = Descriptions[SupArt[i]]; //take description and icon in afternoon of every day
        let Icon = Icons[SupArt[i]];
        let Day = Days[i * 8].slice(0, 10); //"cutting" time``
        document.getElementById('temp+' + i).innerHTML = Temperature + " C" + "&deg;"; //show the temp and descrip
        document.getElementById('description+' + i).innerHTML = Description;
        document.getElementById('DoW' + i).innerHTML = getWeekDay(Day);
        document.getElementById('dat' + i).innerHTML = reverseDate(Day)

        let WI = '.weather-icon' + i;
        let weatherIcon = document.querySelector(WI);
        weatherIcon.setAttribute('src', 'http://openweathermap.org/img/wn/' + Icon + '@2x.png'); //change and show icon
    }
}



function reverseDate(date) {
    return (date.split('-').reverse().join('-'))
}


function getWeekDay(date) {
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    let ddate = new Date(date)
    return days[ddate.getDay()];
}

