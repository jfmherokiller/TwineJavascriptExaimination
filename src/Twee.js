//
// twee.js
//
// Two JavaScript classes for parsing Twee and TiddlyWiki data. These
// mirror the contents of tiddlywiki.php as much as possible. This
// cannot output to iPod or flat HTML format, notably, and RSS feeds
// and merging with an existing TiddlyWiki are as yet unavailable.
//
// This expects that incoming source uses \n as a newline (i.e.
// Unix-style newlines.) See file.js for a function to normalize newlines
// across platforms.
//

//
// TiddlyWiki class
// represents an entire TiddlyWiki.
//

function TiddlyWiki(nAuthor) {
    var tiddlers = [];
    var author = nAuthor;

    // public functions

    this.addTwee = addTwee;
    this.toHtml = toHtml;
    this.addTiddler = addTiddler;
    this.GetTiddlers = GetTiddlers;

    // implementation

    function addTwee(source) {
        var tiddlers = source.split(/\n::/);

        for (var i = 0; i < tiddlers.length; i++)
            addTiddler(Tiddler.createFromTwee(tiddlers[i], author));
    }

    function toHtml() {
        var output = "";
        for (var i = 0; i < tiddlers.length; i++) {
            output += tiddlers[i].toHtml();
        }
        
        return output + '</div></body></html>';
    }

    function addTiddler(tiddler) {
        tiddlers.push(tiddler);
    }

    function GetTiddlers() {
        return tiddlers;
    }
}
//
// Tiddler class
// represents a single Tiddler.
//

function Tiddler(nTitle, nTags, nText, nCreateTime) {
    var title, tags, createTime, text;

    // constructor

    title = nTitle;
    tags = nTags;
    text = nText;

    if (nCreateTime)
        createTime = nCreateTime;
    else
        createTime = new Date();

    // public functions

    this.toHtml = toHtml;
    this.getTitle = getTitle;
    this.getTags = getTags;
    this.getText = getText;
    this.containsMacro = containsMacro;

    // implementation

    function getTitle() {
        return title;
    }

    function getTags() {
        return tags;
    }

    function getText() {
        return text;
    }

    function containsMacro(name) {
        return (text.indexOf('<<' + name) != -1);
    }

    function toHtml() {
        var output = '<div tiddler="' + Tiddler.encodeText(title);

        output += '" tags="';

        if (tags.length)
            for (var i = 0; i < tags.length; i++)
                output += Tiddler.encodeText(tags[i]) + ' ';

        output = output.trim();

        output += '" modifier="' + 'twee' + '"';

        output += ' created ="' + Tiddler.encodeDate(createTime) + '"';
        output += ' twine-position ="' + Math.floor(Math.random() * 9999 + 1) + "," + Math.floor(Math.random() * 9999 + 1) + '"';

        output += '>' + Tiddler.encodeText(text).trim() + '</div>';

        return output;
    }
}

Tiddler.createFromTwee = function (source) {
    // creates a Tiddler from a text fragment like so:
    // :: Title [tag otherTag]
    // Text.

    var lines = source.trim().split("\n");
    var metabits = lines[0].split('[');
    var title = Tiddler.encodeText(metabits[0].replace(/:/g, '')).trim();

    if (!title)
        return null;

    var tags = [];

    if (metabits[1]) {
        var tagBits = metabits[1].replace('/[\[\]]/g', '').split(' ');

        for (var i = 0; i < tagBits.length; i++)
            tags.push(tagBits[i].replace(/\]/g, '').trim());
    }

    var text = '';

    for (var lineindex = 1; lineindex < lines.length; lineindex++)
        text += lines[lineindex] + "\\n";

    // slice off the last \n

    text = text.substr(0, text.length - 2);

    return new Tiddler(title, tags, text);
};

Tiddler.encodeText = function (text) {
    // encodes text so that it may be displayed in a TW div.

    var output = text.replace(/[\f\n\r]/g, '\n');
    output = output.replace(/</g, '&lt;');
    output = output.replace(/>/g, '&gt;');

    return output;
};

Tiddler.decodeText = function (text) {
    // decodes text from a TW div.

    var output = text.replace(/\\n/g, "\n");
    output = output.replace(/&lt;/g, '<');
    output = output.replace(/&gt;/g, '>');
    output = output.replace(/&amp;/g, '&');
    output = output.replace(/&quot;/g, '"');

    return output;
};

Tiddler.encodeDate = function (date) {
    return date.getFullYear().toString() +
        date.getMonth().toString().padZero(2) +
        date.getDate().toString().padZero(2) +
        date.getHours().toString().padZero(2) +
        date.getMinutes().toString().padZero(2);
};


// extensions of existing classes

String.prototype.trim = function () {
    return this.replace(/^[\s\n]+|[\s\n]+$/g, '');
};

String.prototype.padZero = function (length) {
    var result = this;

    for (var i = this.length; i < length; i++)
        result = '0' + result;

    return result;
};
exports.TiddlyWiki = TiddlyWiki;
