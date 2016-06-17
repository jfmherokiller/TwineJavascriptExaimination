/**
 * Created by jfmmeyers on 6/16/16.
 */
/// <reference path="/Users/jfmmeyers/Library/Preferences/WebStorm2016.1/javascript/extLibs/http_github.com_DefinitelyTyped_DefinitelyTyped_raw_master_jquery_jquery.d.ts" />
import * as Twee from "./Twee";
import * as Main from "./main";
import {downloadedmods} from "./main";

export function GetCurrentPassages() {
    return jQuery('#storeArea').children()
}
export function ImportMod()
{
    downloadedmods.tiddlers.forEach(AddEachTilder);
}
function AddEachTilder(element, index, array) {
    AddNewPassageOrReplace(element);
}
export function AddNewPassageOrReplace(Passage:Twee.Twee.Tiddler) {
    if(GetCurrentPassages().attr('tiddler') == Passage.getTitle())
    {
        jQuery("[tiddler="+Passage.getTitle()+"]").replaceWith(Passage.toHtml())
    }
    //add dim to passages area
    jQuery('#storeArea').append(Passage.toHtml());
    //update the site attribute just in case the code checks it
    jQuery('#storeArea').attr('data-size', GetCurrentPassages().length);
    RefreshPassages();
}

export function DownloadMod(URL:string) {
    jQuery.get(URL, function (data) {
        Main.downloadedmods.addTwee(data);
    });
}
export function RefreshPassages() {
    tale.constructor();
}
