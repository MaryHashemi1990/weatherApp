document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("input");
  const locationElement = document.getElementById("location").querySelector("h1");
  const maxTempElement = document.getElementById("max-temp");
  const minTempElement = document.getElementById("min-temp");
  const cloudsElement = document.getElementById("clouds").querySelector("h1");
  const dateElement = document.getElementById("date");
  const weatherIconContainer = document.getElementById('whatWeather');
  
  let canves = document.getElementById("weatherCircle");
  let canvesBox = document.getElementById("container");

  // تنظیمات Canvas (همانند قبل)
  canves.width = canvesBox.offsetWidth;
  canves.height = canvesBox.offsetHeight;
  let c = canves.getContext("2d");
  c.beginPath();
  c.arc(0, canves.height / 2, canvesBox.offsetWidth, 1.5 * Math.PI, 0.5 * Math.PI);
  c.fillStyle = "rgba(255, 255, 255, 0.4)";
  c.fill();
  c.beginPath();
  c.arc(0, canves.height / 2, canvesBox.offsetWidth * 0.98, 1.5 * Math.PI, 0.5 * Math.PI);
  c.fillStyle = "rgba(255, 255, 255, 0.4)";
  c.fill();

  const API_KEY = "60e7cb1439b4172e5358b3ae80d057c1"; 

  // تابع برای دریافت اطلاعات آب و هوا
  async function fetchWeather(city) {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
    
      if (!res.ok) {
        throw new Error("City not found");
      }
      const data = await res.json();
      console.log("داده دریافتی:", data);

      if (data.cod !== "200" && data.cod !== 200) {
        console.log("کد خطا از API:", data.cod, "پیام:", data.message);
        throw new Error(data.message || "شهر پیدا نشد");
      }

      // ذخیره شهر در localStorage
      localStorage.setItem('lastSearchedCity', city);

      // بروزرسانی اطلاعات در DOM
      locationElement.textContent = data.name;
      maxTempElement.textContent = `${Math.round(data.main.temp_max - 273.15)}°C`;
      minTempElement.textContent = `${Math.round(data.main.temp_min - 273.15)}°C`;
      cloudsElement.textContent = data.weather[0].description;
      const cloudDesc = data.weather[0].description.toLowerCase();
      
      let iconHTML = '';
      if ([
        'few clouds', 'scattered clouds', 'broken clouds', 'overcast clouds'
      ].includes(cloudDesc)) {
        iconHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 33.062 33.062" style="enable-background:new 0 0 33.062 33.062;" xml:space="preserve">
          <g>
            <path d="M25.615,26.608H6.442C2.89,26.608,0,23.719,0,20.167c0-3.502,2.81-6.361,6.294-6.44c1.241-4.303,5.161-7.274,9.67-7.274   c3.738,0,7.104,2.026,8.869,5.311c0.28-0.031,0.534-0.046,0.781-0.046c4.106,0,7.446,3.339,7.446,7.443   C33.062,23.268,29.721,26.608,25.615,26.608z M6.442,14.726C3.441,14.726,1,17.167,1,20.167c0,3,2.441,5.44,5.442,5.44h19.173   c3.555,0,6.446-2.892,6.446-6.446c0-3.553-2.892-6.443-6.446-6.443c-0.298,0-0.613,0.026-0.991,0.083   c-0.214,0.032-0.426-0.079-0.522-0.273c-1.544-3.129-4.663-5.074-8.138-5.074c-4.184,0-7.804,2.839-8.804,6.904   c-0.056,0.228-0.275,0.377-0.498,0.38L6.442,14.726z"/>
            <path d="M25.615,26.608c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5c3.555,0,6.446-2.892,6.446-6.446   c0-3.553-2.892-6.443-6.446-6.443c-1.862,0-3.633,0.805-4.858,2.208c-0.181,0.208-0.497,0.23-0.705,0.048   c-0.208-0.181-0.229-0.497-0.048-0.705c1.414-1.621,3.459-2.55,5.611-2.55c4.106,0,7.446,3.339,7.446,7.443   C33.062,23.268,29.721,26.608,25.615,26.608z"/>
          </g>
        </svg>`;
      } 
      // بقیه شرایط آب و هوایی (همانند قبل)
      
      weatherIconContainer.innerHTML = iconHTML || '';

      // نمایش تاریخ
      const now = new Date();
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      dateElement.innerHTML = `
          <h1>${now.toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}</h1>
          <h1>${days[now.getDay()]}</h1>
        `;
    } catch (err) {
      console.error("Error fetching weather data:", err);
      alert("City not found. Please try again.");
    }
  }

  // رویداد جستجو با Enter
  input.addEventListener("keyup", async (e) => {
    if (e.key === "Enter") {
      const city = input.value.trim();
      if (!city) return;
      await fetchWeather(city);
    }
  });

  // بارگذاری خودکار آخرین شهر جستجو شده
  const lastCity = localStorage.getItem('lastSearchedCity');
  if (lastCity) {
    input.value = lastCity;
    fetchWeather(lastCity);
  }
});
