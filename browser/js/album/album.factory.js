'use strict';

juke.factory('StatsFactory', function($q) {
    var statsObj = {};
    statsObj.totalTime = function (album) {
        var audio = document.createElement('audio');
        return $q(function (resolve, reject) {
            var sum = 0;
            var n = 0;
            function resolveOrRecur () {
                if (n >= album.songs.length) resolve(sum);
                else audio.src = album.songs[n++].audioUrl;
            }
            audio.addEventListener('loadedmetadata', function () {
                sum += audio.duration;
                resolveOrRecur();
            });
            resolveOrRecur();
        });
    };
    return statsObj;
})

juke.factory('AlbumFactory', function($q, $http, $log, StatsFactory) {
    var factAlbum = {};
  // load our initial data
  $http.get('/api/albums/')
  .then(function(res) {
      return $http.get('/api/albums/' + res.data[1]._id);
      }) // temp: use first
  .then(res => res.data)
  .then(album => {
    album.imageUrl = '/api/albums/' + album._id + '.image';
    album.songs.forEach(function (song, i) {
      song.audioUrl = '/api/songs/' + song._id + '.audio';
      song.albumIndex = i;
    });
    angular.copy(album, factAlbum)
    StatsFactory.totalTime(factAlbum)
    .then (function (time) {
      // console.log(time)
      factAlbum.time = Math.floor(time/60);  
    })
    // console.log(AlbumFactory.totalTime)
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound
  return {album: factAlbum}
})

juke.factory('AlbumsFactory', function($q, $http, $log, StatsFactory) {
    var albumList = [];
    // load our initial data
    $http.get('/api/albums/')
        .then(function(res) {
            angular.copy(res.data, albumList);
            albumList.forEach(function(album) {
                    album.imageUrl = '/api/albums/' + album._id + '.image';
                    // album.songs.forEach(function(song, i) {
                    //     song.audioUrl = '/api/songs/' + song._id + '.audio';
                    //     song.albumIndex = i;
                    // });
                    // StatsFactory.totalTime(album)
                    //     .then(function(time) {
                    //         album.time = Math.floor(time / 60);

                    //     })
                    // console.log("ind. albums", album);
                })
        }) 
        .catch($log.error); // $log service can be turned on and off; also, pre-bound
    
      function getAlbumList () {
        return albumList;
      }

    return {
      albumList: getAlbumList
    }
})