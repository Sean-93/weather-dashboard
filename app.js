// Weather Homework URLS:
// Forecast: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=&units=imperial"
// Icon: "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png"

$(document).ready(function() {
  var APIKey = "01fa28afe21461cd783d2b90eac59006";

  $("#search-button").on("click", function() {
    var searchValue = $("#search-value").val();
    console.log(searchValue);
    $("#search-value").val("");
    searchweather(searchValue);

    // $("#search-history").document.append("<p> "searchValue" </p>");
  });

  // Here we are building the URL we need to query the database

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
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {
        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        $("#forecast").html('<h4 class="mt-3" > 5 Day Forecast: </h4>').append('<div class="row">')

        for (let i = 0; i < response.list.length; i++) {
          if(response.list[i].dt_txt.indexOf("15:00:00")!==-1) {
            var col = $(" <div> ").addClass("col-md-2")
            var card = $(" <div> ").addClass("card bg-primary text-white")
            var body = $(" <div> ").addClass("card-body p-2")
            var title = $(" <h5> ").addClass("card-title").text(new Date(response.list[i].dt_txt).toLocaleDateString())
            var temp = $(" <p> ").addClass("card-text").text(response.list[i].main.temp)
            var humidity = $(" <p> ").addClass("card-text").text(response.list[i].main.humidity)

            col.append(card.append(body.append(title, temp, humidity)))
            $("#forecast .row").append(col)
          }

          
        }
        
        // Transfer content to HTML
        // $(".city-title").text(response.name + " Weather Details");
        // $(".wind").text("Wind Speed: " + response.wind.speed);
        // $(".humid").text("Humidity: " + response.main.humidity);
        // $(".temp").text("Temperature (F) " + response.main.temp);

        // // Converts the temp to Kelvin with the below formula
        // var tempF = (response.main.temp - 273.15) * 1.8 + 32;
        // $(".tempF").text("Temperature (Kelvin) " + tempF);

        // // Log the data in the console as well
        // console.log("Wind Speed: " + response.wind.speed);
        // console.log("Humidity: " + response.main.humidity);
        // console.log("Temperature (F): " + response.main.temp);
      });
      
  }
});
