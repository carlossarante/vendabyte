
(function () {
	angular.module('vendabyte.controllers',[])
		.controller('MainController',['$http','ezfb','$scope','$location','$filter','$window','$animate','$timeout','$routeParams','vendabyteService',function($http,ezfb,$scope,$location,$filter,$window,$animate,$timeout,$routeParams,vendabyteService){
			
			///OJO PUEDE QUE NO SEA NECESARIO ESTE GET
			vendabyteService.getUser().then(function (data){
				$scope.user = data[0];
				console.log(data);
			});
			////////////////////////////////
			vendabyteService.getArticles().then(function (data){
				$scope.next = data.next;
				$scope.previous = data.previous;
				$scope.articles = data.results;
				console.log($scope.articles);
			});
		}])	
		.controller('ArctileController',['$scope','$location','$animate','$routeParams','vendabyteService',function($scope,$location,$animate,$routeParams,vendabyteService){

			vendabyteService.getArticles().then(function (data){
				$scope.articles = data;
				console.log($scope.articles);
			});

			/*if($routeParams.page){
				nouvelleService.getNews('/nouvelles/section/'+$routeParams.section+'/?format=json&query=nouvelles&page='+$routeParams.page).then(function (data){
					$scope.alternouvelles(data);
				});
			}
			else
			{
				nouvelleService.getNews('/nouvelles/section/'+$routeParams.section+'/?format=json&query=nouvelles').then(function (data) {
	          		$scope.alternouvelles(data);
	        	});				
			}
			if(!$scope.inter)
			{
				nouvelleService.getPrincipals().then(function (data) {
	          		$scope.portada = data;
	        	});
			}		*/	
        }])
})();