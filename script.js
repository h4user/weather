const form = document.getElementById("form")
const container = document.getElementById('card-holder')
const secondContainer = document.getElementById('second')
let target = '';
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if(!form.enter.value){
    target = form.city.value;
  }
  else{
    target = form.enter.value;
  }
  try{
    let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=73bb3fa070954c3bae195513250805&q=${target}&days=14&aqi=yes&alerts=yes`)
      if(!res.ok){
        throw "Error " + response.status;
      }
      let data = await res.json()
      console.log(data)
      DrawCards(data)
  }
  catch(e){
     alert("Error 404: "+e.message)
  }
})



function DrawCards(data){
  container.innerHTML = ``;
  let days = data.forecast.forecastday
  days.forEach( (e) => {
    let card = document.createElement('div')
    card.classList.add('cards');
    let [year, month, day] = e.date.split('-');
    card.innerHTML = `
    <p style="text-align: center; margin: 7px 0px; font-size: 25px;">${day} ${getMonthName(month)}</p>
    <div class="a" style="
    background-image: url('https:${e.day.condition.icon}');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    padding: 10px;
  ">
      <img src="img/warm.png" height="30px">
      <p>${e.day.avgtemp_c}°C</p>
      <img src="img/wind.png" height="30px">
      <p>${e.day.maxwind_kph}K/h</p>
      <img src="img/water.png" height="30px">
      <p>${e.day.avghumidity}%</p>
    </div>
    `
    container.append(card)
  });
  let time = data.location.localtime.split(" ")
  let lat = data.location.lat;
  let lon = data.location.lon;
  secondContainer.innerHTML = `
                               <h2>Country: ${data.location.country}</h2>
                               <h2>City: ${data.location.name}</h2>
                               <h2>Local Time: ${time[1]}</h2>
                               <iframe
                               style="border:0;"
                               loading="lazy"
                               allowfullscreen
                               referrerpolicy="no-referrer-when-downgrade"
                               src="https://www.google.com/maps?q=${lat},${lon}&hl=en&z=13&output=embed">
                               </iframe>
  `
}
function getMonthName(monthNumber) {
  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  return months[monthNumber - 1];
}
