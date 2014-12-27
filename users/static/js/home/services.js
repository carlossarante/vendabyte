(function () {

  angular.module('vendabyte.services', [])

    .factory('vendabyteService', ['$http', '$q', '$filter', function ($http, $q, $filter) {
      
      function getProgrammation() {
        var deferred = $q.defer();

        $http.get('/schedules/')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };

      function getCasters() {
        var deferred = $q.defer();

        $http.get('/users/staff')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      };
      return {
        getProgrammation : getProgrammation,
        getCasters : getCasters,
      };

    }])
})();
