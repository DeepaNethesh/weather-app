const appId = '7e4b1a1d7b15c98c4519cecda93ea198';
const getDataForCity = async city => {
let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}&units=metric`);
let data = await response.json();
//   .then(response => response.json());
return data;
}

const emojis = {
    '01d': '☀️',
    '02d': '⛅️',
    '03d': '☁️',
    '04d': '☁️',
    '09d': '🌧',
    '10d': '🌦',
    '11d': '⛈',
    '13d': '❄️',
    '50d': '💨',
    '01n': '☀️',
    '02n': '⛅️',
    '03n': '☁️',
    '04n': '☁️',
    '09n': '🌧',
    '10n': '🌦',
    '11n': '⛈',
    '13n': '❄️',
    '50n': '💨',
  };

  const cityName = document.querySelector('#city');
  const goButton = document.querySelector('#b1');
  const weather = document.querySelector('#weather');

  const createHTML = (name, emoji, temp, feelsLike, description) => `
    <div class='card'>
        <div class='row'>
            <div class='col-2'>
                ${emoji}
            </div>
            <div class ='col-10'>
                <div class='row'>
                    <div class='col-4'>
                        ${name}
                    </div>
                    <div class='col-6'>
                    ${temp}c, feels like ${feelsLike}c
                    </div>
                </div>
                <div class='row'>
                    ${description}
                </div>
                
            </div>
        </div>
    </div>  
  `

  goButton.addEventListener('click', () => {
      const city = cityName.value;
  
 getDataForCity(city)
  .then(data => {
    // get the data we need for our html from the response
    const name = data.name;
    const emoji = emojis[data.weather[0].icon];
    const temp = data.main.temp;
    const feelsLike = data.main.feels_like;
    const description = data.weather[0].description; 
    
    const cardHtml = createHTML(name, emoji, temp, feelsLike, description);

    // render!
    weather.innerHTML = cardHtml;
})
  })