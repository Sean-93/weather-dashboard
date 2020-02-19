var APIKey = "01fa28afe21461cd783d2b90eac59006";

// Here we are building the URL we need to query the database
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=7ba67ac190f85fdba2e2dc6b9d32e93c&units=imperial" + "http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=7ba67ac190f85fdba2e2dc6b9d32e93c&units=imperial + APIKey;

// Here we run our AJAX call
$.ajax({
  url: queryURL,
  method: "GET"
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {

    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(response);

    // Transfer content to HTML
    $("").html("<h1>" + response.name + " Weather Details</h1>");
    $("").text("Wind Speed: " + response.wind.speed);
    $("").text("Humidity: " + response.main.humidity);
    $("").text("Temperature (F) " + response.main.temp);

    // Converts the temp to Kelvin with the below formula
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;
    $(".tempF").text("Temperature (Kelvin) " + tempF);

    // Log the data in the console as well
    console.log("Wind Speed: " + response.wind.speed);
    console.log("Humidity: " + response.main.humidity);
    console.log("Temperature (F): " + response.main.temp);
  });