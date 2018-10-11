document.addEventListener('DOMContentLoaded', ahoy_yo);

function ahoy_yo() {
    var a = document.querySelectorAll('[data-ahoy]');
    if (a && a.length) {
        for (var i in a) {
            if (a.hasOwnProperty(i) && a[i]) {
                a[i].addEventListener('click', function() {
                    yo(this.getAttribute('data-ahoy'));
                });
            }
        }
    }
    else {
        yo();
    }
}

function yo(sel) {
    var h, w, i, l, s, t = false, p = '';

    var kinoplayertop = document.querySelector('#' + ((sel) ? sel : 'kinoplayertop'));
    if (!kinoplayertop) {
        kinoplayertop = document.querySelector('#kinoplayertop-online');
        if (!kinoplayertop) {
            kinoplayertop = document.querySelector('#kinoplayertop-torrent');
            if (!kinoplayertop) {
                return false;
            }
            else {
                t = true;
            }
        }
    }

    var options = [].slice.call(kinoplayertop.attributes).reduce(function (o, a) {
        return /^data-/.test(a.name) && (o[a.name.substr(5)] = a.value), o;
    }, {});

    if (options.title && options.title.indexOf('трейлер')+1 || t) {
        options.player = 'trailer';
    }

    options.player = (options.title && options.title.indexOf('трейлер')+1 || t)
        ? 'trailer'
        : (!options.player)
            ? 'moonwalk,hdgo,kodik,allserials,iframe,trailer,torrent'
            : options.player;

    var bg = (options.bg && options.bg.replace(/[^0-9a-z]/ig, ''))
        ? options.bg.replace(/[^0-9a-z]/ig, '')
        : '4a679f';

    var btns = {};
    if (options.button) {
        options.button.split(',').forEach(function (button) {
            var btn = button.split(':');
            if (btn.length === 2 && btn[0] && btn[1]) {
                btns[btn[0].trim().toLowerCase()] = btn[1].trim();
            }
        });
    }

    for (var data in options) {
        if (options.hasOwnProperty(data) && options[data]) {
            p += (p)
                ? '&' + data + '=' + encodeURIComponent(options[data])
                : data + '=' + encodeURIComponent(options[data]);
        }
        else {
            options[data] = '';
        }
    }

    if (!options.kinopoisk && !options.title) {
        return false;
    }

    var kinoplayertop_loading = document.querySelector('#kinoplayertop-loading');
    if (kinoplayertop_loading) {
        kinoplayertop_loading.parentNode.removeChild(kinoplayertop_loading);
    }
    var kinoplayertop_buttons = document.querySelector('#kinoplayertop-buttons');
    if (kinoplayertop_buttons) {
        kinoplayertop_buttons.parentNode.removeChild(kinoplayertop_buttons);
    }
    var kinoplayertop_iframe = document.querySelector('#kinoplayertop-iframe');
    if (kinoplayertop_iframe) {
        kinoplayertop_iframe.parentNode.removeChild(kinoplayertop_iframe);
    }
    var data_ahoy = document.querySelectorAll('[data-ahoy]');
    for (var da in data_ahoy) {
        if (data_ahoy.hasOwnProperty(da) && data_ahoy[da]) {
            var kinoplayertop_da = document.querySelector('#' + data_ahoy[da].getAttribute('data-ahoy'));
            if (kinoplayertop_da) {
                kinoplayertop_da.removeAttribute('style');
            }
        }
    }

    var head = document.head || document.getElementsByTagName('head')[0];
    var css = '#kinoplayertop-loading{z-index:9999;position:absolute;left:0;top:0;width:100%;height:100%;background:#' + bg + ' url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiIGNsYXNzPSJ1aWwtc3BpcmFsIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgY2xhc3M9ImJrIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTU0LjUgODkuOWMtOS42IDAtMTguNi0zLjktMjUuNC0xMSAtNi44LTcuMS0xMC41LTE2LjYtMTAuNS0yNi43IDAtOC45IDMuMy0xNy4yIDkuMi0yMy41UzQxLjcgMTkgNTAuMiAxOWM4LjQgMCAxNi40IDMuNCAyMi4zIDkuNyA2IDYuMyA5LjIgMTQuNiA5LjIgMjMuNSAwIDE1LjgtMTIuMiAyOC43LTI3LjMgMjguNyAtMTUgMC0yNy4zLTEyLjktMjcuMy0yOC43IDAtMTMuMyAxMC4zLTI0LjIgMjMtMjQuMnMyMyAxMC44IDIzIDI0LjJjMCAxMC44LTguNCAxOS42LTE4LjcgMTkuNiAtMTAuMyAwLTE4LjctOC44LTE4LjctMTkuNiAwLTguMyA2LjUtMTUuMSAxNC40LTE1LjEgNy45IDAgMTQuNCA2LjggMTQuNCAxNS4xIDAgNS44LTQuNSAxMC42LTEwLjEgMTAuNnMtMTAuMS00LjgtMTAuMS0xMC42YzAtMy40IDIuNi02LjEgNS44LTYuMSAzLjIgMCA1LjggMi43IDUuOCA2LjEgMCAwLjktMC43IDEuNi0xLjUgMS42IC0wLjggMC0xLjUtMC43LTEuNS0xLjYgMC0xLjYtMS4zLTIuOS0yLjgtMi45IC0xLjUgMC0yLjggMS4zLTIuOCAyLjkgMCA0LjEgMy4yIDcuNCA3LjEgNy40czcuMS0zLjMgNy4xLTcuNGMwLTYuNi01LjEtMTItMTEuNC0xMiAtNi4zIDAtMTEuNCA1LjQtMTEuNCAxMiAwIDkuMSA3IDE2LjUgMTUuNyAxNi41IDguNiAwIDE1LjctNy40IDE1LjctMTYuNSAwLTExLjYtOS0yMS0yMC0yMXMtMjAgOS40LTIwIDIxYzAgMTQuMSAxMC45IDI1LjUgMjQuMyAyNS41czI0LjMtMTEuNCAyNC4zLTI1LjVjMC0xNi42LTEyLjgtMzAtMjguNi0zMCAtMTUuOCAwLTI4LjYgMTMuNS0yOC42IDMwIDAgOS4yIDMuNCAxNy45IDkuNiAyNC40IDYuMiA2LjUgMTQuNSAxMC4xIDIzLjIgMTAuMXMxNy0zLjYgMjMuMi0xMC4xYzYuMi02LjUgOS42LTE1LjIgOS42LTI0LjQgMC0xMC40LTMuOS0yMC4yLTEwLjktMjcuNiAtNy03LjQtMTYuMy0xMS40LTI2LjMtMTEuNHMtMTkuMyA0LjEtMjYuMyAxMS40UzEzIDQxLjggMTMgNTIuMmMwIDAuOS0wLjcgMS42LTEuNSAxLjZTMTAgNTMuMSAxMCA1Mi4yYzAtMTEuMyA0LjItMjEuOSAxMS44LTI5LjkgNy42LTggMTcuNy0xMi40IDI4LjQtMTIuNCAxMC43IDAgMjAuOCA0LjQgMjguNCAxMi40IDcuNiA4IDExLjggMTguNiAxMS44IDI5LjkgMCAxMC4xLTMuNyAxOS41LTEwLjUgMjYuN0M3My4xIDg2IDY0LjEgODkuOSA1NC41IDg5Ljl6IiBmaWxsPSIjZmZmIj48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgZnJvbT0iMCA1MCA1MCIgdG89IjM2MCA1MCA1MCIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48L3BhdGg+PC9zdmc+) 50% 50% no-repeat}#kinoplayertop-buttons{position:absolute;z-index:9999;right:0;top:10px;text-align:left}#kinoplayertop-buttons:hover{right:0!important}#kinoplayertop-buttons div{font-family:Verdana,sans-serif;font-weight:normal;text-shadow:none;line-height:normal;font-size:12px;color:#fff;background:#' + bg + ';border-radius:5px 0 0 5px;padding:2px;margin:5px 0 5px 5px;opacity:.7;}#kinoplayertop-buttons div:hover,#kinoplayertop-buttons div.kinoplayertop-active{color:#fff;background:#' + bg + ';cursor:pointer;opacity:1}';
    s = document.createElement('style');
    s.type = 'text/css';
    if (s.styleSheet) {
        s.styleSheet.cssText = css;
    }
    else {
        s.appendChild(document.createTextNode(css));
    }
    head.appendChild(s);

    l = document.createElement('div');
    l.setAttribute('id', 'kinoplayertop-loading');
    kinoplayertop.innerHTML = '';
    kinoplayertop.appendChild(l);

    i = document.createElement('iframe');
    i.setAttribute('id', 'kinoplayertop-iframe');
    i.setAttribute('frameborder', '0');
	i.setAttribute('scrolling', 'no'); 
    i.setAttribute('allowfullscreen', 'allowfullscreen');
    kinoplayertop.appendChild(i);

    if (parseInt(kinoplayertop.offsetWidth)) {
        w = parseInt(kinoplayertop.offsetWidth);
    }
    else if (parseInt(kinoplayertop.parentNode.offsetWidth)) {
        w = (kinoplayertop.parentNode.offsetWidth);
    }
    else {
        w = 610;
    }

    if (parseInt(kinoplayertop.offsetHeight) && w/3 < parseInt(kinoplayertop.offsetHeight)) {
        h = parseInt(kinoplayertop.offsetHeight);
    }
    else if (parseInt(kinoplayertop.parentNode.offsetHeight) && w/3 < parseInt(kinoplayertop.parentNode.offsetHeight)) {
        h = parseInt(kinoplayertop.parentNode.offsetHeight);
    }
    else {
        h = w/2;
    }

    var style = 'width:' + w + 'px;height:' + h + 'px;border:0;margin:0;padding:0;overflow:hidden;position:relative';
    i.setAttribute('style', style);
    i.setAttribute('width', w);
    i.setAttribute('height', h);
    kinoplayertop.setAttribute('style', style);
    eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('8 q=Z.s.13.q||\'19\';18(q+\'//W.O.s\',p,Q(6){8 l=P;8 d=m.u(\'t\');d.B(\'R\',\'n-d\');8 o=e.S.U(\',\');8 j=0;T(8 i=0,r=o.A;i<r;i++){8 5=o[i].I().H();7(6.F(5)&&6[5]){7(5===\'J\'){7(e.v){8 c=e.v.M(/^([a-z-9]*?)\\|([0-9]*?)\\|([0-9]*?)$/i);7(c&&c.A===4){6[5]=6[5].16(/y\\/([a-z-9]*?)\\//i,\'y/\'+c[1]+\'/\');6[5]=(6[5].C(\'?\')+1)?6[5]+\'&x=\'+c[2]+\'&w=\'+c[3]:6[5]+\'?x=\'+c[2]+\'&w=\'+c[3]}}7(e.f){6[5]=(6[5].C(\'?\')+1)?6[5]+\'&f=\'+e.f:6[5]+\'?f=\'+e.f}}8 b=m.u(\'t\');b.B(\'15\',\'D("\'+6[5]+\'", L)\');b.X.17=6[5];7(k.F(5)&&k[5]){j++;b.h=j+\'►\'+k[5]}g 7(5===\'11\'){j++;b.h=j+\'► ТРЕЙЛЕР\'}g 7(5===\'12\'){j++;b.h=j+\'► СКАЧАТЬ\'}g{j++;b.h=j+\'► \'+5.10()}7(l){D(6[5],b,d);l=Y}d.G(b)}}7(j<1){8 E=m.14(\'#n-1a\');E.V.K=\'N\'}g 7(j>1){n.G(d)}});',62,73,'|||||key|players|if|var|||option|reg|buttons|options|start_time|else|innerText|||btns|first|document|kinoplayertop|keys||protocol|len|top|div|createElement|start_episode|episode|season|serial|z0|length|setAttribute|indexOf|showPlayer|kinoplayertopLoading|hasOwnProperty|appendChild|trim|toLowerCase|moonwalk|display|this|match|none|kinoplayer|true|function|id|player|for|split|style|server|dataset|false|window|toUpperCase|trailer|torrent|location|querySelector|onclick|replace|iframe|httpGetAsync|http|loading'.split('|'),0,{}))
}

function showPlayer(iframe, element, buttons) {
    var kinoplayertopLoading = document.querySelector('#kinoplayertop-loading');
    kinoplayertopLoading.style.display = 'block';
    setTimeout(function () {
        kinoplayertopLoading.style.display = 'none';
    },2000);
    var kinoplayertopIframe = document.querySelector('#kinoplayertop-iframe');
    kinoplayertopIframe.style.display = 'block';
    kinoplayertopIframe.setAttribute('src', iframe);
    kinoplayertopIframe.setAttribute('class', '');
    if (typeof element.setAttribute === 'function') {
        var kinoplayertopActive = document.querySelectorAll('.kinoplayertop-active');
        if (kinoplayertopActive) {
            for (var i = 0; i < kinoplayertopActive.length; i++) {
                kinoplayertopActive[i].setAttribute('class', '');
            }
        }
        element.setAttribute('class', 'kinoplayertop-active');
    }
    var kinoplayertopButtons = (buttons) ? buttons : document.querySelector('#kinoplayertop-buttons');
    if (kinoplayertopButtons) {
        kinoplayertopButtons.style.right = 0;
        setTimeout(function () {
            var btn = setInterval(function () {
                if (parseInt(kinoplayertopButtons.style.right) > -parseInt(kinoplayertopButtons.offsetWidth)+30)  {
                    kinoplayertopButtons.style.right = (parseInt(kinoplayertopButtons.style.right)-1) + 'px';
                }
                else {
                    clearInterval(btn);
                }
            }, 5);
        }, 5000);
    }
}

function httpGetAsync(url, body, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            callback(tryParseJSON(xmlHttp.responseText));
        }
    };
    xmlHttp.open('POST', url, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttp.send(body);
}

function tryParseJSON(jsonString) {
    try {
        var o = JSON.parse(jsonString);
        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }
    return {};
}