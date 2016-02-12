'use strict';

juke.factory('PlayerFactory', function($rootScope) {
    // non-UI logic in here
    var currentSong = null;
    var playing = false;
    var albumSongs = [];
    var progress = 0;

    var audio = document.createElement('audio');
    audio.addEventListener('ended', next);
    audio.addEventListener('timeupdate', function() {
        progress = audio.currentTime / audio.duration;
        $rootScope.$digest(); // no Angular-aware code is doing this for us here
    });

    function start(song, songList) {
        this.pause();
        if (songList) albumSongs = songList;
        // resume current song
        if (song === currentSong) return audio.play();
        // enable loading new song
        currentSong = song;
        audio.src = song.audioUrl;
        audio.load();
        audio.play();
    }

    function pause() {
        audio.pause();
        playing = !playing;
    }

    function resume() {
        audio.play();
        playing = !playing;
    }

    function isPlaying() {
        return playing;
    }

    function getCurrentSong() {
        return currentSong;
    }

    function previous() {
    	if (playing) this.pause();
    	skip.call(this, -1)
    }


    function mod(num, m) {
        return ((num % m) + m) % m;
    };

    function next() {
    	if (playing) this.pause();
    	skip.call(this, 1);
    }

    // jump `interval` spots in album (negative to go back, default +1)
    function skip(interval) {
        if (!currentSong) return;
        var index = albumSongs.indexOf(currentSong);
        if (index !== -1) {
        	index = mod((index + (interval || 1)), albumSongs.length);
        }
        this.start(albumSongs[index]);
    };

    function getProgress() {
    	return progress;
    }
    
    return {
        start: start,
        pause: pause,
        resume: resume,
        isPlaying: isPlaying,
        getCurrentSong: getCurrentSong,
        next: next,
        previous: previous,
        getProgress: getProgress
    }
});