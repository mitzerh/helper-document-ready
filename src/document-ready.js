var DocumentReady = (function(){

    var ready = false,
        init = false,
        stack = [];

    var executeStack = function() {
        if (stack.length === 0) { return; }
        while (stack.length > 0) {
            var fn = stack.shift();
            fn();
        }
    };

    return function(callback) {
        if (typeof callback !== 'function') { return; }
        
        // if it's already ready, don't bind again
        if (ready) {
            return callback();
        } else {
            stack.push(callback);
        }
        
        // initialize binding only once
        if (init) { return; }
        init = true;

        if (window.addEventListener) {

            if (document.readyState === "complete" ||
                (document.readyState !== "loading" && !document.documentElement.doScroll)
            ) {
                ready = true;
                executeStack();
            } else {
                document.addEventListener("DOMContentLoaded", executeStack);
            }
        } else if (window.attachEvent) {

            document.attachEvent("onreadystatechange", function(){
                if(document.readyState === "complete"){
                    document.detachEvent("onreadystatechange", arguments.callee);
                    ready = true;
                    executeStack();
                }
            });

        }
    };

});
