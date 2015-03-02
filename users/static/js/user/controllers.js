
(function () {
	angular.module('vendabyte.controllers',[])
		.controller('MainController',['$http','ezfb','$scope','$location','$filter','$window','$animate','$timeout','$routeParams','vendabyteService',function($http,ezfb,$scope,$location,$filter,$window,$animate,$timeout,$routeParams,vendabyteService){
			vendabyteService.mainScope=$scope;	
			$scope.users = [];
			$scope.followers = [];	
			$scope.option = 0;	
			$scope.configActive = false;
			$scope.chatActive = true;
			scrolled = true;
			offset = 0;
			
			///OJO PUEDE QUE NO SEA NECESARIO ESTE GET
			vendabyteService.getMe().then(function (data){
				$scope.me = data[0];
				$scope.me.url = window.location.origin+"/api/user/"+$scope.me.id+"/";
				$scope.users.push($scope.me);
			});

			$scope.bodyClick = function (){
				$scope.hideConfig();
			}

			////////////////////////////////
			//MENU HANDLER
			$scope.configToggle = function ($event){
				$event.stopPropagation();
				$scope.configActive = !$scope.configActive;

			}
			$scope.hideConfig = function (){
				$scope.configActive = false;
			}
			//CHAT HANDLER
			$scope.chatToggle = function(){
				$scope.chatActive = !$scope.chatActive;
			}
			$scope.hideChat = function(){
				$scope.chatActive = false;
			}
			//LOGOUT FUNCTIONS 
			
			$scope.logout = function(){
				ezfb.logout(function () {
			      updateLoginStatus(updateApiMe);
			    });
				vendabyteService.logout().then(function (data){
					window.location.href = '/';
				});
			}
			function updateLoginStatus (more) {
			   	ezfb.getLoginStatus(function (res) {
			      	$scope.loginStatus = res;

			    	(more || angular.noop)();
				});
			}
			function updateApiMe () {
			  	ezfb.api('/me', function (res) {
			    	$scope.apiMe = res;
				});
			}
			////////////////////////////////////////////////////////

			$scope.setOptAct = function(opt){
				$scope.option = opt;
			}

			$scope.navigate = function (path,opt){
				$location.path("/"+path);
				$scope.setOptAct(opt)
			}	

			//MANEJA LA POSICION DEL MENU DE OPCIONES Y EL FILE BROWSE CUANDO SE HACE SCROLL
			$scope.handleScroll = function(event){
				var menu = angular.element('.options-menu');
				var browser = angular.element('.file-browse');
				var element = angular.element(event.target);

				if(menu.offset().top <= element.scrollTop() && scrolled){
					offset = menu.offset().top;
					menu.css({
						position: 'fixed',
						top: 45,
						left: menu.offset().left
					});
					browser.css({
						position: 'fixed',
						top: 410,
						left: browser.offset().left
					});	
					scrolled = false;
				}
				else if(offset > element.scrollTop() && !scrolled){
					scrolled = true;
					menu.css({
						position: 'relative',
						top: 'initial',
						left: 'initial',
					});
					browser.css({
						position: 'relative',
						top: 'initial',
						left: 'initial'
					});
					
				}
			}

		}])

        .controller('FollowersController',['$scope','$location','$animate','$routeParams','vendabyteService',function($scope,$location,$animate,$routeParams,vendabyteService){
			//vendabyteService.followersScope=$scope;
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
			//vendabyteService.followerScope=$scope;
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
			$scope.next = '';
			$scope.previous = '';
			$scope.articles = [];
			$scope.busy = true;
			
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
				// mainScope.next = data.next;
				// mainScope.previous = data.previous;
				//$scope.busy = true;
				$scope.next = data.next;
				$scope.previous = data.previous;
				$scope.articles = data.results;
				angular.forEach($scope.articles,function (value,key){
					$scope.modelUsers(value);
				})				
				$scope.busy = false;
			});
			$scope.addArticle = function (article){	
				$scope.modelUsers(article);
				var articles = $scope.articles;		
				articles.push(article);
				$scope.articles = articles;
				$scope.$apply();
			}
			////////////////////////////////////////////////////////
			$scope.modelUsers = function (article){
				if(mainScope.users.length > 0)
				{
					var push = true;
					angular.forEach(mainScope.users,function (value,key){
						if(article.user.id === value.id){
							article.user = value;
							push = false;
						}
												
					})
					if(push){
							mainScope.users.push(article.user);	
						}
				}
				else{
					mainScope.users.push(article.user);
				}	
			}
			$scope.articlesPagin = function (url){
				vendabyteService.getPageArticles(url).then(function (data){
					$scope.next = data.next;
					$scope.previous = data.previous;
					$scope.articles=$scope.articles.concat(data.results);
				})
			}
        }])


		.controller('ArticleController',['$scope','$location','$animate','$routeParams','vendabyteService',function($scope,$location,$animate,$routeParams,vendabyteService){
			//vendabyteService.articleScope = $scope;
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

			$scope.commentBoxToggle = function (){
				$scope.commentActive = !$scope.commentActive;
			}
			$scope.hideCommentBox = function (comment){
				comment = {};
				$scope.commentActive = false;
			}

			$scope.likedToggle = function (product){
				var object = {"article":product.url};
				if(!product.liked){
					vendabyteService.setLiked(object).then(function (data){
						product.liked = true;
					});
				}
				else{
					vendabyteService.unsetLiked(object).then(function (data){
						product.liked = false;
					});
				}
			}	

			$scope.interestedToggle = function (product){
				var object = {"article":product.url}
				if(!product.interested){
					vendabyteService.setInterested(object).then(function (data){
						product.interested = true;
					});
				}
				else{
					vendabyteService.unsetInterested(object).then(function (data){
						product.interested = false;
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
					$scope.hideCommentBox($scope.comment);
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
				//formData.append("user",window.location.origin+"/api/user/"+user.id+"/");
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
					$scope.addArticle(articulo);	
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

		      	angular.element('body').animate({
                	scrollTop: 0
                }, 500);
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