var col = document.querySelector("#col");
var write = document.getElementById("write");

GetWeatherByCity("cairo");

write.addEventListener("input", function () {
  var cityName = write.value.trim();
  if (cityName !== "") {
    GetWeatherByCity(cityName);
  } else {
    GetWeatherByCity("cairo");
    // col.innerHTML = "";
  }
});

async function GetWeatherByCity(cityName) {
  try {
    var response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=9bd493d555c44208bf652107252304&q=${cityName}&days=3`
    );
    var data = await response.json();
    console.log(data);
    displayWeather(data);
  } catch (error) {
    col.innerHTML = `<p class="text-white">No data for "${cityName}"</p>`;
  }
}

function displayWeather(data) {
  col.innerHTML = "";
  //   var city = data.location.name;
  //   var country = data.location.country;
  //   var temp = data.current.temp_c;
  //   var day = data.location.localtime;
  //   var img = data.current.condition.icon;
  //   var status = data.current.condition.text;
  function getDayName(dateStr) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var date = new Date(dateStr);
    return days[date.getDay()];
  }
  function getDayAndMonth(dateStr) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var date = new Date(dateStr);
    return `${date.getDate()} ${months[date.getMonth()]}`;
  }

  col.innerHTML += `
  <div class="row">
  <div class="col-md-4 p-0 one">
      <div class="parent   ">
        <div class="child-1 p-2 d-flex justify-content-between align-items-center "><h2 class="dayName">${getDayName(
          data.location.localtime
        )}</h2>
        <h2 class="dayName">${getDayAndMonth(data.location.localtime)}</h2>
        </div>
        <div class="child-2 p-2">
          <div class="CountryName">${data.location.name}</div>
          <div class="temp">${data.current.temp_c}°C</div>
          <img class="imgIcon" src="https:${data.current.condition.icon}" />
          <div class="conditionText">${data.current.condition.text}</div>
        </div>
        <div class="last mt-2">
        <ul class=" p-0 d-flex  justify-content-start align-items-center ">
          <li class=" list-unstyled"><i class="fa-solid fa-umbrella d-inline-block "></i> <p class="d-inline-block ">20%</p></li>
          <li class=" list-unstyled"><i class="fa-solid fa-wind d-inline-block"></i> <p class="d-inline-block">18Km/h</p></li>
          <li class=" list-unstyled"><i class="fa-regular fa-compass d-inline-block"></i> <p class="d-inline-block">East</p></li>
          
        </ul>
        </div>
      </div>
    </div>

    <div class="col-md-4 p-0  two">
      <div class="parent">
        <div class="child-11 p-2"><h2 class="dayName">${getDayName(
          data.forecast.forecastday[1].date
        )}</h2></div>
        <div class="child-3 p-3 d-flex justify-content-center align-items-center flex-column p-1">
          <img class="iconImage2" src="https:${
            data.forecast.forecastday[1].day.condition.icon
          }" />
          <div class="maxTemp">${
            data.forecast.forecastday[1].day.maxtemp_c
          }</div>
          <p class="maxWind">${
            data.forecast.forecastday[1].day.maxwind_kph
          }°C</p>
          <div class="conditionText mt-3">${
            data.forecast.forecastday[1].day.condition.text
          }</div>
        </div>
      </div>
    </div>

    <div class="col-md-4 p-0 one">
      <div class="parent">
        <div class="child-1 p-2"><h2 class="dayName">${getDayName(
          data.forecast.forecastday[2].date
        )}</h2></div>
        <div class="child-3 p-3 d-flex justify-content-center align-items-center flex-column p-1">
          <img class="iconImage2" src="https:${
            data.forecast.forecastday[2].day.condition.icon
          }" />
          <div class="maxTemp">${
            data.forecast.forecastday[2].day.maxtemp_c
          }</div>
          <p class="maxWind">${
            data.forecast.forecastday[2].day.maxwind_kph
          }°C</p>
          <div class="conditionText">${
            data.forecast.forecastday[2].day.condition.text
          }</div>
        </div>
      </div>
    </div>
          
  `;
}
