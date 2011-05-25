/*
    File controls.js
    Thomas Cross
    05.15.2011

	This code defines and implements functionality for the controlls in by bracket.
*/
bracket.controls.playPauseSong = function(status) {
	if(status == 'Pause') {
		$('#currentSong').get(0).pause();
		$('#playPauseButton').text('Play');
		$('#playPauseButton').attr('src', 'images/controls/play.png');
	}
	else {
		$('#currentSong').get(0).play();
		$('#nowPlayingTitle').html($('#currentSong').attr('title'));
		$('#playPauseButton').text('Pause');
		$('#playPauseButton').attr('src', 'images/controls/pause.png');
	}
}

bracket.controls.playNext = function() {
	bracket.play(bracket.playList.getNext());
}

bracket.controls.playNext = function() {
	bracket.play(bracket.playList.getNext());
}

bracket.controls.playPrev = function() {
	bracket.play(bracket.playList.getPrev());
}

bracket.controls.newProgressBar = function() {
    $('#progressBar').css('left', '0');
}

bracket.controls.setNowPlayingInfo = function(result) {
	$('#currentSong').attr('title', event.target.result.title);
	$('#currentSong').attr('artist', event.target.result.artist);
	$('#currentSong').attr('album', event.target.result.album);
}

bracket.controls.printNowPlayingInfo = function() {
	$('#nowPlayingTitle').html($('#currentSong').attr('title'));
	$('#nowPlayingArtist').html($('#currentSong').attr('artist'));
	$('#nowPlayingAlbum').html($('#currentSong').attr('album'));	
}

bracket.controls.clearNowPlayingInfo = function() {
	$('#nowPlayingTitle').html('');
	$('#nowPlayingArtist').html('');
	$('#nowPlayingAlbum').html('');
}

bracket.controls.updatePlayTime = function(timeData) {
	$('#songTime').html(bracket.misc.timeFormat(timeData.currentTime) + ' of ' + bracket.misc.timeFormat(timeData.duration));
}

bracket.controls.updateProgressBar = function(timeData) {
	$('#progressBar').css('left', ((timeData.currentTime / timeData.duration) * 100) + '%');
}
