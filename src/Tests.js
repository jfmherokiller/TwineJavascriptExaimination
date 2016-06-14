/**
 * Created by jfmmeyers on 6/8/16.
 */
var jsdom = require("jsdom");
var serializeDocument = require("jsdom").serializeDocument;
var fs = require("fs");

jsdom.env('/Users/jfmmeyers/Downloads/boundless/boundless-0.2.1_INDEV-1.html', function (err, window) {
    // free memory associated with the window
    if (err != null)
    {
        console.log(err)
    }
    var content = serializeDocument(window.document);
    var virtualConsole = jsdom.getVirtualConsole(window).sendTo(console);
    fs.writeFile('/Users/jfmmeyers/Downloads/boundless/output.html',content);
    window.close();
});


