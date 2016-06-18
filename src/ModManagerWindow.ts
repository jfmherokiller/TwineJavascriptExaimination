/**
 * Created by jfmmeyers on 6/16/16.
 */
/// <reference path="C:\Users\peter\.WebStorm2016.1\config\javascript\extLibs\http_github.com_DefinitelyTyped_DefinitelyTyped_raw_master_jquery_jquery.d.ts"/>
/// <reference path="C:\Users\peter\.WebStorm2016.1\config\javascript\extLibs\http_github.com_DefinitelyTyped_DefinitelyTyped_raw_master_node_node.d.ts"/>
/// <reference path="C:\Users\peter\.WebStorm2016.1\config\javascript\extLibs\http_github.com_DefinitelyTyped_DefinitelyTyped_raw_master_jqueryui_jqueryui.d.ts"/>


import * as Help from "./helperfunctions";
export class ModManagerWindow {
    private ModWintite:string;
    private TableofMods:JQuery;
    private PopWindow;
    constructor() {
        this.ModWintite = "BOUNDLESS MOD MANAGER";
        this.GenerateTable();
        this.MakePopup();
    }
    private MakePopup()
    {
        this.PopWindow = $('\<div id=\'modloader\'\>');
        this.PopWindow.append(this.TableofMods);
        this.PopWindow.dialog({
            title: this.ModWintite,
            autoOpen: false,
        });
    }
    private GenerateTable() {
        this.TableofMods = $('<table></table>').addClass('Mods');
        Help.GetCurrentPassages().each(function (number, element) {
            var row = $('<tr></tr>').addClass('bar').text(element.getAttribute('tiddler'));
            this.TableofMods.append(row);
        });
    }
     public OpenModloader()
    {
        this.PopWindow.dialog("open");
    }
    public CloseModLoader()
    {
        this.PopWindow.dialog("close");
    }
}


