/**
 * Created by jfmmeyers on 6/6/16.
 */

function $(a) {
    if (typeof a == "string") {
        return document.getElementById(a)
    } else {
        return a
    }
}
function clone(a) {
    var b = {};
    for (property in a) {
        b[property] = a[property]
    }
    return b
}
function insertElement(a, d, f, c, e) {
    var b = document.createElement(d);
    if (f) {
        b.id = f
    }
    if (c) {
        b.className = c
    }
    if (e) {
        insertText(b, e)
    }
    if (a) {
        a.appendChild(b)
    }
    return b
}
function insertText(a, b) {
    return a.appendChild(document.createTextNode(b))
}
function removeChildren(a) {
    while (a.hasChildNodes()) {
        a.removeChild(a.firstChild)
    }
}
function setPageElement(c, b, a) {
    if (place = $(c)) {
        removeChildren(place);
        if (tale.has(b)) {
            new Wikifier(place, tale.get(b).text)
        } else {
            new Wikifier(place, a)
        }
    }
}
function addStyle(b) {
    if (document.createStyleSheet) {
        document.getElementsByTagName("head")[0].insertAdjacentHTML("beforeEnd", "&nbsp;<style>" + b + "</style>")
    } else {
        var a = document.createElement("style");
        a.type = "text/css";
        a.appendChild(document.createTextNode(b));
        document.getElementsByTagName("head")[0].appendChild(a)
    }
}
function throwError(a, b) {
    new Wikifier(a, "'' @@ " + b + " @@ ''")
}
Math.easeInOut = function (a) {
    return (1 - ((Math.cos(a * Math.PI) + 1) / 2))
};
String.prototype.readMacroParams = function () {
    var c = new RegExp("(?:\\s*)(?:(?:\"([^\"]*)\")|(?:'([^']*)')|(?:\\[\\[([^\\]]*)\\]\\])|([^\"'\\s]\\S*))", "mg");
    var b = [];
    do {
        var a = c.exec(this);
        if (a) {
            if (a[1]) {
                b.push(a[1])
            } else {
                if (a[2]) {
                    b.push(a[2])
                } else {
                    if (a[3]) {
                        b.push(a[3])
                    } else {
                        if (a[4]) {
                            b.push(a[4])
                        }
                    }
                }
            }
        }
    } while (a);
    return b
};
String.prototype.readBracketedList = function () {
    var b = "\\[\\[([^\\]]+)\\]\\]";
    var a = "[^\\s$]+";
    var e = "(?:" + b + ")|(" + a + ")";
    var d = new RegExp(e, "mg");
    var f = [];
    do {
        var c = d.exec(this);
        if (c) {
            if (c[1]) {
                f.push(c[1])
            } else {
                if (c[2]) {
                    f.push(c[2])
                }
            }
        }
    } while (c);
    return (f)
};
String.prototype.trim = function () {
    return this.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
};
Array.prototype.indexOf || (Array.prototype.indexOf = function (b, d) {
    d = (d == null) ? 0 : d;
    var a = this.length;
    for (var c = d; c < a; c++) {
        if (this[c] == b) {
            return c
        }
    }
    return -1
});
function fade(f, c) {
    var h;
    var e = f.cloneNode(true);
    var g = (c.fade == "in") ? 1 : -1;
    f.parentNode.replaceChild(e, f);
    if (c.fade == "in") {
        h = 0;
        e.style.visibility = "visible"
    } else {
        h = 1
    }
    b(e, h);
    var a = window.setInterval(d, 25);

    function d() {
        h += 0.05 * g;
        b(e, Math.easeInOut(h));
        if (((g == 1) && (h >= 1)) || ((g == -1) && (h <= 0))) {
            f.style.visibility = (c.fade == "in") ? "visible" : "hidden";
            e.parentNode.replaceChild(f, e);
            delete e;
            window.clearInterval(a);
            if (c.onComplete) {
                c.onComplete()
            }
        }
    }

    function b(k, j) {
        var l = Math.floor(j * 100);
        k.style.zoom = 1;
        k.style.filter = "alpha(opacity=" + l + ")";
        k.style.opacity = j
    }
}
function scrollWindowTo(e) {
    var d = window.scrollY ? window.scrollY : document.body.scrollTop;
    var g = k(e);
    var c = Math.abs(d - g);
    var b = 0;
    var j = (d > g) ? -1 : 1;
    var f = window.setInterval(h, 25);

    function h() {
        b += 0.1;
        window.scrollTo(0, d + j * (c * Math.easeInOut(b)));
        if (b >= 1) {
            window.clearInterval(f)
        }
    }

    function k(o) {
        var p = a(o);
        var q = p + o.offsetHeight;
        var l = window.scrollY ? window.scrollY : document.body.scrollTop;
        var m = window.innerHeight ? window.innerHeight : document.body.clientHeight;
        var n = l + m;
        if (p < l) {
            return p
        } else {
            if (q > n) {
                if (o.offsetHeight < m) {
                    return (p - (m - o.offsetHeight) + 20)
                } else {
                    return p
                }
            } else {
                return p
            }
        }
    }

    function a(l) {
        var m = 0;
        while (l.offsetParent) {
            m += l.offsetTop;
            l = l.offsetParent
        }
        return m
    }
}
function History() {
    this.history = [{passage: null, variables: {}, hash: null}]
}
History.prototype.init = function () {
    var a = this;
    if (!this.restore()) {
        this.display("Start", null)
    }
    this.hash = window.location.hash;
    this.interval = window.setInterval(function () {
        a.watchHash.apply(a)
    }, 250)
};
History.prototype.display = function (d, b, a) {
    var c = tale.get(d);
    this.history.unshift({passage: c, variables: clone(this.history[0].variables)});
    this.history[0].hash = this.save();
    var e = c.render();
    if (a != "offscreen") {
        removeChildren($("passages"));
        $("passages").appendChild(e);
        if (a != "quietly") {
            fade(e, {fade: "in"})
        }
    }
    if ((a == "quietly") || (a == "offscreen")) {
        e.style.visibility = "visible"
    }
    if (a != "offscreen") {
        document.title = tale.title;
        this.hash = this.save();
        if (c.title != "Start") {
            document.title += ": " + c.title;
            window.location.hash = this.hash
        }
        window.scroll(0, 0)
    }
    return e
};
History.prototype.restart = function () {
    window.location.hash = ""
};
History.prototype.save = function (c) {
    var a = "";
    for (var b = this.history.length - 1; b >= 0; b--) {
        if ((this.history[b].passage) && (this.history[b].passage.id)) {
            a += this.history[b].passage.id.toString(36) + "."
        }
    }
    return "#" + a.substr(0, a.length - 1)
};
History.prototype.restore = function () {
    try {
        if ((window.location.hash == "") || (window.location.hash == "#")) {
            return false
        }
        var a = window.location.hash.replace("#", "").split(".");
        var c = [];
        for (var b = 0; b < a.length; b++) {
            var g = parseInt(a[b], 36);
            if (!tale.has(g)) {
                return false
            }
            var f = (b == a.length - 1) ? "" : "offscreen";
            c.unshift(this.display(g, null, f))
        }
        return true
    } catch (d) {
        return false
    }
};
History.prototype.watchHash = function () {
    if (window.location.hash != this.hash) {
        if ((window.location.hash != "") && (window.location.hash != "#")) {
            this.history = [{passage: null, variables: {}}];
            removeChildren($("passages"));
            $("passages").style.visibility = "hidden";
            if (!this.restore()) {
                alert("The passage you had previously visited could not be found.")
            }
            $("passages").style.visibility = "visible"
        } else {
            window.location.reload()
        }
        this.hash = window.location.hash
    }
};
var version = {major: 2, minor: 0, revision: 0, date: new Date("July 30, 2007"), extensions: {}};
var tale, state;
var macros = {};
function main() {
    tale = new Tale();
    document.title = tale.title;
    setPageElement("storyTitle", "StoryTitle", "Untitled Story");
    if (tale.has("StoryAuthor")) {
        $("titleSeparator").innerHTML = "<br />";
        setPageElement("storyAuthor", "StoryAuthor", "")
    }
    if (tale.has("StoryMenu")) {
        $("storyMenu").style.display = "block";
        setPageElement("storyMenu", "StoryMenu", "")
    }
    for (macro in macros) {
        if (typeof macro.init == "function") {
            macro.init()
        }
    }
    var styles = tale.lookup("tags", "stylesheet");
    for (var i = 0; i < styles.length; i++) {
        addStyle(styles[i].text)
    }
    var scripts = tale.lookup("tags", "script");
    for (var i = 0; i < scripts.length; i++) {
        try {
            eval(scripts[i].text)
        } catch (e) {
            alert("There is a technical problem with this story (" + scripts[i].title + ": " + e.message + "). You may be able to continue reading, but all parts of the story may not work properly.")
        }
    }
    state = new History();
    state.init()
}
Interface = {
    init: function () {
        main();
        $("snapback").onclick = Interface.showSnapback;
        $("restart").onclick = Interface.restart;
        $("share").onclick = Interface.showShare
    }, restart: function () {
        if (confirm("Are you sure you want to restart this story?")) {
            state.restart()
        }
    }, showShare: function (a) {
        Interface.hideAllMenus();
        Interface.showMenu(a, $("shareMenu"))
    }, showSnapback: function (a) {
        Interface.hideAllMenus();
        Interface.buildSnapback();
        Interface.showMenu(a, $("snapbackMenu"))
    }, buildSnapback: function () {
        var c = false;
        removeChildren($("snapbackMenu"));
        for (var a = state.history.length - 1; a >= 0; a--) {
            if (state.history[a].passage && state.history[a].passage.tags.indexOf("bookmark") != -1) {
                var b = document.createElement("div");
                b.hash = state.history[a].hash;
                b.onclick = function () {
                    window.location.hash = this.hash
                };
                b.innerHTML = state.history[a].passage.excerpt();
                $("snapbackMenu").appendChild(b);
                c = true
            }
        }
        if (!c) {
            var b = document.createElement("div");
            b.innerHTML = "<i>No passages available</i>";
            $("snapbackMenu").appendChild(b)
        }
    }, hideAllMenus: function () {
        $("shareMenu").style.display = "none";
        $("snapbackMenu").style.display = "none"
    }, showMenu: function (b, a) {
        if (!b) {
            b = window.event
        }
        var c = {x: 0, y: 0};
        if (b.pageX || b.pageY) {
            c.x = b.pageX;
            c.y = b.pageY
        } else {
            if (b.clientX || b.clientY) {
                c.x = b.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                c.y = b.clientY + document.body.scrollTop + document.documentElement.scrollTop
            }
        }
        a.style.top = c.y + "px";
        a.style.left = c.x + "px";
        a.style.display = "block";
        document.onclick = Interface.hideAllMenus;
        b.cancelBubble = true;
        if (b.stopPropagation) {
            b.stopPropagation()
        }
    }
};
window.onload = Interface.init;
version.extensions.backMacro = {major: 1, minor: 0, revision: 0};
macros.back = {
    handler: function (a, b, e) {
        var d = "";
        if (e[0]) {
            for (var c = 0; c < state.history.length; c++) {
                if (state.history[c].passage.title == e[0]) {
                    d = state.history[c].hash;
                    break
                }
            }
        } else {
            if (state.history[1]) {
                d = state.history[1].hash
            } else {
                throwError(a, "can't go back from the first passage read");
                return
            }
        }
        if (d == "") {
            throwError(a, "can't find passage \"" + e[0] + '" in history');
            return
        }
        el = document.createElement("a");
        el.className = "back";
        el.href = d;
        el.innerHTML = "<b>&laquo;</b> Back";
        a.appendChild(el)
    }
};
version.extensions.displayMacro = {major: 1, minor: 0, revision: 0};
macros.display = {
    handler: function (a, b, c) {
        new Wikifier(a, tale.get(c[0]).text)
    }
};
version.extensions.actionsMacro = {major: 1, minor: 2, revision: 0};
macros.actions = {
    handler: function (a, f, g) {
        var e = insertElement(a, "ul");
        if (!state.history[0].variables["actions clicked"]) {
            state.history[0].variables["actions clicked"] = {}
        }
        for (var b = 0; b < g.length; b++) {
            if (state.history[0].variables["actions clicked"][g[b]]) {
                continue
            }
            var d = insertElement(e, "li");
            var c = Wikifier.createInternalLink(d, g[b]);
            insertText(c, g[b]);
            c.onclick = function () {
                state.history[0].variables["actions clicked"][this.id] = true;
                state.display(this.id, c)
            }
        }
    }
};
version.extensions.printMacro = {major: 1, minor: 1, revision: 0};
macros.print = {
    handler: function (place, macroName, params, parser) {
        try {
            var output = eval(parser.fullArgs());
            if (output) {
                new Wikifier(place, output.toString())
            }
        } catch (e) {
            throwError(place, "bad expression: " + e.message)
        }
    }
};
version.extensions.setMacro = {major: 1, minor: 1, revision: 0};
macros.set = {
    handler: function (a, b, c, d) {
        macros.set.run(d.fullArgs())
    }, run: function (expression) {
        try {
            return eval(Wikifier.parse(expression))
        } catch (e) {
            throwError(place, "bad expression: " + e.message)
        }
    }
};
version.extensions.ifMacros = {major: 1, minor: 0, revision: 0};
macros["if"] = {
    handler: function (place, macroName, params, parser) {
        var condition = parser.fullArgs();
        var srcOffset = parser.source.indexOf(">>", parser.matchStart) + 2;
        var src = parser.source.slice(srcOffset);
        var endPos = -1;
        var trueClause = "";
        var falseClause = "";
        for (var i = 0, nesting = 1, currentClause = true; i < src.length; i++) {
            if (src.substr(i, 9) == "<<endif>>") {
                nesting--;
                if (nesting == 0) {
                    endPos = srcOffset + i + 9;
                    break
                }
            }
            if ((src.substr(i, 8) == "<<else>>") && (nesting == 1)) {
                currentClause = "false";
                i += 8
            }
            if (src.substr(i, 5) == "<<if ") {
                nesting++
            }
            if (currentClause == true) {
                trueClause += src.charAt(i)
            } else {
                falseClause += src.charAt(i)
            }
        }
        try {
            if (eval(condition)) {
                new Wikifier(place, trueClause.trim())
            } else {
                new Wikifier(place, falseClause.trim())
            }
            if (endPos != -1) {
                parser.nextMatch = endPos
            } else {
                throwError(place, "can't find matching endif")
            }
        } catch (e) {
            throwError(place, "bad condition: " + e.message)
        }
    }
};
macros["else"] = macros.endif = {
    handler: function () {
    }
};
version.extensions.rememberMacro = {major: 1, minor: 1, revision: 0};
macros.remember = {
    handler: function (place, macroName, params, parser) {
        var statement = parser.fullArgs();
        var expire = new Date();
        var variable, value;
        macros.set.run(statement);
        var variableSigil = Wikifier.parse("$");
        variableSigil = variableSigil.replace("[", "\\[");
        variableSigil = variableSigil.replace("]", "\\]");
        variable = statement.match(new RegExp(variableSigil + "(\\w+)", "i"))[1];
        value = eval(Wikifier.parse("$" + variable));
        switch (typeof value) {
            case"string":
                value = '"' + value.replace(/"/g, '\\"') + '"';
                break;
            case"number":
            case"boolean":
                break;
            default:
                throwError(place, "can't remember $" + variable + " (" + (typeof value) + ")");
                return
        }
        expire.setYear(expire.getFullYear() + 1);
        document.cookie = macros.remember.prefix + variable + "=" + value + "; expires=" + expire.toGMTString()
    }, init: function () {
        if (tale.has("StoryTitle")) {
            macros.remember.prefix = tale.get("StoryTitle").text + "_"
        } else {
            macros.remember.prefix = "__jonah_"
        }
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var bits = cookies[i].split("=");
            if (bits[0].trim().indexOf(this.prefix) == 0) {
                var statement = cookies[i].replace(this.prefix, "$");
                eval(Wikifier.parse(statement))
            }
        }
    }
};
version.extensions.SilentlyMacro = {major: 1, minor: 0, revision: 0};
macros.silently = {
    handler: function (g, e, f, b) {
        var h = insertElement(null, "div");
        var k = b.source.indexOf(">>", b.matchStart) + 2;
        var a = b.source.slice(k);
        var d = -1;
        var c = "";
        for (var j = 0; j < a.length; j++) {
            if (a.substr(j, 15) == "<<endsilently>>") {
                d = k + j + 15
            } else {
                c += a.charAt(j)
            }
        }
        if (d != -1) {
            new Wikifier(h, c);
            b.nextMatch = d
        } else {
            throwError(g, "can't find matching endsilently")
        }
        delete h
    }
};
macros.endsilently = {
    handler: function () {
    }
};
version.extensions.choiceMacro = {major: 1, minor: 0, revision: 0};
macros.choice = {
    handler: function (a, b, c) {
        Wikifier.createInternalLink(a, c[0])
    }
};
function Passage(c, b, a) {
    this.title = c;
    if (b) {
        this.id = a;
        this.initialText = this.text = Passage.unescapeLineBreaks(b.firstChild ? b.firstChild.nodeValue : "");
        this.tags = b.getAttribute("tags");
        if (typeof this.tags == "string") {
            this.tags = this.tags.readBracketedList()
        } else {
            this.tags = []
        }
    } else {
        this.initialText = this.text = "@@This passage does not exist.@@";
        this.tags = []
    }
}
Passage.prototype.render = function () {
    var b = insertElement(null, "div", "passage" + this.title, "passage");
    b.style.visibility = "hidden";
    insertElement(b, "div", "", "header");
    var a = insertElement(b, "div", "", "content");
    new Wikifier(a, this.text);
    insertElement(b, "div", "", "footer");
    return b
};
Passage.prototype.reset = function () {
    this.text = this.initialText
};
Passage.prototype.excerpt = function () {
    var b = this.text.replace(/<<.*?>>/g, "");
    b = b.replace(/!.*?\n/g, "");
    b = b.replace(/[\[\]\/]/g, "");
    var a = b.match(/(.*?\s.*?\s.*?\s.*?\s.*?\s.*?\s.*?)\s/);
    return a[1] + "..."
};
Passage.unescapeLineBreaks = function (a) {
    if (a && a != "") {
        return a.replace(/\\n/mg, "\n").replace(/\\/mg, "\\").replace(/\r/mg, "")
    } else {
        return ""
    }
};
function Tale() {
    this.passages = {};
    if (document.normalize) {
        document.normalize()
    }
    var a = $("storeArea").childNodes;
    for (var b = 0; b < a.length; b++) {
        var c = a[b];
        if (c.getAttribute && (tiddlerTitle = c.getAttribute("tiddler"))) {
            this.passages[tiddlerTitle] = new Passage(tiddlerTitle, c, b)
        }
    }
    this.title = "Sugarcane";
    if (this.passages.StoryTitle) {
        this.title = this.passages.StoryTitle.text
    }
}
Tale.prototype.has = function (a) {
    if (typeof a == "string") {
        return (this.passages[a] != null)
    } else {
        for (i in this.passages) {
            if (this.passages[i].id == a) {
                return true
            }
        }
        return false
    }
};
Tale.prototype.get = function (a) {
    if (typeof a == "string") {
        return this.passages[a] || new Passage(a)
    } else {
        for (i in this.passages) {
            if (this.passages[i].id == a) {
                return this.passages[i]
            }
        }
    }
};
Tale.prototype.lookup = function (h, g, a) {
    var d = [];
    for (var c in this.passages) {
        var f = this.passages[c];
        var e = false;
        for (var b = 0; b < f[h].length; b++) {
            if (f[h][b] == g) {
                d.push(f)
            }
        }
    }
    if (!a) {
        a = "title"
    }
    d.sort(function (k, j) {
        if (k[a] == j[a]) {
            return (0)
        } else {
            return (k[a] < j[a]) ? -1 : +1
        }
    });
    return d
};
Tale.prototype.reset = function () {
    for (i in this.passages) {
        this.passages[i].reset()
    }
};
function Wikifier(a, b) {
    this.source = b;
    this.output = a;
    this.nextMatch = 0;
    this.assembleFormatterMatches(Wikifier.formatters);
    this.subWikify(this.output)
}
Wikifier.prototype.assembleFormatterMatches = function (a) {
    this.formatters = [];
    var b = [];
    for (var c = 0; c < a.length; c++) {
        b.push("(" + a[c].match + ")");
        this.formatters.push(a[c])
    }
    this.formatterRegExp = new RegExp(b.join("|"), "mg")
};
Wikifier.prototype.subWikify = function (c, b) {
    var a = this.output;
    this.output = c;
    var f = b ? new RegExp("(" + b + ")", "mg") : null;
    do {
        this.formatterRegExp.lastIndex = this.nextMatch;
        if (f) {
            f.lastIndex = this.nextMatch
        }
        var g = this.formatterRegExp.exec(this.source);
        var e = f ? f.exec(this.source) : null;
        if (e && (!g || e.index <= g.index)) {
            if (e.index > this.nextMatch) {
                this.outputText(this.output, this.nextMatch, e.index)
            }
            this.matchStart = e.index;
            this.matchLength = e[1].length;
            this.matchText = e[1];
            this.nextMatch = e.index + e[1].length;
            this.output = a;
            return
        } else {
            if (g) {
                if (g.index > this.nextMatch) {
                    this.outputText(this.output, this.nextMatch, g.index)
                }
                this.matchStart = g.index;
                this.matchLength = g[0].length;
                this.matchText = g[0];
                this.nextMatch = this.formatterRegExp.lastIndex;
                var h = -1;
                for (var d = 1; d < g.length; d++) {
                    if (g[d]) {
                        matchingFormatter = d - 1
                    }
                }
                if (matchingFormatter != -1) {
                    this.formatters[matchingFormatter].handler(this)
                }
            }
        }
    } while (e || g);
    if (this.nextMatch < this.source.length) {
        this.outputText(this.output, this.nextMatch, this.source.length);
        this.nextMatch = this.source.length
    }
    this.output = a
};
Wikifier.prototype.outputText = function (a, c, b) {
    insertText(a, this.source.substring(c, b))
};
Wikifier.prototype.fullArgs = function () {
    var b = this.source.indexOf(" ", this.matchStart);
    var a = this.source.indexOf(">>", this.matchStart);
    return Wikifier.parse(this.source.slice(b, a))
};
Wikifier.parse = function (b) {
    var a = b.replace(/\$/g, "state.history[0].variables.");
    a = a.replace(/\beq\b/gi, " == ");
    a = a.replace(/\bneq\b/gi, " != ");
    a = a.replace(/\bgt\b/gi, " > ");
    a = a.replace(/\beq\b/gi, " == ");
    a = a.replace(/\bneq\b/gi, " != ");
    a = a.replace(/\bgt\b/gi, " > ");
    a = a.replace(/\bgte\b/gi, " >= ");
    a = a.replace(/\blt\b/gi, " < ");
    a = a.replace(/\blte\b/gi, " <= ");
    a = a.replace(/\band\b/gi, " && ");
    a = a.replace(/\bor\b/gi, " || ");
    a = a.replace(/\bnot\b/gi, " ! ");
    return a
};
Wikifier.formatHelpers = {
    charFormatHelper: function (a) {
        var b = insertElement(a.output, this.element);
        a.subWikify(b, this.terminator)
    }, inlineCssHelper: function (f) {
        var h = [];
        var a = "(?:(" + Wikifier.textPrimitives.anyLetter + "+)\\(([^\\)\\|\\n]+)(?:\\):))|(?:(" + Wikifier.textPrimitives.anyLetter + "+):([^;\\|\\n]+);)";
        var b = new RegExp(a, "mg");
        var c = false;
        do {
            b.lastIndex = f.nextMatch;
            var d = b.exec(f.source);
            var e = d && d.index == f.nextMatch;
            if (e) {
                var j, g;
                c = true;
                if (d[1]) {
                    j = d[1].unDash();
                    g = d[2]
                } else {
                    j = d[3].unDash();
                    g = d[4]
                }
                switch (j) {
                    case"bgcolor":
                        j = "backgroundColor";
                        break
                }
                h.push({style: j, value: g});
                f.nextMatch = d.index + d[0].length
            }
        } while (e);
        return h
    }, monospacedByLineHelper: function (a) {
        var b = new RegExp(this.lookahead, "mg");
        b.lastIndex = a.matchStart;
        var c = b.exec(a.source);
        if (c && c.index == a.matchStart) {
            var f = c[1];
            if (navigator.userAgent.indexOf("msie") != -1 && navigator.userAgent.indexOf("opera") == -1) {
                f = f.replace(/\n/g, "\r")
            }
            var d = insertElement(a.output, "pre", null, null, f);
            a.nextMatch = c.index + c[0].length
        }
    }
};
Wikifier.formatters = [{
    name: "table",
    match: "^\\|(?:[^\\n]*)\\|(?:[fhc]?)$",
    lookahead: "^\\|([^\\n]*)\\|([fhc]?)$",
    rowTerminator: "\\|(?:[fhc]?)$\\n?",
    cellPattern: "(?:\\|([^\\n\\|]*)\\|)|(\\|[fhc]?$\\n?)",
    cellTerminator: "(?:\\x20*)\\|",
    rowTypes: {c: "caption", h: "thead", "": "tbody", f: "tfoot"},
    handler: function (h) {
        var k = insertElement(h.output, "table");
        h.nextMatch = h.matchStart;
        var c = new RegExp(this.lookahead, "mg");
        var d = null, a;
        var l, e;
        var j = [];
        var g = 0;
        do {
            c.lastIndex = h.nextMatch;
            var f = c.exec(h.source);
            var b = f && f.index == h.nextMatch;
            if (b) {
                a = f[2];
                if (a != d) {
                    l = insertElement(k, this.rowTypes[a])
                }
                d = a;
                if (d == "c") {
                    if (g == 0) {
                        l.setAttribute("align", "top")
                    } else {
                        l.setAttribute("align", "bottom")
                    }
                    h.nextMatch = h.nextMatch + 1;
                    h.subWikify(l, this.rowTerminator)
                } else {
                    e = insertElement(l, "tr");
                    this.rowHandler(h, e, j)
                }
                g++
            }
        } while (b)
    },
    rowHandler: function (h, d, m) {
        var a = 0;
        var k = 1;
        var c = new RegExp(this.cellPattern, "mg");
        do {
            c.lastIndex = h.nextMatch;
            var f = c.exec(h.source);
            matched = f && f.index == h.nextMatch;
            if (matched) {
                if (f[1] == "~") {
                    var l = m[a];
                    if (l) {
                        l.rowCount++;
                        l.element.setAttribute("rowSpan", l.rowCount);
                        l.element.setAttribute("rowspan", l.rowCount);
                        l.element.valign = "center"
                    }
                    h.nextMatch = f.index + f[0].length - 1
                } else {
                    if (f[1] == ">") {
                        k++;
                        h.nextMatch = f.index + f[0].length - 1
                    } else {
                        if (f[2]) {
                            h.nextMatch = f.index + f[0].length;
                            break
                        } else {
                            var b = false, g = false;
                            h.nextMatch++;
                            var o = Wikifier.formatHelpers.inlineCssHelper(h);
                            while (h.source.substr(h.nextMatch, 1) == " ") {
                                b = true;
                                h.nextMatch++
                            }
                            var j;
                            if (h.source.substr(h.nextMatch, 1) == "!") {
                                j = insertElement(d, "th");
                                h.nextMatch++
                            } else {
                                j = insertElement(d, "td")
                            }
                            m[a] = {rowCount: 1, element: j};
                            lastColCount = 1;
                            lastColElement = j;
                            if (k > 1) {
                                j.setAttribute("colSpan", k);
                                j.setAttribute("colspan", k);
                                k = 1
                            }
                            for (var n = 0; n < o.length; n++) {
                                j.style[o[n].style] = o[n].value
                            }
                            h.subWikify(j, this.cellTerminator);
                            if (h.matchText.substr(h.matchText.length - 2, 1) == " ") {
                                g = true
                            }
                            if (b && g) {
                                j.align = "center"
                            } else {
                                if (b) {
                                    j.align = "right"
                                } else {
                                    if (g) {
                                        j.align = "left"
                                    }
                                }
                            }
                            h.nextMatch = h.nextMatch - 1
                        }
                    }
                }
                a++
            }
        } while (matched)
    }
}, {
    name: "rule", match: "^----$\\n?", handler: function (a) {
        insertElement(a.output, "hr")
    }
}, {
    name: "emdash", match: "--", handler: function (a) {
        var b = insertElement(a.output, "span");
        b.innerHTML = "&mdash;"
    }
}, {
    name: "heading", match: "^!{1,5}", terminator: "\\n", handler: function (a) {
        var b = insertElement(a.output, "h" + a.matchLength);
        a.subWikify(b, this.terminator)
    }
}, {
    name: "monospacedByLine",
    match: "^\\{\\{\\{\\n",
    lookahead: "^\\{\\{\\{\\n((?:^[^\\n]*\\n)+?)(^\\}\\}\\}$\\n?)",
    handler: Wikifier.formatHelpers.monospacedByLineHelper
}, {
    name: "monospacedByLineForPlugin",
    match: "^//\\{\\{\\{\\n",
    lookahead: "^//\\{\\{\\{\\n\\n*((?:^[^\\n]*\\n)+?)(\\n*^//\\}\\}\\}$\\n?)",
    handler: Wikifier.formatHelpers.monospacedByLineHelper
}, {
    name: "wikifyCommentForPlugin", match: "^/\\*\\*\\*\\n", terminator: "^\\*\\*\\*/\\n", handler: function (a) {
        a.subWikify(a.output, this.terminator)
    }
}, {
    name: "quoteByBlock", match: "^<<<\\n", terminator: "^<<<\\n", handler: function (a) {
        var b = insertElement(a.output, "blockquote");
        a.subWikify(b, this.terminator)
    }
}, {
    name: "quoteByLine", match: "^>+", terminator: "\\n", element: "blockquote", handler: function (c) {
        var e = new RegExp(this.match, "mg");
        var d = [c.output];
        var h = 0;
        var b = c.matchLength;
        var g;
        do {
            if (b > h) {
                for (g = h; g < b; g++) {
                    d.push(insertElement(d[d.length - 1], this.element))
                }
            } else {
                if (b < h) {
                    for (g = h; g > b; g--) {
                        d.pop()
                    }
                }
            }
            h = b;
            c.subWikify(d[d.length - 1], this.terminator);
            insertElement(d[d.length - 1], "br");
            e.lastIndex = c.nextMatch;
            var f = e.exec(c.source);
            var a = f && f.index == c.nextMatch;
            if (a) {
                b = f[0].length;
                c.nextMatch += f[0].length
            }
        } while (a)
    }
}, {
    name: "list",
    match: "^(?:(?:\\*+)|(?:#+))",
    lookahead: "^(?:(\\*+)|(#+))",
    terminator: "\\n",
    outerElement: "ul",
    itemElement: "li",
    handler: function (k) {
        var b = new RegExp(this.lookahead, "mg");
        k.nextMatch = k.matchStart;
        var f = [k.output];
        var l = null, c;
        var h = 0, d;
        var m;
        do {
            b.lastIndex = k.nextMatch;
            var g = b.exec(k.source);
            var a = g && g.index == k.nextMatch;
            if (a) {
                if (g[1]) {
                    c = "ul"
                }
                if (g[2]) {
                    c = "ol"
                }
                d = g[0].length;
                k.nextMatch += g[0].length;
                if (d > h) {
                    for (m = h; m < d; m++) {
                        f.push(insertElement(f[f.length - 1], c))
                    }
                } else {
                    if (d < h) {
                        for (m = h; m > d; m--) {
                            f.pop()
                        }
                    } else {
                        if (d == h && c != l) {
                            f.pop();
                            f.push(insertElement(f[f.length - 1], c))
                        }
                    }
                }
                h = d;
                l = c;
                var j = insertElement(f[f.length - 1], "li");
                k.subWikify(j, this.terminator)
            }
        } while (a)
    }
}, {
    name: "prettyLink",
    match: "\\[\\[",
    lookahead: "\\[\\[([^\\|\\]]*?)(?:(\\]\\])|(\\|(.*?)\\]\\]))",
    terminator: "\\|",
    handler: function (a) {
        var b = new RegExp(this.lookahead, "mg");
        b.lastIndex = a.matchStart;
        var c = b.exec(a.source);
        if (c && c.index == a.matchStart && c[2]) {
            var d = Wikifier.createInternalLink(a.output, c[1]);
            a.outputText(d, a.nextMatch, a.nextMatch + c[1].length);
            a.nextMatch += c[1].length + 2
        } else {
            if (c && c.index == a.matchStart && c[3]) {
                var f;
                if (tale.has(c[4])) {
                    f = Wikifier.createInternalLink(a.output, c[4])
                } else {
                    f = Wikifier.createExternalLink(a.output, c[4])
                }
                a.outputText(f, a.nextMatch, a.nextMatch + c[1].length);
                a.nextMatch = c.index + c[0].length
            }
        }
    }
}, {
    name: "urlLink", match: "(?:http|https|mailto|ftp):[^\\s'\"]+(?:/|\\b)", handler: function (a) {
        var b = Wikifier.createExternalLink(a.output, a.matchText);
        a.outputText(b, a.matchStart, a.nextMatch)
    }
}, {
    name: "image",
    match: "\\[(?:[<]{0,1})(?:[>]{0,1})[Ii][Mm][Gg]\\[",
    lookahead: "\\[([<]{0,1})([>]{0,1})[Ii][Mm][Gg]\\[(?:([^\\|\\]]+)\\|)?([^\\[\\]\\|]+)\\](?:\\[([^\\]]*)\\]?)?(\\])",
    handler: function (a) {
        var c = new RegExp(this.lookahead, "mg");
        c.lastIndex = a.matchStart;
        var d = c.exec(a.source);
        if (d && d.index == a.matchStart) {
            var f = a.output;
            if (d[5]) {
                if (tale.has(d[5])) {
                    f = Wikifier.createInternalLink(a.output, d[5])
                } else {
                    f = Wikifier.createExternalLink(a.output, d[5])
                }
            }
            var b = insertElement(f, "img");
            if (d[1]) {
                b.align = "left"
            } else {
                if (d[2]) {
                    b.align = "right"
                }
            }
            if (d[3]) {
                b.title = d[3]
            }
            b.src = d[4];
            a.nextMatch = d.index + d[0].length
        }
    }
}, {
    name: "macro", match: "<<", lookahead: "<<([^>\\s]+)(?:\\s*)([^>]*)>>", handler: function (a) {
        var b = new RegExp(this.lookahead, "mg");
        b.lastIndex = a.matchStart;
        var c = b.exec(a.source);
        if (c && c.index == a.matchStart && c[1]) {
            var g = c[2].readMacroParams();
            a.nextMatch = c.index + c[0].length;
            try {
                var d = macros[c[1]];
                if (d && d.handler) {
                    d.handler(a.output, c[1], g, a)
                } else {
                    insertElement(a.output, "span", null, "marked", "macro not found: " + c[1])
                }
            } catch (f) {
                throwError(a.output, "Error executing macro " + c[1] + ": " + f.toString())
            }
        }
    }
}, {
    name: "html",
    match: "<[Hh][Tt][Mm][Ll]>",
    lookahead: "<[Hh][Tt][Mm][Ll]>((?:.|\\n)*?)</[Hh][Tt][Mm][Ll]>",
    handler: function (a) {
        var b = new RegExp(this.lookahead, "mg");
        b.lastIndex = a.matchStart;
        var c = b.exec(a.source);
        if (c && c.index == a.matchStart) {
            var d = insertElement(a.output, "span");
            d.innerHTML = c[1];
            a.nextMatch = c.index + c[0].length
        }
    }
}, {
    name: "commentByBlock", match: "/%", lookahead: "/%((?:.|\\n)*?)%/", handler: function (a) {
        var b = new RegExp(this.lookahead, "mg");
        b.lastIndex = a.matchStart;
        var c = b.exec(a.source);
        if (c && c.index == a.matchStart) {
            a.nextMatch = c.index + c[0].length
        }
    }
}, {
    name: "boldByChar",
    match: "''",
    terminator: "''",
    element: "strong",
    handler: Wikifier.formatHelpers.charFormatHelper
}, {
    name: "strikeByChar",
    match: "==",
    terminator: "==",
    element: "strike",
    handler: Wikifier.formatHelpers.charFormatHelper
}, {
    name: "underlineByChar",
    match: "__",
    terminator: "__",
    element: "u",
    handler: Wikifier.formatHelpers.charFormatHelper
}, {
    name: "italicByChar",
    match: "//",
    terminator: "//",
    element: "em",
    handler: Wikifier.formatHelpers.charFormatHelper
}, {
    name: "subscriptByChar",
    match: "~~",
    terminator: "~~",
    element: "sub",
    handler: Wikifier.formatHelpers.charFormatHelper
}, {
    name: "superscriptByChar",
    match: "\\^\\^",
    terminator: "\\^\\^",
    element: "sup",
    handler: Wikifier.formatHelpers.charFormatHelper
}, {
    name: "monospacedByChar", match: "\\{\\{\\{", lookahead: "\\{\\{\\{((?:.|\\n)*?)\\}\\}\\}", handler: function (a) {
        var b = new RegExp(this.lookahead, "mg");
        b.lastIndex = a.matchStart;
        var c = b.exec(a.source);
        if (c && c.index == a.matchStart) {
            var d = insertElement(a.output, "code", null, null, c[1]);
            a.nextMatch = c.index + c[0].length
        }
    }
}, {
    name: "styleByChar",
    match: "@@",
    terminator: "@@",
    lookahead: "(?:([^\\(@]+)\\(([^\\)]+)(?:\\):))|(?:([^:@]+):([^;]+);)",
    handler: function (a) {
        var d = insertElement(a.output, "span", null, null, null);
        var c = Wikifier.formatHelpers.inlineCssHelper(a);
        if (c.length == 0) {
            d.className = "marked"
        } else {
            for (var b = 0; b < c.length; b++) {
                d.style[c[b].style] = c[b].value
            }
        }
        a.subWikify(d, this.terminator)
    }
}, {
    name: "lineBreak", match: "\\n", handler: function (a) {
        insertElement(a.output, "br")
    }
}];
Wikifier.textPrimitives = {
    anyDigit: "[0-9]",
    anyNumberChar: "[0-9\\.E]",
    urlPattern: "(?:http|https|mailto|ftp):[^\\s'\"]+(?:/|\\b)"
};
Wikifier.createInternalLink = function (a, c) {
    var b = insertElement(a, "a", c);
    b.href = "javascript:void(0)";
    if (tale.has(c)) {
        b.className = "internalLink"
    } else {
        b.className = "brokenLink"
    }
    b.onclick = function () {
        state.display(c, b)
    };
    if (a) {
        a.appendChild(b)
    }
    return b
};
Wikifier.createExternalLink = function (a, b) {
    var c = insertElement(a, "a");
    c.href = b;
    c.className = "externalLink";
    c.target = "_blank";
    if (a) {
        a.appendChild(c)
    }
    return c
};
if (!((new RegExp("[\u0150\u0170]", "g")).test("\u0150"))) {
    Wikifier.textPrimitives.upperLetter = "[A-Z\u00c0-\u00de]";
    Wikifier.textPrimitives.lowerLetter = "[a-z\u00df-\u00ff_0-9\\-]";
    Wikifier.textPrimitives.anyLetter = "[A-Za-z\u00c0-\u00de\u00df-\u00ff_0-9\\-]"
} else {
    Wikifier.textPrimitives.upperLetter = "[A-Z\u00c0-\u00de\u0150\u0170]";
    Wikifier.textPrimitives.lowerLetter = "[a-z\u00df-\u00ff_0-9\\-\u0151\u0171]";
    Wikifier.textPrimitives.anyLetter = "[A-Za-z\u00c0-\u00de\u00df-\u00ff_0-9\\-\u0150\u0170\u0151\u0171]"
}
;
