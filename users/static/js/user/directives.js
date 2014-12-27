(function (){
	angular.module('vendabyte.directives',[])
		.directive('fileSelect', function () {
	      return {
	        restrict: 'E',
	        templateUrl: '/static/partials/file-select.html'
	      };
	    })
	    .directive('articleForm', function () {
	      return {
	        restrict: 'E',
	        templateUrl: '/static/partials/article-form.html'
	      };
	    })
	    .directive('optionsMenu', function () {
	      return {
	        restrict: 'E',
	        templateUrl: '/static/partials/options-menu.html'
	      };
	    })
	    .directive('vendabyteProducts', function () {
	      return {
	        restrict: 'E',
	        templateUrl: '/static/partials/vendabyte-products.html'
	      };
	    })
	    .directive('vendabyteFollowers', function () {
	      return {
	        restrict: 'E',
	        templateUrl: '/static/partials/vendabyte-followers.html'
	      };
	    })

		.directive('resize', function ($window) {
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