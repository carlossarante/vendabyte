
(function () {
	angular.module('vendabyte.controllers',[])
		.controller('MainController',['$http','ezfb','$scope','$location','$filter','$window','$animate','$timeout','$routeParams','vendabyteService',function($http,ezfb,$scope,$location,$filter,$window,$animate,$timeout,$routeParams,vendabyteService){
			vendabyteService.mainScope=$scope;
			$scope.articles = [];	
			$scope.followers = [];		
			
			///OJO PUEDE QUE NO SEA NECESARIO ESTE GET
			vendabyteService.getMe().then(function (data){
				$scope.me = data[0];
			});
			////////////////////////////////
			vendabyteService.getArticles().then(function (data){
				$scope.next = data.next;
				$scope.previous = data.previous;
				$scope.articles = data.results.reverse();
			});

			$scope.addArticle = function (article){
				var articles = $scope.articles;
				articles.reverse().push(article);
				$scope.articles = articles.reverse();
				$scope.$apply();
			}
			////////////////////////////////////////////////////////

			$scope.navigate = function (path){
				$location.path("/"+path);
			}			
		}])	


		.controller('ArticlesController',['$scope','$location','$animate','$routeParams','vendabyteService',function($scope,$location,$animate,$routeParams,vendabyteService){
			vendabyteService.articlesScope=$scope;
			var mainScope = vendabyteService.mainScope;
			
			vendabyteService.getArticles().then(function (data){
				mainScope.next = data.next;
				mainScope.previous = data.previous;
				mainScope.articles = data.results.reverse();				
			});
			
        }])

        .controller('FollowersController',['$scope','$location','$animate','$routeParams','vendabyteService',function($scope,$location,$animate,$routeParams,vendabyteService){
			vendabyteService.followersScope=$scope;
			var mainScope = vendabyteService.mainScope;
			
			vendabyteService.getFollowers().then(function (data){
				mainScope.followers = data.reverse();				
			});
			
        }])


		.controller('ArticleController',['$scope','$location','$animate','$routeParams','vendabyteService',function($scope,$location,$animate,$routeParams,vendabyteService){
			vendabyteService.articleScope = $scope;
			$scope.commentActive = false;
			$scope.comments = [];

			$scope.setProduct = function(product){
				$scope.product = product;
				vendabyteService.getUser($scope.product.user).then(function (data){
					var url = $scope.product.user;
					$scope.product.user = data;
					$scope.product.user.url = url;
				});
				for(i in product.comment_set){
					vendabyteService.getComment(product.comment_set[i]).then(function (data){
						$scope.comments.push(data);
					});
				}
				$scope.product.comment_set=$scope.comments;
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
			$scope.comment = {};
			
			$scope.addComment = function (product){
				var time=new Date();
				
				$scope.comment.article = product.url;
				$scope.comment.date_posted = time.toISOString();
				$scope.comment.user = product.user.url;
								
				vendabyteService.setComment($scope.comment).then(function (data){
					product.comment_set.push(JSON.parse(data));
					$scope.comment = {};
					$scope.commentToggle();
				});		
						
			}
        }])


		.controller('ArticleUploadCtrl', ['$scope','$window','vendabyteService','$http',function($scope,$window,vendabyteService,$http){
		    $scope.myImage='';
		    $scope.myCroppedImage='';
		    $scope.cropedImages = [];
		    $scope.imgIndex = 0;
		    $scope.article = {};
		    $scope.articles = [];
		    $scope.devices = [];		    
		    $scope.brands = [];
		    $scope.models = [];
		    $scope.active = false;
		    
		    var mainScope = vendabyteService.mainScope;

		    vendabyteService.getDevices().then(function (data){
				$scope.devices = data;
			});	

			$scope.getBrands = function (device){
				delete $scope.article.brand;
				delete $scope.article.model;

				vendabyteService.getBrands(device.device_detail).then(function (data){
					$scope.brands = data;
				});
			}
			$scope.getModels = function (brand){
				var models = [];
				$scope.models = [];
				delete $scope.article.model

				for(i in $scope.brands){
					if ($scope.brands[i].brand === brand)
					{
						models = $scope.brands[i].brandmodel_set;
					}
				}

				for(i in models){
					vendabyteService.getModel(models[i]).then(function (data){
						$scope.models.push(data[0]);
					});
				}
			}
			//ENVIO DE FORMULARIO QUE CONTIENE EL ARTICULO
			$scope.sendArticle = function (){

				user = mainScope.me;

				formData = new FormData();
				formData.append("devie",$scope.article.device);
				formData.append("brand",$scope.article.brand);
				formData.append("model",$scope.article.model);
				formData.append("short_description",$scope.article.short_description);
				formData.append("specs",$scope.article.specs);
				formData.append("price",$scope.article.price);
				formData.append("user",window.location.origin+"/api/user/"+user.id+"/");
				formData.append("csrfmiddlewaretoken",$http.defaults.headers.post['X-CSRFToken']);

				var request = new XMLHttpRequest();
				request.open("POST", "/api/article/");
				request.onloadend = function(){	  
					if(request.status === 201){
						articulo = JSON.parse(request.response) ;
						articulo.user = user;
						$scope.sendPicture(articulo);
					}
		    	}
				request.send(formData);
			}
			//ENVIO SECUENCIAL DE LAS IMAGENES DEL FORMULARIO DEL ARTICULO
			$scope.sendPicture = function (articulo){					
				
				if($scope.cropedImages.length > 0){
					formData = new FormData();
					formData.append("article",articulo.url);
					formData.append("art_img",$scope.cropedImages[0].blob);
					formData.append("csrfmiddlewaretoken",$http.defaults.headers.post['X-CSRFToken']);	
					
					var request = new XMLHttpRequest();				
					request.open("POST", "/api/picture/");
					request.onloadend = function(){	  
						if(request.status === 201){ 
							$scope.cropedImages.pop(0);
							articulo.articlepicture_set.push(JSON.parse(request.response));
							$scope.sendPicture(articulo);
						}
			    	}
					request.send(formData);
				}
				else{
					$scope.article={};
					mainScope.addArticle(articulo);				 	
				}		
			}
			//RECORTE DE IMAGENES Y POSICIONAMIENTO EN FORMULARIO
			$scope.cropImage = function (index){
				if(index<5)
				{
					var imagen={
						id:index,
						url : $scope.myCroppedImage,
						blob : $scope.dataURItoBlob($scope.myCroppedImage),
					}

					if(index < $scope.cropedImages.length)
						$scope.cropedImages[index](imagen);
					else{
						$scope.cropedImages.push(imagen);
					}
				}	
				vendabyteService.getDirective("file-select.html").then(function (data){
				 	angular.element("file-select").html(data);
				});				
				$scope.imgIndex ++;
			}

		    //NG-IMAGE-CROP MANEJO DEL ARCHIVO SELECCIONADO
		   	$scope.handleFileSelect=function(evt) {
		      	var file=evt.target.files[0];
		      	var reader = new FileReader();
		      	reader.onload = function (evt) {
		        	$scope.$apply(function($scope){
		          		$scope.myImage=evt.target.result;
		        	});
		      	};
		      	reader.readAsDataURL(file);
		      	$scope.active = true;
		    };
		 //   angular.element(document.querySelector('#selectIn')).on('change',handleFileSelect);
		 //   angular.element(document.querySelector('#dropIn')).on('change',handleFileSelect);

		    $scope.dataURItoBlob = function(dataURI) {
		      	// convert base64 to raw binary data held in a string
		      	// doesn't handle URLEncoded DataURIs
		      	var byteString = atob(dataURI.split(',')[1]);
		     	/* var byteString;
		      	if (dataURI.split(',')[0].indexOf('base64') >= 0)
		        	byteString = atob(dataURI.split(',')[1]);
		      	else
		        	byteString = unescape(dataURI.split(',')[1]);*/

		      	// separate out the mime component
		      	var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

		      	// write the bytes of the string to an ArrayBuffer
		      	var ab = new ArrayBuffer(byteString.length);
		      	var ia = new Uint8Array(ab);
		      	for (var i = 0; i < byteString.length; i++) {
		          	ia[i] = byteString.charCodeAt(i);
		      	}
		      	// write the ArrayBuffer to a blob, and you're done
		      	var blob = new Blob([ab],{"type":mimeString});
		      	return blob
			};
		}])
})();