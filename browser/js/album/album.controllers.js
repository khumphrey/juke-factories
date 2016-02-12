'use strict';

juke.controller('AlbumCtrl', function($scope, $rootScope, AlbumFactory, PlayerFactory) {
  
  $scope.album = AlbumFactory.album;
  $scope.playing = PlayerFactory.isPlaying;
  $scope.currentSong = PlayerFactory.getCurrentSong;

  // main toggle
  $scope.toggle = function (song) {

    if ($scope.playing() ) {
      PlayerFactory.pause();
    } else if (song === $scope.currentSong()) {
      PlayerFactory.resume();
    } else {
      PlayerFactory.start(song, $scope.album.songs);
    }
  };

});

