(function () {

  angular.module('vendabyte.services', [])

    .factory('vendabyteService', ['$http', '$q', '$filter', function ($http, $q, $filter) {

       function getUser() {
        var deferred = $q.defer();

        $http.get('/api/user/?list=me&format=json')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };

      function getArticles() {
        var deferred = $q.defer();

        $http.get('/api/article/')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };

      function getModel() {
        var deferred = $q.defer();

        $http.get('/schedules/')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
      return {
        getUser : getUser,
        getArticles : getArticles,
        getModel : getModel,
      };

    }])
})();
