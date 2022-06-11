const today = moment().format('dddd MMMM Do YYYY')
const dateOne = moment().add(1, 'days').format('dddd MMMM Do');
const dateTwo = moment().add(2, 'days').format('dddd MMMM Do');
const dateThree = moment().add(3, 'days').format('dddd MMMM Do');
const dateFour = moment().add(4, 'days').format('dddd MMMM Do');
const dateFive = moment().add(5, 'days').format('dddd MMMM Do');

const dayOneTitle = document.getElementById('dayOneDate')
dayOneTitle.textContent = `${dateOne}`

const dayTwoTitle = document.getElementById('dayTwoDate')
dayTwoTitle.textContent = `${dateTwo}`

const dayThreeTitle = document.getElementById('dayThreeDate')
dayThreeTitle.textContent = `${dateThree}`

const dayFourTitle = document.getElementById('dayFourDate')
dayFourTitle.textContent = `${dateFour}`

const dayFiveTitle = document.getElementById('dayFiveDate')
dayFiveTitle.textContent = `${dateFive}`

const cityTitle = document.getElementById('userCity')
//use array for search history??
const searchInput = document.getElementById('userSearch').value;

let btn = document.getElementById('btn');

btn.addEventListener('click', event => {
    event.preventDefault();
    localStorage.setItem('recentSearch', searchInput);
})

let weather = {
    apiKey: "8b3bbbe590b75732d37afbd75c8a1de6",
    fetchCity: function (city) {
        fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${this.apiKey}`
            )
                .then((response) => response.json())
                .then((data) => this.cityCoords(data));
    },
    cityCoords: function (data) {
        const {lat, lon} = data.coord;
        const {name} = data;
        console.log(lat,lon,name)
        document.getElementById('userCity').textContent = name + ", " + today;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${this.apiKey}`
        )
            .then((response) => response.json())
            .then((data) => this.weatherReport(data))
    },
    weatherReport: function(data) {
        const {temp} = data.current;
        const {wind_speed} = data.current;
        const {humidity} = data.current;
        const {uvi} = data.current;
        const {icon, description} = data.current.weather[0];
        console.log(temp, wind_speed, humidity, uvi, icon, description)
        document.getElementById('temp').textContent = temp;
        document.getElementById('wind').textContent = wind_speed;
        document.getElementById('humid').textContent = humidity;
        document.getElementById('UV').textContent = uvi;
        document.querySelector('#icon').src = "http://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('#icon').alt = description;
        if (uvi < 2) {
            document.querySelector('#UV').style.background = "green";
        } else if (uvi < 5) {
            document.querySelector('#UV').style.background = "yellow";
        } else if (uvi > 5) {
            document.querySelector('#UV').style.background = "red";
        }
        this.weatherOne(data);
    },
    weatherOne: function(data) {
        const {day} = data.daily[0].temp;
        const {wind_speed} = data.daily[0];
        const {humidity} = data.daily[0];
        const {icon} = data.daily[0].weather[0];
        const {description} = data.daily[0].weather[0];
        console.log(day,wind_speed,humidity,icon,description);

        document.querySelector('#dayOneIcon').src = "http://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('#dayOneIcon').alt = description;
        document.getElementById('dayOneTemp').textContent = day;
        document.getElementById('dayOneWind').textContent = wind_speed;
        document.getElementById('dayOneHumid').textContent = humidity;
        this.weatherTwo(data);
    },
    weatherTwo: function(data) {
        const {day} = data.daily[1].temp;
        const {wind_speed} = data.daily[1];
        const {humidity} = data.daily[1];
        const {icon} = data.daily[1].weather[0];
        const {description} = data.daily[1].weather[0];
        console.log(day,wind_speed,humidity,icon,description);

        document.querySelector('#dayTwoIcon').src = "http://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('#dayTwoIcon').alt = description;
        document.getElementById('dayTwoTemp').textContent = day;
        document.getElementById('dayTwoWind').textContent = wind_speed;
        document.getElementById('dayTwoHumid').textContent = humidity;
        this.weatherThree(data);
    },
    weatherThree: function(data) {
        const {day} = data.daily[2].temp;
        const {wind_speed} = data.daily[2];
        const {humidity} = data.daily[2];
        const {icon} = data.daily[2].weather[0];
        const {description} = data.daily[2].weather[0];
        console.log(day,wind_speed,humidity,icon,description);

        document.querySelector('#dayThreeIcon').src = "http://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('#dayThreeIcon').alt = description;
        document.getElementById('dayThreeTemp').textContent = day;
        document.getElementById('dayThreeWind').textContent = wind_speed;
        document.getElementById('dayThreeHumid').textContent = humidity;
        this.weatherFour(data);
    },
    weatherFour: function(data) {
        const {day} = data.daily[3].temp;
        const {wind_speed} = data.daily[3];
        const {humidity} = data.daily[3];
        const {icon} = data.daily[3].weather[0];
        const {description} = data.daily[3].weather[0];
        console.log(day,wind_speed,humidity,icon,description);

        document.querySelector('#dayFourIcon').src = "http://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('#dayFourIcon').alt = description;
        document.getElementById('dayFourTemp').textContent = day;
        document.getElementById('dayFourWind').textContent = wind_speed;
        document.getElementById('dayFourHumid').textContent = humidity;
        this.weatherFive(data);
    },
    weatherFive: function(data) {
        const {day} = data.daily[4].temp;
        const {wind_speed} = data.daily[4];
        const {humidity} = data.daily[4];
        const {icon} = data.daily[4].weather[0];
        const {description} = data.daily[4].weather[0];
        console.log(day,wind_speed,humidity,icon,description);

        document.querySelector('#dayFiveIcon').src = "http://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('#dayFiveIcon').alt = description;
        document.getElementById('dayFiveTemp').textContent = day;
        document.getElementById('dayFiveWind').textContent = wind_speed;
        document.getElementById('dayFiveHumid').textContent = humidity;
    },
    search: function () {
        this.fetchCity(document.querySelector("#userSearch").value);
    }
}


document.querySelector("#btn").addEventListener("click", function () {
    weather.search();
});



