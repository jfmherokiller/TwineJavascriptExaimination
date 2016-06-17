/**
 * Created by jfmmeyers on 6/16/16.
 */

/// <reference path="/Users/jfmmeyers/Library/Preferences/WebStorm2016.1/javascript/extLibs/http_github.com_DefinitelyTyped_DefinitelyTyped_raw_master_node_node.d.ts"/>
import * as Twee from "./Twee";
import * as Help from "./helperfunctions";
export var downloadedmods = new Twee.Twee.TiddlyWiki("Moddy");
export function main()
{
    window['AddNewPassageOrReplace'] = Help.AddNewPassageOrReplace;
    window['RefreshPassages'] = Help.RefreshPassages;
    window['DownloadMod'] = Help.DownloadMod;
    window['GetCurrentPassages'] = Help.GetCurrentPassages;
    window['downladedmods'] = downloadedmods;
    window['ImportMod'] = Help.ImportMod;
}


