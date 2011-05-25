function loadUrl(url, callback, reader) {
    var startDate = new Date().getTime();
    ID3.loadTags(url, function() {
        var endDate = new Date().getTime();
        var tags = ID3.getAllTags(url);
		if( callback ) { callback(tags); };
    },
    {tags: ["artist", "title", "album", "year", "comment", "track", "genre", "lyrics", "picture"],
     dataReader: reader});
}

function loadFromLink(link) {
    var loading = link.parentNode.getElementsByTagName("img")[0];
    var url = link.href;

    loading.style.display = "inline";
    loadUrl(url, function() {
        loading.style.display = "none";
    });
}

function loadFromFile(file, callback) {
    var url = file.urn ||file.name;
    loadUrl(url, callback, FileAPIReader(file));
}

function load(elem) {
    if (elem.id === "file") {
        loadFromFile(elem.files[0]);
    } else {
        loadFromLink(elem);
    }
}

