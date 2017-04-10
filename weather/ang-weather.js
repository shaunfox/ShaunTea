    
        var Weather = angular.module('Weather', []);  
  
        Weather.controller('WeatherController', ['$scope', '$http', function ($scope, $http) {  
  
            $http({   
                url: 'http://api.map.baidu.com/telematics/v3/weather',  
                method: 'jsonp',  
                params: {  
                    location: "北京",  
                    output: 'json',  
                    ak: '0A5bc3c4fb543c8f9bc54b77bc155724',  
                    callback: 'JSON_CALLBACK'  
                }  
            }).success(function (info) {  
  
                console.log(info);   
                $scope.weatherData = info.results[0].weather_data;   
            }); 
        }]);   