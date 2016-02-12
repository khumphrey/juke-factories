juke.controller('SideBarCtrl', function($scope, $rootScope) {
  
  //$scope.showAlbum = false;
  $scope.viewAlbums = function() {
  	$rootScope.$broadcast('showAllAlbums');
  }
  

});
