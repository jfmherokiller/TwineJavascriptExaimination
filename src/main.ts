/**
 * Created by jfmmeyers on 6/16/16.
 */


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


