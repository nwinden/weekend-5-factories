petApp.controller('animalController', ['$scope', '$http', 'animalFactory',  function($scope, $http, animalFactory) {

  var key = '541df19c7e26e11e280a693fb8908604';
  var baseURL = 'http://api.petfinder.com/';
  var pet = {};
  $scope.animalFactory = animalFactory;

  $scope.petSelect = 'dog';
  $scope.count = 0;

  if($scope.animalFactory.factoryGetFavorites() === undefined) {
    $scope.animalFactory.factoryRefreshFavoriteData().then(function() {
      $scope.count = $scope.animalFactory.factoryGetFavorites().length;
    });
  } else {
    $scope.count = $scope.animalFactory.factoryGetFavorites().length;
  }

  //adds current animal to the favorites
  $scope.addToFavorites = function(randomPet) {

    pet.id = randomPet.id.$t;
    pet.name = randomPet.name.$t;
    pet.description = randomPet.description.$t ? randomPet.description.$t.substring(0,100) + '...' : 'No description provided';
    pet.imageSrc = randomPet.media.photos ? randomPet.media.photos.photo[3].$t : 'http://i.imgur.com/uASx13d.gif';
    pet.type = randomPet.animal.$t;

    $scope.animalFactory.factorySaveFavorite(pet).then(function() {
      console.log('done saving');
      $scope.count = $scope.animalFactory.factoryGetFavorites().length;
    });

  };

  //queries the API and returns another random pet
  $scope.getRandomPet = function() {
    var query = 'pet.getRandom';
    query += '?key=' + key;
    query += '&animal=' + $scope.petSelect;
    query += '&output=basic';
    query += '&format=json';

    var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';

    $http.jsonp(request).then(
      function(response) {
        $scope.animal = response.data.petfinder.pet;
        console.log(response.data);
      }
    )
  }

}]);
