$(function () {
    var cityName = $('#search-city');
    var forcast = $('.forcast');
    var city = $('#city-name');
    var cityTemp = $('#temp');
    var cityWind = $('#wind');
    var cityHumidity = $('#humidity');
    var forecastDay = $('.forecast');
    var boxIcon = $('#icon');
    var citySearch;
    
    function savehistory(searchedName) {
        localStorage.setItem('City', JSON.stringify(searchedName));
        var history = [];
        history.push(JSON.parse(localStorage.getItem('City')));
    
        
        
        for (var i = 0; i < history.length; i++) { //is making a button for each letter.... is it bc history is not a list?????
            var btn = $('<button>'); 
            btn.text(history[i]);
            $('#previously-searched').append(btn);
        }
        
    }
    

    function weather() {
        citySearch = $('#search-city').val().trim();
        //console.log(citySearch);
        var cityData = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearch}&cnt=40&units=imperial&appid=745a69533ad8b9cebd150df776c4e1ea`;
        
        fetch(cityData).then(response => { //same as function(response)
            return response.json();
        })
            .then(data => {
                //console.log(data);
                var searchedName = data.city.name; 
                savehistory(searchedName);
                
                for (var i = 0; i < forecastDay.length; i++) { //first for loop iterates through each box to hold 5 day forecast and allows us to work on one box at a time; 
                    for (let i = 0; i < data.list.length; i+=8) { //second loop takes in the data and appends the text with the desired data for each class
                        //var icon = data.list[i].weather[0].icon;
                        $('.date').text(dayjs(data.list[i].dt_txt.split(" ")[0]).format('MM/DD/YYYY')); //only giving date of the next day bc the api link only shows 5 results of tmr???? need to find new api link, code works tho
                        $('.icon').attr("src", `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`)
                        $('.temp').text('Temp: ' + data.list[i].main.temp + 'F');
                        $('.wind').text('Wind: ' + data.list[i].wind.speed);
                        $('humidity').text('Humidity: ' + data.list[i].main.humidity + "%");
    
                    }
                }
            })
        curWeather(citySearch);
        
    }

    function curWeather(citySearch) {
        var rnWeather = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=imperial&appid=745a69533ad8b9cebd150df776c4e1ea`;
        fetch(rnWeather).then(response => {
            return response.json();
        })
            .then(data => {
                //console.log(data);
                city.text(data.name + " (" + dayjs().format('MM/DD/YYYY') + ")");
                boxIcon.attr("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
                cityTemp.text('Temp: ' + data.main.temp + 'F');
                cityWind.text('Wind Spd: ' + data.wind.speed);
                cityHumidity.text('Humidity: ' + data.main.humidity + '%');
            })
    }
    
    
    
    $('#search-btn').on('click', weather);
})


