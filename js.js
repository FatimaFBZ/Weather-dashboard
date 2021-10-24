
var searchBtnEl = document.getElementById('searchBtn');
var cityInputEl = document.getElementById('cityInput');
var weatherApiRootUrl = 'https://api.openweathermap.org';
var weatherApiKey = 'a213d13dc454e663310b5264f878e492';
var today = moment();
$("#date").text(today.format("MMM Do, YYYY"));





function fiveDaysWeather(data) {
    console.log(data);
    let fiveDaysUrl = `${weatherApiRootUrl}/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&exclude=minutely,hourly&appid=${weatherApiKey}`;
    fetch(fiveDaysUrl)
    .then(data => data.json())
    .then(data => { 
      console.log("data",data);
     //let today=data.current
     
     
     
      let daily=data.daily
      console.log(data.daily[0])
      $('#cityContainer1').empty()
      for(let i=0;i<5;i++){

        let temp= data.daily[i].temp.day
        let wind=data.daily[i].wind_speed
        let humidity=data.daily[i].humidity
        let uvi= data.daily[i].uvi
        

      var dailyHtml= $('<h5>')
      dailyHtml.text(moment.unix(data.daily[i].dt).format("MMM Do YY"))
      $('#cityContainer1').append(dailyHtml)
    
      var temHtml=$('<h1>')
      temHtml.text("temp" + ":"+ temp +'\xB0'+ 'F')
      $('#cityContainer1').append(temHtml)

      var windHtml=$('<h2>')
      windHtml.text("wind"+ ":"+ wind +'MPH')
      $('#cityContainer1').append(windHtml)

      var humidityHtml=$('<h3>')
      humidityHtml.text("humidity"+ ":" +humidity+'%')
      $('#cityContainer1').append(humidityHtml)
      var uviHtml=$('<h4>')
      uviHtml.text("uvi"+ ":"+uvi)
      $('#cityContainer1').append(uviHtml)

      }
      






    

    })
    
    
}
    

   



function onclickBtn() {
    let cityName = cityInputEl.value;
    console.log(cityName);
    

    let url = `${weatherApiRootUrl}/geo/1.0/direct?q=${cityName}&&units=imperial&exclude=minutely,hourly&appid=${weatherApiKey}`;
   
    fetch(url)
    .then(data => data.json())
    .then(data => {
        console.log( data)
        fiveDaysWeather(data);
        
    });
    
   }


searchBtnEl.onclick = onclickBtn;



/*document.addEventListener('addcity',()=>{
    document.getElementById('#add-city').addEventListener('click',addcity)
})*/




const saveToLocalStorage= ()=> {
    let cityName = localStorage.getItem("cityName")+','+ cityInput.value;

    localStorage.setItem('cityName', cityName)
   
}
searchBtnEl.addEventListener('click',saveToLocalStorage)


function cityCity(event){
  console.log(event.target.innerText)
  var cityName= event.target.innerText
  
  
  let url = `${weatherApiRootUrl}/geo/1.0/direct?q=${cityName}&&units=imperial&exclude=minutely,hourly&appid=${weatherApiKey}`;
   
  fetch(url)
  .then(data => data.json())
  .then(data => {
      fiveDaysWeather(data);


      let daily=data.current
      console.log(data.current)
      //$('#cityC').empty()
      for(let i=0;i<1;i++){

        let temp= data.current.temp
        let wind=data.current.wind_speed
        let humidity=data.current.humidity
        let uvi= data.current.uvi
        
      var dailyHtml= $('<h6>')
      dailyHtml.text(moment.unix(data.current.dt).format("MMM Do YY"))
      $('#cityC').append(dailyHtml)
    
      var temHtml=$('<h6>')
      temHtml.text("temp" + ":"+ temp +'\xB0'+ 'F')
      $('#cityC').append(temHtml)

      var windHtml=$('<h6>')
      windHtml.text("wind"+ ":"+ wind +'MPH')
      $('#cityC').append(windHtml)

      var humidityHtml=$('<h6>')
      humidityHtml.text("humidity"+ ":" +humidity+'%')
      $('#cityC').append(humidityHtml)
      var uviHtml=$('<h6>')
      uviHtml.text("uvi"+ ":"+uvi)
      $('#cityC').append(uviHtml)

      }
   })
}


    
 




function init() {
    let cityName = localStorage.getItem("cityName").split(",");
    console.log(cityName);
    for(let i = 0; i < cityName.length; i++){

        let newBtn = document.createElement("button");
       
        newBtn.classList.add('new-Btn');
        newBtn.innerText = cityName[i];
        cityContainer.append(newBtn);
        
    }
    const cityBtnEl = document.getElementsByClassName('new-Btn')
    for(i=0;i<cityBtnEl.length;i++){
        cityBtnEl[i].onclick = cityCity

    }
    
    

}

init();

   






