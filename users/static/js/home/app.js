(function(){

  var app = angular.module('vendabyte',[
    'ngRoute',
    //'ngSanitize',
    //'ngAnimate',
    'ngCookies',
    'ngImgCrop',
    'ezfb',
    'infinite-scroll',
    'ngLoad',
    'vendabyte.controllers',
    'vendabyte.services',
    'vendabyte.directives',
    'vendabyte.customFilters'
  ]);

  app.run(function($http, $cookies) {
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
  });

  app.config(['$locationProvider', function ($locationProvider) {

      $locationProvider.html5Mode(true).hashPrefix('!');
  }]);

  app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: '/static/views/home.html',
        controller: 'ArticlesController'
      })
      .when('/register', {
        templateUrl: '/static/views/register.html',
        //controller: 'ArticlesController'
      })
      .otherwise({
        redirectTo: '/'
      });
    }]);

    app.config(['ezfbProvider', function (ezfbProvider) {
      ezfbProvider.setInitParams({
        appId: '212602532249853'
      });
    }]);  
})();