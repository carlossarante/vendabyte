
(function () {
	angular.module('vendabyte.controllers',[])
		.controller('MainController',['$http','ezfb','$scope','$location','$filter','$window','$animate','$timeout','$routeParams','vendabyteService',function($http,ezfb,$scope,$location,$filter,$window,$animate,$timeout,$routeParams,vendabyteService){
			vendabyteService.mainScope=$scope;
			$scope.articles = [];	
			$scope.followers = [];		
			
			///OJO PUEDE QUE NO SEA NECESARIO ESTE GET
			vendabyteService.getMe().then(function (data){
				$scope.me = data[0];
				$scope.me.url = window.location.origin+"/api/user/"+$scope.me.id+"/";
			});
			////////////////////////////////
			$scope.addArticle = function (article){
				var articles = $scope.articles;
				articles.push(article);
				$scope.articles = articles;
				$scope.$apply();
			}
			////////////////////////////////////////////////////////

			$scope.navigate = function (path){
				$location.path("/"+path);
			}			
		}])			

        .controller('FollowersController',['$scope','$location','$animate','$routeParams','vendabyteService',function($scope,$location,$animate,$routeParams,vendabyteService){
			vendabyteService.followersScope=$scope;
			var mainScope = vendabyteService.mainScope;
			var param = "";
			
			switch ($location.path()) {
				case "/siguiendo":
					param = "following";
					break;
				case "/seguidores":
					param = "followers";
					break;
				default:
					param = "";
			}

			mainScope.followers = [];	

			vendabyteService.getFollowers(param).then(function (data){
				mainScope.followers = data;				
			});
        }])
		.controller('FollowerController',['$scope','$location','$animate','$routeParams','vendabyteService',function($scope,$location,$animate,$routeParams,vendabyteService){
			vendabyteService.followerScope=$scope;
			$scope.user ={};
			//$scope.user.user_following = true;
			
			$scope.followToggle = function (follower){
				follower.url = window.location.origin+"/api/user/"+follower.id+"/";

				
				if(!follower.user_following){
					vendabyteService.setFollower(follower.url).then(function (data){						
						if(data.Success){
							follower.user_following = true;
							$scope.user=follower;
						}
					});
				}
				else{
					vendabyteService.unsetFollower(follower.url).then(function (data){						
						if(data.Success){
							follower.user_following = false;
							$scope.user=follower;
						}
					});
				}
			}	

        }])

        .controller('ArticlesController',['$scope','$location','$animate','$routeParams','vendabyteService',function($scope,$location,$animate,$routeParams,vendabyteService){
			vendabyteService.articlesScope=$scope;
			var mainScope = vendabyteService.mainScope;
			var param = "";

			switch ($location.path()) {
				case "/nuevo":
					param = "new";
					break;
				case "/popular":
					param = "popular";
					break;
				case "/meinteresa":
					param = "interesting";
					break;
				case "/lovendo":
					param = "selling"
					break;
				default:
					param = "";
			}

			mainScope.articles = [];		

			vendabyteService.getArticles(param).then(function (data){
				mainScope.next = data.next;
				mainScope.previous = data.previous;
				mainScope.articles = data.results;				
			});
        }])


		.controller('ArticleController',['$scope','$location','$animate','$routeParams','vendabyteService',function($scope,$location,$animate,$routeParams,vendabyteService){
			vendabyteService.articleScope = $scope;
			$scope.commentActive = false;
			//$scope.comments = [];
			$scope.index = 2;
			$scope.showMore = false;

			var product = $scope.$parent.product;

			if(product.comment_set.length > 2)
			{
				$scope.showMore = true;
			}

			$scope.setIndex = function (product){
				$scope.index = product.comment_set.length;
			}

			$scope.verify = function (product){
				if (product.user.id === $scope.me.id)
				{
					return false;
				}
				else
					return true;
			}

			$scope.commentToggle = function (){
				$scope.commentActive = !$scope.commentActive;
			}

			$scope.likedToggle = function (product){
				var object = {"article":product.url, "user":window.location.origin+"/api/user/"+product.user.id+"/"}
				if(!product.liked){
					vendabyteService.setLiked(object).then(function (data){
					});
				}
				else{
					vendabyteService.unsetLiked(object).then(function (data){
					});
				}
			}	

			$scope.interestedToggle = function (product){
				var object = {"article":product.url, "user":window.location.origin+"/api/user/"+product.user.id+"/"}
				if(!product.interested){
					vendabyteService.setInterested(object).then(function (data){
					
					});
				}
				else{
					vendabyteService.unsetInterested(object).then(function (data){
						
					});
				}
			}		

			$scope.followToggle = function (product){
				if(!product.user.user_following){
					vendabyteService.setFollower(window.location.origin+"/api/user/"+product.user.id+"/").then(function (data){
						if(data.Success){
							product.user.user_following = true;
						}

					});
				}
				else{
					vendabyteService.unsetFollower(window.location.origin+"/api/user/"+product.user.id+"/").then(function (data){
						if(data.Success){
							product.user.user_following = false;
						}
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
								
				vendabyteService.setComment($scope.comment).then(function (data){
					product.comment_set.push(data);
					$scope.comment = {};
					$scope.commentToggle();
					$scope.$parent.$parent.index +=1;	//articleScope		
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
		    	if($scope.cropedImages.length > 0)
		    	{
		    		request.send(formData);	
		    	}
		    	else{
		    		alert("Recorte la imagen");
		    	}				
			}
			//ENVIO SECUENCIAL DE LAS IMAGENES DEL FORMULARIO DEL ARTICULO
			$scope.sendPicture = function (articulo){					
				
				if($scope.cropedImages.length > 0){
					formData = new FormData();
					formData.append("article",articulo.url);
					formData.append("art_img",$scope.cropedImages[0].blob,chance.string({pool:'abcdefghijklmnopqrstxyz'})+".png");
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
					$scope.active = false;
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