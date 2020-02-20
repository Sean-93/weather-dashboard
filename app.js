
// Weather Homework URLS: 
// Forecast: "http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=7ba67ac190f85fdba2e2dc6b9d32e93c&units=imperial"
// Icon: "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png"

$(document).ready(function(){
  var APIKey = "01fa28afe21461cd783d2b90eac59006";
  
$("#search-button").on("click", function() {
  var searchValue = $("#search-value").val();
  console.log(searchValue);
  $("#search-value").val("");
  searchweather(searchValue);
}
)

// Here we are building the URL we need to query the database


function searchweather(searchValue){
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    searchValue +
    "&appid=" + APIKey + "&units=imperial";
    $.ajax({
      url: queryURL,
      method: "GET", 
      dataType: "json"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {
        // Log the queryURL
        console.log(queryURL);
    
        // Log the resulting object
        console.log(response);
    
        // Transfer content to HTML
        $(".city-title").text(response.name + " Weather Details");
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humid").text("Humidity: " + response.main.humidity);
        $(".temp").text("Temperature (F) " + response.main.temp);
    
        // Converts the temp to Kelvin with the below formula
        var tempF = (response.main.temp - 273.15) * 1.8 + 32;
        $(".tempF").text("Temperature (Kelvin) " + tempF);
    
        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);
      });
    }

})
