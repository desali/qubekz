function t121_setHeight(recid) {
    var rec = $('#rec' + recid);
    var div = $("#youtubeiframe" + recid);
    var height = div.width() * 0.5625;
    div.height(height);
    div.parent().height(height);
    var videoLazy = rec.find('.t-video-lazyload');
    var iframeLazy = videoLazy.find('iframe');
    if (videoLazy != undefined) {
        var heightLazy = videoLazy.width() * 0.5625;
        videoLazy.height(heightLazy);
        iframeLazy.height(heightLazy)
    }
}

function t142_checkSize(recid) {
    var el = $("#rec" + recid).find(".t142__submit");
    if (el.length) {
        var btnheight = el.height() + 5;
        var textheight = el[0].scrollHeight;
        if (btnheight < textheight) {
            var btntext = el.text();
            el.addClass("t142__submit-overflowed");
            el.html("<span class=\"t142__text\">" + btntext + "</span>")
        }
    }
}

function t228_highlight() {
    var url = window.location.href;
    var pathname = window.location.pathname;
    if (url.substr(url.length - 1) == "index.html") {
        url = url.slice(0, -1)
    }
    if (pathname.substr(pathname.length - 1) == "index.html") {
        pathname = pathname.slice(0, -1)
    }
    if (pathname.charAt(0) == "index.html") {
        pathname = pathname.slice(1)
    }
    if (pathname == "") {
        pathname = "/"
    }
    $(".t228__list_item a[href='" + url + "']").addClass("t-active");
    $(".t228__list_item a[href='" + url + "/']").addClass("t-active");
    $(".t228__list_item a[href='" + pathname + "']").addClass("t-active");
    $(".t228__list_item a[href='/" + pathname + "']").addClass("t-active");
    $(".t228__list_item a[href='" + pathname + "/']").addClass("t-active");
    $(".t228__list_item a[href='/" + pathname + "/']").addClass("t-active")
}

function t228_checkAnchorLinks(recid) {
    if ($(window).width() >= 960) {
        var t228_navLinks = $("#rec" + recid + " .t228__list_item a:not(.tooltipstered)[href*='#']");
        if (t228_navLinks.length > 0) {
            setTimeout(function() {
                t228_catchScroll(t228_navLinks)
            }, 500)
        }
    }
}

function t228_catchScroll(t228_navLinks) {
    var t228_clickedSectionId = null,
        t228_sections = new Array(),
        t228_sectionIdTonavigationLink = [],
        t228_interval = 100,
        t228_lastCall, t228_timeoutId;
    t228_navLinks = $(t228_navLinks.get().reverse());
    t228_navLinks.each(function() {
        var t228_cursection = t228_getSectionByHref($(this));
        if (typeof t228_cursection.attr("id") != "undefined") {
            t228_sections.push(t228_cursection)
        }
        t228_sectionIdTonavigationLink[t228_cursection.attr("id")] = $(this)
    });
    t228_updateSectionsOffsets(t228_sections);
    t228_sections.sort(function(a, b) {
        return b.attr("data-offset-top") - a.attr("data-offset-top")
    });
    $(window).bind('resize', t_throttle(function() {
        t228_updateSectionsOffsets(t228_sections)
    }, 200));
    $('.t228').bind('displayChanged', function() {
        t228_updateSectionsOffsets(t228_sections)
    });
    setInterval(function() {
        t228_updateSectionsOffsets(t228_sections)
    }, 5000);
    t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId);
    t228_navLinks.click(function() {
        var t228_clickedSection = t228_getSectionByHref($(this));
        if (!$(this).hasClass("tooltipstered") && typeof t228_clickedSection.attr("id") != "undefined") {
            t228_navLinks.removeClass('t-active');
            $(this).addClass('t-active');
            t228_clickedSectionId = t228_getSectionByHref($(this)).attr("id")
        }
    });
    $(window).scroll(function() {
        var t228_now = new Date().getTime();
        if (t228_lastCall && t228_now < (t228_lastCall + t228_interval)) {
            clearTimeout(t228_timeoutId);
            t228_timeoutId = setTimeout(function() {
                t228_lastCall = t228_now;
                t228_clickedSectionId = t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId)
            }, t228_interval - (t228_now - t228_lastCall))
        } else {
            t228_lastCall = t228_now;
            t228_clickedSectionId = t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId)
        }
    })
}

function t228_updateSectionsOffsets(sections) {
    $(sections).each(function() {
        var t228_curSection = $(this);
        t228_curSection.attr("data-offset-top", t228_curSection.offset().top)
    })
}

function t228_getSectionByHref(curlink) {
    var t228_curLinkValue = curlink.attr('href').replace(/\s+/g, '').replace(/.*#/, '');
    if (curlink.is('[href*="#rec"]')) {
        return $(".r[id='" + t228_curLinkValue + "']")
    } else {
        return $(".r[data-record-type='215']").has("a[name='" + t228_curLinkValue + "']")
    }
}

function t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId) {
    var t228_scrollPosition = $(window).scrollTop(),
        t228_valueToReturn = t228_clickedSectionId;
    if (t228_sections.length != 0 && t228_clickedSectionId == null && t228_sections[t228_sections.length - 1].attr("data-offset-top") > (t228_scrollPosition + 300)) {
        t228_navLinks.removeClass('t-active');
        return null
    }
    $(t228_sections).each(function(e) {
        var t228_curSection = $(this),
            t228_sectionTop = t228_curSection.attr("data-offset-top"),
            t228_id = t228_curSection.attr('id'),
            t228_navLink = t228_sectionIdTonavigationLink[t228_id];
        if (((t228_scrollPosition + 300) >= t228_sectionTop) || (t228_sections[0].attr("id") == t228_id && t228_scrollPosition >= $(document).height() - $(window).height())) {
            if (t228_clickedSectionId == null && !t228_navLink.hasClass('t-active')) {
                t228_navLinks.removeClass('t-active');
                t228_navLink.addClass('t-active');
                t228_valueToReturn = null
            } else {
                if (t228_clickedSectionId != null && t228_id == t228_clickedSectionId) {
                    t228_valueToReturn = null
                }
            }
            return !1
        }
    });
    return t228_valueToReturn
}

function t228_setPath() {}

function t228_setWidth(recid) {
    var window_width = $(window).width();
    if (window_width > 980) {
        $(".t228").each(function() {
            var el = $(this);
            var left_exist = el.find('.t228__leftcontainer').length;
            var left_w = el.find('.t228__leftcontainer').outerWidth(!0);
            var max_w = left_w;
            var right_exist = el.find('.t228__rightcontainer').length;
            var right_w = el.find('.t228__rightcontainer').outerWidth(!0);
            var items_align = el.attr('data-menu-items-align');
            if (left_w < right_w) max_w = right_w;
            max_w = Math.ceil(max_w);
            var center_w = 0;
            el.find('.t228__centercontainer').find('li').each(function() {
                center_w += $(this).outerWidth(!0)
            });
            var padd_w = 40;
            var maincontainer_width = el.find(".t228__maincontainer").outerWidth();
            if (maincontainer_width - max_w * 2 - padd_w * 2 > center_w + 20) {
                if (items_align == "center" || typeof items_align === "undefined") {
                    el.find(".t228__leftside").css("min-width", max_w + "px");
                    el.find(".t228__rightside").css("min-width", max_w + "px");
                    el.find(".t228__list").removeClass("t228__list_hidden")
                }
            } else {
                el.find(".t228__leftside").css("min-width", "");
                el.find(".t228__rightside").css("min-width", "")
            }
        })
    }
}

function t228_setBg(recid) {
    var window_width = $(window).width();
    if (window_width > 980) {
        $(".t228").each(function() {
            var el = $(this);
            if (el.attr('data-bgcolor-setbyscript') == "yes") {
                var bgcolor = el.attr("data-bgcolor-rgba");
                el.css("background-color", bgcolor)
            }
        })
    } else {
        $(".t228").each(function() {
            var el = $(this);
            var bgcolor = el.attr("data-bgcolor-hex");
            el.css("background-color", bgcolor);
            el.attr("data-bgcolor-setbyscript", "yes")
        })
    }
}

function t228_appearMenu(recid) {
    var window_width = $(window).width();
    if (window_width > 980) {
        $(".t228").each(function() {
            var el = $(this);
            var appearoffset = el.attr("data-appearoffset");
            if (appearoffset != "") {
                if (appearoffset.indexOf('vh') > -1) {
                    appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)))
                }
                appearoffset = parseInt(appearoffset, 10);
                if ($(window).scrollTop() >= appearoffset) {
                    if (el.css('visibility') == 'hidden') {
                        el.finish();
                        el.css("top", "-50px");
                        el.css("visibility", "visible");
                        var topoffset = el.data('top-offset');
                        if (topoffset && parseInt(topoffset) > 0) {
                            el.animate({
                                "opacity": "1",
                                "top": topoffset + "px"
                            }, 200, function() {})
                        } else {
                            el.animate({
                                "opacity": "1",
                                "top": "0px"
                            }, 200, function() {})
                        }
                    }
                } else {
                    el.stop();
                    el.css("visibility", "hidden");
                    el.css("opacity", "0")
                }
            }
        })
    }
}

function t228_changebgopacitymenu(recid) {
    var window_width = $(window).width();
    if (window_width > 980) {
        $(".t228").each(function() {
            var el = $(this);
            var bgcolor = el.attr("data-bgcolor-rgba");
            var bgcolor_afterscroll = el.attr("data-bgcolor-rgba-afterscroll");
            var bgopacityone = el.attr("data-bgopacity");
            var bgopacitytwo = el.attr("data-bgopacity-two");
            var menushadow = el.attr("data-menushadow");
            if (menushadow == '100') {
                var menushadowvalue = menushadow
            } else {
                var menushadowvalue = '0.' + menushadow
            }
            if ($(window).scrollTop() > 20) {
                el.css("background-color", bgcolor_afterscroll);
                if (bgopacitytwo == '0' || (typeof menushadow == "undefined" && menushadow == !1)) {
                    el.css("box-shadow", "none")
                } else {
                    el.css("box-shadow", "0px 1px 3px rgba(0,0,0," + menushadowvalue + ")")
                }
            } else {
                el.css("background-color", bgcolor);
                if (bgopacityone == '0.0' || (typeof menushadow == "undefined" && menushadow == !1)) {
                    el.css("box-shadow", "none")
                } else {
                    el.css("box-shadow", "0px 1px 3px rgba(0,0,0," + menushadowvalue + ")")
                }
            }
        })
    }
}

function t228_createMobileMenu(recid) {
    var window_width = $(window).width(),
        el = $("#rec" + recid),
        menu = el.find(".t228"),
        burger = el.find(".t228__mobile");
    burger.click(function(e) {
        menu.fadeToggle(300);
        $(this).toggleClass("t228_opened")
    })
    $(window).bind('resize', t_throttle(function() {
        window_width = $(window).width();
        if (window_width > 980) {
            menu.fadeIn(0)
        }
    }, 200))
}

function t270_scroll(hash, offset, speed) {
    var $root = $('html, body');
    var target = "";
    try {
        target = $(hash)
    } catch (event) {
        console.log("Exception t270: " + event.message);
        return !0
    }
    if (target.length === 0) {
        target = $('a[name="' + hash.substr(1) + '"]');
        if (target.length === 0) {
            return !0
        }
    }
    $root.animate({
        scrollTop: target.offset().top - offset
    }, speed || 500, function() {
        if (history.pushState) {
            history.pushState(null, null, hash)
        } else {
            window.location.hash = hash
        }
    });
    return !0
}

function t331_initPopup(recid) {
    $('#rec' + recid).attr('data-animationappear', 'off');
    $('#rec' + recid).css('opacity', '1');
    var el = $('#rec' + recid).find('.t-popup'),
        hook = el.attr('data-tooltip-hook'),
        analitics = el.attr('data-track-popup');
    if (hook !== '') {
        $('.r').on('click', 'a[href="' + hook + '"]', function(e) {
            t331_showPopup(recid);
            t331_resizePopup(recid);
            e.preventDefault();
            if (analitics > '') {
                var virtTitle = hook;
                if (virtTitle.substring(0, 7) == '#popup:') {
                    virtTitle = virtTitle.substring(7)
                }
                Tilda.sendEventToStatistics(analitics, virtTitle)
            }
        })
    }
}

function t331_setHeight(recid) {
    var el = $("#rec" + recid);
    var div = el.find(".t331__video-carier");
    var ratiowidth = div.attr("data-video-width");
    var ratioheight = div.attr("data-video-height");
    var ratio = ratioheight / ratiowidth;
    var height = div.width() * ratio;
    div.height(height);
    div.parent().height(height)
}

function t331_showPopup(recid) {
    var el = $('#rec' + recid),
        popup = el.find('.t-popup');
    var youtubeid = el.find(".t331__youtube").attr('data-content-popup-video-url-youtube');
    var videourl = 'https://www.youtube.com/embed/' + youtubeid;
    el.find(".t331__video-carier").html("<iframe id=\"youtubeiframe" + recid + "\" class=\"t331__iframe\" width=\"100.5%\" height=\"100.5%\" src=\"" + videourl + "?autoplay=1&rel=0\" frameborder=\"0\" allowfullscreen></iframe>");
    popup.css('display', 'block');
    t331_setHeight(recid);
    setTimeout(function() {
        popup.find('.t-popup__container').addClass('t-popup__container-animated');
        popup.addClass('t-popup_show')
    }, 50);
    $('body').addClass('t-body_popupshowed');
    $('body').addClass('t331__body_popupshowed');
    el.find('.t-popup').click(function(e) {
        if (e.target == this) {
            t331_popup_close(recid)
        }
    });
    el.find('.t-popup__close').click(function(e) {
        t331_popup_close(recid)
    });
    $(document).keydown(function(e) {
        if (e.keyCode == 27) {
            t331_popup_close(recid)
        }
    })
}

function t331_popup_close(recid) {
    $('body').removeClass('t-body_popupshowed');
    $('body').removeClass('t331__body_popupshowed');
    $('#rec' + recid + ' .t-popup').removeClass('t-popup_show');
    setTimeout(function() {
        $("#rec" + recid + " .t331__video-carier").html("");
        $('#rec' + recid + ' .t-popup').not('.t-popup_show').css('display', 'none')
    }, 300)
}

function t331_resizePopup(recid) {
    var el = $("#rec" + recid),
        div = el.find(".t-popup__container").height(),
        win = $(window).height(),
        popup = el.find(".t-popup__container");
    if (div > win) {
        popup.addClass('t-popup__container-static')
    } else {
        popup.removeClass('t-popup__container-static')
    }
}

function t331_sendPopupEventToStatistics(popupname) {
    var virtPage = 'tilda/popup/index.html';
    var virtTitle = 'Popup: ';
    if (popupname.substring(0, 7) == '#popup:') {
        popupname = popupname.substring(7)
    }
    virtPage += popupname;
    virtTitle += popupname;
    if (ga) {
        if (window.mainTracker != 'tilda') {
            ga('send', {
                'hitType': 'pageview',
                'page': virtPage,
                'title': virtTitle
            })
        }
    }
    if (window.mainMetrika > '' && window[window.mainMetrika]) {
        window[window.mainMetrika].hit(virtPage, {
            title: virtTitle,
            referer: window.location.href
        })
    }
}

function t389_scrollToTop() {
    $('html, body').animate({
        scrollTop: 0
    }, 700)
}

function t396_init(recid) {
    var data = '';
    var res = t396_detectResolution();
    t396_initTNobj();
    t396_switchResolution(res);
    t396_updateTNobj();
    t396_artboard_build(data, recid);
    window.tn_window_width = $(window).width();
    $(window).resize(function() {
        tn_console('>>>> t396: Window on Resize event >>>>');
        t396_waitForFinalEvent(function() {
            if ($isMobile) {
                var ww = $(window).width();
                if (ww != window.tn_window_width) {
                    t396_doResize(recid)
                }
            } else {
                t396_doResize(recid)
            }
        }, 500, 'resizeruniqueid' + recid)
    });
    $(window).on("orientationchange", function() {
        tn_console('>>>> t396: Orient change event >>>>');
        t396_waitForFinalEvent(function() {
            t396_doResize(recid)
        }, 600, 'orientationuniqueid' + recid)
    });
    $(window).load(function() {
        var ab = $('#rec' + recid).find('.t396__artboard');
        t396_allelems__renderView(ab)
    });
    var rec = $('#rec' + recid);
    if (rec.attr('data-connect-with-tab') == 'yes') {
        rec.find('.t396').bind('displayChanged', function() {
            var ab = rec.find('.t396__artboard');
            t396_allelems__renderView(ab)
        })
    }
}

function t396_doResize(recid) {
    var ww = $(window).width();
    window.tn_window_width = ww;
    var res = t396_detectResolution();
    var ab = $('#rec' + recid).find('.t396__artboard');
    t396_switchResolution(res);
    t396_updateTNobj();
    t396_ab__renderView(ab);
    t396_allelems__renderView(ab)
}

function t396_detectResolution() {
    var ww = $(window).width();
    var res;
    res = 1200;
    if (ww < 1200) {
        res = 960
    }
    if (ww < 960) {
        res = 640
    }
    if (ww < 640) {
        res = 480
    }
    if (ww < 480) {
        res = 320
    }
    return (res)
}

function t396_initTNobj() {
    tn_console('func: initTNobj');
    window.tn = {};
    window.tn.canvas_min_sizes = ["320", "480", "640", "960", "1200"];
    window.tn.canvas_max_sizes = ["480", "640", "960", "1200", ""];
    window.tn.ab_fields = ["height", "width", "bgcolor", "bgimg", "bgattachment", "bgposition", "filteropacity", "filtercolor", "filteropacity2", "filtercolor2", "height_vh", "valign"]
}

function t396_updateTNobj() {
    tn_console('func: updateTNobj');
    if (typeof window.zero_window_width_hook != 'undefined' && window.zero_window_width_hook == 'allrecords' && $('#allrecords').length) {
        window.tn.window_width = parseInt($('#allrecords').width())
    } else {
        window.tn.window_width = parseInt($(window).width())
    }
    window.tn.window_height = parseInt($(window).height());
    if (window.tn.curResolution == 1200) {
        window.tn.canvas_min_width = 1200;
        window.tn.canvas_max_width = window.tn.window_width
    }
    if (window.tn.curResolution == 960) {
        window.tn.canvas_min_width = 960;
        window.tn.canvas_max_width = 1200
    }
    if (window.tn.curResolution == 640) {
        window.tn.canvas_min_width = 640;
        window.tn.canvas_max_width = 960
    }
    if (window.tn.curResolution == 480) {
        window.tn.canvas_min_width = 480;
        window.tn.canvas_max_width = 640
    }
    if (window.tn.curResolution == 320) {
        window.tn.canvas_min_width = 320;
        window.tn.canvas_max_width = 480
    }
    window.tn.grid_width = window.tn.canvas_min_width;
    window.tn.grid_offset_left = parseFloat((window.tn.window_width - window.tn.grid_width) / 2)
}
var t396_waitForFinalEvent = (function() {
    var timers = {};
    return function(callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId"
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId])
        }
        timers[uniqueId] = setTimeout(callback, ms)
    }
})();

function t396_switchResolution(res, resmax) {
    tn_console('func: switchResolution');
    if (typeof resmax == 'undefined') {
        if (res == 1200) resmax = '';
        if (res == 960) resmax = 1200;
        if (res == 640) resmax = 960;
        if (res == 480) resmax = 640;
        if (res == 320) resmax = 480
    }
    window.tn.curResolution = res;
    window.tn.curResolution_max = resmax
}

function t396_artboard_build(data, recid) {
    tn_console('func: t396_artboard_build. Recid:' + recid);
    tn_console(data);
    var ab = $('#rec' + recid).find('.t396__artboard');
    t396_ab__renderView(ab);
    ab.find('.tn-elem').each(function() {
        var item = $(this);
        if (item.attr('data-elem-type') == 'text') {
            t396_addText(ab, item)
        }
        if (item.attr('data-elem-type') == 'image') {
            t396_addImage(ab, item)
        }
        if (item.attr('data-elem-type') == 'shape') {
            t396_addShape(ab, item)
        }
        if (item.attr('data-elem-type') == 'button') {
            t396_addButton(ab, item)
        }
        if (item.attr('data-elem-type') == 'video') {
            t396_addVideo(ab, item)
        }
        if (item.attr('data-elem-type') == 'html') {
            t396_addHtml(ab, item)
        }
        if (item.attr('data-elem-type') == 'tooltip') {
            t396_addTooltip(ab, item)
        }
        if (item.attr('data-elem-type') == 'form') {
            t396_addForm(ab, item)
        }
        if (item.attr('data-elem-type') == 'gallery') {
            t396_addGallery(ab, item)
        }
    });
    $('#rec' + recid).find('.t396__artboard').removeClass('rendering').addClass('rendered');
    if (ab.attr('data-artboard-ovrflw') == 'visible') {
        $('#allrecords').css('overflow', 'hidden')
    }
    if ($isMobile) {
        $('#rec' + recid).append('<style>@media only screen and (min-width:1366px) and (orientation:landscape) and (-webkit-min-device-pixel-ratio:2) {.t396__carrier {background-attachment:scroll!important;}}</style>')
    }
}

function t396_ab__renderView(ab) {
    var fields = window.tn.ab_fields;
    for (var i = 0; i < fields.length; i++) {
        t396_ab__renderViewOneField(ab, fields[i])
    }
    var ab_min_height = t396_ab__getFieldValue(ab, 'height');
    var ab_max_height = t396_ab__getHeight(ab);
    var offset_top = 0;
    if (ab_min_height == ab_max_height) {
        offset_top = 0
    } else {
        var ab_valign = t396_ab__getFieldValue(ab, 'valign');
        if (ab_valign == 'top') {
            offset_top = 0
        } else if (ab_valign == 'center') {
            offset_top = parseFloat((ab_max_height - ab_min_height) / 2).toFixed(1)
        } else if (ab_valign == 'bottom') {
            offset_top = parseFloat((ab_max_height - ab_min_height)).toFixed(1)
        } else if (ab_valign == 'stretch') {
            offset_top = 0;
            ab_min_height = ab_max_height
        } else {
            offset_top = 0
        }
    }
    ab.attr('data-artboard-proxy-min-offset-top', offset_top);
    ab.attr('data-artboard-proxy-min-height', ab_min_height);
    ab.attr('data-artboard-proxy-max-height', ab_max_height)
}

function t396_addText(ab, el) {
    tn_console('func: addText');
    var fields_str = 'top,left,width,container,axisx,axisy,widthunits,leftunits,topunits';
    var fields = fields_str.split(',');
    el.attr('data-fields', fields_str);
    t396_elem__renderView(el)
}

function t396_addImage(ab, el) {
    tn_console('func: addImage');
    var fields_str = 'img,width,filewidth,fileheight,top,left,container,axisx,axisy,widthunits,leftunits,topunits';
    var fields = fields_str.split(',');
    el.attr('data-fields', fields_str);
    t396_elem__renderView(el);
    el.find('img').on("load", function() {
        t396_elem__renderViewOneField(el, 'top');
        if (typeof $(this).attr('src') != 'undefined' && $(this).attr('src') != '') {
            setTimeout(function() {
                t396_elem__renderViewOneField(el, 'top')
            }, 2000)
        }
    }).each(function() {
        if (this.complete) $(this).load()
    });
    el.find('img').on('tuwidget_done', function(e, file) {
        t396_elem__renderViewOneField(el, 'top')
    })
}

function t396_addShape(ab, el) {
    tn_console('func: addShape');
    var fields_str = 'width,height,top,left,';
    fields_str += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits';
    var fields = fields_str.split(',');
    el.attr('data-fields', fields_str);
    t396_elem__renderView(el)
}

function t396_addButton(ab, el) {
    tn_console('func: addButton');
    var fields_str = 'top,left,width,height,container,axisx,axisy,caption,leftunits,topunits';
    var fields = fields_str.split(',');
    el.attr('data-fields', fields_str);
    t396_elem__renderView(el);
    return (el)
}

function t396_addVideo(ab, el) {
    tn_console('func: addVideo');
    var fields_str = 'width,height,top,left,';
    fields_str += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits';
    var fields = fields_str.split(',');
    el.attr('data-fields', fields_str);
    t396_elem__renderView(el);
    var viel = el.find('.tn-atom__videoiframe');
    var viatel = el.find('.tn-atom');
    viatel.css('background-color', '#000');
    var vihascover = viatel.attr('data-atom-video-has-cover');
    if (typeof vihascover == 'undefined') {
        vihascover = ''
    }
    if (vihascover == 'y') {
        viatel.click(function() {
            var viifel = viel.find('iframe');
            if (viifel.length) {
                var foo = viifel.attr('data-original');
                viifel.attr('src', foo)
            }
            viatel.css('background-image', 'none');
            viatel.find('.tn-atom__video-play-link').css('display', 'none')
        })
    }
    var autoplay = t396_elem__getFieldValue(el, 'autoplay');
    var showinfo = t396_elem__getFieldValue(el, 'showinfo');
    var loop = t396_elem__getFieldValue(el, 'loop');
    var mute = t396_elem__getFieldValue(el, 'mute');
    var startsec = t396_elem__getFieldValue(el, 'startsec');
    var endsec = t396_elem__getFieldValue(el, 'endsec');
    var tmode = $('#allrecords').attr('data-tilda-mode');
    var url = '';
    var viyid = viel.attr('data-youtubeid');
    if (typeof viyid != 'undefined' && viyid != '') {
        url = 'http://www.youtube.com/embed/';
        url += viyid + '?rel=0&fmt=18&html5=1';
        url += '&showinfo=' + (showinfo == 'y' ? '1' : '0');
        if (loop == 'y') {
            url += '&loop=1&playlist=' + viyid
        }
        if (startsec > 0) {
            url += '&start=' + startsec
        }
        if (endsec > 0) {
            url += '&end=' + endsec
        }
        if (mute == 'y') {
            url += '&mute=1'
        }
        if (vihascover == 'y') {
            url += '&autoplay=1';
            viel.html('<iframe id="youtubeiframe" width="100%" height="100%" data-original="' + url + '" frameborder="0" allowfullscreen data-flag-inst="y"></iframe>')
        } else {
            if (typeof tmode != 'undefined' && tmode == 'edit') {} else {
                if (autoplay == 'y') {
                    url += '&autoplay=1'
                }
            }
            if (window.lazy == 'y') {
                viel.html('<iframe id="youtubeiframe" class="t-iframe" width="100%" height="100%" data-original="' + url + '" frameborder="0" allowfullscreen data-flag-inst="lazy"></iframe>');
                el.append('<script>lazyload_iframe = new LazyLoad({elements_selector: ".t-iframe"});</script>')
            } else {
                viel.html('<iframe id="youtubeiframe" width="100%" height="100%" src="' + url + '" frameborder="0" allowfullscreen data-flag-inst="y"></iframe>')
            }
        }
    }
    var vivid = viel.attr('data-vimeoid');
    if (typeof vivid != 'undefined' && vivid > 0) {
        url = 'http://player.vimeo.com/video/';
        url += vivid + '?color=ffffff&badge=0';
        if (showinfo == 'y') {
            url += '&title=1&byline=1&portrait=1'
        } else {
            url += '&title=0&byline=0&portrait=0'
        }
        if (loop == 'y') {
            url += '&loop=1'
        }
        if (mute == 'y') {
            url += '&muted=1'
        }
        if (vihascover == 'y') {
            url += '&autoplay=1';
            viel.html('<iframe data-original="' + url + '" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
        } else {
            if (typeof tmode != 'undefined' && tmode == 'edit') {} else {
                if (autoplay == 'y') {
                    url += '&autoplay=1'
                }
            }
            if (window.lazy == 'y') {
                viel.html('<iframe class="t-iframe" data-original="' + url + '" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
                el.append('<script>lazyload_iframe = new LazyLoad({elements_selector: ".t-iframe"});</script>')
            } else {
                viel.html('<iframe src="' + url + '" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
            }
        }
    }
}

function t396_addHtml(ab, el) {
    tn_console('func: addHtml');
    var fields_str = 'width,height,top,left,';
    fields_str += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits';
    var fields = fields_str.split(',');
    el.attr('data-fields', fields_str);
    t396_elem__renderView(el)
}

function t396_addTooltip(ab, el) {
    tn_console('func: addTooltip');
    var fields_str = 'width,height,top,left,';
    fields_str += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits,tipposition';
    var fields = fields_str.split(',');
    el.attr('data-fields', fields_str);
    t396_elem__renderView(el);
    var pinEl = el.find('.tn-atom__pin');
    var tipEl = el.find('.tn-atom__tip');
    var tipopen = el.attr('data-field-tipopen-value');
    if (isMobile || (typeof tipopen != 'undefined' && tipopen == 'click')) {
        t396_setUpTooltip_mobile(el, pinEl, tipEl)
    } else {
        t396_setUpTooltip_desktop(el, pinEl, tipEl)
    }
    setTimeout(function() {
        $('.tn-atom__tip-img').each(function() {
            var foo = $(this).attr('data-tipimg-original');
            if (typeof foo != 'undefined' && foo != '') {
                $(this).attr('src', foo)
            }
        })
    }, 3000)
}

function t396_addForm(ab, el) {
    tn_console('func: addForm');
    var fields_str = 'width,top,left,';
    fields_str += 'inputs,container,axisx,axisy,widthunits,leftunits,topunits';
    var fields = fields_str.split(',');
    el.attr('data-fields', fields_str);
    t396_elem__renderView(el)
}

function t396_addGallery(ab, el) {
    tn_console('func: addForm');
    var fields_str = 'width,height,top,left,';
    fields_str += 'imgs,container,axisx,axisy,widthunits,heightunits,leftunits,topunits';
    var fields = fields_str.split(',');
    el.attr('data-fields', fields_str);
    t396_elem__renderView(el)
}

function t396_elem__setFieldValue(el, prop, val, flag_render, flag_updateui, res) {
    if (res == '') res = window.tn.curResolution;
    if (res < 1200 && prop != 'zindex') {
        el.attr('data-field-' + prop + '-res-' + res + '-value', val)
    } else {
        el.attr('data-field-' + prop + '-value', val)
    }
    if (flag_render == 'render') elem__renderViewOneField(el, prop);
    if (flag_updateui == 'updateui') panelSettings__updateUi(el, prop, val)
}

function t396_elem__getFieldValue(el, prop) {
    var res = window.tn.curResolution;
    var r;
    if (res < 1200) {
        if (res == 960) {
            r = el.attr('data-field-' + prop + '-res-960-value');
            if (typeof r == 'undefined') {
                r = el.attr('data-field-' + prop + '-value')
            }
        }
        if (res == 640) {
            r = el.attr('data-field-' + prop + '-res-640-value');
            if (typeof r == 'undefined') {
                r = el.attr('data-field-' + prop + '-res-960-value');
                if (typeof r == 'undefined') {
                    r = el.attr('data-field-' + prop + '-value')
                }
            }
        }
        if (res == 480) {
            r = el.attr('data-field-' + prop + '-res-480-value');
            if (typeof r == 'undefined') {
                r = el.attr('data-field-' + prop + '-res-640-value');
                if (typeof r == 'undefined') {
                    r = el.attr('data-field-' + prop + '-res-960-value');
                    if (typeof r == 'undefined') {
                        r = el.attr('data-field-' + prop + '-value')
                    }
                }
            }
        }
        if (res == 320) {
            r = el.attr('data-field-' + prop + '-res-320-value');
            if (typeof r == 'undefined') {
                r = el.attr('data-field-' + prop + '-res-480-value');
                if (typeof r == 'undefined') {
                    r = el.attr('data-field-' + prop + '-res-640-value');
                    if (typeof r == 'undefined') {
                        r = el.attr('data-field-' + prop + '-res-960-value');
                        if (typeof r == 'undefined') {
                            r = el.attr('data-field-' + prop + '-value')
                        }
                    }
                }
            }
        }
    } else {
        r = el.attr('data-field-' + prop + '-value')
    }
    return (r)
}

function t396_elem__renderView(el) {
    tn_console('func: elem__renderView');
    var fields = el.attr('data-fields');
    if (!fields) {
        return !1
    }
    fields = fields.split(',');
    for (var i = 0; i < fields.length; i++) {
        t396_elem__renderViewOneField(el, fields[i])
    }
}

function t396_elem__renderViewOneField(el, field) {
    var value = t396_elem__getFieldValue(el, field);
    if (field == 'left') {
        value = t396_elem__convertPosition__Local__toAbsolute(el, field, value);
        el.css('left', parseFloat(value).toFixed(1) + 'px')
    }
    if (field == 'top') {
        value = t396_elem__convertPosition__Local__toAbsolute(el, field, value);
        el.css('top', parseFloat(value).toFixed(1) + 'px')
    }
    if (field == 'width') {
        value = t396_elem__getWidth(el, value);
        el.css('width', parseFloat(value).toFixed(1) + 'px');
        var eltype = el.attr('data-elem-type');
        if (eltype == 'tooltip') {
            var pinSvgIcon = el.find('.tn-atom__pin-icon');
            if (pinSvgIcon.length > 0) {
                var pinSize = parseFloat(value).toFixed(1) + 'px';
                pinSvgIcon.css({
                    'width': pinSize,
                    'height': pinSize
                })
            }
            el.css('height', parseInt(value).toFixed(1) + 'px')
        }
        if (eltype == 'gallery') {
            var borderWidth = t396_elem__getFieldValue(el, 'borderwidth');
            var borderStyle = t396_elem__getFieldValue(el, 'borderstyle');
            if (borderStyle == 'none' || typeof borderStyle == 'undefined' || typeof borderWidth == 'undefined' || borderWidth == '') borderWidth = 0;
            value = value * 1 - borderWidth * 2;
            el.css('width', parseFloat(value).toFixed(1) + 'px');
            el.find('.t-slds__main').css('width', parseFloat(value).toFixed(1) + 'px');
            el.find('.tn-atom__slds-img').css('width', parseFloat(value).toFixed(1) + 'px')
        }
    }
    if (field == 'height') {
        var eltype = el.attr('data-elem-type');
        if (eltype == 'tooltip') {
            return
        }
        value = t396_elem__getHeight(el, value);
        el.css('height', parseFloat(value).toFixed(1) + 'px');
        if (eltype === 'gallery') {
            var borderWidth = t396_elem__getFieldValue(el, 'borderwidth');
            var borderStyle = t396_elem__getFieldValue(el, 'borderstyle');
            if (borderStyle == 'none' || typeof borderStyle == 'undefined' || typeof borderWidth == 'undefined' || borderWidth == '') borderWidth = 0;
            value = value * 1 - borderWidth * 2;
            el.css('height', parseFloat(value).toFixed(1) + 'px');
            el.find('.tn-atom__slds-img').css('height', parseFloat(value).toFixed(1) + 'px');
            el.find('.t-slds__main').css('height', parseFloat(value).toFixed(1) + 'px')
        }
    }
    if (field == 'container') {
        t396_elem__renderViewOneField(el, 'left');
        t396_elem__renderViewOneField(el, 'top')
    }
    if (field == 'width' || field == 'height' || field == 'fontsize' || field == 'fontfamily' || field == 'letterspacing' || field == 'fontweight' || field == 'img') {
        t396_elem__renderViewOneField(el, 'left');
        t396_elem__renderViewOneField(el, 'top')
    }
    if (field == 'inputs') {
        value = el.find('.tn-atom__inputs-textarea').val();
        try {
            t_zeroForms__renderForm(el, value)
        } catch (err) {}
    }
}

function t396_elem__convertPosition__Local__toAbsolute(el, field, value) {
    value = parseInt(value);
    if (field == 'left') {
        var el_container, offset_left, el_container_width, el_width;
        var container = t396_elem__getFieldValue(el, 'container');
        if (container == 'grid') {
            el_container = 'grid';
            offset_left = window.tn.grid_offset_left;
            el_container_width = window.tn.grid_width
        } else {
            el_container = 'window';
            offset_left = 0;
            el_container_width = window.tn.window_width
        }
        var el_leftunits = t396_elem__getFieldValue(el, 'leftunits');
        if (el_leftunits == '%') {
            value = t396_roundFloat(el_container_width * value / 100)
        }
        value = offset_left + value;
        var el_axisx = t396_elem__getFieldValue(el, 'axisx');
        if (el_axisx == 'center') {
            el_width = t396_elem__getWidth(el);
            value = el_container_width / 2 - el_width / 2 + value
        }
        if (el_axisx == 'right') {
            el_width = t396_elem__getWidth(el);
            value = el_container_width - el_width + value
        }
    }
    if (field == 'top') {
        var ab = el.parent();
        var el_container, offset_top, el_container_height, el_height;
        var container = t396_elem__getFieldValue(el, 'container');
        if (container == 'grid') {
            el_container = 'grid';
            offset_top = parseFloat(ab.attr('data-artboard-proxy-min-offset-top'));
            el_container_height = parseFloat(ab.attr('data-artboard-proxy-min-height'))
        } else {
            el_container = 'window';
            offset_top = 0;
            el_container_height = parseFloat(ab.attr('data-artboard-proxy-max-height'))
        }
        var el_topunits = t396_elem__getFieldValue(el, 'topunits');
        if (el_topunits == '%') {
            value = (el_container_height * (value / 100))
        }
        value = offset_top + value;
        var el_axisy = t396_elem__getFieldValue(el, 'axisy');
        if (el_axisy == 'center') {
            el_height = t396_elem__getHeight(el);
            value = el_container_height / 2 - el_height / 2 + value
        }
        if (el_axisy == 'bottom') {
            el_height = t396_elem__getHeight(el);
            value = el_container_height - el_height + value
        }
    }
    return (value)
}

function t396_ab__setFieldValue(ab, prop, val, res) {
    if (res == '') res = window.tn.curResolution;
    if (res < 1200) {
        ab.attr('data-artboard-' + prop + '-res-' + res, val)
    } else {
        ab.attr('data-artboard-' + prop, val)
    }
}

function t396_ab__getFieldValue(ab, prop) {
    var res = window.tn.curResolution;
    var r;
    if (res < 1200) {
        if (res == 960) {
            r = ab.attr('data-artboard-' + prop + '-res-960');
            if (typeof r == 'undefined') {
                r = ab.attr('data-artboard-' + prop + '')
            }
        }
        if (res == 640) {
            r = ab.attr('data-artboard-' + prop + '-res-640');
            if (typeof r == 'undefined') {
                r = ab.attr('data-artboard-' + prop + '-res-960');
                if (typeof r == 'undefined') {
                    r = ab.attr('data-artboard-' + prop + '')
                }
            }
        }
        if (res == 480) {
            r = ab.attr('data-artboard-' + prop + '-res-480');
            if (typeof r == 'undefined') {
                r = ab.attr('data-artboard-' + prop + '-res-640');
                if (typeof r == 'undefined') {
                    r = ab.attr('data-artboard-' + prop + '-res-960');
                    if (typeof r == 'undefined') {
                        r = ab.attr('data-artboard-' + prop + '')
                    }
                }
            }
        }
        if (res == 320) {
            r = ab.attr('data-artboard-' + prop + '-res-320');
            if (typeof r == 'undefined') {
                r = ab.attr('data-artboard-' + prop + '-res-480');
                if (typeof r == 'undefined') {
                    r = ab.attr('data-artboard-' + prop + '-res-640');
                    if (typeof r == 'undefined') {
                        r = ab.attr('data-artboard-' + prop + '-res-960');
                        if (typeof r == 'undefined') {
                            r = ab.attr('data-artboard-' + prop + '')
                        }
                    }
                }
            }
        }
    } else {
        r = ab.attr('data-artboard-' + prop)
    }
    return (r)
}

function t396_ab__renderViewOneField(ab, field) {
    var value = t396_ab__getFieldValue(ab, field)
}

function t396_allelems__renderView(ab) {
    tn_console('func: allelems__renderView: abid:' + ab.attr('data-artboard-recid'));
    ab.find(".tn-elem").each(function() {
        t396_elem__renderView($(this))
    })
}

function t396_ab__filterUpdate(ab) {
    var filter = ab.find('.t396__filter');
    var c1 = filter.attr('data-filtercolor-rgb');
    var c2 = filter.attr('data-filtercolor2-rgb');
    var o1 = filter.attr('data-filteropacity');
    var o2 = filter.attr('data-filteropacity2');
    if ((typeof c2 == 'undefined' || c2 == '') && (typeof c1 != 'undefined' && c1 != '')) {
        filter.css("background-color", "rgba(" + c1 + "," + o1 + ")")
    } else if ((typeof c1 == 'undefined' || c1 == '') && (typeof c2 != 'undefined' && c2 != '')) {
        filter.css("background-color", "rgba(" + c2 + "," + o2 + ")")
    } else if (typeof c1 != 'undefined' && typeof c2 != 'undefined' && c1 != '' && c2 != '') {
        filter.css({
            background: "-webkit-gradient(linear, left top, left bottom, from(rgba(" + c1 + "," + o1 + ")), to(rgba(" + c2 + "," + o2 + ")) )"
        })
    } else {
        filter.css("background-color", 'transparent')
    }
}

function t396_ab__getHeight(ab, ab_height) {
    if (typeof ab_height == 'undefined') ab_height = t396_ab__getFieldValue(ab, 'height');
    ab_height = parseFloat(ab_height);
    var ab_height_vh = t396_ab__getFieldValue(ab, 'height_vh');
    if (ab_height_vh != '') {
        ab_height_vh = parseFloat(ab_height_vh);
        if (isNaN(ab_height_vh) === !1) {
            var ab_height_vh_px = parseFloat(window.tn.window_height * parseFloat(ab_height_vh / 100));
            if (ab_height < ab_height_vh_px) {
                ab_height = ab_height_vh_px
            }
        }
    }
    return (ab_height)
}

function t396_hex2rgb(hexStr) {
    var hex = parseInt(hexStr.substring(1), 16);
    var r = (hex & 0xff0000) >> 16;
    var g = (hex & 0x00ff00) >> 8;
    var b = hex & 0x0000ff;
    return [r, g, b]
}
String.prototype.t396_replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement)
};

function t396_elem__getWidth(el, value) {
    if (typeof value == 'undefined') value = parseFloat(t396_elem__getFieldValue(el, 'width'));
    var el_widthunits = t396_elem__getFieldValue(el, 'widthunits');
    if (el_widthunits == '%') {
        var el_container = t396_elem__getFieldValue(el, 'container');
        if (el_container == 'window') {
            value = parseFloat(window.tn.window_width * parseFloat(parseInt(value) / 100))
        } else {
            value = parseFloat(window.tn.grid_width * parseFloat(parseInt(value) / 100))
        }
    }
    return (value)
}

function t396_elem__getHeight(el, value) {
    if (typeof value == 'undefined') value = t396_elem__getFieldValue(el, 'height');
    value = parseFloat(value);
    if (el.attr('data-elem-type') == 'shape' || el.attr('data-elem-type') == 'video' || el.attr('data-elem-type') == 'html' || el.attr('data-elem-type') == 'gallery') {
        var el_heightunits = t396_elem__getFieldValue(el, 'heightunits');
        if (el_heightunits == '%') {
            var ab = el.parent();
            var ab_min_height = parseFloat(ab.attr('data-artboard-proxy-min-height'));
            var ab_max_height = parseFloat(ab.attr('data-artboard-proxy-max-height'));
            var el_container = t396_elem__getFieldValue(el, 'container');
            if (el_container == 'window') {
                value = parseFloat(ab_max_height * parseFloat(value / 100))
            } else {
                value = parseFloat(ab_min_height * parseFloat(value / 100))
            }
        }
    } else if (el.attr('data-elem-type') == 'button') {
        value = value
    } else {
        value = parseFloat(el.innerHeight())
    }
    return (value)
}

function t396_roundFloat(n) {
    n = Math.round(n * 100) / 100;
    return (n)
}

function tn_console(str) {
    if (window.tn_comments == 1) console.log(str)
}

function t396_setUpTooltip_desktop(el, pinEl, tipEl) {
    var timer;
    pinEl.mouseover(function() {
        $('.tn-atom__tip_visible').each(function() {
            var thisTipEl = $(this).parents('.t396__elem');
            if (thisTipEl.attr('data-elem-id') != el.attr('data-elem-id')) {
                t396_hideTooltip(thisTipEl, $(this))
            }
        });
        clearTimeout(timer);
        if (tipEl.css('display') == 'block') {
            return
        }
        t396_showTooltip(el, tipEl)
    });
    pinEl.mouseout(function() {
        timer = setTimeout(function() {
            t396_hideTooltip(el, tipEl)
        }, 300)
    })
}

function t396_setUpTooltip_mobile(el, pinEl, tipEl) {
    pinEl.on('click', function(e) {
        if (tipEl.css('display') == 'block' && $(e.target).hasClass("tn-atom__pin")) {
            t396_hideTooltip(el, tipEl)
        } else {
            t396_showTooltip(el, tipEl)
        }
    });
    var id = el.attr("data-elem-id");
    $(document).click(function(e) {
        var isInsideTooltip = ($(e.target).hasClass("tn-atom__pin") || $(e.target).parents(".tn-atom__pin").length > 0);
        if (isInsideTooltip) {
            var clickedPinId = $(e.target).parents(".t396__elem").attr("data-elem-id");
            if (clickedPinId == id) {
                return
            }
        }
        t396_hideTooltip(el, tipEl)
    })
}

function t396_hideTooltip(el, tipEl) {
    tipEl.css('display', '');
    tipEl.css({
        "left": "",
        "transform": "",
        "right": ""
    });
    tipEl.removeClass('tn-atom__tip_visible');
    el.css('z-index', '')
}

function t396_showTooltip(el, tipEl) {
    var pos = el.attr("data-field-tipposition-value");
    if (typeof pos == 'undefined' || pos == '') {
        pos = 'top'
    };
    var elSize = el.height();
    var elTop = el.offset().top;
    var elBottom = elTop + elSize;
    var elLeft = el.offset().left;
    var elRight = el.offset().left + elSize;
    var winTop = $(window).scrollTop();
    var winWidth = $(window).width();
    var winBottom = winTop + $(window).height();
    var tipElHeight = tipEl.outerHeight();
    var tipElWidth = tipEl.outerWidth();
    var padd = 15;
    if (pos == 'right' || pos == 'left') {
        var tipElRight = elRight + padd + tipElWidth;
        var tipElLeft = elLeft - padd - tipElWidth;
        if ((pos == 'right' && tipElRight > winWidth) || (pos == 'left' && tipElLeft < 0)) {
            pos = 'top'
        }
    }
    if (pos == 'top' || pos == 'bottom') {
        var tipElRight = elRight + (tipElWidth / 2 - elSize / 2);
        var tipElLeft = elLeft - (tipElWidth / 2 - elSize / 2);
        if (tipElRight > winWidth) {
            var rightOffset = -(winWidth - elRight - padd);
            tipEl.css({
                "left": "auto",
                "transform": "none",
                "right": rightOffset + "px"
            })
        }
        if (tipElLeft < 0) {
            var leftOffset = -(elLeft - padd);
            tipEl.css({
                "left": leftOffset + "px",
                "transform": "none"
            })
        }
    }
    if (pos == 'top') {
        var tipElTop = elTop - padd - tipElHeight;
        if (winTop > tipElTop) {
            pos = 'bottom'
        }
    }
    if (pos == 'bottom') {
        var tipElBottom = elBottom + padd + tipElHeight;
        if (winBottom < tipElBottom) {
            pos = 'top'
        }
    }
    tipEl.attr('data-tip-pos', pos);
    tipEl.css('display', 'block');
    tipEl.addClass('tn-atom__tip_visible');
    el.css('z-index', '1000')
}

function t396_hex2rgba(hexStr, opacity) {
    var hex = parseInt(hexStr.substring(1), 16);
    var r = (hex & 0xff0000) >> 16;
    var g = (hex & 0x00ff00) >> 8;
    var b = hex & 0x0000ff;
    return [r, g, b, parseFloat(opacity)]
}

function t397_init(recid) {
    var el = $('#rec' + recid);
    var curMode = $('.t-records').attr('data-tilda-mode');
    var tabs = el.find('.t397__tab');
    if (curMode != 'edit' && curMode != 'preview') {
        t397_scrollToTabs(recid)
    }
    if (tabs.length > 0) {
        tabs.click(function() {
            el.find('.t397__tab').removeClass('t397__tab_active');
            $(this).addClass('t397__tab_active');
            t397_removeUrl();
            var tabNumber = el.find(".t397__tab_active").index() + 1;
            if (curMode != 'edit' && curMode != 'preview' && tabNumber !== 0) {
                if (typeof history.replaceState != 'undefined') {
                    window.history.replaceState('', '', window.location.href + '#!/tab/' + recid + '-' + tabNumber)
                }
            }
            t397_alltabs_updateContent(recid);
            t397_updateSelect(recid);
            var active = $(this).attr('data-tab-rec-ids').split(',');
            active.forEach(function(rec_id) {
                var rec_el = $('#rec' + rec_id);
                rec_el.find('.t-feed, .t-store, .t117, .t121, .t132, .t223, .t226, .t228, .t229, .t230, .t268, .t279, .t341, .t346, .t347, .t349, .t351, .t353, .t384, .t385, .t386, .t396, .t404, .t409, .t410, .t412, .t418, .t422, .t425, .t428, .t433, .t456, .t477, .t478, .t480, .t486, .t498, .t504, .t506, .t509, .t511, .t517, .t518, .t519, .t520, .t532, .t538, .t539, .t544, .t545, .t552, .t554, .t570, .t577, .t592, .t598, .t599, .t601, .t604, .t605, .t609, .t615, .t616, .t650, .t659, .t670, .t675, .t686, .t688, .t694, .t698, .t700, .t726, .t728, .t734, .t738, .t740, .t744, .t754, .t760, .t762, .t764, .t774, .t776, .t778, .t780, .t798, .t799, .t801, .t822, .t826, .t827, .t829, .t842, .t843, .t849, .t850, .t851, .t856, .t858, .t859, .t860, .t902, .t912, .t923, .t937').trigger('displayChanged')
            });
            t397_startUpdateLazyLoad($(this));
            if (window.lazy == 'y') {
                t_lazyload_update()
            }
        });
        t397_alltabs_updateContent(recid);
        t397_updateContentBySelect(recid);
        var bgcolor = el.css("background-color");
        var bgcolor_target = el.find(".t397__select, .t397__firefoxfix");
        bgcolor_target.css("background-color", bgcolor)
    }
}

function t397_alltabs_updateContent(recid) {
    var el = $('#rec' + recid);
    var activeTab = el.find(".t397__tab_active");
    if (activeTab.length === 1) {
        var active = activeTab.attr('data-tab-rec-ids').split(',');
        var noactive = [];
        el.find(".t397__tab:not(.t397__tab_active)").each(function(i, tab) {
            noactive = noactive.concat($(tab).attr('data-tab-rec-ids').split(','))
        });
        var unique = noactive.filter(function(value, index, self) {
            return self.indexOf(value) === index
        });
        var off = unique.filter(function(value) {
            return $.inArray(value, active) === -1
        });
        if (el.find(".t397__tab_active").is(":visible") || el.find(".t397__select").is(":visible")) {
            active.forEach(function(rec_id) {
                var rec_el = $('#rec' + rec_id);
                rec_el.removeClass('t379__off');
                rec_el.removeClass('t379__zero-off');
                rec_el.css('opacity', '')
            })
        } else {
            active.forEach(function(rec_id) {
                var rec_el = $('#rec' + rec_id);
                rec_el.attr('data-connect-with-tab', 'yes');
                rec_el.attr('data-animationappear', 'off');
                if (rec_el.find('.t396').length) {
                    rec_el.addClass('t379__zero-off')
                } else {
                    rec_el.addClass('t379__off')
                }
            })
        }
        off.forEach(function(rec_id) {
            var rec_el = $('#rec' + rec_id);
            rec_el.attr('data-connect-with-tab', 'yes');
            rec_el.attr('data-animationappear', 'off');
            if (rec_el.find('.t396').length) {
                rec_el.addClass('t379__zero-off')
            } else {
                rec_el.addClass('t379__off')
            }
        })
    }
}

function t397_updateContentBySelect(recid) {
    var el = $('#rec' + recid);
    el.find(".t397__select").change(function() {
        var select_val = el.find(".t397__select").val();
        var tab_index = el.find(".t397__tab[data-tab-rec-ids='" + select_val + "']");
        tab_index.trigger('click')
    })
}

function t397_updateSelect(recid) {
    var el = $('#rec' + recid);
    var current_tab = el.find(".t397__tab_active").attr('data-tab-rec-ids');
    var el_select = el.find(".t397__select");
    el_select.val(current_tab)
}

function t397_startUpdateLazyLoad($this) {
    var rec_ids = $this.attr('data-tab-rec-ids').split(',');
    rec_ids.forEach(function(rec_id, i, arr) {
        var rec_el = $('#rec' + rec_id);
        var video = rec_el.find('.t-video-lazyload');
        if (video.length > 0) {
            t397_updateVideoLazyLoad(video)
        }
    })
}

function t397_updateVideoLazyLoad(video) {
    setTimeout(function() {
        video.each(function() {
            var div = $(this);
            if (!div.hasClass('t-video__isload')) {
                var height = div.attr('data-videolazy-height') ? $(this).attr('data-videolazy-height') : '100%';
                if (height.indexOf('vh') != -1) {
                    height = '100%'
                }
                var videoId = div.attr('data-videolazy-id').trim();
                var blockId = div.attr('data-blocklazy-id') || '';
                if (typeof div.attr('data-videolazy-two-id') != 'undefined') {
                    var videoTwoId = '_' + div.attr('data-videolazy-two-id') + '_'
                } else {
                    var videoTwoId = ''
                }
                if (div.attr('data-videolazy-type') == 'youtube') {
                    div.find('iframe').remove();
                    div.prepend('<iframe id="youtubeiframe' + videoTwoId + blockId + '" width="100%" height="' + height + '" src="//www.youtube.com/embed/' + videoId + '?rel=0&fmt=18&html5=1&showinfo=0" frameborder="0" allowfullscreen></iframe>')
                }
            }
            div.addClass('t-video__isload')
        })
    }, 0)
}

function t397_scrollToTabs(recid) {
    var el = $('#rec' + recid);
    var curUrl = window.location.href;
    var tabIndexNumber = curUrl.indexOf('#!/tab/');
    var tabIndexNumberStart = curUrl.indexOf('tab/index.html');
    el.find('.t397__wrapper_mobile .t397__select option:eq(0)').attr('selected', !0);
    if (tabIndexNumber !== -1) {
        var tabRec = curUrl.substring(tabIndexNumberStart + 4, tabIndexNumberStart + 4 + recid.length);
        if (tabRec == recid) {
            var tabBlock = $('#rec' + tabRec).find('.t397');
            var tabNumber = parseInt(curUrl.slice(tabIndexNumberStart + 4 + recid.length + 1), 10);
            el.find('.t397__tab').removeClass('t397__tab_active');
            el.find('.t397__tab:eq(' + (tabNumber - 1) + ')').addClass('t397__tab_active');
            el.find('.t397__wrapper_mobile .t397__select option:eq(' + (tabNumber - 1) + ')').attr('selected', !0);
            var targetOffset = tabBlock.offset().top;
            var target = targetOffset;
            if ($(window).width() > 960) {
                target = targetOffset - 200
            } else {
                target = targetOffset - 100
            }
            $('html, body').animate({
                scrollTop: target
            }, 300)
        }
    }
}

function t397_removeUrl() {
    var curUrl = window.location.href;
    var indexToRemove = curUrl.indexOf('#!/tab/');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && indexToRemove < 0) {
        indexToRemove = curUrl.indexOf('%23%21/tab/index.html')
    }
    curUrl = curUrl.substring(0, indexToRemove);
    if (indexToRemove != -1) {
        if (typeof history.replaceState != 'undefined') {
            window.history.replaceState('', '', curUrl)
        }
    }
}

function t400_init(recid) {
    var el = $('#rec' + recid);
    var btn = el.find('.t400__submit');
    var hideBackText = btn.attr("data-hide-back-text");
    var showMoreText = btn.html();
    el.find('.t400__submit').click(function() {
        if (typeof hideBackText != 'undefined' && hideBackText.length > 0 && $(this).hasClass('t400__submit_hide-back')) {
            t400_alltabs_updateContent(recid);
            $(this).removeClass('t400__submit_hide-back');
            btn.html(showMoreText);
            $('.t396').trigger('displayChanged');
            return
        }
        var rec_ids = $(this).attr('data-hidden-rec-ids').split(',');
        rec_ids.forEach(function(rec_id, i, arr) {
            var rec_el = $('#rec' + rec_id);
            rec_el.removeClass('t400__off');
            rec_el.css('opacity', '');
            var video = rec_el.find('.t-video-lazyload');
            if (video.length > 0) {
                if (video.parents('.t121').length > 0 || video.parents('.t223').length > 0 || video.parents('.t230').length > 0 || video.parents('.t368').length > 0) {
                    t400_updateVideoLazyLoad(video)
                }
            }
        });
        $('.t-feed, .t-store, .t121, .t132, .t223, .t226, .t229, .t230, .t268, .t279, .t334, .t341, .t347, .t351, .t353, .t368, .t384, .t385, .t396, .t404, .t412, .t418, .t422, .t433, .t456, .t477, .t480, .t498, .t504, .t517, .t518, .t532, .t539, .t544, .t545, .t552, .t554, .t570, .t577, .t592, .t598, .t599, .t604, .t605, .t609, .t615, .t616, .t650, .t670, .t686, .t688, .t694, .t700, .t726, .t728, .t734, .t738, .t740, .t744, .t762, .t764, .t774, .t776, .t778, .t786, .t798, .t799, .t801, .t813, .t822, .t827, .t829, .t836, .t842, .t843, .t849, .t850, .t851, .t856, .t858, .t859, .t860, .t923').trigger('displayChanged');
        setTimeout(function() {
            $('.t351, .t353, .t341, .t410, .t385, .t738, .t829, .t223').trigger('displayChanged')
        }, 50);
        if (typeof hideBackText != 'undefined' && hideBackText.length > 0) {
            btn.addClass('t400__submit_hide-back');
            btn.html(hideBackText)
        } else {
            el.addClass('t400__off').hide()
        }
        if (window.lazy == 'y') {
            t_lazyload_update()
        }
    });
    t400_alltabs_updateContent(recid);
    t400_checkSize(recid)
}

function t400_alltabs_updateContent(recid) {
    var el = $('#rec' + recid);
    el.find(".t400__submit").each(function(i) {
        var rec_ids = $(this).attr('data-hidden-rec-ids').split(',');
        rec_ids.forEach(function(rec_id, i, arr) {
            var rec_el = $('#rec' + rec_id);
            rec_el.attr('data-animationappear', 'off');
            rec_el.addClass('t400__off')
        })
    })
}

function t400_checkSize(recid) {
    var el = $("#rec" + recid).find(".t400__submit");
    if (el.length) {
        var btnheight = el.height();
        var textheight = el[0].scrollHeight;
        if (btnheight < textheight) {
            var btntext = el.text();
            el.addClass("t400__submit-overflowed");
            el.html("<span class=\"t400__text\">" + btntext + "</span>")
        }
    }
}

function t400_updateVideoLazyLoad(video) {
    setTimeout(function() {
        video.each(function() {
            var div = $(this);
            var height = div.attr('data-videolazy-height') ? $(this).attr('data-videolazy-height') : '100%';
            if (height.indexOf('vh') != -1) {
                height = '100%'
            }
            var videoId = div.attr('data-videolazy-id').trim();
            var blockId = div.attr('data-blocklazy-id') || '';
            if (typeof div.attr('data-videolazy-two-id') != 'undefined') {
                var videoTwoId = '_' + div.attr('data-videolazy-two-id') + '_'
            } else {
                var videoTwoId = ''
            }
            if (div.attr('data-videolazy-type') == 'youtube') {
                div.find('iframe').remove();
                div.prepend('<iframe id="youtubeiframe' + videoTwoId + blockId + '" width="100%" height="' + height + '" src="//www.youtube.com/embed/' + videoId + '?rel=0&fmt=18&html5=1&showinfo=0" frameborder="0" allowfullscreen></iframe>')
            }
        })
    }, 300)
}

function t410_init(recid) {
    var el = $('#rec' + recid);
    var firstimgurl = el.find(".t410__wrapper").attr("data-juxtapose-imgurl-first");
    var firstimgdescr = el.find(".t410__wrapper").attr("data-juxtapose-imgdescr-first");
    var firstimgalt = el.find(".t410__wrapper").attr("data-juxtapose-imgalt-first");
    var secondimgurl = el.find(".t410__wrapper").attr("data-juxtapose-imgurl-second");
    var secondimgdescr = el.find(".t410__wrapper").attr("data-juxtapose-imgdescr-second");
    var secondimgalt = el.find(".t410__wrapper").attr("data-juxtapose-imgalt-second");
    new juxtapose.JXSlider('#t410-juxtapose__' + recid, [{
        src: firstimgurl,
        label: firstimgdescr
    }, {
        src: secondimgurl,
        label: secondimgdescr
    }], {
        animate: !1,
        showLabels: !0,
        showCredits: !1,
        startingPosition: '50%',
        makeResponsive: !0,
        callback: function() {
            if (firstimgalt.length > 0) {
                el.find('.t410__wrapper .jx-image.jx-left img').attr('alt', firstimgalt)
            }
            if (secondimgalt.length > 0) {
                el.find('.t410__wrapper .jx-image.jx-right img').attr('alt', secondimgalt)
            }
            if (window.$isMobile) {
                el.find('.t410__wrapper').append('<div class="t410__mobile_left"></div><div class="t410__mobile_right"></div>');
                var hanlerWidth = el.find('.jx-handle').width(),
                    leftSide = el.find('.jx-image.jx-left'),
                    rightSide = el.find('.jx-image.jx-right'),
                    leftWidth = leftSide.width() - hanlerWidth / 2,
                    rightWidth = rightSide.width() - hanlerWidth / 2,
                    wrapper = el.find('.t410__wrapper'),
                    mobileLeft = el.find('.t410__mobile_left'),
                    mobileRight = el.find('.t410__mobile_right');
                mobileLeft.css('width', leftWidth);
                mobileRight.css('width', rightWidth);
                wrapper.on('touchend', function() {
                    leftWidth = leftSide.width() - hanlerWidth / 2;
                    rightWidth = rightSide.width() - hanlerWidth / 2;
                    mobileLeft.css('width', leftWidth);
                    mobileRight.css('width', rightWidth)
                })
            }
        }
    });
    el.find('.t410').bind('displayChanged', function() {
        window.juxtapose.sliders.forEach(function(obj) {
            if (obj.selector === '#t410-juxtapose__' + recid) {
                console.log(obj);
                obj.setWrapperDimensions();
                return
            }
        })
    })
}

function t450_showMenu(recid) {
    var el = $('#rec' + recid);
    $('body').addClass('t450__body_menushowed');
    el.find('.t450').addClass('t450__menu_show');
    el.find('.t450__overlay').addClass('t450__menu_show');
    $('.t450').bind('clickedAnchorInTooltipMenu', function() {
        t450_closeMenu()
    });
    el.find('.t450__overlay, .t450__close, a[href*=#]').click(function() {
        var url = $(this).attr('href');
        if (typeof url != 'undefined' && url != '' && (url.substring(0, 7) == '#price:' || url.substring(0, 9) == '#submenu:')) {
            return
        }
        t450_closeMenu()
    });
    $(document).keydown(function(e) {
        if (e.keyCode == 27) {
            $('body').removeClass('t390__body_popupshowed');
            $('.t390').removeClass('t390__popup_show')
        }
    })
}

function t450_closeMenu() {
    $('body').removeClass('t450__body_menushowed');
    $('.t450').removeClass('t450__menu_show');
    $('.t450__overlay').removeClass('t450__menu_show')
}

function t450_checkSize(recid) {
    var el = $('#rec' + recid).find('.t450');
    var windowheight = $(window).height() - 80;
    var contentheight = el.find(".t450__top").height() + el.find(".t450__rightside").height();
    if (contentheight > windowheight) {
        el.addClass('t450__overflowed');
        el.find(".t450__container").css('height', 'auto')
    }
}

function t450_appearMenu(recid) {
    var el = $('#rec' + recid);
    var burger = el.find(".t450__burger_container");
    burger.each(function() {
        var el = $(this);
        var appearoffset = el.attr("data-appearoffset");
        var hideoffset = el.attr("data-hideoffset");
        if (appearoffset != "") {
            if (appearoffset.indexOf('vh') > -1) {
                appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)))
            }
            appearoffset = parseInt(appearoffset, 10);
            if ($(window).scrollTop() >= appearoffset) {
                if (el.hasClass('t450__beforeready')) {
                    el.finish();
                    el.removeClass("t450__beforeready")
                }
            } else {
                el.stop();
                el.addClass("t450__beforeready")
            }
        }
        if (hideoffset != "") {
            if (hideoffset.indexOf('vh') > -1) {
                hideoffset = Math.floor((window.innerHeight * (parseInt(hideoffset) / 100)))
            }
            hideoffset = parseInt(hideoffset, 10);
            if ($(window).scrollTop() + $(window).height() >= $(document).height() - hideoffset) {
                if (!el.hasClass('t450__beforeready')) {
                    el.finish();
                    el.addClass("t450__beforeready")
                }
            } else {
                if (appearoffset != "") {
                    if ($(window).scrollTop() >= appearoffset) {
                        el.stop();
                        el.removeClass("t450__beforeready")
                    }
                } else {
                    el.stop();
                    el.removeClass("t450__beforeready")
                }
            }
        }
    })
}

function t450_initMenu(recid) {
    var el = $('#rec' + recid).find('.t450');
    var hook = el.attr('data-tooltip-hook');
    if (hook !== '') {
        var obj = $('a[href="' + hook + '"]');
        obj.click(function(e) {
            t450_closeMenu();
            t450_showMenu(recid);
            t450_checkSize(recid);
            e.preventDefault()
        })
    }
    $('#rec' + recid).find('.t450__burger_container').click(function(e) {
        t450_closeMenu();
        t450_showMenu(recid);
        t450_checkSize(recid)
    });
    if (isMobile) {
        $('#rec' + recid).find('.t-menu__link-item').each(function() {
            var $this = $(this);
            if ($this.hasClass('t450__link-item_submenu')) {
                $this.on('click', function() {
                    setTimeout(function() {
                        t450_checkSize(recid)
                    }, 100)
                })
            }
        })
    }
    t450_highlight()
}

function t450_highlight() {
    var url = window.location.href;
    var pathname = window.location.pathname;
    if (url.substr(url.length - 1) == "index.html") {
        url = url.slice(0, -1)
    }
    if (pathname.substr(pathname.length - 1) == "index.html") {
        pathname = pathname.slice(0, -1)
    }
    if (pathname.charAt(0) == "index.html") {
        pathname = pathname.slice(1)
    }
    if (pathname == "") {
        pathname = "/"
    }
    $(".t450__menu a[href='" + url + "']").addClass("t-active");
    $(".t450__menu a[href='" + url + "/']").addClass("t-active");
    $(".t450__menu a[href='" + pathname + "']").addClass("t-active");
    $(".t450__menu a[href='/" + pathname + "']").addClass("t-active");
    $(".t450__menu a[href='" + pathname + "/']").addClass("t-active");
    $(".t450__menu a[href='/" + pathname + "/']").addClass("t-active")
}

function t452_scrollToTop() {
    $('html, body').animate({
        scrollTop: 0
    }, 700)
}

function t608_setHeight(recid) {
    var el = $("#rec" + recid);
    var image = el.find(".t608__bgimg");
    image.each(function() {
        var width = $(this).attr("data-image-width");
        var height = $(this).attr("data-image-height");
        var ratio = height / width;
        var padding = ratio * 100;
        $(this).css("padding-bottom", padding + "%")
    })
}

function t651_initPopup(recid) {
    if (window.$isMobile) {
        if ($('#rec' + recid + ' .t651__phone').length == 0) {
            return
        }
        t651_phone = $('#rec' + recid + ' .t651__phone').html().replace(/\s+/g, '');
        $('#rec' + recid + ' .t651__btn').click(function() {
            window.location.href = "tel:" + t651_phone;
            $('.t651__btn_wrapper').removeClass('t651__btn_animate');
            $('.t651__btn-text').css('display', 'none')
        });
        return
    }
    $('#rec' + recid).attr('data-animationappear', 'off');
    $('#rec' + recid).css('opacity', '1');
    var el = $('#rec' + recid).find('.t651__popup'),
        analitics = el.attr('data-track-popup'),
        hook = "TildaCallBackWidget" + recid,
        obj = $('#rec' + recid + ' .t651__btn');
    obj.click(function(e) {
        if (obj.hasClass("t651__btn_active")) {
            t651_closePopup();
            return
        }
        obj.addClass("t651__btn_active");
        t651_showPopup(recid);
        e.preventDefault();
        if (analitics > '') {
            Tilda.sendEventToStatistics(analitics, hook)
        }
    })
}

function t651_showPopup(recid) {
    var el = $('#rec' + recid),
        popup = el.find('.t651__popup');
    $('.t651__btn_wrapper').removeClass('t651__btn_animate');
    $('.t651__btn-text').css('display', 'none');
    popup.css('display', 'block');
    setTimeout(function() {
        popup.addClass('t651__popup_show')
    }, 50);
    $(document).keydown(function(e) {
        if (e.keyCode == 27) {
            t651_closePopup()
        }
    })
}

function t651_closePopup() {
    $('.t651__btn').removeClass('t651__btn_active');
    $('.t651__popup').removeClass('t651__popup_show');
    setTimeout(function() {
        $('.t651__popup').not('.t651__popup_show').css('display', 'none')
    }, 300)
}

function t651_sendPopupEventToStatistics(popupname) {
    var virtPage = 'tilda/popup/index.html';
    var virtTitle = 'Popup: ';
    if (popupname.substring(0, 7) == '#popup:') {
        popupname = popupname.substring(7)
    }
    virtPage += popupname;
    virtTitle += popupname;
    if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
        Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0)
    } else {
        if (ga) {
            if (window.mainTracker != 'tilda') {
                ga('send', {
                    'hitType': 'pageview',
                    'page': virtPage,
                    'title': virtTitle
                })
            }
        }
        if (window.mainMetrika > '' && window[window.mainMetrika]) {
            window[window.mainMetrika].hit(virtPage, {
                title: virtTitle,
                referer: window.location.href
            })
        }
    }
}

function t670_init(recid) {
    t670_imageHeight(recid);
    t670_show(recid);
    t670_hide(recid)
}

function t670_show(recid) {
    var el = $('#rec' + recid);
    var play = el.find('.t670__play');
    play.click(function() {
        if ($(this).attr('data-slider-video-type') == 'youtube') {
            var url = $(this).attr('data-slider-video-url');
            $(this).next().html("<iframe class=\"t670__iframe\" width=\"100%\" height=\"100%\" src=\"https://www.youtube.com/embed/" + url + "?autoplay=1\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>")
        }
        if ($(this).attr('data-slider-video-type') == 'vimeo') {
            var url = $(this).attr('data-slider-video-url');
            $(this).next().html("<iframe class=\"t670__iframe\" width=\"100%\" height=\"100%\" src=\"https://player.vimeo.com/video/" + url + "\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen></iframe>")
        }
        $(this).next().css('z-index', '3')
    })
}

function t670_hide(recid) {
    var el = $('#rec' + recid);
    var body = el.find('.t670__frame');
    el.on('updateSlider', function() {
        body.html('').css('z-index', '')
    })
}

function t670_imageHeight(recid) {
    var el = $('#rec' + recid);
    var image = el.find('.t670__separator');
    image.each(function() {
        var width = $(this).attr('data-slider-image-width');
        var height = $(this).attr('data-slider-image-height');
        var ratio = height / width;
        var padding = ratio * 100;
        $(this).css('padding-bottom', padding + '%')
    })
}

function t686_init(recid) {
    setTimeout(function() {
        t686_setHeight(recid)
    }, 500);
    var t686__doResize;
    $(window).resize(function() {
        clearTimeout(t686__doResize);
        t686__doResize = setTimeout(function() {
            t686_setHeight(recid)
        }, 200)
    })
}

function t686_setHeight(recid) {
    var t686_el = $('#rec' + recid + ' .t686'),
        t686_ratio = t686_el.attr('data-tile-ratio'),
        t686_ratioHeight = t686_el.find('.t686__col').width() * t686_ratio;
    t686_el.find('.t686__row').each(function() {
        var t686_largestHeight = 0,
            t686_currow = $(this);
        $('.t686__table', this).each(function() {
            var t686_curCol = $(this),
                t686_curColHeight = t686_curCol.find(".t686__textwrapper").outerHeight();
            if ($(this).find(".t686__cell").hasClass("t686__button-bottom")) {
                t686_curColHeight += t686_curCol.find(".t686__button-container").outerHeight()
            }
            if (t686_curColHeight > t686_largestHeight) {
                t686_largestHeight = t686_curColHeight
            }
        });
        if ($(window).width() >= 960) {
            if (t686_largestHeight > t686_ratioHeight) {
                $('.t686__table', this).css('height', t686_largestHeight)
            } else {
                $('.t686__table', this).css('height', t686_ratioHeight)
            }
            $('.t686__table', this).css('min-height', 'auto')
        } else {
            $('.t686__table', this).css('min-height', t686_ratioHeight);
            $('.t686__table', this).css('height', '')
        }
        if (t686_GetIEVersion() > 0) {
            var curRowHeight = $('.t686__table', this).css('height');
            $('.t686__bg', this).css('height', curRowHeight);
            $('.t686__overlay', this).css('height', curRowHeight)
        }
    })
}

function t686_GetIEVersion() {
    var sAgent = window.navigator.userAgent;
    var Idx = sAgent.indexOf("MSIE");
    if (Idx > 0) {
        return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf(".", Idx)))
    } else {
        if (!!navigator.userAgent.match(/Trident\/7\./)) {
            return 11
        } else {
            return 0
        }
    }
}

function t691_unifyHeights(recid) {
    if ($(window).width() >= 960) {
        $('#rec' + recid + ' .t691 .t-container .t691__row').each(function() {
            var t691__highestBox = 0;
            var t691__currow = $(this);
            $('.t691__col', this).each(function() {
                var t691__curcol = $(this);
                var t691__curcolinfo = t691__curcol.find('.t691__sectioninfowrapper');
                var t691__curcolpers = t691__curcol.find('.t691__personwrapper');
                var t691__curcolinnerheight = t691__curcolinfo.outerHeight() + t691__curcolpers.outerHeight();
                if (t691__curcolinnerheight > t691__highestBox) {
                    t691__highestBox = t691__curcolinnerheight
                }
            });
            $('.t691__col', this).css('height', t691__highestBox)
        })
    }
};

function t694_init(recid) {
    t694_setHeight(recid);
    var t694__doResize;
    $(window).resize(function() {
        clearTimeout(t694__doResize);
        t694__doResize = setTimeout(function() {
            t694_setHeight(recid)
        }, 200)
    })
}

function t694_setHeight(recid) {
    var t694_el = $('#rec' + recid + ' .t694'),
        t694_ratio = t694_el.attr('data-tile-ratio'),
        t694_ratioHeight = t694_el.find('.t694__col').width() * t694_ratio;
    if ($(window).width() >= 768) {
        t694_el.find('.t694__row').each(function() {
            var t694_largestHeight = 0,
                t694_currow = $(this);
            $('.t694__table', this).each(function() {
                var t694_curCol = $(this),
                    t694_curColHeight = t694_curCol.find(".t694__textwrapper").outerHeight();
                if ($(this).find(".t694__cell").hasClass("t694__button-bottom")) {
                    t694_curColHeight += t694_curCol.find(".t694__button-container").outerHeight()
                }
                if (t694_curColHeight > t694_largestHeight) {
                    t694_largestHeight = t694_curColHeight
                }
            });
            if (t694_largestHeight > t694_ratioHeight) {
                $('.t694__table', this).css('height', t694_largestHeight)
            } else {
                if ($('.t694__table', this).css('height') != '') {
                    $('.t694__table', this).css('height', '')
                }
            }
        })
    } else {
        t694_el.find('.t694__table').css('height', '')
    }
}

function t702_initPopup(recid) {
    $('#rec' + recid).attr('data-animationappear', 'off');
    $('#rec' + recid).css('opacity', '1');
    var el = $('#rec' + recid).find('.t-popup'),
        hook = el.attr('data-tooltip-hook'),
        analitics = el.attr('data-track-popup');
    if (hook !== '') {
        $('.r').on('click', 'a[href="' + hook + '"]', function(e) {
            t702_showPopup(recid);
            t702_resizePopup(recid);
            e.preventDefault();
            if (window.lazy == 'y') {
                t_lazyload_update()
            }
            if (analitics > '') {
                var virtTitle = hook;
                if (virtTitle.substring(0, 7) == '#popup:') {
                    virtTitle = virtTitle.substring(7)
                }
                Tilda.sendEventToStatistics(analitics, virtTitle)
            }
        })
    }
}

function t702_onSuccess(t702_form) {
    var t702_inputsWrapper = t702_form.find('.t-form__inputsbox');
    var t702_inputsHeight = t702_inputsWrapper.height();
    var t702_inputsOffset = t702_inputsWrapper.offset().top;
    var t702_inputsBottom = t702_inputsHeight + t702_inputsOffset;
    var t702_targetOffset = t702_form.find('.t-form__successbox').offset().top;
    if ($(window).width() > 960) {
        var t702_target = t702_targetOffset - 200
    } else {
        var t702_target = t702_targetOffset - 100
    }
    if (t702_targetOffset > $(window).scrollTop() || ($(document).height() - t702_inputsBottom) < ($(window).height() - 100)) {
        t702_inputsWrapper.addClass('t702__inputsbox_hidden');
        setTimeout(function() {
            if ($(window).height() > $('.t-body').height()) {
                $('.t-tildalabel').animate({
                    opacity: 0
                }, 50)
            }
        }, 300)
    } else {
        $('html, body').animate({
            scrollTop: t702_target
        }, 400);
        setTimeout(function() {
            t702_inputsWrapper.addClass('t702__inputsbox_hidden')
        }, 400)
    }
    var successurl = t702_form.data('success-url');
    if (successurl && successurl.length > 0) {
        setTimeout(function() {
            window.location.href = successurl
        }, 500)
    }
}

function t702_lockScroll() {
    var body = $("body");
    if (!body.hasClass('t-body_scroll-locked')) {
        var bodyScrollTop = (typeof window.pageYOffset !== 'undefined') ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        body.addClass('t-body_scroll-locked');
        body.css("top", "-" + bodyScrollTop + "px");
        body.attr("data-popup-scrolltop", bodyScrollTop)
    }
}

function t702_unlockScroll() {
    var body = $("body");
    if (body.hasClass('t-body_scroll-locked')) {
        var bodyScrollTop = $("body").attr("data-popup-scrolltop");
        body.removeClass('t-body_scroll-locked');
        body.css("top", "");
        body.removeAttr("data-popup-scrolltop")
        window.scrollTo(0, bodyScrollTop)
    }
}

function t702_showPopup(recid) {
    var el = $('#rec' + recid),
        popup = el.find('.t-popup');
    popup.css('display', 'block');
    el.find('.t-range').trigger('popupOpened');
    if (window.lazy == 'y') {
        t_lazyload_update()
    }
    setTimeout(function() {
        popup.find('.t-popup__container').addClass('t-popup__container-animated');
        popup.addClass('t-popup_show')
    }, 50);
    $('body').addClass('t-body_popupshowed t702__body_popupshowed');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream) {
        setTimeout(function() {
            t702_lockScroll()
        }, 500)
    }
    el.find('.t-popup').mousedown(function(e) {
        var windowWidth = $(window).width();
        var maxScrollBarWidth = 17;
        var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
        if (e.clientX > windowWithoutScrollBar) {
            return
        }
        if (e.target == this) {
            t702_closePopup(recid)
        }
    });
    el.find('.t-popup__close').click(function(e) {
        t702_closePopup(recid)
    });
    el.find('a[href*="#"]').click(function(e) {
        var url = $(this).attr('href');
        if (!url || url.substring(0, 7) != '#price:') {
            t702_closePopup(recid);
            if (!url || url.substring(0, 7) == '#popup:') {
                setTimeout(function() {
                    $('body').addClass('t-body_popupshowed')
                }, 300)
            }
        }
    });
    $(document).keydown(function(e) {
        if (e.keyCode == 27) {
            t702_closePopup(recid)
        }
    })
}

function t702_closePopup(recid) {
    $('body').removeClass('t-body_popupshowed t702__body_popupshowed');
    $('#rec' + recid + ' .t-popup').removeClass('t-popup_show');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream) {
        t702_unlockScroll()
    }
    setTimeout(function() {
        $('.t-popup').not('.t-popup_show').css('display', 'none')
    }, 300)
}

function t702_resizePopup(recid) {
    var el = $("#rec" + recid),
        div = el.find(".t-popup__container").height(),
        win = $(window).height() - 120,
        popup = el.find(".t-popup__container");
    if (div > win) {
        popup.addClass('t-popup__container-static')
    } else {
        popup.removeClass('t-popup__container-static')
    }
}

function t702_sendPopupEventToStatistics(popupname) {
    var virtPage = 'tilda/popup/index.html';
    var virtTitle = 'Popup: ';
    if (popupname.substring(0, 7) == '#popup:') {
        popupname = popupname.substring(7)
    }
    virtPage += popupname;
    virtTitle += popupname;
    if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
        Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0)
    } else {
        if (ga) {
            if (window.mainTracker != 'tilda') {
                ga('send', {
                    'hitType': 'pageview',
                    'page': virtPage,
                    'title': virtTitle
                })
            }
        }
        if (window.mainMetrika > '' && window[window.mainMetrika]) {
            window[window.mainMetrika].hit(virtPage, {
                title: virtTitle,
                referer: window.location.href
            })
        }
    }
}

function t704_onSuccess(t704_form) {
    var t704_inputsWrapper = t704_form.find('.t-form__inputsbox');
    var t704_inputsHeight = t704_inputsWrapper.height();
    var t704_inputsOffset = t704_inputsWrapper.offset().top;
    var t704_inputsBottom = t704_inputsHeight + t704_inputsOffset;
    var t704_targetOffset = t704_form.find('.t-form__successbox').offset().top;
    if ($(window).width() > 960) {
        var t704_target = t704_targetOffset - 200
    } else {
        var t704_target = t704_targetOffset - 100
    }
    if (t704_targetOffset > $(window).scrollTop() || ($(document).height() - t704_inputsBottom) < ($(window).height() - 100)) {
        t704_inputsWrapper.addClass('t704__inputsbox_hidden');
        setTimeout(function() {
            if ($(window).height() > $('.t-body').height()) {
                $('.t-tildalabel').animate({
                    opacity: 0
                }, 50)
            }
        }, 300)
    } else {
        $('html, body').animate({
            scrollTop: t704_target
        }, 400);
        setTimeout(function() {
            t704_inputsWrapper.addClass('t704__inputsbox_hidden')
        }, 400)
    }
    var successurl = t704_form.data('success-url');
    if (successurl && successurl.length > 0) {
        setTimeout(function() {
            window.location.href = successurl
        }, 500)
    }
}

function t706_onSuccessCallback(t706_form) {
    $(".t706__cartwin-products").slideUp(10, function() {});
    $(".t706__cartwin-bottom").slideUp(10, function() {});
    $(".t706 .t-form__inputsbox").slideUp(700, function() {});
    try {
        tcart__unlockScroll()
    } catch (e) {}
}

function t720_onSuccess(t720_form) {
    var t720_inputsWrapper = t720_form.find('.t-form__inputsbox');
    var t720_inputsHeight = t720_inputsWrapper.height();
    var t720_inputsOffset = t720_inputsWrapper.offset().top;
    var t720_inputsBottom = t720_inputsHeight + t720_inputsOffset;
    var t720_targetOffset = t720_form.find('.t-form__successbox').offset().top;
    if ($(window).width() > 960) {
        var t720_target = t720_targetOffset - 200
    } else {
        var t720_target = t720_targetOffset - 100
    }
    if (t720_targetOffset > $(window).scrollTop() || ($(document).height() - t720_inputsBottom) < ($(window).height() - 100)) {
        t720_inputsWrapper.addClass('t720__inputsbox_hidden');
        setTimeout(function() {
            if ($(window).height() > $('.t-body').height()) {
                $('.t-tildalabel').animate({
                    opacity: 0
                }, 50)
            }
        }, 300)
    } else {
        $('html, body').animate({
            scrollTop: t720_target
        }, 400);
        setTimeout(function() {
            t720_inputsWrapper.addClass('t720__inputsbox_hidden')
        }, 400)
    }
    var successurl = t720_form.data('success-url');
    if (successurl && successurl.length > 0) {
        setTimeout(function() {
            window.location.href = successurl
        }, 500)
    }
}

function t720_fixcontentheight(id) {
    var el = $("#rec" + id);
    var hcover = el.find(".t-cover").height();
    var hcontent = el.find("div[data-hook-content]").outerHeight();
    if (hcontent > 300 && hcover < hcontent) {
        var hcontent = hcontent + 120;
        if (hcontent > 1000) {
            hcontent += 100
        }
        console.log('auto correct cover height: ' + hcontent);
        el.find(".t-cover").height(hcontent);
        el.find(".t-cover__filter").height(hcontent);
        el.find(".t-cover__carrier").height(hcontent);
        el.find(".t-cover__wrapper").height(hcontent);
        if ($isMobile == !1) {
            setTimeout(function() {
                var divvideo = el.find(".t-cover__carrier");
                if (divvideo.find('iframe').length > 0) {
                    console.log('correct video from cover_fixcontentheight');
                    setWidthHeightYoutubeVideo(divvideo, hcontent + 'px')
                }
            }, 2000)
        }
    }
}

function t734_init(recid) {
    var rec = $('#rec' + recid);
    if ($('body').find('.t830').length > 0) {
        if (rec.find('.t-slds__items-wrapper').hasClass('t-slds_animated-none')) {
            t_sldsInit(recid)
        } else {
            setTimeout(function() {
                t_sldsInit(recid)
            }, 500)
        }
    } else {
        t_sldsInit(recid)
    }
    rec.find('.t734').bind('displayChanged', function() {
        t_slds_updateSlider(recid)
    })
}

function t746_initPopup(recid) {
    $('#rec' + recid).attr('data-animationappear', 'off');
    $('#rec' + recid).css('opacity', '1');
    var el = $('#rec' + recid).find('.t-popup'),
        hook = el.attr('data-tooltip-hook'),
        analitics = el.attr('data-track-popup');
    t746_imageHeight(recid);
    t746_arrowWidth(recid);
    t746_show(recid);
    t746_hide(recid);
    $(window).bind('resize', t_throttle(function() {
        t746_arrowWidth(recid)
    }, 200));
    $(window).on("orientationchange", function(event) {
        setTimeout(function() {
            t_slds_updateSlider(recid)
        }, 500)
    });
    if (hook !== '') {
        $('.r').on('click', 'a[href="' + hook + '"]', function(e) {
            t746_showPopup(recid);
            t_sldsInit(recid);
            t_slds_updateSlider(recid);
            t746_arrowWidth(recid);
            t746_resizePopup(recid);
            e.preventDefault();
            if (window.lazy == 'y') {
                t_lazyload_update()
            }
            if (analitics > '') {
                var virtTitle = hook;
                if (virtTitle.substring(0, 7) == '#popup:') {
                    virtTitle = virtTitle.substring(7)
                }
                Tilda.sendEventToStatistics(analitics, virtTitle)
            }
        })
    }
}

function t746_showPopup(recid) {
    var el = $('#rec' + recid),
        popup = el.find('.t-popup'),
        iframeBody = el.find('.t746__frame');
    popup.css('display', 'block');
    setTimeout(function() {
        popup.find('.t-popup__container').addClass('t-popup__container-animated');
        popup.addClass('t-popup_show')
    }, 50);
    $('body').addClass('t-body_popupshowed');
    el.find('.t-popup').click(function(e) {
        if (e.target == this) {
            iframeBody.html('').css('z-index', '');
            t746_closePopup(recid)
        }
    });
    el.find('.t-popup__close').click(function(e) {
        iframeBody.html('').css('z-index', '');
        t746_closePopup(recid)
    });
    $(document).keydown(function(e) {
        if (e.keyCode == 27) {
            t746_closePopup(recid);
            iframeBody.html('').css('z-index', '')
        }
    })
}

function t746_closePopup(recid) {
    $('body').removeClass('t-body_popupshowed');
    $('#rec' + recid + ' .t-popup').removeClass('t-popup_show');
    setTimeout(function() {
        $('.t-popup').not('.t-popup_show').css('display', 'none')
    }, 300)
}

function t746_resizePopup(recid) {
    var el = $("#rec" + recid),
        div = el.find(".t-popup__container").height(),
        win = $(window).height(),
        popup = el.find(".t-popup__container");
    if (div > win) {
        popup.addClass('t-popup__container-static')
    } else {
        popup.removeClass('t-popup__container-static')
    }
}

function t746_sendPopupEventToStatistics(popupname) {
    var virtPage = 'tilda/popup/index.html';
    var virtTitle = 'Popup: ';
    if (popupname.substring(0, 7) == '#popup:') {
        popupname = popupname.substring(7)
    }
    virtPage += popupname;
    virtTitle += popupname;
    if (ga) {
        if (window.mainTracker != 'tilda') {
            ga('send', {
                'hitType': 'pageview',
                'page': virtPage,
                'title': virtTitle
            })
        }
    }
    if (window.mainMetrika > '' && window[window.mainMetrika]) {
        window[window.mainMetrika].hit(virtPage, {
            title: virtTitle,
            referer: window.location.href
        })
    }
}

function t746_show(recid) {
    var el = $("#rec" + recid),
        play = el.find('.t746__play');
    play.click(function() {
        if ($(this).attr('data-slider-video-type') == 'youtube') {
            var url = $(this).attr('data-slider-video-url');
            $(this).next().html("<iframe class=\"t746__iframe\" width=\"100%\" height=\"100%\" src=\"https://www.youtube.com/embed/" + url + "?autoplay=1\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>")
        }
        if ($(this).attr('data-slider-video-type') == 'vimeo') {
            var url = $(this).attr('data-slider-video-url');
            $(this).next().html("<iframe class=\"t746__iframe\" width=\"100%\" height=\"100%\" src=\"https://player.vimeo.com/video/" + url + "?autoplay=1\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>")
        }
        $(this).next().css('z-index', '3')
    })
}

function t746_hide(recid) {
    var el = $("#rec" + recid),
        body = el.find('.t746__frame');
    el.on('updateSlider', function() {
        body.html('').css('z-index', '')
    })
}

function t746_imageHeight(recid) {
    var el = $("#rec" + recid);
    var image = el.find(".t746__separator");
    image.each(function() {
        var width = $(this).attr("data-slider-image-width");
        var height = $(this).attr("data-slider-image-height");
        var ratio = height / width;
        var padding = ratio * 100;
        $(this).css("padding-bottom", padding + "%")
    })
}

function t746_arrowWidth(recid) {
    var el = $("#rec" + recid),
        arrow = el.find('.t-slds__arrow_wrapper'),
        slideWidth = el.find('.t-slds__wrapper').width(),
        windowWidth = $(window).width(),
        arrowWidth = windowWidth - slideWidth;
    if (windowWidth > 960) {
        arrow.css('width', arrowWidth / 2)
    } else {
        arrow.css('width', '')
    }
}

function t776__init(recid) {
    setTimeout(function() {
        t_prod__init(recid);
        t776_initPopup(recid);
        t776__hoverZoom_init(recid);
        t776__updateLazyLoad(recid);
        t776__alignButtons_init(recid)
    }, 500)
}

function t776__alignButtons_init(recid) {
    var rec = $('#rec' + recid);
    if (rec.find('[data-buttons-v-align]')[0]) {
        try {
            t776__alignButtons(recid);
            $(window).bind('resize', t_throttle(function() {
                if (typeof window.noAdaptive !== 'undefined' && window.noAdaptive === !0 && $isMobile) {
                    return
                }
                t776__alignButtons(recid)
            }, 200));
            $('.t776').bind('displayChanged', function() {
                t776__alignButtons(recid)
            });
            if ($isMobile) {
                $(window).on('orientationchange', function() {
                    t776__alignButtons(recid)
                })
            }
        } catch (e) {
            console.log('buttons-v-align error: ' + e.message)
        }
    }
}

function t776__alignButtons(recid) {
    var rec = $('#rec' + recid);
    var wrappers = rec.find('.t776__textwrapper');
    var maxHeight = 0;
    var itemsInRow = rec.find('.t-container').attr('data-blocks-per-row') * 1;
    var mobileView = $(window).width() <= 480;
    var tableView = $(window).width() <= 960 && $(window).width() > 480;
    var mobileOneRow = $(window).width() <= 960 && rec.find('.t776__container_mobile-flex')[0] ? true : !1;
    var mobileTwoItemsInRow = $(window).width() <= 480 && rec.find('.t776 .mobile-two-columns')[0] ? true : !1;
    if (mobileView) {
        itemsInRow = 1
    }
    if (tableView) {
        itemsInRow = 2
    }
    if (mobileTwoItemsInRow) {
        itemsInRow = 2
    }
    if (mobileOneRow) {
        itemsInRow = 999999
    }
    var i = 1;
    var wrappersInRow = [];
    $.each(wrappers, function(key, element) {
        element.style.height = 'auto';
        if (itemsInRow === 1) {
            element.style.height = 'auto'
        } else {
            wrappersInRow.push(element);
            if (element.offsetHeight > maxHeight) {
                maxHeight = element.offsetHeight
            }
            $.each(wrappersInRow, function(key, wrapper) {
                wrapper.style.height = maxHeight + 'px'
            });
            if (i === itemsInRow) {
                i = 0;
                maxHeight = 0;
                wrappersInRow = []
            }
            i++
        }
    })
}

function t776__hoverZoom_init(recid) {
    if (isMobile) {
        return
    }
    var rec = $('#rec' + recid);
    try {
        if (rec.find('[data-hover-zoom]')[0]) {
            if (!jQuery.cachedZoomScript) {
                jQuery.cachedZoomScript = function(url) {
                    var options = {
                        dataType: 'script',
                        cache: !0,
                        url: url
                    };
                    return jQuery.ajax(options)
                }
            }
            $.cachedZoomScript('../static.tildacdn.com/js/tilda-hover-zoom-1.0.min.js').done(function(script, textStatus) {
                if (textStatus == 'success') {
                    setTimeout(function() {
                        t_hoverZoom_init(recid, ".t-slds__container")
                    }, 500)
                } else {
                    console.log('Upload script error: ' + textStatus)
                }
            })
        }
    } catch (e) {
        console.log('Zoom image init error: ' + e.message)
    }
}

function t776__updateLazyLoad(recid) {
    var scrollContainer = $("#rec" + recid + " .t776__container_mobile-flex");
    var curMode = $(".t-records").attr("data-tilda-mode");
    if (scrollContainer.length && curMode != "edit" && curMode != "preview") {
        scrollContainer.bind('scroll', t_throttle(function() {
            t_lazyload_update()
        }, 500))
    }
}

function t776_initPopup(recid) {
    var rec = $('#rec' + recid);
    rec.find('[href^="#prodpopup"]').each(function(e) {
        var el_popup = rec.find('.t-popup');
        var el_prod = $(this).closest('.js-product');
        var lid_prod = el_prod.attr('data-product-lid');
        $(".r").find('a[href$="#!/tproduct/' + recid + '-' + lid_prod + '"]').click(function(e) {
            if (rec.find('[data-product-lid=' + lid_prod + ']').length) {
                rec.find('[data-product-lid=' + lid_prod + '] [href^="#prodpopup"]').triggerHandler('click')
            }
        })
    });
    rec.find('[href^="#prodpopup"]').one("click", function(e) {
        e.preventDefault();
        var el_popup = rec.find('.t-popup');
        var el_prod = $(this).closest('.js-product');
        var lid_prod = el_prod.attr('data-product-lid');
        t_sldsInit(recid + ' #t776__product-' + lid_prod + '')
    });
    rec.find('[href^="#prodpopup"]').click(function(e) {
        e.preventDefault();
        t776_showPopup(recid);
        var el_popup = rec.find('.t-popup');
        var el_prod = $(this).closest('.js-product');
        var lid_prod = el_prod.attr('data-product-lid');
        el_popup.find('.js-product').css('display', 'none');
        var el_fullprod = el_popup.find('.js-product[data-product-lid="' + lid_prod + '"]');
        el_fullprod.css('display', 'block');
        var analitics = el_popup.attr('data-track-popup');
        if (analitics > '') {
            var virtTitle = el_fullprod.find('.js-product-name').text();
            if (!virtTitle) {
                virtTitle = 'prod' + lid_prod
            }
            Tilda.sendEventToStatistics(analitics, virtTitle)
        }
        var curUrl = window.location.href;
        if (curUrl.indexOf('#!/tproduct/') < 0 && curUrl.indexOf('%23%21/tproduct/index.html') < 0) {
            if (typeof history.replaceState != 'undefined') {
                window.history.replaceState('', '', window.location.href + '#!/tproduct/' + recid + '-' + lid_prod)
            }
        }
        t776_updateSlider(recid + ' #t776__product-' + lid_prod + '');
        if (window.lazy == 'y') {
            t_lazyload_update()
        }
    });
    if ($('#record' + recid).length == 0) {
        t776_checkUrl(recid)
    }
    t776_copyTypography(recid)
}

function t776_checkUrl(recid) {
    var curUrl = window.location.href;
    var tprodIndex = curUrl.indexOf('#!/tproduct/');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && tprodIndex < 0) {
        tprodIndex = curUrl.indexOf('%23%21/tproduct/index.html')
    }
    if (tprodIndex >= 0) {
        var curUrl = curUrl.substring(tprodIndex, curUrl.length);
        var curProdLid = curUrl.substring(curUrl.indexOf('-') + 1, curUrl.length);
        var rec = $('#rec' + recid);
        if (curUrl.indexOf(recid) >= 0 && rec.find('[data-product-lid=' + curProdLid + ']').length) {
            rec.find('[data-product-lid=' + curProdLid + '] [href^="#prodpopup"]').triggerHandler('click')
        }
    }
}

function t776_updateSlider(recid) {
    var el = $('#rec' + recid);
    t_slds_SliderWidth(recid);
    var sliderWrapper = el.find('.t-slds__items-wrapper');
    var sliderWidth = el.find('.t-slds__container').width();
    var pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
    sliderWrapper.css({
        transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
    });
    t_slds_UpdateSliderHeight(recid);
    t_slds_UpdateSliderArrowsHeight(recid)
}

function t776_showPopup(recid) {
    var el = $('#rec' + recid);
    var popup = el.find('.t-popup');
    popup.css('display', 'block');
    setTimeout(function() {
        popup.find('.t-popup__container').addClass('t-popup__container-animated');
        popup.addClass('t-popup_show');
        if (window.lazy == 'y') {
            t_lazyload_update()
        }
    }, 50);
    $('body').addClass('t-body_popupshowed');
    el.find('.t-popup').mousedown(function(e) {
        var windowWidth = $(window).width();
        var maxScrollBarWidth = 17;
        var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
        if (e.clientX > windowWithoutScrollBar) {
            return
        }
        if (e.target == this) {
            t776_closePopup()
        }
    });
    el.find('.t-popup__close, .t776__close-text').click(function(e) {
        t776_closePopup()
    });
    $(document).keydown(function(e) {
        if (e.keyCode == 27) {
            t776_closePopup()
        }
    })
}

function t776_closePopup() {
    $('body').removeClass('t-body_popupshowed');
    $('.t-popup').removeClass('t-popup_show');
    var curUrl = window.location.href;
    var indexToRemove = curUrl.indexOf('#!/tproduct/');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && indexToRemove < 0) {
        indexToRemove = curUrl.indexOf('%23%21/tproduct/index.html')
    }
    curUrl = curUrl.substring(0, indexToRemove);
    setTimeout(function() {
        $(".t-popup").scrollTop(0);
        $('.t-popup').not('.t-popup_show').css('display', 'none');
        if (typeof history.replaceState != 'undefined') {
            window.history.replaceState('', '', curUrl)
        }
    }, 300)
}

function t776_removeSizeStyles(styleStr) {
    if (typeof styleStr != "undefined" && (styleStr.indexOf('font-size') >= 0 || styleStr.indexOf('padding-top') >= 0 || styleStr.indexOf('padding-bottom') >= 0)) {
        var styleStrSplitted = styleStr.split(';');
        styleStr = "";
        for (var i = 0; i < styleStrSplitted.length; i++) {
            if (styleStrSplitted[i].indexOf('font-size') >= 0 || styleStrSplitted[i].indexOf('padding-top') >= 0 || styleStrSplitted[i].indexOf('padding-bottom') >= 0) {
                styleStrSplitted.splice(i, 1);
                i--;
                continue
            }
            if (styleStrSplitted[i] == "") {
                continue
            }
            styleStr += styleStrSplitted[i] + ";"
        }
    }
    return styleStr
}

function t776_copyTypography(recid) {
    var rec = $('#rec' + recid);
    var titleStyle = rec.find('.t776__title').attr('style');
    var descrStyle = rec.find('.t776__descr').attr('style');
    rec.find('.t-popup .t776__title').attr("style", t776_removeSizeStyles(titleStyle));
    rec.find('.t-popup .t776__descr, .t-popup .t776__text').attr("style", t776_removeSizeStyles(descrStyle))
}

function t802_insta_init(recid, instauser) {
    var projectid = $('#allrecords').attr('data-tilda-project-id');
    t802_insta_loadflow(recid, projectid, instauser)
}

function t802_insta_loadflow(recid, projectid, instauser) {
    if (instauser == '') {
        var url = "https://insta.tildacdn.com/fish/0.json"
    } else {
        var url = "https://insta.tildacdn.com/json/project" + projectid + "_" + instauser + ".json"
    }
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function(data) {
            if (typeof data == 'object') {
                t802_insta_draw(recid, data)
            } else {
                console.log('error. insta flow json not object');
                console.log(data)
            }
        },
        error: function() {
            console.log('error load instgram flow')
        },
        timeout: 1000 * 90
    })
}

function t802_insta_draw(recid, obj) {
    if (typeof obj.photos == 'undefined') {
        return
    }
    $.each(obj.photos, function(index, item) {
        t802_insta_drawItem(recid, obj.username, item)
    })
}

function t802_insta_drawItem(recid, username, item) {
    var emptyEl = $("#rec" + recid).find(".t802__imgwrapper_empty").first();
    if (emptyEl.length > 0) {
        emptyEl.removeClass("t802__imgwrapper_empty");
        emptyEl.append('<div class="t802__bgimg" style="background-image:url(' + item.url + ')"></div>');
        emptyEl.wrap('<a href="' + item.link + '" target="_blank"></a>');
        var hoverEl = emptyEl.find(".t802__hover-wrapper");
        if (hoverEl.length > 0 && isMobile == !1) {
            var text = t802_insta_cropText(recid, '@' + username + ': ' + item.text);
            hoverEl.append('<div class="t802__hover-filter"></div>');
            hoverEl.append('<div class="t802__text t-text t-descr_xxs">' + text + '</div>')
        }
    }
}

function t802_insta_cropText(recid, text) {
    var colsInLine = $("#rec" + recid).find("[data-cols-in-line]").attr("data-cols-in-line");
    if (colsInLine == 6) {
        var maxLength = 90
    } else {
        var maxLength = 130
    }
    if (text.length > maxLength) {
        text = text.substring(0, maxLength);
        text = text.substring(0, Math.min(maxLength, text.lastIndexOf(" ")));
        text += ' ...'
    }
    return text
}

function t827_init(recid) {
    var rec = $('#rec' + recid);
    var grid = rec.find('.t827__grid');
    var sizer = rec.find('.t827__grid-sizer');
    var item = rec.find('.t827__grid-item');
    var images = rec.find('.t827__grid img');
    var overlay = rec.find('.t827__overlay');
    var startContainerWidth = rec.find('.t827__grid-sizer').width();
    t827_reverse(grid, item);
    images.load(function() {
        t827_initMasonry(rec, recid, grid);
        setTimeout(function() {
            t827_showOverlay(overlay, item)
        }, 500)
    });
    if (overlay.hasClass('t827__overlay_preview')) {
        setTimeout(function() {
            t827_showOverlay(overlay, item)
        }, 1000)
    }
    t827_initMasonry(rec, recid, grid);
    $(window).bind('resize', function() {
        if (typeof window.noAdaptive != "undefined" && window.noAdaptive == !0 && $isMobile) {
            return
        }
        t827_calcColumnWidth(rec, startContainerWidth, grid, sizer, item)
    });
    $('.t827').bind('displayChanged', function() {
        t827_initMasonry(rec, recid, grid);
        t827_calcColumnWidth(rec, startContainerWidth, grid, sizer, item)
    });
    t827_calcColumnWidth(rec, startContainerWidth, grid, sizer, item)
}

function t827_reverse(grid, item) {
    if (grid.hasClass('t827__grid_reverse')) {
        grid.append(function() {
            return $(this).children().get().reverse()
        })
    }
}

function t827_initMasonry(rec, recid, grid) {
    var $grid = grid;
    var gutterSizerWidth = rec.find('.t827__gutter-sizer').width();
    var gutterElement = rec.find('.t827__gutter-sizer').width() == 40 ? 39 : '#rec' + recid + ' .t827__gutter-sizer';
    $grid.imagesLoaded(function() {
        $grid.masonry({
            itemSelector: '#rec' + recid + ' .t827__grid-item',
            columnWidth: '#rec' + recid + ' .t827__grid-sizer',
            gutter: gutterElement,
            isFitWidth: !0,
            transitionDuration: 0
        })
    })
}

function t827_showOverlay(overlay, item) {
    if ($(window).width() >= 1024) {
        overlay.css('display', 'block')
    } else {
        item.click(function() {
            if ($(this).find('.t827__overlay').css('opacity') == '0') {
                overlay.css('opacity', '0');
                $(this).find('.t827__overlay').css('opacity', '1')
            } else {
                $(this).find('.t827__overlay').css('opacity', '0')
            }
        })
    }
}

function t827_calcColumnWidth(rec, startcontainerwidth, grid, sizer, item) {
    var containerWidth = rec.find('.t827__container').width();
    var sizerWidth = rec.find('.t827__grid-sizer').width();
    var itemWidth = rec.find('.t827__grid-item').width();
    var gutterSizerWidth = rec.find('.t827__gutter-sizer').width() == 40 ? 39 : rec.find('.t827__gutter-sizer').width();
    var columnAmount = Math.round(containerWidth / startcontainerwidth);
    var newSizerWidth = ((containerWidth - gutterSizerWidth * (columnAmount - 1)) / columnAmount);
    if (containerWidth >= itemWidth) {
        sizer.css('width', newSizerWidth);
        item.css('width', newSizerWidth)
    } else {
        grid.css('width', '100%');
        sizer.css('width', '100%');
        item.css('width', '100%')
    }
}

function t835_init(recid) {
    var rec = $('#rec' + recid);
    var quizWrapper = rec.find('.t835__quiz-wrapper');
    var quizFormWrapper = rec.find('.t835__quiz-form-wrapper');
    var form = rec.find('.t835 .t-form');
    var quizQuestion = rec.find('.t835 .t-input-group');
    var prevBtn = rec.find('.t835__btn_prev');
    var nextBtn = rec.find('.t835__btn_next');
    var resultBtn = rec.find('.t835__btn_result');
    var errorBoxMiddle = rec.find('.t-form__errorbox-middle .t-form__errorbox-wrapper');
    var captureFormHTML = '<div class="t835__capture-form"></div>';
    rec.find('.t835 .t-form__errorbox-middle').before(captureFormHTML);
    var quizQuestionNumber = 0;
    form.removeClass('js-form-proccess');
    $(quizQuestion[quizQuestionNumber]).show();
    $(quizQuestion[quizQuestionNumber]).addClass('t-input-group-step_active');
    t835_workWithAnswerCode(rec);
    quizQuestion.each(function(i) {
        $(quizQuestion[i]).attr('data-question-number', i)
    });
    t835_wrapCaptureForm(rec);
    t835_showCounter(rec, quizQuestionNumber);
    t835_disabledPrevBtn(rec, quizQuestionNumber);
    t835_checkLength(rec);
    prevBtn.click(function(e) {
        if (quizQuestionNumber > 0) {
            quizQuestionNumber--
        }
        t835_setProgress(rec, -1);
        if (typeof $('.t-records').attr('data-tilda-mode') == 'undefined') {
            if (window.lazy == 'y') {
                t_lazyload_update()
            }
        }
        t835_awayFromResultScreen(rec);
        t835_showCounter(rec, quizQuestionNumber);
        t835_hideError(rec, quizQuestionNumber);
        t835_disabledPrevBtn(rec, quizQuestionNumber);
        t835_switchQuestion(rec, quizQuestionNumber);
        t835_scrollToTop(quizFormWrapper);
        e.preventDefault()
    });
    nextBtn.click(function(e) {
        if (quizWrapper.hasClass('t835__quiz-published')) {
            var showErrors = t835_setError(rec, quizQuestionNumber)
        }
        if (showErrors) {
            errorBoxMiddle.hide()
        }
        if (!showErrors) {
            quizQuestionNumber++;
            prevBtn.attr('disabled', !1);
            t835_setProgress(rec, 1);
            t835_showCounter(rec, quizQuestionNumber);
            t835_switchQuestion(rec, quizQuestionNumber);
            t835_scrollToTop(quizFormWrapper)
        }
        if (typeof $('.t-records').attr('data-tilda-mode') == 'undefined') {
            if (window.lazy == 'y') {
                t_lazyload_update()
            }
        }
        e.preventDefault()
    });
    quizQuestion.keypress(function(e) {
        var activeStep = form.find('.t-input-group-step_active');
        if (event.keyCode === 13 && !form.hasClass('js-form-proccess') && !activeStep.hasClass('t-input-group_ta')) {
            if (quizWrapper.hasClass('t835__quiz-published')) {
                var showErrors = t835_setError(rec, quizQuestionNumber)
            }
            var questionArr = t835_createQuestionArr(rec);
            if (showErrors) {
                errorBoxMiddle.hide()
            }
            prevBtn.attr('disabled', !1);
            if (!showErrors) {
                quizQuestionNumber++;
                t835_setProgress(rec, 1);
                if (quizQuestionNumber < questionArr.length) {
                    t835_switchQuestion(rec, quizQuestionNumber)
                } else {
                    t835_switchResultScreen(rec);
                    form.addClass('js-form-proccess')
                }
                t835_scrollToTop(quizFormWrapper);
                t835_disabledPrevBtn(rec, quizQuestionNumber)
            }
            if (typeof $('.t-records').attr('data-tilda-mode') == 'undefined') {
                if (window.lazy == 'y') {
                    t_lazyload_update()
                }
            }
            e.preventDefault()
        }
    });
    resultBtn.click(function(e) {
        if (quizWrapper.hasClass('t835__quiz-published')) {
            var showErrors = t835_setError(rec, quizQuestionNumber)
        }
        if (showErrors) {
            errorBoxMiddle.hide()
        }
        if (!showErrors) {
            quizQuestionNumber++;
            t835_setProgress(rec, 1);
            t835_switchResultScreen(rec);
            t835_scrollToTop(quizFormWrapper);
            form.addClass('js-form-proccess');
            t835_disabledPrevBtn(rec, quizQuestionNumber)
        }
        e.preventDefault()
    })
}

function t835_workWithAnswerCode(rec) {
    rec.find('.t-input-group_ri').find('input').each(function() {
        var $this = $(this);
        if ($this.val().indexOf('value::') != -1) {
            t835_setAnswerCode($this);
            var label = $this.parent().find('.t-img-select__text');
            label.text(label.text().split('value::')[0].trim())
        }
    });
    rec.find('.t-input-group_rd').find('input').each(function() {
        var $this = $(this);
        if ($this.val().indexOf('value::') != -1) {
            t835_setAnswerCode($this);
            var label = $this.parent();
            label.html(function() {
                var html = $(this).html().split('value::')[0].trim();
                return html
            })
        }
    });
    rec.find('.t-input-group_sb').find('option').each(function() {
        var $this = $(this);
        if ($this.val().indexOf('value::') != -1) {
            t835_setAnswerCode($this);
            $this.text($this.text().split('value::')[0].trim())
        }
    })
}

function t835_setAnswerCode($this) {
    var parameter = $this.val().split('value::')[1].trim();
    $this.val(parameter)
}

function t835_scrollToTop(quizFormWrapper) {
    var topCoordinateForm = quizFormWrapper.offset().top;
    var paddingTop = 150;
    if ($('.t228__positionfixed').length > 0 && !window.isMobile) {
        paddingTop = 150 + $('.t228__positionfixed').height()
    }
    $('html, body').animate({
        scrollTop: topCoordinateForm - paddingTop
    }, 0)
}

function t835_checkLength(rec) {
    var nextBtn = rec.find('.t835__btn_next');
    var resultBtn = rec.find('.t835__btn_result');
    var questionArr = t835_createQuestionArr(rec);
    if (questionArr.length < 2) {
        nextBtn.hide();
        resultBtn.show()
    }
}

function t835_showCounter(rec, quizQuestionNumber) {
    var counter = rec.find('.t835__quiz-description-counter');
    var questionArr = t835_createQuestionArr(rec);
    counter.html(quizQuestionNumber + 1 + '/' + questionArr.length)
}

function t835_setError(rec, quizQuestionNumber) {
    var questionArr = t835_createQuestionArr(rec);
    var currentQuestion = $(questionArr[quizQuestionNumber]);
    var arErrors = window.tildaForm.validate(currentQuestion);
    var showErrors;
    currentQuestion.addClass('js-error-control-box');
    var errorsTypeObj = arErrors[0];
    var arLang = window.tildaForm.arValidateErrors[window.tildaBrowserLang] || {};
    if (errorsTypeObj != undefined) {
        var errorType = errorsTypeObj.type[0];
        var errorTextCustom = rec.find('.t835 .t-form').find('.t-form__errorbox-middle').find('.js-rule-error-' + errorType).text();
        var sError = '';
        if (errorTextCustom != '') {
            sError = errorTextCustom
        } else {
            sError = arLang[errorType]
        }
        showErrors = errorType == 'emptyfill' ? !1 : window.tildaForm.showErrors(currentQuestion, arErrors);
        currentQuestion.find('.t-input-error').html(sError)
    }
    return showErrors
}

function t835_hideError(rec, quizQuestionNumber) {
    var questionArr = t835_createQuestionArr(rec);
    var currentQuestion = $(questionArr[quizQuestionNumber]);
    currentQuestion.removeClass('js-error-control-box');
    currentQuestion.find('.t-input-error').html('')
}

function t835_setProgress(rec, index) {
    var progressbarWidth = rec.find('.t835__progressbar').width();
    var progress = rec.find('.t835__progress');
    var questionArr = t835_createQuestionArr(rec);
    var progressWidth = progress.width();
    var progressStep = progressbarWidth / (questionArr.length);
    var percentProgressWidth = (progressWidth + index * progressStep) / progressbarWidth * 100 + '%';
    progress.css('width', percentProgressWidth)
}

function t835_wrapCaptureForm(rec) {
    var captureForm = rec.find('.t835__capture-form');
    var quizQuestion = rec.find('.t835 .t-input-group');
    var quizFormWrapper = rec.find('.t835__quiz-form-wrapper');
    quizQuestion.each(function(i) {
        var currentQuizQuestion = $(quizQuestion[i]);
        var emailInputExist = $(currentQuizQuestion).hasClass('t-input-group_em');
        var nameInputExist = $(currentQuizQuestion).hasClass('t-input-group_nm');
        var phoneInputExist = $(currentQuizQuestion).hasClass('t-input-group_ph');
        var checkboxInputExist = $(currentQuizQuestion).hasClass('t-input-group_cb');
        var quizQuestionNumber = currentQuizQuestion.attr('data-question-number');
        var maxCountOfCaptureFields = quizFormWrapper.hasClass('t835__quiz-form-wrapper_withcheckbox') ? 4 : 3;
        if (quizQuestionNumber >= quizQuestion.length - maxCountOfCaptureFields) {
            var isCaptureGroup = !0;
            if (quizFormWrapper.hasClass('t835__quiz-form-wrapper_newcapturecondition')) {
                var inputsGroup = currentQuizQuestion.nextAll('.t-input-group');
                inputsGroup.each(function() {
                    isCaptureGroup = $(this).hasClass('t-input-group_cb') || $(this).hasClass('t-input-group_em') || $(this).hasClass('t-input-group_nm') || $(this).hasClass('t-input-group_ph')
                })
            }
            if (isCaptureGroup) {
                if (quizFormWrapper.hasClass('t835__quiz-form-wrapper_withcheckbox')) {
                    if (emailInputExist || nameInputExist || phoneInputExist || checkboxInputExist) {
                        currentQuizQuestion.addClass('t835__t-input-group_capture');
                        captureForm.append(currentQuizQuestion)
                    }
                } else {
                    if (emailInputExist || nameInputExist || phoneInputExist) {
                        currentQuizQuestion.addClass('t835__t-input-group_capture');
                        captureForm.append(currentQuizQuestion)
                    }
                }
            }
        }
    })
}

function t835_createQuestionArr(rec) {
    var quizQuestion = rec.find('.t835 .t-input-group');
    var questionArr = [];
    quizQuestion.each(function(i) {
        var question = $(quizQuestion[i]);
        if (!question.hasClass('t835__t-input-group_capture')) {
            questionArr.push(quizQuestion[i])
        }
    });
    return questionArr
}

function t835_disabledPrevBtn(rec, quizQuestionNumber) {
    var prevBtn = rec.find('.t835__btn_prev');
    quizQuestionNumber == 0 ? prevBtn.attr('disabled', !0) : prevBtn.attr('disabled', !1)
}

function t835_switchQuestion(rec, quizQuestionNumber) {
    var nextBtn = rec.find('.t835__btn_next');
    var resultBtn = rec.find('.t835__btn_result');
    var questionArr = t835_createQuestionArr(rec);
    $(questionArr).hide();
    $(questionArr).removeClass('t-input-group-step_active');
    $(questionArr[quizQuestionNumber]).show();
    $(questionArr[quizQuestionNumber]).addClass('t-input-group-step_active');
    if (quizQuestionNumber === questionArr.length - 1) {
        nextBtn.hide();
        resultBtn.show()
    } else {
        nextBtn.show();
        resultBtn.hide()
    }
}

function t835_switchResultScreen(rec) {
    var captureForm = rec.find('.t835__capture-form');
    var quizDescription = rec.find('.t835__quiz-description');
    var resultTitle = rec.find('.t835__result-title');
    var resultBtn = rec.find('.t835__btn_result');
    var submitBtnWrapper = rec.find('.t835 .t-form__submit');
    var questionArr = t835_createQuestionArr(rec);
    $(questionArr).hide();
    $(captureForm).show();
    resultBtn.hide();
    quizDescription.hide();
    resultTitle.show();
    submitBtnWrapper.show()
}

function t835_awayFromResultScreen(rec) {
    var captureForm = rec.find('.t835__capture-form');
    var quizDescription = rec.find('.t835__quiz-description');
    var resultTitle = rec.find('.t835__result-title');
    var submitBtnWrapper = rec.find('.t835 .t-form__submit');
    submitBtnWrapper.hide();
    $(captureForm).hide();
    quizDescription.show();
    resultTitle.hide()
}

function t835_onSuccess(form) {
    var inputsWrapper = form.find('.t-form__inputsbox');
    var inputsHeight = inputsWrapper.height();
    var inputsOffset = inputsWrapper.offset().top;
    var inputsBottom = inputsHeight + inputsOffset;
    var targetOffset = form.find('.t-form__successbox').offset().top;
    var prevBtn = form.parents('.t835').find('.t835__btn_prev');
    var target;
    if ($(window).width() > 960) {
        target = targetOffset - 200
    } else {
        target = targetOffset - 100
    }
    if (targetOffset > $(window).scrollTop() || ($(document).height() - inputsBottom) < ($(window).height() - 100)) {
        inputsWrapper.addClass('t835__inputsbox_hidden');
        setTimeout(function() {
            if ($(window).height() > $('.t-body').height()) {
                $('.t-tildalabel').animate({
                    opacity: 0
                }, 50)
            }
        }, 300)
    } else {
        $('html, body').animate({
            scrollTop: target
        }, 400);
        setTimeout(function() {
            inputsWrapper.addClass('t835__inputsbox_hidden')
        }, 400)
    }
    var successurl = form.data('success-url');
    if (successurl && successurl.length > 0) {
        setTimeout(function() {
            window.location.href = successurl
        }, 500)
    }
    prevBtn.hide()
}

function t851_init(recid) {
    var rec = $('#rec' + recid + ' .t851');
    t851_updateLazyLoad(recid)
}

function t851_updateLazyLoad(recid) {
    var scrollContainer = $("#rec" + recid + " .t851__container_mobile-flex");
    var curMode = $(".t-records").attr("data-tilda-mode");
    if (scrollContainer.length && curMode != "edit" && curMode != "preview") {
        scrollContainer.bind('scroll', t_throttle(function() {
            t_lazyload_update()
        }, 500))
    }
}

function t857__init(recid) {
    $('.t857__container_mobile-flex').bind('touchstart', function() {
        $('.t857__col').bind('touchmove', function() {
            if (typeof $(".t-records").attr('data-tilda-mode') == 'undefined') {
                if (window.lazy == 'y') {
                    t_lazyload_update()
                }
            }
        })
    }).mouseup(function() {
        $('.t857__col').unbind('touchend')
    })
}

function t862_init(recid) {
    var rec = $('#rec' + recid);
    var quizWrapper = rec.find('.t862__quiz-wrapper');
    var form = rec.find('.t862 .t-form');
    var quizQuestion = rec.find('.t862 .t-input-group');
    var prevBtn = rec.find('.t862__btn_prev');
    var nextBtn = rec.find('.t862__btn_next');
    var resultBtn = rec.find('.t862__btn_result');
    var errorBoxMiddle = rec.find('.t-form__errorbox-middle .t-form__errorbox-wrapper');
    var captureFormHTML = '<div class="t862__capture-form"></div>';
    rec.find('.t862 .t-form__errorbox-middle').before(captureFormHTML);
    var quizQuestionNumber = 0;
    form.removeClass('js-form-proccess');
    $(quizQuestion[quizQuestionNumber]).show();
    $(quizQuestion[quizQuestionNumber]).addClass('t-input-group-step_active');
    rec.attr('data-animationappear', 'off');
    rec.css('opacity', '1');
    t862_workWithAnswerCode(rec);
    quizQuestion.each(function(i) {
        $(quizQuestion[i]).attr('data-question-number', i)
    });
    t862_wrapCaptureForm(rec);
    var captureForm = rec.find('.t862__capture-form');
    t862_showCounter(rec, quizQuestionNumber);
    t862_disabledPrevBtn(rec, quizQuestionNumber);
    t862_checkLength(rec);
    t862_openToHook(rec, form, quizQuestion, captureForm);
    prevBtn.click(function(e) {
        if (quizQuestionNumber > 0) {
            quizQuestionNumber--
        }
        t862_setProgress(rec, -1);
        t862_lazyLoad();
        t862_awayFromResultScreen(rec);
        t862_showCounter(rec, quizQuestionNumber);
        t862_hideError(rec, quizQuestionNumber);
        t862_disabledPrevBtn(rec, quizQuestionNumber);
        t862_switchQuestion(rec, quizQuestionNumber);
        e.preventDefault()
    });
    nextBtn.click(function(e) {
        var showErrors = t862_showError(rec, quizWrapper, quizQuestionNumber);
        if (showErrors) {
            errorBoxMiddle.hide()
        }
        if (!showErrors) {
            quizQuestionNumber++;
            prevBtn.attr('disabled', !1);
            t862_setProgress(rec, 1);
            t862_showCounter(rec, quizQuestionNumber);
            t862_switchQuestion(rec, quizQuestionNumber)
        }
        t862_lazyLoad();
        e.preventDefault()
    });
    quizQuestion.keypress(function(e) {
        var activeStep = form.find('.t-input-group-step_active');
        if (event.keyCode === 13 && !form.hasClass('js-form-proccess') && !activeStep.hasClass('t-input-group_ta')) {
            var showErrors = t862_showError(rec, quizWrapper, quizQuestionNumber);
            var questionArr = t862_createQuestionArr(rec);
            if (showErrors) {
                errorBoxMiddle.hide()
            }
            prevBtn.attr('disabled', !1);
            if (!showErrors) {
                quizQuestionNumber++;
                t862_setProgress(rec, 1);
                if (quizQuestionNumber < questionArr.length) {
                    t862_switchQuestion(rec, quizQuestionNumber)
                } else {
                    t862_switchResultScreen(rec);
                    form.addClass('js-form-proccess')
                }
                t862_disabledPrevBtn(rec, quizQuestionNumber)
            }
            t862_lazyLoad();
            e.preventDefault()
        }
    });
    resultBtn.click(function(e) {
        var showErrors = t862_showError(rec, quizWrapper, quizQuestionNumber);
        if (showErrors) {
            errorBoxMiddle.hide()
        }
        if (!showErrors) {
            quizQuestionNumber++;
            t862_setProgress(rec, 1);
            t862_switchResultScreen(rec);
            form.addClass('js-form-proccess');
            t862_disabledPrevBtn(rec, quizQuestionNumber)
        }
        e.preventDefault()
    })
}

function t862_workWithAnswerCode(rec) {
    rec.find('.t-input-group_ri').find('input').each(function() {
        var $this = $(this);
        if ($this.val().indexOf('value::') != -1) {
            t862_setAnswerCode($this);
            var label = $this.parent().find('.t-img-select__text');
            label.text(label.text().split('value::')[0].trim())
        }
    });
    rec.find('.t-input-group_rd').find('input').each(function() {
        var $this = $(this);
        if ($this.val().indexOf('value::') != -1) {
            t862_setAnswerCode($this);
            var label = $this.parent();
            label.html(function() {
                var html = $(this).html().split('value::')[0].trim();
                return html
            })
        }
    });
    rec.find('.t-input-group_sb').find('option').each(function() {
        var $this = $(this);
        if ($this.val().indexOf('value::') != -1) {
            t862_setAnswerCode($this);
            $this.text($this.text().split('value::')[0].trim())
        }
    })
}

function t862_setAnswerCode($this) {
    var parameter = $this.val().split('value::')[1].trim();
    $this.val(parameter)
}

function t862_openToHook(rec, form, quizQuestion, captureForm) {
    var popup = rec.find('.t-popup');
    var hook = popup.attr('data-tooltip-hook');
    var analitics = popup.attr('data-track-popup');
    if (hook !== '') {
        $('.r').on('click', 'a[href="' + hook + '"]', function(e) {
            t862_showPopup(rec, form, quizQuestion, captureForm);
            t862_resizePopup(rec);
            e.preventDefault();
            if (window.lazy == 'y') {
                t_lazyload_update()
            }
            if (analitics > '') {
                var virtTitle = hook;
                if (virtTitle.substring(0, 7) == '#popup:') {
                    virtTitle = virtTitle.substring(7)
                }
                Tilda.sendEventToStatistics(analitics, virtTitle)
            }
        })
    }
}

function t862_showError(rec, quizWrapper, quizQuestionNumber) {
    if (quizWrapper.hasClass('t862__quiz-published')) {
        var errors = t862_setError(rec, quizQuestionNumber);
        return errors
    }
}

function t862_lazyLoad() {
    if (typeof $('.t-records').attr('data-tilda-mode') == 'undefined') {
        if (window.lazy == 'y') {
            t_lazyload_update()
        }
    }
}

function t862_setHeight(rec, form, quizQuestion, captureForm) {
    var questions = [];
    var questionsHeight = [];
    var descrHeight = rec.find('.t862__quiz-description').outerHeight();
    var titleHeight = rec.find('.t862__result-title').outerHeight();
    quizQuestion.each(function() {
        var $this = $(this);
        if (!$this.hasClass('t862__t-input-group_capture')) {
            questions.push($this)
        }
    });
    questions.forEach(function(item) {
        questionsHeight.push(item.outerHeight())
    });
    var maxHeightQuestion = Math.max.apply(null, questionsHeight);
    var captureFormHeight = captureForm.outerHeight();
    var height = maxHeightQuestion > captureFormHeight ? maxHeightQuestion : captureFormHeight;
    questions.forEach(function(item) {
        item.css('min-height', height)
    });
    captureForm.css('min-height', height);
    rec.find('.t862__quiz-form-wrapper').css('min-height', height);
    var headerHeight = titleHeight > descrHeight ? titleHeight : descrHeight;
    var quizWrapperHeight = rec.find('.t862__quiz-form-wrapper').outerHeight();
    var btnHeight = rec.find('.t862__btn-wrapper').outerHeight();
    rec.find('.t862__wrapper').css('min-height', headerHeight + quizWrapperHeight + btnHeight)
}

function t862_setMobileHeight() {
    t862_calcVH();
    window.addEventListener('resize', function() {
        t862_calcVH()
    })
}

function t862_calcVH() {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px')
}

function t862_checkLength(rec) {
    var nextBtn = rec.find('.t862__btn_next');
    var resultBtn = rec.find('.t862__btn_result');
    var questionArr = t862_createQuestionArr(rec);
    if (questionArr.length < 2) {
        nextBtn.hide();
        resultBtn.show()
    }
}

function t862_showCounter(rec, quizQuestionNumber) {
    var counter = rec.find('.t862__quiz-description-counter');
    var questionArr = t862_createQuestionArr(rec);
    counter.html(quizQuestionNumber + 1 + '/' + questionArr.length)
}

function t862_setError(rec, quizQuestionNumber) {
    var questionArr = t862_createQuestionArr(rec);
    var currentQuestion = $(questionArr[quizQuestionNumber]);
    var arErrors = window.tildaForm.validate(currentQuestion);
    var showErrors;
    currentQuestion.addClass('js-error-control-box');
    var errorsTypeObj = arErrors[0];
    var arLang = window.tildaForm.arValidateErrors[window.tildaBrowserLang] || {};
    if (errorsTypeObj != undefined) {
        var errorType = errorsTypeObj.type[0];
        var errorTextCustom = rec.find('.t862 .t-form').find('.t-form__errorbox-middle').find('.js-rule-error-' + errorType).text();
        var sError = '';
        if (errorTextCustom != '') {
            sError = errorTextCustom
        } else {
            sError = arLang[errorType]
        }
        showErrors = errorType == 'emptyfill' ? !1 : window.tildaForm.showErrors(currentQuestion, arErrors);
        currentQuestion.find('.t-input-error').html(sError)
    }
    return showErrors
}

function t862_hideError(rec, quizQuestionNumber) {
    var questionArr = t862_createQuestionArr(rec);
    var currentQuestion = $(questionArr[quizQuestionNumber]);
    currentQuestion.removeClass('js-error-control-box');
    currentQuestion.find('.t-input-error').html('')
}

function t862_setProgress(rec, index) {
    var progressbarWidth = rec.find('.t862__progressbar').width();
    var progress = rec.find('.t862__progress');
    var questionArr = t862_createQuestionArr(rec);
    var progressWidth = progress.width();
    var progressStep = progressbarWidth / (questionArr.length);
    var percentProgressWidth = Math.ceil((progressWidth + index * progressStep) / progressbarWidth * 100) + '%';
    progress.css('width', percentProgressWidth)
}

function t862_wrapCaptureForm(rec) {
    var captureForm = rec.find('.t862__capture-form');
    var quizQuestion = rec.find('.t862 .t-input-group');
    var quizFormWrapper = rec.find('.t862__quiz-form-wrapper');
    quizQuestion.each(function(i) {
        var currentQuizQuestion = $(quizQuestion[i]);
        var emailInputExist = $(currentQuizQuestion).hasClass('t-input-group_em');
        var nameInputExist = $(currentQuizQuestion).hasClass('t-input-group_nm');
        var phoneInputExist = $(currentQuizQuestion).hasClass('t-input-group_ph');
        var checkboxInputExist = $(currentQuizQuestion).hasClass('t-input-group_cb');
        var quizQuestionNumber = currentQuizQuestion.attr('data-question-number');
        var maxCountOfCaptureFields = 4;
        if (quizQuestionNumber >= quizQuestion.length - maxCountOfCaptureFields) {
            var isCaptureGroup = !0;
            if (quizFormWrapper.hasClass('t862__quiz-form-wrapper_newcapturecondition')) {
                var inputsGroup = currentQuizQuestion.nextAll('.t-input-group');
                inputsGroup.each(function() {
                    isCaptureGroup = $(this).hasClass('t-input-group_cb') || $(this).hasClass('t-input-group_em') || $(this).hasClass('t-input-group_nm') || $(this).hasClass('t-input-group_ph')
                })
            }
            if (isCaptureGroup) {
                if (emailInputExist || nameInputExist || phoneInputExist || checkboxInputExist) {
                    currentQuizQuestion.addClass('t862__t-input-group_capture');
                    captureForm.append(currentQuizQuestion)
                }
            }
        }
    })
}

function t862_createQuestionArr(rec) {
    var quizQuestion = rec.find('.t862 .t-input-group');
    var questionArr = [];
    quizQuestion.each(function(i) {
        var question = $(quizQuestion[i]);
        if (!question.hasClass('t862__t-input-group_capture')) {
            questionArr.push(quizQuestion[i])
        }
    });
    return questionArr
}

function t862_disabledPrevBtn(rec, quizQuestionNumber) {
    var prevBtn = rec.find('.t862__btn_prev');
    quizQuestionNumber == 0 ? prevBtn.attr('disabled', !0) : prevBtn.attr('disabled', !1)
}

function t862_switchQuestion(rec, quizQuestionNumber) {
    var nextBtn = rec.find('.t862__btn_next');
    var resultBtn = rec.find('.t862__btn_result');
    var questionArr = t862_createQuestionArr(rec);
    $(questionArr).hide();
    $(questionArr).removeClass('t-input-group-step_active');
    $(questionArr[quizQuestionNumber]).show();
    $(questionArr[quizQuestionNumber]).addClass('t-input-group-step_active');
    if (quizQuestionNumber === questionArr.length - 1) {
        nextBtn.hide();
        resultBtn.show()
    } else {
        nextBtn.show();
        resultBtn.hide()
    }
}

function t862_switchResultScreen(rec) {
    var captureForm = rec.find('.t862__capture-form');
    var quizDescription = rec.find('.t862__quiz-description');
    var resultTitle = rec.find('.t862__result-title');
    var resultBtn = rec.find('.t862__btn_result');
    var submitBtnWrapper = rec.find('.t862 .t-form__submit');
    var questionArr = t862_createQuestionArr(rec);
    $(questionArr).hide();
    $(captureForm).show();
    resultBtn.hide();
    quizDescription.hide();
    resultTitle.show();
    submitBtnWrapper.show()
}

function t862_awayFromResultScreen(rec) {
    var captureForm = rec.find('.t862__capture-form');
    var quizDescription = rec.find('.t862__quiz-description');
    var resultTitle = rec.find('.t862__result-title');
    var submitBtnWrapper = rec.find('.t862 .t-form__submit');
    submitBtnWrapper.hide();
    $(captureForm).hide();
    quizDescription.show();
    resultTitle.hide()
}

function t862_onSuccess(form) {
    var inputsWrapper = form.find('.t-form__inputsbox');
    var inputsHeight = inputsWrapper.height();
    var inputsOffset = inputsWrapper.offset().top;
    var inputsBottom = inputsHeight + inputsOffset;
    var targetOffset = form.find('.t-form__successbox').offset().top;
    var prevBtn = form.parents('.t862').find('.t862__btn_prev');
    var target;
    if ($(window).width() > 960) {
        target = targetOffset - 200
    } else {
        target = targetOffset - 100
    }
    if (targetOffset > $(window).scrollTop() || ($(document).height() - inputsBottom) < ($(window).height() - 100)) {
        inputsWrapper.addClass('t862__inputsbox_hidden');
        setTimeout(function() {
            if ($(window).height() > $('.t-body').height()) {
                $('.t-tildalabel').animate({
                    opacity: 0
                }, 50)
            }
        }, 300)
    } else {
        $('html, body').animate({
            scrollTop: target
        }, 400);
        setTimeout(function() {
            inputsWrapper.addClass('t862__inputsbox_hidden')
        }, 400)
    }
    var successurl = form.data('success-url');
    if (successurl && successurl.length > 0) {
        setTimeout(function() {
            window.location.href = successurl
        }, 500)
    }
    prevBtn.hide()
}

function t862_lockScroll() {
    var body = $('body');
    if (!body.hasClass('t-body_scroll-locked')) {
        var bodyScrollTop = (typeof window.pageYOffset !== 'undefined') ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        body.addClass('t-body_scroll-locked');
        body.css('top', '-' + bodyScrollTop + 'px');
        body.attr('data-popup-scrolltop', bodyScrollTop)
    }
}

function t862_unlockScroll() {
    var body = $('body');
    if (body.hasClass('t-body_scroll-locked')) {
        var bodyScrollTop = $('body').attr('data-popup-scrolltop');
        body.removeClass('t-body_scroll-locked');
        body.css('top', '');
        body.removeAttr('data-popup-scrolltop');
        window.scrollTo(0, bodyScrollTop)
    }
}

function t862_showPopup(rec, form, quizQuestion, captureForm) {
    var popup = rec.find('.t-popup');
    var quiz = rec.find('.t862__quiz');
    popup.css('display', 'block');
    rec.find('.t-range').trigger('popupOpened');
    if (window.lazy == 'y') {
        t_lazyload_update()
    }
    setTimeout(function() {
        popup.find('.t-popup__container').addClass('t-popup__container-animated');
        popup.addClass('t-popup_show');
        if ($(window).width() > 640 && quiz.hasClass('t862__quiz_fixedheight')) {
            t862_setHeight(rec, form, quizQuestion, captureForm)
        }
        if ($(window).width() <= 640) {
            t862_setMobileHeight()
        }
        t862__showJivo(popup, '1', '1')
    }, 50);
    $('body').addClass('t-body_popupshowed t862__body_popupshowed');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream) {
        setTimeout(function() {
            t862_lockScroll()
        }, 500)
    }
    rec.find('.t-popup').click(function(e) {
        var windowWidth = $(window).width();
        var maxScrollBarWidth = 17;
        var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
        if (e.clientX > windowWithoutScrollBar) {
            return
        }
        if (e.target == this) {
            t862_closePopup(rec)
        }
    });
    rec.find('.t-popup__close').click(function() {
        t862_closePopup(rec)
    });
    rec.find('a[href*="#"]').click(function() {
        var url = $(this).attr('href');
        if (!url || url.substring(0, 7) != '#price:') {
            t862_closePopup(rec);
            if (!url || url.substring(0, 7) == '#popup:') {
                setTimeout(function() {
                    $('body').addClass('t-body_popupshowed')
                }, 300)
            }
        }
    });
    $(document).keydown(function(e) {
        if (e.keyCode == 27) {
            t862_closePopup()
        }
    })
}

function t862_closePopup(rec) {
    $('body').removeClass('t-body_popupshowed t862__body_popupshowed');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream) {
        t862_unlockScroll()
    }
    rec.find('.t-popup').removeClass('t-popup_show');
    t862__showJivo($('.t-popup'), '2147483647', '2147483648');
    setTimeout(function() {
        $('.t-popup').not('.t-popup_show').css('display', 'none')
    }, 300)
}

function t862_resizePopup(rec) {
    var div = rec.find('.t-popup__container').height();
    var win = $(window).height() - 120;
    var popup = rec.find('.t-popup__container');
    if (div > win) {
        popup.addClass('t-popup__container-static')
    } else {
        popup.removeClass('t-popup__container-static')
    }
}

function t862__showJivo(popup, indexMobile, indexDesktop) {
    if ($('._show_1e.wrap_mW.__jivoMobileButton').length != 0) {
        $('._show_1e.wrap_mW.__jivoMobileButton').css('z-index', indexMobile)
    }
    if ($('.label_39#jvlabelWrap').length != 0) {
        $('.label_39#jvlabelWrap').css('z-index', indexDesktop)
    }
}

function t862_sendPopupEventToStatistics(popupname) {
    var virtPage = 'tilda/popup/index.html';
    var virtTitle = 'Popup: ';
    if (popupname.substring(0, 7) == '#popup:') {
        popupname = popupname.substring(7)
    }
    virtPage += popupname;
    virtTitle += popupname;
    if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
        Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0)
    } else {
        if (ga) {
            if (window.mainTracker != 'tilda') {
                ga('send', {
                    'hitType': 'pageview',
                    'page': virtPage,
                    'title': virtTitle
                })
            }
        }
        if (window.mainMetrika > '' && window[window.mainMetrika]) {
            window[window.mainMetrika].hit(virtPage, {
                title: virtTitle,
                referer: window.location.href
            })
        }
    }
}