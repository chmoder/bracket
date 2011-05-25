/*
    File bracket.js
    Thomas Cross
    05.15.2011

    Main background code that runs bracket.  See controls.js and misc.js also.
*/
var bracket = {};
bracket.controls = {};
bracket.misc = {};

bracket.handleFiles = function(inputFiles)
{
	var i = 0;
	var files = [];

	$.each(inputFiles, function(index, file) {
		var audioType = /audio\/mp3/;
		if(file.type.match(audioType))
			files.push(file);
	});
	bracket.updateProcessedFiles.setTotalFiles(files.length);
	$('#add_files').html('');
	(function pushFiles(files, i) {
		if(files[i] != undefined) {
			var dataReader = new FileReader();
            dataReader.readAsDataURL(files[i]);
			dataReader.onloadend = function(fileEvent) {
				if(fileEvent.target.readyState == FileReader.DONE) {
					var dataData = fileEvent.target.result;
					var tags = loadFromFile(files[i], function(tags) {
						tags.fileName = files[i].fileName;
						if(tags.hasOwnProperty('artist') && tags.hasOwnProperty('album') && tags.hasOwnProperty('title')) {
							bracket.insertSongData(dataData, tags, files, i, function(files, i) {
                                if(i < files.length)
									pushFiles(files, ++i);
							});
						}
						else {
							bracket.updateProcessedFiles.increment();
							bracket.updateProcessedFiles.updateTextProgress();
							bracket.updateProcessedFiles.ignoredFile(files[i].fileName);
							if(i < files.length)
								pushFiles(files, ++i);
						}
					});
				}
				else {
					if(i < files.length)
						pushFiles(files, ++i);
				}
			}
		}
	})(files, i)
}

bracket.insertSongInfo = function(tags, id, files, i, callback) {
	request = window.indexedDB.open('musicDB', 'Music Player Database');
	request.onsuccess = function(event) {
		var db = event.target.result;

		var infoTx = db.transaction(['songInfoDB'], webkitIDBTransaction.READ_WRITE, 0);
		var infoReq = infoTx.objectStore('songInfoDB').add({
																fileName: tags.fileName,
																title: tags.title, 
																album: tags.album,
																artist: tags.artist,
																songInfoId: id
															});
		infoReq.onsuccess = function(event) {
			db.close();
			bracket.updateProcessedFiles.increment();
			bracket.updateProcessedFiles.updateTextProgress();
            callback(files, i);
		}
		infoReq.onerror = function(event) {
			console.log('Error inserting song info.');
		}
	}
}

bracket.insertSongData = function(data, tags, files, i, callback) {
	request = window.indexedDB.open('musicDB', 'Music Player Database');
	request.onsuccess = function(event) {
		var db = event.target.result;

		var transaction = db.transaction(['songDataDB'], webkitIDBTransaction.READ_WRITE, 0);
		var request = transaction.objectStore('songDataDB').add({
																songData: data
															});
		request.onsuccess = function(event) {
			db.close();
			bracket.insertSongInfo(tags, event.target.result, files, i, callback)
		}
	}
}

/*
bracket.lastfmLoginUser = function() {
	var retval = null;
	$.ajax({
		url: 'http://www.last.fm/api/auth/',
		type: 'GET',
		data:{
		  		api_key: 'b164358899cb569574af5881198d3c58',
			},
		dataType: 'json',
		crossDomain: true,
		async: false,
		success: function(data) {
			retval = data;
		}
	});
}
*/

bracket.lastfmGetTrackInfo = function(songObj) {
	$.ajax({
		url: 'http://ws.audioscrobbler.com/2.0/',
		type: 'POST',
		data:{
		  		artist: songObj.artist, 
		  		track: songObj.title,
		  		/*username: username,*/
		  		method: 'track.getinfo', 
		  		api_key: 'b164358899cb569574af5881198d3c58',
		  		autocorrect: 1,
		  		format: 'json'
			},
		dataType: 'json',
		crossDomain: true,
		async: true,
		success: function(data, status, jqXHR) {
			if(!data.error && data.track.artist.name && data.track.album && data.track.name) {
				songObj.artist = data.track.artist.name;
				songObj.album = data.track.album.title;
				songObj.title = data.track.name;
				bracket.updateSongObj(songObj);
			}
			else {
				bracket.updateProcessedFiles.increment();
				bracket.updateProcessedFiles.updateTextProgress();
			}
		}
	});
}

bracket.lastfmGetAlbumArtwork = function(songObj/*, username*/) {
	$.ajax({
		url: 'http://ws.audioscrobbler.com/2.0/',
		type: 'POST',
		data:{
		  		artist: songObj.artist, 
		  		track: songObj.title,
		  		/*username: username,*/
		  		method: 'track.getinfo', 
		  		api_key: 'b164358899cb569574af5881198d3c58',
		  		autocorrect: 1,
		  		format: 'json'
			},
		dataType: 'json',
		crossDomain: true,
		async: true,
		success: function(ajaxData, status, jqXHR) {
			var data, canvas, ctx;
			var img = new Image();
			img.onload = function(){
				// Create the canvas element.
				canvas = document.createElement('canvas');
				canvas.width = img.width;
				canvas.height = img.height;
				// Get '2d' context and draw the image.
				ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0);
				// Get canvas data URL
				try{
					data = canvas.toDataURL();
					$('#nowArt').attr('src', data);
					songObj.art = data;
					bracket.updateSongObj(songObj);
				}catch(e){
					console.log(e);
				}
			}
			// Load image URL.
			if(ajaxData.track.album === undefined)
				img.src = 'https://github.com/chmoder/bracket/raw/master/images/icons/icon_128.png';
			else
				img.src = ajaxData.track.album.image[3]['#text'];
		}
	});
}

bracket.addAlbumArtwork = function() {
	bracket.clearAll();
	$('#add_files').html('');
	var request = window.indexedDB.open('musicDB', 'Music Player Database');

	request.onsuccess = function(event) {
		var db = event.target.result;

		var transaction = db.transaction(['songInfoDB'], webkitIDBTransaction.READ_ONLY);
		var store = transaction.objectStore('songInfoDB');
		var request = store.openCursor();


		var existArr = Array();
		request.onsuccess = function(event){
			if(event.target.result == null)
			{
				db.close();
				$('#nowArt').attr('src', null);
				bracket.updateProcessedFiles.setTotalFiles(existArr.length);
				bracket.updateProcessedFiles.updateTextProgress();
				for(var i in existArr) {
					bracket.lastfmGetAlbumArtwork(existArr[i]);
				}
				return;
			}
			else
			{
				existArr.push(event.target.result.value);
				event.target.result.continue();
			}
		}
	}
}

bracket.normalizeTracks = function() {
	bracket.clearAll();
	$('#add_files').html('');
	var request = window.indexedDB.open('musicDB', 'Music Player Database');
	request.onsuccess = function(event) {
		var db = event.target.result;
		var transaction = db.transaction(['songInfoDB'], webkitIDBTransaction.READ_ONLY);
		var store = transaction.objectStore('songInfoDB');
		var request = store.openCursor();

		var existArr = Array();
		request.onsuccess = function(event){
			bracket.clearArtists();
			if(event.target.result == null)
			{
				db.close();
				bracket.updateProcessedFiles.setTotalFiles(existArr.length);
				bracket.updateProcessedFiles.updateTextProgress();
				for(var i in existArr) {
					bracket.lastfmGetTrackInfo(existArr[i]);
				}
				return;
			}
			else
			{
				existArr.push(event.target.result.value);
				event.target.result.continue();
			}
		}
	}
}

bracket.updateSongObj = function(songObj) {
	var request = window.indexedDB.open('musicDB', 'Music Player Database');
	request.onsuccess = function(event) {
		var db = event.target.result;
		var transaction = db.transaction(['songInfoDB'], webkitIDBTransaction.READ_WRITE);
		var infoStore = transaction.objectStore('songInfoDB');
		
		var infoRequest = infoStore.delete(parseInt(songObj.songInfoId));
		infoRequest.onsuccess = function(event) {
			var infoReq = infoStore.add({
																	fileName: songObj.fileName,
																	title: songObj.title, 
																	album: songObj.album,
																	artist: songObj.artist,
																	art: songObj.art,
																	songInfoId: songObj.songInfoId
																});
			infoReq.onsuccess = function(event) {
				bracket.updateProcessedFiles.increment();
				bracket.updateProcessedFiles.updateTextProgress();
				db.close();
			}
			infoReq.onerror = function(event) {
				console.log('Error updating song: %o', event);
			}
		}
		infoRequest.onerror = function(event) {
			console.log('Error deleting entry %o', event);
		}
	}
}

	bracket.updateProcessedFiles = {
		processedFiles: 0,
		totalFiles: 0,
		setTotalFiles: function(fileCount) {
			this.totalFiles = fileCount;
		},
		getTotalFiles: function() {
			return this.totalFiles;
		},
		getProcessedFiles: function() {
			return this.processedFiles;
		},
		increment: function() {
			++this.processedFiles;
		},
		lastFile: function() {
			bracket.loadArtists();
		},
		onsuccess: function(event) {
			return event;
		},
		updateTextProgress: function() {
            $('#importSongCount').html(bracket.updateProcessedFiles.getProcessedFiles() + ' of ' + bracket.updateProcessedFiles.getTotalFiles());

			$('#add_files').css('width', ((this.getProcessedFiles() / this.getTotalFiles()) * 100) + '%');
            this.onsuccess(this.getProcessedFiles());
			if(this.processedFiles == this.totalFiles)
				this.lastFile();

		},
		ignoredFile: function(fname) {
			$('#importSongCount').html('Ignored file: ' + (fname.length < 20 ? fname:fname.substr(0, 20) + '...'));
		}
	}

bracket.init = function() {
	var request = window.indexedDB.open('musicDB');
	request.onsuccess = function(event) {
		var db = event.target.result;
		var request = db.setVersion('1');
		request.onsuccess = function(event) {
			var hasMyStore = db.objectStoreNames.contains('songDataDB');
			if(!hasMyStore) {
				var store = db.createObjectStore('songInfoDB', {keyPath: 'songInfoId', autoIncrement: false});
				store.createIndex('songInfo', 'songInfoId');
				store = db.createObjectStore('songDataDB', {keyPath: 'songDataId', autoIncrement: true});
				store.createIndex('songs', 'songDataId');
			}
			db.close();
		}
		bracket.loadArtists();
	}
}

/*
	Loads all artists.  Called on load of program.
*/
bracket.loadArtists = function() {
	var request = window.indexedDB.open('musicDB', 'Music Player Database');
	request.onsuccess = function(event) {
		var db = event.target.result;

		var transaction = db.transaction(['songInfoDB'], webkitIDBTransaction.READ_ONLY);
		var store = transaction.objectStore('songInfoDB');
		var request = store.openCursor();


		var existArr = Array();
		request.onsuccess = function(event){
			bracket.clearArtists();
			if(event.target.result == null)
			{
				db.close();
				existArr.sort();
				for(var i in existArr)
				{
					bracket.pushArtist(existArr[i]);
				}
				bracket.loadArtistAlbums($('#artists tr:first > td').text());
				return;
			}
			else
			{
				if($.inArray(event.target.result.value.artist, existArr) == -1)
				{
					existArr.push(event.target.result.value.artist);
				}
				event.target.result.continue();
			}
		}
	}
}

/*
	Pushes an artist onto the page.
	given an audio object.
*/
bracket.pushArtist = function(artist) {
	$('#artists').append('<tr class="selectable" onclick="bracket.clearAlbums(); bracket.clearSongs(); bracket.loadArtistAlbums($(this).text());"><td>' + artist + '</td></tr>');
}

bracket.loadArtistAlbums = function(artistName) {
	var request = window.indexedDB.open('musicDB', 'Music Player Database');
	request.onsuccess = function(event) {
		var db = event.target.result;
		var transaction = db.transaction(['songInfoDB'], webkitIDBTransaction.READ_ONLY);
		var store = transaction.objectStore('songInfoDB');
		var request = store.openCursor();

		var existArr = Array();
		request.onsuccess = function(event) {
			if(event.target.result == null)
			{
				db.close();
				//$('#albums .selectable:first').toggleClass('selectableAssoc');
				bracket.loadAlbumSongs($('#albums tr:first > td').text());
				return;
			}
			else
			{
				existArr.push($('#albums tr.selectable > td').text());
				if(event.target.result.value.artist == artistName && $.inArray(event.target.result.value.album, existArr) == -1)
				{
					bracket.pushAlbum(event.target.result.value);
					existArr.push(event.target.result.value.album);
				}
				event.target.result.continue();
			}
		};
	}
}

bracket.pushAlbum = function(value) {
	$('#albums').append('<tr class="selectable" onclick="bracket.clearSongs(); bracket.loadAlbumSongs($(this).text());"><td style="background:url(' + value.art + ') no-repeat 100% 0; background-size:32px;">' + value.album + '</td></tr>');
}

bracket.loadAlbumSongs = function(albumName) {
	var request = window.indexedDB.open('musicDB', 'Music Player Database');
	request.onsuccess = function(event) {
		var db = event.target.result;

		var transaction = db.transaction(['songInfoDB'], webkitIDBTransaction.READ_ONLY);
		var store = transaction.objectStore('songInfoDB');
		var request = store.openCursor();

		var existArr = Array();
		request.onsuccess = function(event) {
			if(event.target.result == null)
			{
				db.close();
				return;
			}
			else
			{
				existArr.push($('#songs td').text());
				if(event.target.result.value.album == albumName && $.inArray(event.target.result.value.title, existArr) == -1)
					bracket.pushSong(event.target.result.value);
				event.target.result.continue();
			}
		}
	}
}

bracket.pushSong = function(value) {
	$('#songs').append('<tr class="selectable" id="'+ value.songInfoId +'" onclick="bracket.playList.make(this); bracket.play(\'' + value.songInfoId +'\');"><td>' + value.title + '</td></div>');
}

bracket.clearArtists = function() {
	$('#artists').empty();
}

bracket.clearAlbums = function() {
	$('#albums').empty();
}

bracket.clearSongs = function() {
	$('#songs').empty();
}

bracket.clearAll = function() {
	bracket.clearArtists();
	bracket.clearAlbums();
	bracket.clearSongs();
}

bracket.selected = {
	prev: null,
	swap: function(row){
		row = ($('#'+row));
		if(this.prev == null) {
			this.prev = row;
			$(row).css('font-weight', 'bold'); 
		}
		else {
			$(this.prev).css('font-weight', 'normal');
			this.prev = row;
			$(row).css('font-weight', 'bold'); 
		}
	}
};

bracket.playList = {
	list: [],
	next: 0,
	prev: 0,
	make: function(curr){
		this.list = [];
		this.next = null;
		this.prev = null;

		var prev = $(curr).prev();
		if($(prev).length) {
			this.setPrev($(prev).attr('id'));
		}

		var next = $(curr).next();
		if($(next).length) {
			this.setNext($(next).attr('id'));
		}

		while($(curr).prev().length) {
			curr = $(curr).prev();
		} 
		while($(curr).length) {
			this.list.push($(curr).attr('id'));
			curr = $(curr).next();
		}
	},
	setNext: function(next){
		this.next = next;
	},
	setPrev: function(prev){
		this.prev = prev;
	},
	makeNext: function(id){
		if(id)
			this.next = this.list[this.list.indexOf(id.toString()) + 1];
	},
	makePrev: function(id){
		if(id)
			this.prev = this.list[this.list.indexOf(id.toString()) - 1];
	},
	getNext: function(){
		return this.next;
	},
	getPrev: function(){
		return this.prev;
	}
};

bracket.play = function(songInfoId) {
	bracket.selected.swap(songInfoId);
	bracket.playList.makePrev(songInfoId);
	bracket.playList.makeNext(songInfoId);

	var request = window.indexedDB.open('musicDB', 'Music Player Database');
	request.onsuccess = function(event) {
		var db = event.target.result;
		var transaction = db.transaction(['songDataDB', 'songInfoDB'], webkitIDBTransaction.READ_ONLY);

		var infoStore = transaction.objectStore('songInfoDB');
		var infoIndex = infoStore.index('songInfo');
		var infoRequest = infoIndex.get(parseInt(songInfoId));
		infoRequest.onsuccess = function(event) {
			$('#nowArt').attr('src', event.target.result.art);
			bracket.controls.setNowPlayingInfo(event.target.result);
			$('#playPauseButton').css('display','block');
			$('#playPauseButton').text('Pause');
			bracket.controls.newProgressBar();
		}

		var dataStore = transaction.objectStore('songDataDB');
		var dataIndex = dataStore.index('songs');
		var dataRequest = dataIndex.get(parseInt(songInfoId));
		dataRequest.onsuccess = function(event) {
			$('#currentSong').attr('src', event.target.result.songData);
		}
	}
}

bracket.songSearch = function(term) {
	bracket.clearAll();
	if(!term) {
		bracket.loadArtists();
	}
	else {
		
		var request = window.indexedDB.open('musicDB', 'Music Player Database');
		request.onsuccess = function(event) {
			var db = event.target.result;

			var transaction = db.transaction(['songInfoDB'], webkitIDBTransaction.READ_ONLY);
			var store = transaction.objectStore('songInfoDB');
			var request = store.openCursor();


			var existArr = Array();
			request.onsuccess = function(event){
				bracket.clearAll();
				if(event.target.result == null)
				{
					db.close();
					existArr.sort();
					for(var i in existArr)
					{
						bracket.pushArtist(existArr[i]);
					}
					bracket.loadArtistAlbums($('#artists tr:first > td').text());
					return;
				}
				else
				{
					//term = term.replace(/\s+/g,'|');
					var patt= new RegExp('.*'+term+'.*','i');
					if((patt.test(event.target.result.value.artist) || patt.test(event.target.result.value.album) || patt.test(event.target.result.value.title)) && $.inArray(event.target.result.value.artist, existArr) == -1)
					{
						if($.inArray(event.target.result.value.artist, existArr) == -1)
						{
							existArr.push(event.target.result.value.artist);
						}
					}
						event.target.result.continue();
				}
			}
		}
	}
}

bracket.isFirst = function(element) {
	var retval = false;
	if(element.parent().attr('class') == 'sectionTitle')
		retval = true;
	return retval;
}
bracket.dragEnter = function (event) {
	event.stopPropagation();
	event.preventDefault();
}

bracket.dragLeave = function (event) {
	event.stopPropagation();
	event.preventDefault();
}


bracket.dragOver = function (event) {
	event.stopPropagation();
	event.preventDefault();
	$('#importProgress').fadeIn();
}

bracket.drop = function(event) {
	event.stopPropagation();
	event.preventDefault();
	bracket.handleFiles(event.dataTransfer.files);
}

$(document).ready(function() {
	bracket.init();
	/*
	var dropArea = document.getElementById('now');
	dropArea.addEventListener('dragenter', bracket.dragEnter, false);
	dropArea.addEventListener('dragleave', bracket.dragLeave, false);
	dropArea.addEventListener('dragover', bracket.dragOver, false);
	dropArea.addEventListener('drop', bracket.drop, false);
	*/
	$('#currentSong').get(0).addEventListener('seeked', function() { $('#playPauseButton').text('Pause'); bracket.controls.printNowPlayingInfo(); $('#currentSong').get(0).play(); }, true);
	$('#currentSong').get(0).addEventListener('ended', function() { $('#playPauseButton').text('Play'); bracket.controls.clearNowPlayingInfo(); $('#songTime').html(''); bracket.controls.newProgressBar();  bracket.play(bracket.playList.getNext()); }, true);
	$('#currentSong').get(0).addEventListener('durationchange', function() {  $('#currentSong').get(0).currentTime = 0.0; }, true);
	$('#currentSong').get(0).addEventListener('timeupdate', function(event) { 
		bracket.controls.updateProgressBar(event.target);
		bracket.controls.updatePlayTime(event.target);
	}, true);
	$('#progressBackground').bind('click', function(event) {
        var offset = $('#progressBackground').offset();
		$('#currentSong').get(0).currentTime = (((event.clientX - offset.left) / $('#progressBackground').width()) * $('#currentSong').get(0).duration);
	}, true);

	$('#add_files').click(function(e){
		$('#file_elem').click();
		//e.preventDefault(); // prevent navigation to "#"
	});
});
