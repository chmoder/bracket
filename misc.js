/*
    File misc.js
    Thomas Cross
    05.15.2011

    misc functions for bracket music player.
*/
bracket.misc.zeroFill = function(number, width)
{
	width -= number.toString().length;
	if ( width > 0 )
	{
		return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
	}
	return number;
}

bracket.misc.timeFormat = function(input) {
	input = parseInt(input);
	var hours = parseInt(input / 3600);
	var minutes = parseInt(input / 60);
	var seconds = input % 60;

	return (hours ? bracket.misc.zeroFill(hours, 2) + ':':'') + bracket.misc.zeroFill(minutes, 2) + ':' + bracket.misc.zeroFill(seconds, 2);
}




if(window.mozIndexedDB)
	window.indexedDB = window.mozIndexedDB;
if(window.webkitIndexedDB)
	window.indexedDB = window.webkitIndexedDB;
if(window.webkitIDBKeyRange)
	window.IDBKeyRange = window.webkitIDBKeyRange;
if(navigator.appName == 'Microsoft Internet Explorer' && XDomainRequest && window.msPerformance)
{
	if (!window.indexedDB) {
		window.indexedDB = new ActiveXObject("SQLCE.Factory.4.0");
		window.indexedDBSync = new ActiveXObject("SQLCE.FactorySync.4.0");
		
		if (window.JSON) {
			window.indexedDB.json = window.JSON;
			window.indexedDBSync.json = window.JSON;
		}
		else {
			var jsonObject = {
			parse: function(txt){
				if (txt === "[]") 
					return [];
				if (txt === "{}") 
					return {};
				throw {
				message: "Unrecognized JSON to parse: " + txt
				};
			}
			};
			window.indexedDB.json = jsonObject;
			window.indexedDBSync.json = jsonObject;
			
		}
		
		// Add some interface-level constants and methods.
		window.IDBDatabaseException = {
		UNKNOWN_ERR: 0,
		NON_TRANSIENT_ERR: 1,
		NOT_FOUND_ERR: 2,
		CONSTRAINT_ERR: 3,
		DATA_ERR: 4,
		NOT_ALLOWED_ERR: 5,
		SERIAL_ERR: 11,
		RECOVERABLE_ERR: 21,
		TRANSIENT_ERR: 31,
		TIMEOUT_ERR: 32,
		DEADLOCK_ERR: 33
		};
		
		window.IDBKeyRange = {
		SINGLE: 0,
		LEFT_OPEN: 1,
		RIGHT_OPEN: 2,
		LEFT_BOUND: 4,
		RIGHT_BOUND: 8
		};
		
		window.IDBRequest = {
		INITIAL: 0,
		LOADING: 1,
		DONE: 2
		}
		
		window.IDBKeyRange.only = function(value){
			return window.indexedDB.range.only(value);
		};
		
		window.IDBKeyRange.leftBound = function(bound, open){
			return window.indexedDB.range.leftBound(bound, open);
		};
		
		window.IDBKeyRange.rightBound = function(bound, open){
			return window.indexedDB.range.rightBound(bound, open);
		};
		
		window.IDBKeyRange.bound = function(left, right, openLeft, openRight){
			return window.indexedDB.range.bound(left, right, openLeft, openRight);
		};
	}
}
