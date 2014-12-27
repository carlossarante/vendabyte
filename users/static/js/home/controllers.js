
(function () {
	angular.module('vendabyte.controllers',[])
		.controller('MainController',['$http','ezfb','$scope','$location','$filter','$window','$animate','$timeout','$routeParams','vendabyteService',function($http,ezfb,$scope,$location,$filter,$window,$animate,$timeout,$routeParams,vendabyteService){

			//FUCNIONES EZFB INICIO DE SESION/////////////////////////////////////////////////
			$scope.login = function (){
				ezfb.login(function (res) {
			      /**
			       * no manual $scope.$apply, I got that handled
			       */
			      if (res.authResponse) {
			        updateLoginStatus(updateApiMe);
			      }
			    }, {scope: 'public_profile,email,user_birthday'});		
			}

			//FUCNIONES EZFB ACUTALIZACION DE ESTADO DE CONEXION FB/////////////////////////////////////////////////
			function updateLoginStatus (more) {
			   	ezfb.getLoginStatus(function (res) {
			      	$scope.loginStatus = res;

			    	(more || angular.noop)();
				});
			}
			function updateApiMe () {
			    ezfb.api('/me', function (res) {
			    	$scope.apiMe = res;
			    	$scope.apiMe.facebook_uid = res.id;

			    	$.ajax({
			          	url: "/users/login/",
			          	type: 'POST',
			          	data: $scope.apiMe,
			          	/*success:function(data){
			            	console.log("respuesta POST:",data);
			            	//window.location.href = data;},
			          	},*/
			          	statusCode: {
			            	200:function(data){
			              		console.log("respuesta POST:",data);
			              		window.location.href = data;
			            	},
			            	404:function(data){
					            var form = document.forms[0]; 
					            json={};
					            json.email = _session.attributes.email;
					            json.facebook_uid = _session.attributes.id;
					            //json.csrfmiddlewaretoken=csrftoken;
					            json.first_name = _session.attributes.first_name;
					            json.last_name = _session.attributes.last_name;
					            var split=_session.attributes.email.split("@",1);
					            //json.username = split.join();
					            json.photo_url = _session.attributes.picture.data.url;
					            json.cover_url = _session.attributes.cover.source;
					            json.sex = _session.attributes.gender;
					            json.birthday = "1988-04-24";
					            window.datos = _session.attributes;
					            //split=  _session.attributes.location.name.split(",",1);

					            y = $('.city-select');
					            $.get('/api/cities/?format=json', function(data) {
					            	data.forEach(function(argument) {
					                	y.append('<option value="'+argument.url+'" label= "'+argument.city_name+'"></option>');
					                })
					            });

					            $("#registerUser").removeClass('none');

					            form.onsubmit = function(){                
					            	//json.birthday = $("#year").val()+"-"+$("#month").val()+"-"+$("#day").val();
					                json.birthday = $("#datepicker").val();
					                json.city = $(".city-select").val();
					                json.username = $("#username").val();               

					                $.ajax({
					                    url: "/api/user/",
					                    type: 'POST',
					                    data: json,
					                    statusCode: {
					                      200:function(data){
					                        console.log("respuesta POST:",data);
					                        window.location.href = data;
					                      },
					                      404:function(data){                        
					                      },
					                    },
					                }); 
					                return false;
					            }                   
				            },
			          	},
			      	}); 
			    });
			}
		}])
})();