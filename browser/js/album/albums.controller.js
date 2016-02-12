juke.controller('AlbumsCtrl', function($scope, $rootScope, AlbumsFactory) {
    $scope.showMe = false;
    $scope.albumList = AlbumsFactory.albumList;
    
    $rootScope.$on('showAllAlbums', function() {
        $scope.showMe = true;
    });

    $scope.showAlbum = function(albumId) {
      
    }

});