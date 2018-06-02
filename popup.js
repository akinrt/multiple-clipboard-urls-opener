window.onload = function() {
    try {
        var sandbox = document.getElementById('pastable');
        var result = '';
        sandbox.value = '';
        sandbox.select();
        if (document.execCommand('paste')) {
            result = sandbox.value;
        }
        sandbox.value = '';
        var v = result.match(/(ttp|http|ttps|https)\:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+/ig);
        if(v && v.length) {
            for (var i = 0; i < v.length; ++i) {
                if (v[i].substring(0,3).toLowerCase() == 'ttp') {
                    v[i] = 'h' + v[i];
                }
                chrome.tabs.create({url:v[i]});
            }
            window.close();
        } else {
            document.body.innerHTML = '<nobr>URL not found from your clipboard data.</nobr>';
        }        
    } catch (e) {
        alert(e);
    }
}
