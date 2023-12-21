const searchbox=document.querySelector(".search input");
const searchbtn=document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
async function weather(city)
{


  const name = city;
  const url="http://api.openweathermap.org/data/2.5/weather?APPID=ecfcab11f4e8096ae73c257a7f7f395e&units=metric"+`&q=${name}`;

  const data = await fetch(url);
  if(data.status === 404)
  {
    document.querySelector(".error").style.display="block";
    document.querySelector(".weather").style.display="none";
  }
  else
  {


  const raw = await data.json();
  
  document.querySelector(".city").innerHTML=raw.name;
  document.querySelector(".temp").innerHTML=Math.round(raw.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML=raw.main.humidity + "%";
  document.querySelector(".wind").innerHTML=raw.wind.speed + "km/h";

  if(raw.weather[0].main == "Clouds")
  {
    weatherIcon.src="images/clouds.png"
  }
  else if(raw.weather[0].main == "Clear")
  {
    weatherIcon.src="images/clear.jpeg"
  }
  else if(raw.weather[0].main == "Rain")
  {
    weatherIcon.src="images/rain.jpeg"
  }
  else if(raw.weather[0].main == "Drizzle")
  {
    weatherIcon.src="images/drizzle.jpeg"
  }
  else if(raw.weather[0].main == "Snow")
  {
    weatherIcon.src="images/snow.jpeg"
  }
  else if(raw.weather[0].main == "Mist")
  {
    weatherIcon.src="images/mist.jpeg"
  }

  
  document.querySelector(".weather").style.display="block";
}

}

searchbtn.addEventListener("click",()=>{
     weather(searchbox.value);
});
