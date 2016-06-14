/**
 * Created by jfmmeyers on 6/14/16.
 */
var macros = {};

macros['createswitch'] = {
    handler: function (type,name, ArrayOfCasesAndCodes) {
        macros[name + '_evalswitch'] = {
            handler: function (casetocheck) {
                var index;
                for (index = 0; index < ArrayOfCasesAndCodes.length; index++) {
                    if (casetocheck == ArrayOfCasesAndCodes[0]) {
                        if (type == 'code') {
                            this.eval(ArrayOfCasesAndCodes[1]);
                        } else if(type == 'string')
                        {
                            return ArrayOfCasesAndCodes[1];
                        } else if (type == 'passagecode')
                        {
                            
                        }
                    }
                }

            }
        }
    }
};

