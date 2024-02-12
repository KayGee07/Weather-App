//Author: Kgothatso Lechoenyo
//Date: 26 January 2024
//Description: javascript for the weather app. this controls the placehlder function, background change per weather forecast, weather image change per weather forecast.it also fetches the data fot the weather forecast with an api and url which you can formulate in the JSON format. 

//const for the different boxes(conatiners)
const content =  document.querySelector('.content');
const search =  document.querySelector('.search-box button');
const weatherBox =  document.querySelector('.weather-box');
const weatherDetails =  document.querySelector('.weather-details');
const error404 =  document.querySelector('.not-found');

//function for the placeholder
let i = 0;
let placeholder = "";
const txt = "Enter your location";
const speed = 170;

function type(){
	placeholder += txt.charAt(i);
	document.getElementById("location-id").setAttribute("placeholder",placeholder);
	i++;
	setTimeout(type,speed);
}

//returning the placeholder function
type();

//search function for the weather details
search.addEventListener('click', () => {

//API key from open weather map
    const APIKey = '7f27d68ff840e54a7f8e501b6dbda5cf';
    const city = document.querySelector('.search-box input').value; //container for the city you want the weather of

    if (city === '')
        return;

//API url used to fetch the weather details
       fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

//code used if the city is not found in the location
            if (json.cod === '404') {
                content.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');
			
			//container for the information such as temperature, humidity etc

            const image = document.querySelector('.background-clip');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            const weatherImg = document.querySelector('.weather-box img');

		//switch case for the background video, it changes everytime there is a different weather description
            switch (json.weather[0].main){
                case 'Clear':
                    image.src = 'images/sunnySky.mp4';
                    break;

                case 'Rain':
                     image.src = 'images/rainBackground.mp4';
                        break;    

                case 'Snow':
                    image.src = 'images/snowyBackground.mp4';
                    break;

                case 'Clouds':
                    image.src = 'images/clearSky.mp4';
                        break;        

                case 'Mist':
                    image.src = 'images/MistyBackground.mp4';
                    break;

				case 'Fog':
                    image.src = 'images/MistyBackground.mp4';
                    break;

				case 'Haze':
                    image.src = 'images/MistyBackground.mp4';
                    break;	
                
                default:
                    image.src = 'images/DefaultVideo.mp4';


            }
			
			//switch case for weather box image based on the weather Description
			switch (json.weather[0].main){
                 case 'Clear':
                    weatherImg.src = 'images/sun.GIF';
                    break;

                case 'Rain':
                     weatherImg.src = 'images/rainGIF.GIF';
                        break;    

                case 'Snow':
                    weatherImg.src = 'images/snowy.GIF';
                    break;

                case 'Clouds':
                    weatherImg.src = 'images/cloudy.GIF';
                        break;        

                case 'Haze':
                    weatherImg.src = 'images/fog.GIF';
                    break;

				case 'Mist':
                    weatherImg.src = 'images/fog.GIF';
                    break;

				case 'Fog':
                    weatherImg.src = 'images/fog.GIF';
                    break;
                
                default:
                    weatherImg.src = 'images/clouds.jpg';
            }
			
//this is the measurement used for each container
           temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
           description.innerHTML = `${json.weather[0].description}`;
           humidity.innerHTML = `${json.main.humidity}%`;
           wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

//styling the different containers
           weatherBox.style.display = '';
           weatherDetails.style.display = '';
           weatherBox.classList.add('fadeIn');
           weatherDetails.classList.add('fadeIn');
           content.style.height = '590px';



       });
});
