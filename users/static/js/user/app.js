(function(){

	var app = angular.module('vendabyte',[
		'ngRoute',
    'ngSanitize',
    'ngAnimate',
    'ezfb',
		'vendabyte.controllers',
		'vendabyte.services' 
	]);

	app.config(['$locationProvider', function ($locationProvider) {

    	$locationProvider.html5Mode(true).hashPrefix('!');
  }]);

	app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: '/static/views/home.html',
        //controller: 'NouvellesController'
      })
      .when('/users/:user', {
        templateUrl: '/static/views/article.html',
        //controller: 'NewsSingleController'
      })
      .when('/nuevo', {
        templateUrl: '/static/views/article.html',
        //controller: 'NewsSingleController'
      })     
      .when('/popular', {
        templateUrl: '/static/views/article.html',
        //controller: 'NewsSingleController'
      })
      .when('/meinteresa', {
        templateUrl: '/static/views/article.html',
        //controller: 'NewsSingleController'
      })
      .when('/lovendo', {
        templateUrl: '/static/views/article.html',
        //controller: 'NewsSingleController'
      })
      .when('/siguiendo', {
        templateUrl: '/static/views/follower.html',
        //controller: 'NewsSingleController'
      })
      .when('/seguidores', {
        templateUrl: '/static/views/follower.html',
        //controller: 'NewsSingleController'
      })
      .when('/profile', {
        templateUrl: '/static/views/profile.html',
        //controller: 'NewsSingleController'
      })
      /*.when('/:coolsection', {
        templateUrl: function(params){return '/static/views/'+params.coolsection+'.html'},
        //controller: 'CoolSectionController'
      })      */
      .otherwise({
        redirectTo: '/'
      });
  	}]);

    app.config(['ezfbProvider', function (ezfbProvider) {
      ezfbProvider.setInitParams({
        appId: '386469651480295'
      });
    }]);

    /*app.directive('resize', function ($window) {
        return function (scope, element) {
            var w = angular.element($window);
            scope.getWindowDimensions = function () {
                return {
                    'h': w.height(),
                    'w': w.width()
                };
            };
            scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
                scope.windowHeight = newValue.h;
                scope.windowWidth = newValue.w;

                scope.style = function () {
                    return {
                        'height': (newValue.h - 100) + 'px',
                            'width': (newValue.w - 100) + 'px'
                    };
                };

            }, true);

            w.bind('resize', function () {
                scope.$apply();
            });
        }
    });*/
    
})();