petApp.controller('favoriteController', ['$scope', '$http', 'animalFactory', function($scope, $http, animalFactory) {
  console.log('favorite controller running');
  $scope.animalFactory = animalFactory;

  $scope.sortBy = 'type';
  $scope.favorites = [];
  $scope.count = 0;

  if($scope.animalFactory.factoryGetFavorites() === undefined) {
    $scope.animalFactory.factoryRefreshFavoriteData().then(function() {
      $scope.favorites = $scope.animalFactory.factoryGetFavorites();
      $scope.count = $scope.favorites.length;
    });
  } else {
    $scope.favorites = $scope.animalFactory.factoryGetFavorites();
    $scope.count = $scope.favorites.length;
  }

}]);
