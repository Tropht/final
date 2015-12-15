var blogApp = angular.module('blogApp', ['ui.router']);

blogApp.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/home');

	$stateProvider

	// NESTED VIEWS
	.state('home',{
		url: '/home',
		templateUrl:'home.html'
	})
	.state('posts',{
		url:'/posts',
		templateUrl:'posts.html'
	})
	.state('manage',{
		url:'/manage',
		templateUrl:'manage.html'
	})
});

blogApp.service('dbPosts', ['$http', function ($http) {
	this.getPost = function(){
		return $http.get('http://localhost:3000/posts');
	}

	this.deletePost = function(id){
		return $http.delete('http://localhost:3000/posts/' + id);
	}

	this.updatePost = function(id, data){
		return $http.put('http://localhost:3000/posts/' + id, data);
	}

	this.createPost = function(data){
		return $http.post('http://localhost:3000/posts/', data);
	}

}]);


blogApp.service('dbWeather', ['$http', function ($http) {

	this.getWeather = function(){
		return $http.get('http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=84101,us&appid=2de143494c0b295cca9337e1e96b00e0');
	}

}]);

blogApp.controller('myCtrl', ['$scope', 'dbPosts', 'dbWeather', function($scope, dbPosts, dbWeather){

// Get Posts
	dbPosts.getPost().success(function(data){
	$scope.dbPosts = data;

	 $scope.postLength = $scope.dbPosts.length;
	 $scope.lastPost = $scope.dbPosts[$scope.dbPosts.length - 1];

	});

// Get Weather
	dbWeather.getWeather().success(function(data){
	$scope.dbWeather = data;

	$scope.tempurature = $scope.dbWeather.main.temp;
	$scope.cityName = $scope.dbWeather.name;
	$scope.weather = $scope.dbWeather.weather[0].main;
	$scope.weatherLogo;

		switch($scope.weather.toLowerCase()){
			case "clear sky":
				$scope.weatherLogo = "http://openweathermap.org/img/w/01d.png";
				console.log("It's clear!")
				break;
			case "few clouds":
				$scope.weatherLogo = "http://openweathermap.org/img/w/02d.png";
				console.log("A few clouds!")
				break;
			case "scattered clouds":
				$scope.weatherLogo = "http://openweathermap.org/img/w/03d.png";
				console.log("some scattered clouds!")
				break;
			case "broken clouds":
				$scope.weatherLogo = "http://openweathermap.org/img/w/04d.png";
				console.log("some broken clouds!")
				break;
			case "shower rain":
				$scope.weatherLogo = "http://openweathermap.org/img/w/09d.png";
				console.log("Shower rain!")
				break;
			case "rain":
				$scope.weatherLogo = "http://openweathermap.org/img/w/10d.png";
				console.log("rain!")
				break;
			case "thunderstorm":
				$scope.weatherLogo = "http://openweathermap.org/img/w/11d.png";
				console.log("thunderstorm!")
				break;
			case "snow":
				$scope.weatherLogo = "http://openweathermap.org/img/w/13d.png";
				console.log("snow!")
				break;
			case "mist":
				$scope.weatherLogo = "http://openweathermap.org/img/w/50d.png";
				console.log("mist!")
				break;
		}
	});


	$scope.newPost = {
		"date": todayDate
	}; //New Post Object


// Create Posts
	$scope.create = function(){
			dbPosts.createPost($scope.newPost);

			$scope.newPost = {
				"date": todayDate
			};
			window.location.reload();
		}
// Delete Posts
	$scope.delete = function(id){
			dbPosts.deletePost(id).success(function(resp){
				console.log(resp)
			});
			window.location.reload();
		};


}])

// Clock

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
		var ma;
    m = checkTime(m);
    s = checkTime(s);
  	// $('#clock').html(h + ":" + m + ":" + s);

		if(h >= 12){
			h - 12;
			ma = "PM";
			$('#clock').html(h + ":" + m + " " + ma);
		}
		else{
			ma = "AM";
			$('#clock').html(h + ":" + m + " " + ma);
		}


    var t = setTimeout(startTime, 500);

}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

// Today's Date

var today = new Date();
var day = today.getDate();
var month = today.getMonth();
var year = today.getUTCFullYear();

var todayDate = (month + 1) + '/' + day + '/' + year;

// Geo location
var lat = null;
var lon = null;

function showPosition(position) {
	lat = position.coords.latitude;
	lon = position.coords.longitude;

		console.log(lat + " " +  lon);
}

function doit(){
	console.log(lat);
}


navigator.geolocation.getCurrentPosition(showPosition);


// window.setInterval(function(){
// 	if (lat == null) {
// 		console.log("Is null");
// 	}else{
// 		console.log("Is not null");
// 	}
// }, 100);
