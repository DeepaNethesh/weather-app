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

  const createHTML = (name, emoji, temp, feelsLike, description, img) => `
    <div class='card container bg-light ' style='width:900px;'>
  
        <div class='row'>
            <div class='col-2 fs-2 py-auto'>
                ${emoji}
            </div>
            <div class ='col-10 px-1'>
                <div class='row'>
                    <div class='col-4 fw-bold fs-4 mr-1'>
                        ${name}
                    </div>
                    <div class='col-6 fs-6 pt-2 fs-4'>
                    ${temp}c, feels like ${feelsLike}c
                    </div>
                </div>
                <div class='row fs-4'>
                    ${description}
                </div>
                
            </div>
        </div>

    </div>  
    <div class='container pt-4 ' style ='height:100px; '>
    <div class='row'>
    <div class='col-lg-6 col-sm-12 ps-5'>
        <img src='${img}'>
        </div>
        </div>
        </div>
  `
      //     <div class ='image'>
    //     <img style='background-image:contain; width:100%; height: 400px;' src='./Images/weather.png'>
    // </div>
//   const image = document.querySelector('.img');
  goButton.addEventListener('click', (event) => {
      
      const city = cityName.value;
  
 getDataForCity(city)
  .then(data => {
    
    // get the data we need for our html from the response
    const name = data.name;
    const emoji = emojis[data.weather[0].icon];
    const temp = data.main.temp;
    const feelsLike = data.main.feels_like;
    const description = data.weather[0].description; 
    let img;
          
    if(description.includes('rain' )) {
        img = 'https://images.unsplash.com/photo-1612813731879-981ed830ecca?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDJ8fGxpZ2h0JTIwcmFpbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&h=500&q=60'
    } else if (description == 'clear sky') {
        img = 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzl8fGNsZWFyJTIwc2t5fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&h=500&q=60' 
    } else if (description.includes('clouds')) {
        img= 'https://images.unsplash.com/photo-1598378028718-37a61e030860?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8c2NhdHRlcmVkJTIwY2xvdWRzfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&h=500&q=60'
    } else if (description == 'mist' || description == 'fog' || description == 'haze') {
        img = 'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8bWlzdHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&h=500&q=60'
    } else if (description.includes('snow' )){
        img = 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8c25vd3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    } 


    const cardHtml = createHTML(name, emoji, temp, feelsLike, description, img);

    // render!
    weather.innerHTML = cardHtml;
})
  })