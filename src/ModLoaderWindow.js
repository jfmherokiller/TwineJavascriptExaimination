/**
 * Created by jfmmeyers on 6/27/16.
 */
var Help = require("./helperfunctions");

var mybox = jQuery("<div>").attr('id', "MyLoader").hide().appendTo(jQuery("head"));
mybox.attr('title', "List of Mods");
mybox.css("overflow", "auto");
var DownloadModBox = jQuery('<div>').appendTo(mybox);
var listofmods = jQuery('<div>').appendTo(mybox);

DownloadModBox.append(jQuery('<label> PutModUrlHere:</label>'));
DownloadModBox.append(jQuery('<input type="text" id="modurl" value="" >'));
DownloadModBox.append(jQuery('<button id="modbutton">Download Mod</button>').click(function () {
    jQuery('#modbutton').prop("disabled", true);
   Help.DownloadMod(jQuery('#modurl').val(), function() {
       Generatelist();
       jQuery('#modbutton').prop("disabled", false);
   });
}));
function Generatelist() {
    var cList = $('<ul>');
    if (Help.downloadedmods.GetTiddlers().length == 0) {
        listofmods.html(cList);
    }

    jQuery.each(Help.downloadedmods.GetTiddlers(), function (i) {
        var li = jQuery('<li>').appendTo(cList);
        var aaa = jQuery('<a>').text(Help.downloadedmods.GetTiddlers()[i].getTitle()).appendTo(li);
        var Remove = jQuery('<button>Remove Mod</button>').click(function () {
            Help.downloadedmods.tiddlers.splice(i, 1);
            Generatelist();
        });
        Remove.appendTo(aaa);
        var Install = jQuery('<button>Install Mod</button>').click(function () {
            Help.AddNewPassageOrReplace(Help.downloadedmods.GetTiddlers()[i]);
            Help.downloadedmods.tiddlers.splice(i, 1);
            Generatelist();
        });
        Install.appendTo(aaa);
    });
    listofmods.html(cList);
}
function showWindow() {
    Generatelist();
    mybox.dialog();
}
exports.ShowWindow = showWindow;
exports.GenerateList = Generatelist;
