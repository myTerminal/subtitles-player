/* global require, FileReader */

var player,
    $ = require('jquery'),
    SubtitlesPlayer = require('./subtitles-player.js');

$(document).ready(main);

function main () {
    var stage = document.getElementById("stage");

    stage.ondragover = onDragOver;
    stage.ondrop = onDrop;
    stage.ondragend = onDragEnd;
    
    function onDragOver () {
        this.className = 'hover';
        return false;
    };

    function onDrop (e) {
        this.className = '';
        e.preventDefault();

        var file = e.dataTransfer.files[0],
            reader = new FileReader();
        
        reader.onload = function(event) {
            player = new SubtitlesPlayer($("body"),
                                         $("#subtitles"),
                                         JSON.parse(event.target.result));
        };
        
        reader.readAsText(file);
        return false;
    };

    function onDragEnd () {
        this.className = '';
        return false;
    };
}
