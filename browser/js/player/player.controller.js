'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  // state
  $scope.currentSong = PlayerFactory.getCurrentSong;
  $scope.playing = PlayerFactory.isPlaying;

  // main toggle
  $scope.toggle = function (song) {
    
    if ($scope.playing() ) {
      PlayerFactory.pause();
    } else if (song === $scope.currentSong()) {
      PlayerFactory.resume();
    } else {
      PlayerFactory.start(song);
    }
  };

  $scope.progress = PlayerFactory.getProgress;

  // outgoing events (to Album… or potentially other characters)
  $scope.next = function () { 
    PlayerFactory.next();
  };
  $scope.prev = function () { 
    PlayerFactory.previous(); 
  };

});
