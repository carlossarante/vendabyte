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
      .when('/nouvelles', {
        templateUrl: '/static/views/news.html',
        controller: 'NouvellesController'
      })
      .when('/nouvelles/search', {
        templateUrl: '/static/views/news.html',
        //controller: 'NewsSingleController'
      })
      .when('/nouvelles/:singleNew', {
        templateUrl: '/static/views/news.html',
        controller: 'NewsSingleController'
      })
      .when('/nouvelles/section/:section', {
        templateUrl: '/static/views/news.html',
        controller: 'SectionController'
      })
      .when('/:coolsection', {
        templateUrl: function(params){return '/static/views/'+params.coolsection+'.html'},
        controller: 'CoolSectionController'
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

    app.directive('resize', function ($window) {
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
    });
    
})();