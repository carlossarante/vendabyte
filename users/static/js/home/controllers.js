
(function () {
	angular.module('vendabyte.controllers',[])
		.controller('MainController',['$http','ezfb','$scope','$location','$filter','$window','$animate','$timeout','$routeParams','vendabyteService',function($http,ezfb,$scope,$location,$filter,$window,$animate,$timeout,$routeParams,vendabyteService){
			vendabyteService.mainScope=$scope;
			$scope.users = [];
			$scope.followers = [];	
			//$scope.option = 0;	
			//scrolled = true;
			//offset = 0;

			//FUCNIONES EZFB INICIO DE SESION/////////////////////////////////////////////////
			$scope.logIn = function (){
				ezfb.login(function (res) {
			      /**
			       * no manual $scope.$apply, I got that handled
			       */
			      if (res.authResponse) {
			        updateLoginStatus(updateApiMe);
			      }
			    }, {scope: 'user_about_me,public_profile,email,user_birthday,user_location'});		
			}

			//FUCNIONES EZFB ACUTALIZACION DE ESTADO DE CONEXION FB/////////////////////////////////////////////////
			function updateLoginStatus (more) {
			   	ezfb.getLoginStatus(function (res) {
			      	$scope.loginStatus = res;

			    	(more || angular.noop)();
				});
			}
			function updateApiMe () {
			    ezfb.api('me?fields=id,first_name,last_name,email,username,location,cover,birthday,gender', function (res) {
			    	$scope.apiMe = res;
			    	$scope.apiMe.facebook_uid = res.id;
			    	console.log("ESTE ES CARLOS",res)

			    	ezfb.api('me/picture?width=400&height=400&redirect=0',function (res){
			    		var item1;
			    		var item2;
			    		$scope.apiMe.photo_url = res.data.url;
			    		$scope.apiMe.cover_url = $scope.apiMe.cover.source;
			    		$scope.apiMe.sex = $scope.apiMe.gender;
			    		$scope.apiMe.city = $scope.apiMe.location.name.split(',')[0];
			    		$scope.apiMe.province = $scope.apiMe.location.name.split(',')[1];
			    		$scope.apiMe.country = $scope.apiMe.location.name.split(',')[2];

			    		vendabyteService.getCity($scope.apiMe.city).then(function (res){
			    			if(res.status === 200){
		    					$scope.apiMe.city = res.data[0].url;
		    				}
			    		});
			    		//$scope.apiMe.city = 'http://localhost:8000/api/cities/2/';
			    		delete $scope.apiMe.cover;
			    		delete $scope.apiMe.id;
			    		delete $scope.apiMe.gender;
			    		$scope.apiMe.birthday = $scope.apiMe.birthday.split('/');
			    		$scope.apiMe.birthday.reverse();
			    		item1 = $scope.apiMe.birthday[1];
			    		item2 = $scope.apiMe.birthday[2];
			    		$scope.apiMe.birthday[1]=item2;
			    		$scope.apiMe.birthday[2]=item1;
			    		$scope.apiMe.birthday = $scope.apiMe.birthday.join('-');


			    		var formData = new FormData();
								            						            		
	            		formData.append('email',$scope.apiMe.email);
	            		formData.append('facebook_uid',$scope.apiMe.facebook_uid);
	            		formData.append('username',$scope.apiMe.username);

	            		console.log($scope.apiMe)

			    		vendabyteService.vendabyteLogIn(formData).then(function (data){
				    		if(data.status === 200){
				    			console.log("TE LOGEASTE PAPA PORQUE EXISTIA EL USUARIO")
				    			window.location.href = data;
				    		}
				    		else if(data.status === 404)
				    		{
				    			vendabyteService.getFBImage($scope.apiMe.photo_url).then(function (data){
    								console.log(data)
    								var blob = new Blob([data.data],{type : "image/jpeg"})
    								var blobUrl = URL.createObjectURL(blob);
					    			$scope.apiMe.photo = blob;

					    			vendabyteService.getFBImage($scope.apiMe.cover_url).then(function (data){
	    								var blob = new Blob([data.data],{type : "image/jpeg"})
	    								var blobUrl = URL.createObjectURL(blob);
						    			$scope.apiMe.cover = blob;
								    	
								    	var formData = new FormData();
								            		
					            		formData.append('birthday',$scope.apiMe.birthday);
					            		formData.append('city',$scope.apiMe.city);
					            		formData.append('photo',$scope.apiMe.photo);
					            		formData.append('cover',$scope.apiMe.cover);				            		
					            		formData.append('email',$scope.apiMe.email);
					            		formData.append('facebook_uid',$scope.apiMe.facebook_uid);
					            		formData.append('first_name',$scope.apiMe.first_name);
					            		formData.append('last_name',$scope.apiMe.last_name);
					            		formData.append('sex',$scope.apiMe.sex);
					            		formData.append('username',$scope.apiMe.username);
					            		//formData.append("csrfmiddlewaretoken",$http.defaults.headers.post['X-CSRFToken']);						    	
						    			
						    			vendabyteService.registerUser(formData).then(function (data){
						    				if(data.status === 200){
							    				console.log("USURAIO CREADO PAPA")
												window.location.href = data.data;
						    				}
										});
						    		});
					    		});	
				    		}
				    	});				    				    		
			    	})			    	
			    });
			}
			$scope.b64toBlob = function (b64Data, contentType, sliceSize) {
			    contentType = contentType || '';
			    sliceSize = sliceSize || 512;

			    var byteCharacters = atob(b64Data);
			    var byteArrays = [];

			    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			        var slice = byteCharacters.slice(offset, offset + sliceSize);

			        var byteNumbers = new Array(slice.length);
			        for (var i = 0; i < slice.length; i++) {
			            byteNumbers[i] = slice.charCodeAt(i);
			        }

			        var byteArray = new Uint8Array(byteNumbers);

			        byteArrays.push(byteArray);
			    }

			    var blob = new Blob(byteArrays, {type: contentType});
			    return blob;
			}
			/*var blob = b64toBlob(b64Data, contentType);
			var blobUrl = URL.createObjectURL(blob);

			// window.location = blobUrl;*/


			$scope.navigate = function (path){
				$location.path(path);
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
			$scope.showCommentBox = function (){
				$scope.commentActive = true;
			}
			/*$scope.commentBoxToggle = function (){
				$scope.commentActive = !$scope.commentActive;
			}*/
			$scope.hideCommentBox = function (comment){
				comment = {};
				$scope.commentActive = false;
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
})();