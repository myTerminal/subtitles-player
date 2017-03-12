/* global $, setTimeout */

var SubtitlesPlayer = function (body, element, subtitlesData, options) {
    var subtitleNumber = 0,
        title = subtitlesData.title,

        init = function () {
            switchToPlaybackMode();

            bindEvents();

            addTitle();
            addLastSubtitle();

            renderSubtitles();
            showTitle();
        },

        autoShowNextSubtitle = function () {
            if (subtitlesData.subtitles[subtitleNumber]) {
                setTimeout(function () {
                    nextSubtitle();
                    autoShowNextSubtitle();
                }, subtitlesData.subtitles[subtitleNumber].time);
            }
        },

        switchToPlaybackMode = function () {
            body.addClass("playback-mode");
        },

        bindEvents = function () {
            body.find("#play-button").click(function () {
                $(this).hide();
                autoShowNextSubtitle();
            });
        },

        showTitle = function () {
            $(".subtitle").first().addClass("title visible");
        },

        switchToSetupMode = function () {
            body.removeClass("playback-mode");
        },

        addTitle = function () {
            subtitlesData.subtitles.unshift({
                text: title,
                time: 5000
            });
        },

        renderSubtitles = function () {
            subtitlesData.subtitles.forEach(function (s, i) {
                element.append("" +
                               "<div class='subtitle'>" +
                               "  <span>" + s.text + "</span>" +
                               "</div>");
            });
        },

        addLastSubtitle = function () {
            subtitlesData.subtitles.push({
                text: "Thanks for Watching!",
                time: 5000
            });
        },

        nextSubtitle = function () {
            if (subtitleNumber !== $("div.subtitle").length) {
                subtitleNumber++;
                showSubtitle();
            }
        },

        showSubtitle = function () {
            $("div.subtitle").removeClass("visible")
                .eq(subtitleNumber)
                .addClass("visible");
        };

    options = options || {};
    init();

    return {
        init: init,
        switchToPlaybackMode: switchToPlaybackMode,
        switchToSetupMode: switchToSetupMode,
        nextSubtitle: nextSubtitle
    };
};
