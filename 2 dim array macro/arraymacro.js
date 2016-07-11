/**
 * Created by jfmmeyers on 7/11/16.
 */
(function () {
    window.createArray = function(params) {
        var cases = params.split(" , ");
        var cases2 = [];
        cases.forEach(function(element)
        {
            cases2.push(element.replace("[", "").replace("]", "").split(','));
        });

        return cases2;
    };
}());


