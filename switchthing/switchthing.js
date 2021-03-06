/**
 * Created by jfmmeyers on 6/14/16.
 */
function createswitch(type, name, ArrayOfCasesAndCodes) {
    window[name + '_evalswitch'] = function (casetocheck) {

        for (var index = 0; index < ArrayOfCasesAndCodes.length; index++) {
            var switchcase = ArrayOfCasesAndCodes[index];
            if (casetocheck == switchcase[0]) {
                if (type == 'jscode') {
                    internalEval(switchcase[1]);
                } else if (type == 'string') {
                    return switchcase[1];
                } else if (type == 'passagecode') {
                    new Wikifier(insertElement(null, "span"), switchcase[1]);
                }
            }
        }
    }
}

