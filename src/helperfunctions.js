/**
 * Created by jfmmeyers on 6/16/16.
 */

var Twee = require("./Twee");
var downloadedmods = new Twee.TiddlyWiki("Moddy");
exports.downloadedmods = downloadedmods;
var storeareatemp = jQuery('#storeArea');
function RefreshStoreTemp() {
    storeareatemp = jQuery('#storeArea');
}

function ReplaceStoreWithModdedStore() {
    jQuery('#storeArea').replaceWith(storeareatemp);
}

function GetCurrentPassages() {
    return jQuery('#storeArea').children();
}

function ImportMod() {
    downloadedmods.GetTiddlers().forEach(AddEachTilder);
    ReplaceStoreWithModdedStore();
    RefreshGame();
    RefreshStoreTemp();
    alert("Mod Loaded Successfully");
}

function AddEachTilder(element, index, array) {
    AddNewPassageOrReplace(element, true);
}
function AddNewPassageOrReplace(TehPassage, Import) {
    if (Import === void 0) {
        Import = false;
    }
    var PassageToReplace = storeareatemp.children().filter(function() {
        return ($(this).attr('tiddler').toLowerCase() === TehPassage.getTitle().toLowerCase());
    });
    if (PassageToReplace.length > 0)
    {
        PassageToReplace.replaceWith(TehPassage.toHtml());
    } else {
        //add dim to passages area
        storeareatemp.append(TehPassage.toHtml());
    }
    //update the site attribute just in case the code checks it
    storeareatemp.attr('data-size', storeareatemp.children().length);
    
    if (Import == false) {
        ReplaceStoreWithModdedStore();
        RefreshGame();
        RefreshStoreTemp();
    }
}

function DownloadMod(URL) {
    jQuery.get(URL, function (data) {
        downloadedmods.addTwee(data);
    });
}

function RefreshPassages() {
    tale.constructor();
}

function RefreshGame() {
    window.gmain();
}

function ClearModCache() {
    downloadedmods = new Twee.TiddlyWiki("Moddy");
}

function RemovePassage(PassageName) {
    var mans = GetCurrentPassages().filter(function () {
        return jQuery(this).attr('tiddler').toLowerCase().indexOf(PassageName.toLowerCase()) > -1;
    });
    mans.remove();
}

exports.DownloadMod = DownloadMod;
exports.ClearModCache = ClearModCache;
exports.RemovePassage = RemovePassage;
exports.GetCurrentPassages = GetCurrentPassages;
exports.RefreshPassages = RefreshPassages;
exports.RefreshGame = RefreshGame;
exports.ImportMod = ImportMod;
exports.AddNewPassageOrReplace = AddNewPassageOrReplace;

