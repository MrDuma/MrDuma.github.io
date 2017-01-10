(function(w, d, t) {
	var hasLoaded = false;
    function l() { if (hasLoaded) { return; } hasLoaded = true; var g = d.createElement(t);g.type = 'text/javascript';g.async = true;g.src = 'doorbell.js';d.getElementById('target').appendChild(g).appendChild(g); }
    if (window.doorbellOptions.windowLoaded) {
        l();
    } else {
        if (w.attachEvent) { w.attachEvent('onload', l); } else if (w.addEventListener) { w.addEventListener('load', l, false); } else { l(); }
        if (d.readyState == 'complete') { l(); }
    }
}(window, document, 'script'));