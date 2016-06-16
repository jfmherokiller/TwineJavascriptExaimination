/**
 * Created by jfmmeyers on 6/16/16.
 */
/// <reference path="/Users/jfmmeyers/Library/Preferences/WebStorm2016.1/javascript/extLibs/http_github.com_DefinitelyTyped_DefinitelyTyped_raw_master_jquery_jquery.d.ts" />
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function parsetweecodeintohtml(Tweecode:string) {
    return Tweecode
        .replace('\\', '\s')
        .replace('\t', '\\t')
        .replace('&', '&amp;')
        .replace('<', '&lt;')
        .replace('>', '&gt;')
        .replace('"', '&quot;')
        .replace('\0', '&#0;');
}
function GetCurrentPassages() {
    return jQuery('#storeArea').children()
}

function addnewPassage(Title:string, Tags:string, PassageSHit:string) {
    var thedim = jQuery('<div/>', {
        "tiddler": Title,
        "tags": Tags,
        "created": "201601151515",
        "modifier": "twee",
        "twine-position": randomIntFromInterval(1, 9999) + ',' + randomIntFromInterval(1, 9999)
    });
    thedim.text(parsetweecodeintohtml(PassageSHit));
    //add dim to passages area
    jQuery('#storeArea').append(thedim);
    //update the site attribute just in case the code checks it
    jQuery('#storeArea').attr('data-size', GetCurrentPassages().length);
    RefreshPassages();
}

function DownloadMod(URL:string) {
    jQuery.get(URL, function (data) {
        ParseTweeCode(data);
    });
}
function ParseTweeCode(Tweefile:string)
{
    
}
function RefreshPassages() {
    tale.constructor();
}
