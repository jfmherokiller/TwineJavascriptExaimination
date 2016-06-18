/**
 * Created by jfmmeyers on 6/16/16.
 */


import * as Twee from "./Twee";
import * as Help from "./helperfunctions";
import * as ModWin from "./ModManagerWindow";
export var downloadedmods = new Twee.Twee.TiddlyWiki("Moddy");
//var modwindow = new ModWin.ModManagerWindow();
export function main() {
    var enginespot = jQuery("[title='engine']");
    window['AddNewPassageOrReplace'] = Help.AddNewPassageOrReplace;
    window['RefreshPassages'] = Help.RefreshPassages;
    window['DownloadMod'] = Help.DownloadMod;
    window['GetCurrentPassages'] = Help.GetCurrentPassages;
    window['downladedmods'] = downloadedmods;
    window['ImportMod'] = Help.ImportMod;
    eval(enginespot.text(enginespot.text().replace("}setTimeout", "}window.gmain = main;setTimeout")).text());
    window['RefreshGame'] = Help.RefreshGame;
    window['RemovePassage'] = Help.RemovePassage;
    //window['modwindow'] = modwindow;
    
}


