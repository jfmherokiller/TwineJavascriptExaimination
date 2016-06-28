/**
 * Created by jfmmeyers on 6/16/16.
 */
window.jQuery = require("./jquery.min").noConflict(true);
require("./jquery-ui.min");
var Help = require("./helperfunctions");


function main() {
    window['AddNewPassageOrReplace'] = Help.AddNewPassageOrReplace;
    window['RefreshPassages'] = Help.RefreshPassages;
    window['DownloadMod'] = Help.DownloadMod;
    window['GetCurrentPassages'] = Help.GetCurrentPassages;
    window['downladedmods'] = Help.downloadedmods;
    window['ImportMod'] = Help.ImportMod;
    window['RefreshGame'] = Help.RefreshGame;
    window['RemovePassage'] = Help.RemovePassage;
    window['ClearModCache'] = Help.ClearModCache;
    Window['ShowModWin'] = ModWin.ShowWindow;
    if (typeof window.ModLoaderInstalled === "undefined")
    {
        jQuery("<script>").prop('type', "text/javascript").text("window.ModLoaderInstalled=1").appendTo($("head"));
        eval(jQuery("[title='engine']").text(jQuery("[title='engine']").text().replace("(function() {", "(function() { window.gmain = main")).text());
        $('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0-rc.2/jquery-ui.min.css" type="text/css" />');

    }
    alert("Modloader Installed Please enjoy!~");
}
exports.main = main;

var ModWin = require("./ModLoaderWindow");