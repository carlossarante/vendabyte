
(function () {
	angular.module('vendabyte.controllers',[])
		.controller('MainController',['$http','ezfb','$scope','$location','$filter','$window','$animate','$timeout','$routeParams','vendabyteService',function($http,ezfb,$scope,$location,$filter,$window,$animate,$timeout,$routeParams,vendabyteService){
			
			
			///OJO PUEDE QUE NO SEA NECESARIO ESTE GET
			vendabyteService.getMe().then(function (data){
				$scope.me = data[0];
				console.log(data);
			});
			////////////////////////////////
			vendabyteService.getArticles().then(function (data){
				$scope.next = data.next;
				$scope.previous = data.previous;
				$scope.articles = data.results;
				console.log($scope.articles);
			});
			////////////////////////////////////////////////////////

			$scope.navigate = function (path){
				$location.path("/"+path);
			}
		}])	
		.controller('ArticleController',['$scope','$location','$animate','$routeParams','vendabyteService',function($scope,$location,$animate,$routeParams,vendabyteService){
		
			vendabyteService.getArticles().then(function (data){
				$scope.next = data.next;
				$scope.previous = data.previous;
				$scope.articles = data.results;
				console.log($scope.articles);
			});
        }])
		.controller('ProductController',['$scope','$location','$animate','$routeParams','vendabyteService',function($scope,$location,$animate,$routeParams,vendabyteService){
			$scope.commentActive = false;			

			$scope.setProduct = function(product){
				$scope.product = product;
				vendabyteService.getUser($scope.product.user).then(function (data){
					var url = $scope.product.user;
					$scope.product.user = data;
					$scope.product.user.url = url;
					console.log("EL USUARIO DEL ARTICULO ES ",data)
				});
			}

			$scope.commentToggle = function (){
				$scope.commentActive = !$scope.commentActive;
			}

			$scope.likedToggle = function (product){
				if(!product.liked){
					vendabyteService.setLiked(product).then(function (data){
						console.log("ME GUSTA ACTIVO",data);
					});
				}
				else{
					vendabyteService.unsetLiked(product).then(function (data){
						console.log("ME GUSTA DESACTIVADO",data);
					});
				}
			}		
			$scope.interestedToggle = function (product){
				if(!product.interested){
					vendabyteService.setInterested(product).then(function (data){
						console.log("INTERESTED ACTIVO",data);
					});
				}
				else{
					vendabyteService.unsetInterested(product).then(function (data){
						console.log("INTERESTED DESACTIVADO",data);
					});
				}
			}		
			$scope.followToggle = function (product){
				if(!product.user.user_following){
					vendabyteService.setFollower(product).then(function (data){
						console.log("FALLOWING",data);
					});
				}
				else{
					vendabyteService.unsetFollower(product).then(function (data){
						console.log("NOT FALLOWING",data);
					});
				}
			}		
        }])
        .controller('CommentsController',['$http','ezfb','$scope','$location','$filter','$window','$animate','$timeout','$routeParams','vendabyteService',function($http,ezfb,$scope,$location,$filter,$window,$animate,$timeout,$routeParams,vendabyteService){

			$scope.comments = [];
			$scope.comment = {};
			
			$scope.fetchComments = function (product){
				$scope.comments = product.comment_set;
				$scope.product = product;
				console.log("el productos es",$scope.product)
			}

			$scope.addComment = function (){
				var time=new Date();
				
				$scope.comment.article = $scope.product.url;
				$scope.comment.date_posted = time.toISOString();
				$scope.comment.user = $scope.product.user.url;
				
				
				console.log($scope.comments);
				console.log($scope.product);

				vendabyteService.setComment($scope.comment).then(function (data){
					console.log("EL RETORNO DEL COMENTARIO ES ", data);
					$scope.comments.push($scope.comment);
					$scope.comment = {};
				});		
				//$scope.commentToggle();		
			}
        }])
})();