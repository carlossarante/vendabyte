(function () {

  angular.module('vendabyte.services', [])

    .factory('vendabyteService', ['$http', '$q', '$filter', function ($http, $q, $filter) {
      function vendabyteLogIn(user) {
        var deferred = $q.defer();

        $http.post('/api/login/',user,{
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
          .success(function(data, status, headers, config) {
            deferred.resolve({'data':data,'status':status,'headers':headers,'config':config}); 
          })
          .error(function(data, status, headers, config) {
            deferred.resolve({'data':data,'status':status,'headers':headers,'config':config}); 
          });

        return deferred.promise;
      };
      function registerUser(user) {
        var deferred = $q.defer();

        $http.post('/api/user/',user,{
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
          .success(function(data, status, headers, config) {
            deferred.resolve({'data':data,'status':status,'headers':headers,'config':config}); 
          })
          .error(function(data, status, headers, config) {
            deferred.resolve({'data':data,'status':status,'headers':headers,'config':config}); 
          });

        return deferred.promise;
      };
      function getFBImage(url) {
        var deferred = $q.defer();

        $http.get(url,{
          responseType : "arraybuffer"
        })
          .success(function(data, status, headers, config) {
            deferred.resolve({'data':data,'status':status,'headers':headers,'config':config}); 
          })

        return deferred.promise;
      };
      function getArticles(param) {
        var deferred = $q.defer();

        $http.get('/api/article/?format=json&list='+param)
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
      function getPageArticles(url) {
        var deferred = $q.defer();

        $http.get(url)
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
      function getArticle(url) {
        var deferred = $q.defer();

        $http.get(url)
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
      function getComment(url) {
        var deferred = $q.defer();

        $http.get(url)
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };      
      function getDirective(directive) {
        var deferred = $q.defer();

        $http.get("/static/partials/"+directive)
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
      function logout() {
        var deferred = $q.defer();

        $http.get("/users/logout/")
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
      
      return {
        vendabyteLogIn : vendabyteLogIn,
        registerUser : registerUser,
        getFBImage : getFBImage,
        getArticles : getArticles,
        getArticle : getArticle,
        getPageArticles : getPageArticles,
        getComment : getComment,
        getDirective : getDirective,
        logout : logout,
      };

    }])
})();
