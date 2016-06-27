/**
 * Created by jfmmeyers on 6/16/16.
 */

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
    eval(jQuery("[title='engine']").text(jQuery("[title='engine']").text().replace("(function() {", "(function() { window.gmain = main")).text());
    alert("Modloader Installed Please enjoy!~");
}
exports.main = main;