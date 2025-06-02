document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("input");
  const locationElement = document
    .getElementById("location")
    .querySelector("h1");
  const maxTempElement = document.getElementById("max-temp");
  const minTempElement = document.getElementById("min-temp");
  const cloudsElement = document.getElementById("clouds").querySelector("h1");
  const dateElement = document.getElementById("date");
  const weatherIconContainer = document.getElementById('whatWeather');
  console.log("شروع کد");
  let canves = document.getElementById("weatherCircle");
  let canvesBox = document.getElementById("container");

  canves.width = canvesBox.offsetWidth;
  canves.height = canvesBox.offsetHeight;

  let c = canves.getContext("2d");

  c.beginPath();
  c.arc(
    0,
    canves.height / 2,
    canvesBox.offsetWidth,
    1.5 * Math.PI,
    0.5 * Math.PI
  );
  c.fillStyle = "rgba(255, 255, 255, 0.4)";
  c.fill();

  c.beginPath();
  c.arc(
    0,
    canves.height / 2,
    canvesBox.offsetWidth * 0.98,
    1.5 * Math.PI,
    0.5 * Math.PI
  );
  c.fillStyle = "rgba(255, 255, 255, 0.4)";
  c.fill();

  const API_KEY = "60e7cb1439b4172e5358b3ae80d057c1"; 

  input.addEventListener("keyup", async (e) => {
    if (e.key === "Enter") {
      const city = input.value.trim();
      console.log(city);
      if (!city) return;

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        );
      
        if (!res.ok){
          throw new Error("City not found");
        }
        const data = await res.json();
        console.log("داده دریافتی:", data);

        if (data.cod !== "200" && data.cod !== 200) {
          console.log("کد خطا از API:", data.cod, "پیام:", data.message);
          throw new Error(data.message || "شهر پیدا نشد");
        }

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
        } else if ([
          'shower rain', 'light rain', 'moderate rain', 'heavy intensity rain', 
          'very heavy rain', 'extreme rain', 'freezing rain', 
          'light intensity shower rain', 'heavy intensity shower rain', 'ragged shower rain'
        ].includes(cloudDesc)) {
          iconHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" enable-background="new 0 0 64 64" viewBox="0 0 64 64">
            <g>
              <line fill="none" stroke="#231F20" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" x1="25.454" x2="36.627" y1="42.649" y2="42.649"/>
              <g>
                <path d="M46.896,42.649h7.831c4.627,0,8.378-3.348,8.378-7.479c0-3.736-3.067-6.833-7.073-7.391l0,0c0-6.532-5.74-12.579-12.101-12.579    c-0.203,0,0.201-0.012,0,0c-3.368,0.181-6.353,1.847-8.346,4.37" fill="none" stroke="#231F20" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                <path d="M43.932,15.202C43.174,7.24,36.102,1,27.491,1c-9.118,0-16.508,6.993-16.508,15.62c0,0.837,0.07,1.66,0.204,2.458l0,0    C5.453,19.755,1,24.757,1,30.827c0,6.527,5.156,11.822,11.515,11.822h1.796" fill="none" stroke="#231F20" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
              </g>
              <g>
                <line fill="none" stroke="#231F20" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" x1="22.076" x2="21.105" y1="56.025" y2="58.367"/>
                <line fill="none" stroke="#231F20" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" x1="16.963" x2="14.689" y1="50.691" y2="56.182"/>
                <line fill="none" stroke="#231F20" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" x1="27.51" x2="24.882" y1="42.904" y2="49.251"/>
                <line fill="none" stroke="#231F20" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" x1="20.176" x2="19.165" y1="42.936" y2="45.376"/>
                <line fill="none" stroke="#231F20" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" x1="32.269" x2="29.995" y1="49.093" y2="54.584"/>
                <line fill="none" stroke="#231F20" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" x1="37.381" x2="35.751" y1="54.428" y2="58.36"/>
                <line fill="none" stroke="#231F20" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" x1="42.141" x2="40.091" y1="42.936" y2="47.885"/>
              </g>
            </g>
          </svg>`;
        } else if ([
          'thunderstorm', 'thunderstorm with light rain', 'thunderstorm with rain',
          'thunderstorm with heavy rain', 'light thunderstorm', 'heavy thunderstorm',
          'ragged thunderstorm', 'thunderstorm with light drizzle', 
          'thunderstorm with drizzle', 'thunderstorm with heavy drizzle'
        ].includes(cloudDesc)) {
          iconHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 32 32">
            <path d="M23.5,22H23V20h.5a4.5,4.5,0,0,0,.36-9L23,11l-.1-.82a7,7,0,0,0-13.88,0L9,11,8.14,11a4.5,4.5,0,0,0,.36,9H9v2H8.5A6.5,6.5,0,0,1,7.2,9.14a9,9,0,0,1,17.6,0A6.5,6.5,0,0,1,23.5,22Z"/>
            <polygon points="15.87 30.5 14.13 29.5 17.28 24 11.28 24 16.13 15.5 17.87 16.5 14.72 22 20.72 22 15.87 30.5"/>
          </svg>`;
        } else if ([
          'light snow', 'snow', 'heavy snow', 'sleet', 'light shower sleet', 
          'shower sleet', 'light rain and snow', 'rain and snow', 
          'light shower snow', 'shower snow', 'heavy shower snow'
        ].includes(cloudDesc)) {
          iconHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24">
            <path d="M11,17 L11.5,17 C11.7761424,17 12,17.2238576 12,17.5 C12,17.7761424 11.7761424,18 11.5,18 L11,18 L11,18.5 C11,18.7761424 10.7761424,19 10.5,19 C10.2238576,19 10,18.7761424 10,18.5 L10,18 L9.5,18 C9.22385763,18 9,17.7761424 9,17.5 C9,17.2238576 9.22385763,17 9.5,17 L10,17 L10,16.5 C10,16.2238576 10.2238576,16 10.5,16 C10.7761424,16 11,16.2238576 11,16.5 L11,17 Z M14,15 L14.5,15 C14.7761424,15 15,15.2238576 15,15.5 C15,15.7761424 14.7761424,16 14.5,16 L14,16 L14,16.5 C14,16.7761424 13.7761424,17 13.5,17 C13.2238576,17 13,16.7761424 13,16.5 L13,16 L12.5,16 C12.2238576,16 12,15.7761424 12,15.5 C12,15.2238576 12.2238576,15 12.5,15 L13,15 L13,14.5 C13,14.2238576 13.2238576,14 13.5,14 C13.7761424,14 14,14.2238576 14,14.5 L14,15 Z M10,13 L10.5,13 C10.7761424,13 11,13.2238576 11,13.5 C11,13.7761424 10.7761424,14 10.5,14 L10,14 L10,14.5 C10,14.7761424 9.77614237,15 9.5,15 C9.22385763,15 9,14.7761424 9,14.5 L9,14 L8.5,14 C8.22385763,14 8,13.7761424 8,13.5 C8,13.2238576 8.22385763,13 8.5,13 L9,13 L9,12.5 C9,12.2238576 9.22385763,12 9.5,12 C9.77614237,12 10,12.2238576 10,12.5 L10,13 Z M15.7439414,7 L16.5,7 C18.9852814,7 21,9.01471863 21,11.5 C21,13.9852814 18.9852814,16 16.5,16 C16.2238576,16 16,15.7761424 16,15.5 C16,15.2238576 16.2238576,15 16.5,15 C18.4329966,15 20,13.4329966 20,11.5 C20,9.56700338 18.4329966,8 16.5,8 L15.9725356,8 C15.9906833,8.16416693 16,8.33099545 16,8.5 C16,8.77614237 15.7761424,9 15.5,9 C15.2238576,9 15,8.77614237 15,8.5 C15,6.56700338 13.4329966,5 11.5,5 L11,5 C8.790861,5 7,6.790861 7,9 L7,9.5 C7,9.77614237 6.77614237,10 6.5,10 C5.11928813,10 4,11.1192881 4,12.5 C4,13.8807119 5.11928813,15 6.5,15 C6.77614237,15 7,15.2238576 7,15.5 C7,15.7761424 6.77614237,16 6.5,16 C4.56700338,16 3,14.4329966 3,12.5 C3,10.736764 4.30385293,9.27805926 6,9.03544443 C6,6.23857625 8.23857625,4 11,4 L11.5,4 C13.4593282,4 15.1261868,5.25221144 15.7439414,7 L15.7439414,7 Z"/>
          </svg>`;
        } else if ([
          'mist', 'smoke', 'haze', 'sand/dust whirls', 'fog', 
          'sand', 'dust', 'volcanic ash', 'squalls', 'tornado'
        ].includes(cloudDesc)) {
          iconHTML = `<svg width="80" height="80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <path d="M5 5h3m4 0h9"/>
            <path d="M3 10h11m4 0h1"/>
            <path d="M5 15h5m4 0h7"/>
            <path d="M3 20h9m4 0h3"/>
          </svg>`;
        }
        
        weatherIconContainer.innerHTML = iconHTML || '';

        // تاریخ
        const now = new Date();
        const days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        dateElement.innerHTML = `
            <h1>${now.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            })}</h1>
            <h1>${days[now.getDay()]}</h1>
          `;
      } catch (err) {
        console.error("Error fetching weather data:", err);
        alert("City not found. Please try again.");
      }
    }
  });
});