// Controllers

weatherApp.controller('homeController', ['$scope', '$location', 'cityService',  function($scope, $location, cityService){
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
        
        cityService.city = $scope.city;
        console.log(cityService.city);
    });
    
    $scope.submit = function() {
        $location.path("/forecast")
    }
    
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.day = $routeParams.days || 2;
    
    $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily', { callback: "JSON_CALLBACK"}, { get: { method: "JSONP" }});
    
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.day, lang: 'vi', units: 'metric', APPID: '308c9644209581b934953762770eb74b' });
    
    console.log($scope.weatherResult);
    
    $scope.covertToDate = function(dt) {
      
        return new Date(dt * 1000);
    };
    
}]);