/**
 * Created by jfmmeyers on 7/11/16.
 */
var macros = [];

macros['switchthing'] =
{
    handler: function (place, macroName, params, parser) {
        expression = parser.fullArgs();
        var code = expression.slice(expression.indexOf(";") + 1);
        if (code.startsWith("create")) {
            var switchobject = eval(code.split(" ")[1]);
            switcharray.push(switchobject);
        }
        if (code.startsWith("evalcase")) {
            debugger;
            var parts = code.split(" ");
            var switchfound;
            for (var i = 0, j = switcharray.length; i < j; i++) {
                if (switcharray[i].name == parts[1]) {
                    switchfound = switcharray[i];
                    break;
                }
            }
            var casefound;
            for (var index2 = 0; index2 < switchfound.cases.length; index2++) {
                if (switchfound.cases[index2][0] == parts[2]) {
                    casefound = switchfound.cases[index2];
                    break;
                }
            }
            if (switchfound.type == 'log') {
                console.log(casefound[1]);
            }
            if (switchfound.type == 'jscode') {
                internalEval(casefound[1]);
            }
            if (switchfound.type == 'passagecode') {
                new Wikifier(place, casefound[1]);
            }
        }
    },
    init: function () {
        switcharray = [];
    }
};