/*
    File bracket.js
    Thomas Cross
    05.15.2011

    Main background code that runs bracket.  See controls.js and misc.js also.
*/
var bracket = {};
bracket.controls = {};
bracket.misc = {};
bracket.api_key = 'b164358899cb569574af5881198d3c58';
bracket.api_secret = 'af54ace41e003edf6aad70b7ac01d7e2'
bracket.user = '';
bracket.defaultAlbumArt = 'data:image/png;base64,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';

bracket.deleteLibrary = function() {
	if(typeof window.indexedDB.deleteDatabase !== 'undefined'){
		var request = window.indexedDB.deleteDatabase('musicDB');
		request.onsuccess = function(event) {
			console.log(event.result);
		}
		request.onerror = function(event){
			alert('Failed to clear library.');
			console.log('Failed to delete database using deleteDatabase method.  %o', event);
		}
	}
	else{
		var request = window.indexedDB.open('musicDB');
		request.onsuccess = function(event) {
			var db = event.target.result;
			var versionRequest = db.setVersion(++db.version);
			console.log(versionRequest);
			
			versionRequest.onsuccess = function(event) {
				db.deleteObjectStore('songInfoDB');
				db.deleteObjectStore('songDataDB');
				$('#add_files').text('Library Cleared.');
			}
			
			versionRequest.onblocked = function(event) {
				console.log('blocked %o', event);
			}
			
			versionRequest.onerror = function(event) {
				console.log('failed to set version %o', event);
			}
		}
		
		request.onerror = function(event) {
			console.log('failed to open db');
		}
	}
}

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
	$('#add_files').html('&nbsp;');
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
																art: bracket.defaultAlbumArt,
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

bracket.lastfmGetSession = function(token){
	var api_sig = encodeURIComponent('api_key'+bracket.api_key+'methodauth.getsession'+'token'+token);
	api_sig += bracket.api_secret;
	api_sig = $.md5(api_sig);

	$.ajax({
		url: 'http://ws.audioscrobbler.com/2.0/',
		type: 'GET',
		data:{
		  		api_key: bracket.api_key,
				api_sig: api_sig,
		  		format: 'json',
				method: 'auth.getsession',
				token: token
		},
		dataType: 'json',
		crossDomain: true,
		async: true,
		success: function(data) {
			console.log('saving session to local storage!');
			localStorage.setItem('sk', data.session.key);
			bracket.user = data.session.name;
			window.location = window.location.origin+window.location.pathname;
		}
	});
}

bracket.lastfmRadioTune = function(){
	var api_sig = 'api_key'+bracket.api_key+'methodradio.tune'+'sk'+localStorage.getItem('sk')+'station'+'lastfm://artist/korn/similarartists';
	api_sig += bracket.api_secret;
	api_sig = $.md5((api_sig));
	console.log('md5(sig)= %o', api_sig);

	$.ajax({
		url: 'http://ws.audioscrobbler.com/2.0/',
		type: 'POST',
		data:{
				api_key: bracket.api_key,
				api_sig: api_sig,
				method: 'radio.tune',
				sk: localStorage.getItem('sk'),
				station: 'lastfm://artist/korn/similarartists',
				format: 'json'
		},
		dataType: 'json',
		crossDomain: true,
		async: false,
		success: function(data) {
			console.log(data);
		}
	});	
}

bracket.lastfmGetPlaylist = function(){
	var api_sig = encodeURIComponent('api_key'+bracket.api_key+'bitrate'+'128'+'discovery'+'1'+'methodradio.getplaylist'+'rtp'+'1'+'sk'+localStorage.getItem('sk'));
	api_sig += bracket.api_secret;
	api_sig = $.md5(api_sig);
	console.log('md5(sig)= %o', api_sig);

	$.ajax({
		url: 'http://ws.audioscrobbler.com/2.0/',
		type: 'POST',
		data:{
		  		api_key: bracket.api_key,
				api_sig: api_sig,
				bitrate: '128',
				discovery: '1',
				method: 'radio.getplaylist',
				rtp: '1',
				sk: localStorage.getItem('sk'),
				format: 'json'
		},
		dataType: 'json',
		crossDomain: true,
		async: false,
		success: function(data) {
			console.log(data);
		}
	});	
}

bracket.lastfmGetTrackInfo = function(songObj) {
	$.ajax({
		url: 'http://ws.audioscrobbler.com/2.0/',
		type: 'POST',
		data:{
		  		artist: songObj.artist, 
		  		track: songObj.title,
		  		/*username: username,*/
		  		method: 'track.getinfo', 
		  		api_key: bracket.api_key,
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
		  		api_key: bracket.api_key,
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
					try{
						img.src = 'images/icons/icon_128.png';
					}
					catch(e){
						console.log('really failed %o', e);
					}
				}
			}
			// Load image URL.
			if(!ajaxData.track || !ajaxData.track.album || !ajaxData.track.album.image)
				img.src = 'images/icons/icon_128.png';
			else
				img.src = ajaxData.track.album.image[3]['#text'];
		}
	});
}

bracket.lastfmTrackScrobble = function(songInfoId) {
	var request = window.indexedDB.open('musicDB', 'Music Player Database');
	request.onsuccess = function(event) {
		var db = event.target.result;
		var transaction = db.transaction(['songInfoDB'], webkitIDBTransaction.READ_ONLY);

		var infoStore = transaction.objectStore('songInfoDB');
		var infoIndex = infoStore.index('songInfo');
		var infoRequest = infoIndex.get(parseInt(songInfoId));
		infoRequest.onsuccess = function(event) {
			var songObj = {
				title: event.target.result.title,
				artist: event.target.result.artist,
				album: event.target.result.album
			};

			var timestamp = Math.round((new Date()).getTime() / 1000);
			var api_sig = 'api_key'+bracket.api_key+'artist'+songObj.artist+'methodtrack.scrobble'+'sk'+localStorage.getItem('sk')+'timestamp'+timestamp+'track'+songObj.title;
			api_sig += bracket.api_secret;
			api_sig = $.md5((api_sig));

			$.ajax({
				url: 'http://ws.audioscrobbler.com/2.0/',
				type: 'POST',
				data:{
						api_key: bracket.api_key,
						api_sig: api_sig,
				  		artist: songObj.artist, 
				  		method: 'track.scrobble',
						sk: localStorage.getItem('sk'),
						timestamp:timestamp,
				  		track: songObj.title,
				  		format: 'json'
					},
				dataType: 'json',
				crossDomain: true,
				async: true,
				success: function(data, status, jqXHR) {
					console.log('Scobbled ++1');
					console.log(data);
				}
			});
		}
		db.close();
	}
}

bracket.lastfmTrackUpdateNowPlaying = function(songObj) {
	var api_sig = 'api_key'+bracket.api_key+'artist'+songObj.artist+'methodtrack.updateNowPlaying'+'sk'+localStorage.getItem('sk')+'track'+songObj.title;
	api_sig += bracket.api_secret;
	api_sig = $.md5((api_sig));

	$.ajax({
		url: 'http://ws.audioscrobbler.com/2.0/',
		type: 'POST',
		data:{
				api_key: bracket.api_key,
				api_sig: api_sig,
		  		artist: songObj.artist, 
		  		method: 'track.updateNowPlaying',
				sk: localStorage.getItem('sk'),
		  		track: songObj.title,
		  		format: 'json'
			},
		dataType: 'json',
		crossDomain: true,
		async: true,
		success: function(data, status, jqXHR) {
			console.log('now Playing');
			console.log(data);
		}
	});
}

bracket.addAlbumArtwork = function() {
	bracket.clearAll();
	$('#add_files').html('&nbsp;');
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
		db.close();
	}
}

bracket.normalizeTracks = function() {
	bracket.clearAll();
	$('#add_files').html('&nbsp;');
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
		db.close();
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
		db.close();
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
			bracket.clearAll();
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
		if(db.version % 2 == 0) {
			var request = db.setVersion(++db.version);
			console.log(request);
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
		}
		db.close();
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
	/*Add border to albums when selected for viewing.*/
	$('#artists tr.selectableHover').removeClass('selectable selectableHover');
	$('#artists tr').addClass('selectable');
	$('#artists tr > td:contains("'+artistName+'")').parent().addClass('selectableHover');

	
	$('#albums').append('<tr>');
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
				bracket.loadAlbumSongs($('#albums td:first').text());
				return;
			}
			else
			{
				existArr.push($('#albums tr.selectableAlbum > td').text());
				if(event.target.result.value.artist == artistName && $.inArray(event.target.result.value.album, existArr) == -1)
				{
					console.log((($('#albums tr:last td').length + 1) ) * 128);
					if(($('#albums tr:last td').length + 1) * (128 + (6*2)) >= $('#albums').width()){
						$('#albums').append('</tr><tr>');
					}
					bracket.pushAlbum(event.target.result.value);
					existArr.push(event.target.result.value.album);
				}
				event.target.result.continue();
			}
		};
	}
	$('#albums').append('</tr>');
}

bracket.pushAlbum = function(value) {
	$('#albums tr:last').append('<td onclick="bracket.clearSongs(); bracket.loadAlbumSongs($(this).text());" style="text-align:center;"><img class="selectableAlbum" style="margin:.25em; width:128px;" src="'+ value.art + '"><br />' + value.album.slice(0, 22) + '</td>');
}

bracket.loadAlbumSongs = function(albumName) {
	/*Add border to albums when selected for viewing.*/
	$('#albums td img').removeClass('selectableAlbum selectableAlbumHover');
	$('#albums td img').addClass('selectableAlbum');
	$('#albums td:contains("'+albumName+'") img').addClass('selectableAlbumHover');
	
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
			$(row).addClass('selectableHover');
			//$(row).css('background-color', '#DFDFDF'); 
		}
		else {
			$(this.prev).removeClass('selectable selectableHover');
			$(this.prev).addClass('selectable');
			//$(this.prev).css('background-color', '#FFFFFF');
			this.prev = row;
			//$(row).css('background-color', '#DFDFDF'); 
			$(row).addClass('selectableHover');
		}

	}
};

bracket.playList = {
	list: [],
	next: 0,
	prev: 0,
	curr: 0,
	make: function(curr){
		this.list = [];
		this.curr = $(curr).attr('id');
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
	},
	getCurr: function(){
		return this.curr;
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
			bracket.lastfmTrackUpdateNowPlaying(event.target.result);
			db.close();
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

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

$(document).ready(function() {
	console.log(window.location);
	console.log(window.location.origin+window.location.pathname);
	//localStorage.clear();
	console.log('test %o', localStorage.getItem('sk'));
	if(getUrlVars()['token'] && !localStorage.getItem('sk')) {
		bracket.lastfmGetSession(getUrlVars()['token']);
	}
	bracket.init();
	/*
	var dropArea = document.getElementById('now');
	dropArea.addEventListener('dragenter', bracket.dragEnter, false);
	dropArea.addEventListener('dragleave', bracket.dragLeave, false);
	dropArea.addEventListener('dragover', bracket.dragOver, false);
	dropArea.addEventListener('drop', bracket.drop, false);
	*/
	$('#currentSong').get(0).addEventListener('seeked', function() { $('#playPauseButton').text('Pause'); bracket.controls.printNowPlayingInfo(); $('#currentSong').get(0).play(); }, true);
	$('#currentSong').get(0).addEventListener('ended', function() {	bracket.lastfmTrackScrobble(bracket.playList.getCurr()); $('#playPauseButton').text('Play'); bracket.controls.clearNowPlayingInfo(); $('#songTime').html(''); bracket.controls.newProgressBar();  bracket.play(bracket.playList.getNext()); }, true);
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
