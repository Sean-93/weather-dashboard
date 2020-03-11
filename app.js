// Icon: "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png"


var recentSearches = localStorage.getItem("recentSearches");
var APIKey = "01fa28afe21461cd783d2b90eac59006";

$(document).ready(function() {
  
  if(recentSearches){
    recentSearches = JSON.parse(recentSearches);
    searchweather(recentSearches[recentSearches.length - 1]);
  }else {
    recentSearches = [];
  }

  recentSearches.forEach((item) => {

    $("#search-history").append(`<p>${item}</p>`);
    
  });
  
  // generate buttons for each city
  
  $("#search-button").on("click", function() {
    var searchValue = $("#search-value").val().trim();
    
    if(searchValue === "") return;
    
    if(!recentSearches.includes(searchValue)){
      recentSearches.push(searchValue);
      localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    }
    
    $("#search-value").val("");
    searchweather(searchValue);
    
    $("#search-history").append(`<p>${searchValue}</p>`);
    
     

  });
  
  function searchweather(searchValue) {
    var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchValue +
    "&appid=" +
    APIKey +
    "&units=imperial";
    $.ajax({
      url: queryURL,
      method: "GET",
      dataType: "json"
    })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
      
      
      // Log the resulting object
      // console.log(response);
      
      // Transfer content to HTML
      $(".city-title").text(response.name + " Weather Details");
      $(".wind").text("Wind Speed: " + response.wind.speed);
      $(".humid").text("Humidity: " + response.main.humidity);
      $(".temp").text("Temperature (F) " + response.main.temp);
      
      // Converts the temp to Kelvin with the below formula
      var tempF = (response.main.temp - 273.15) * 1.8 + 32;
      $(".tempF").text("Temperature (Kelvin) " + tempF);
      
      fiveDay(searchValue);
    });
  }
  
  
  function fiveDay(searchValue) {
    var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    searchValue +
    "&appid=" +
    APIKey +
    "&units=imperial";
    $.ajax({
      url: queryURL,
      method: "GET",
      dataType: "json"
    })
    
    .then(function(response) {
      var latitude = response.city.coord.lat;
      var longitude = response.city.coord.lon;
      console.log("RESPONSE", latitude, longitude);

      uvIndex(latitude, longitude);
      
      $("#forecast").html('<h4 class="mt-3" > 5 Day Forecast: </h4>').append('<div class="row">')
      
      for (let i = 0; i < response.list.length; i++) {
        if(response.list[i].dt_txt.indexOf("15:00:00")!==-1) {
          var col = $("<div>").addClass("col-3")
          var card = $("<div>").addClass("card bg-primary text-white")
          var body = $("<div>").addClass("card-body p-2")
          var title = $("<h5>")
          .addClass("card-title")
          .text(new Date(response.list[i].dt_txt).toLocaleDateString())
          var temp = $("<p>")
          .addClass("card-text")
          .html(response.list[i].main.temp + "<span>&#8457;</span>")
          
          var humidity = $("<p>")
          .addClass("card-text")
          .text("Humidity: " + response.list[i].main.humidity)
          
          
          col.append(card.append(body.append(title, temp, humidity)))
          $("#forecast .row").append(col)
        }
      }
      
    });
    
  }
  
  
  function uvIndex(latitude, longitude) {
    var queryURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${APIKey}&lat=${latitude}&lon=${longitude}`;
    $.ajax({
      url: queryURL,
      method: "GET",
      dataType: "json"
    }).then(function(response) {
      
      console.log("uvResponse", response);
      
      $("#uv-index").html(response.value);
  });
}
    
});