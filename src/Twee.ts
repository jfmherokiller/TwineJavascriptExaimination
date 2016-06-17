/**
 * Created by jfmmeyers on 6/16/16.
 */
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
   export module Twee {


    export class TiddlyWiki {
        tiddlers;
        author;

        constructor(nAuthor) {
            this.tiddlers = [];
            this.author = nAuthor;


            // implementation


        }

        public addTwee(source) {
            var tiddlers = source.split(/\n::/);

            for (var i = 0; i < tiddlers.length; i++)
                this.addTiddler(Tiddler.createFromTwee(tiddlers[i], this.author));
        }

        public toHtml(target) {
            // this relies on the Targets class

            //var header = Targets.getHeader(target);

            //header = header.replace(/&lt;/g, '<');
            //header = header.replace(/&gt;/g, '>');

            var output;

            for (var i = 0; i < this.tiddlers.length; i++)
                output += this.tiddlers[i].toHtml();

            return output + '</div></body></html>';
        }

        public addTiddler(tiddler:Tiddler) {
            this.tiddlers.push(tiddler);
        }
    }

//
// Tiddler class
// represents a single Tiddler.
//
    interface StringConstructor {
        padZero(length):string
        trim():string
    }
    export class Tiddler {
        title:string;
        tags;
        author:string;
        createTime;
        text;

        constructor(nTitle, nTags, nText, nAuthor = 'twee', nCreateTime = new Date()) {
            // constructor
            this.title = nTitle;
            this.tags = nTags;
            this.text = nText;
            this.createTime = nCreateTime;
            this.author = nAuthor;
        }

        public toHtml() {
            var output = '<div tiddler="' + Tiddler.encodeText(this.title);

            output += '" tags="';

            if (this.tags.length)
                for (var i = 0; i < this.tags.length; i++)
                    output += Tiddler.encodeText(this.tags[i]) + ' ';

            output = output.trim();

            output += '" modifier="' + this.author + '"';

            output += ' created ="' + Tiddler.encodeDate(this.createTime) + '"';

            output += '>' + Tiddler.encodeText(this.text).trim() + '</div>';

            return output;
        };

        public getTitle() {
            return this.title;
        };

        public getTags() {
            return this.tags;
        };

        public getText() {
            return this.text;
        };

        public containsMacro(name) {
            return (this.text.indexOf('<<' + name) != -1);
        };

        public static  createFromTwee(source, author) {
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

            for (var i = 1; i < lines.length; i++)
                text += lines[i] + "\\n";

            // slice off the last \n

            text = text.substr(0, text.length - 2);

            return new Tiddler(title, tags, text, author);
        };

        public static encodeText(text) {
            // encodes text so that it may be displayed in a TW div.

            var output = text.replace(/[\f\n\r]/g, '\n');
            output = output.replace(/</g, '&lt;');
            output = output.replace(/>/g, '&gt;');

            return output;
        };


        public static decodeText(text) {
            // decodes text from a TW div.

            var output = text.replace(/\\n/g, "\n");
            output = output.replace(/&lt;/g, '<');
            output = output.replace(/&gt;/g, '>');
            output = output.replace(/&amp;/g, '&');
            output = output.replace(/&quot;/g, '"');

            return output;
        };

        public static encodeDate(date) {
            return date.getFullYear().toString() +
                date.getMonth().toString() +
                date.getDate().toString() +
                date.getHours().toString() +
                date.getMinutes().toString();
        };

    }
}




