'use strict';

$(document).ready(function () {
    var toolbox = $(document.body),
        height = toolbox.height(),
        scrollHeight = toolbox.get(0).scrollHeight;

    toolbox.off("mousewheel").on("mousewheel", function (event) {
        var blockScrolling = this.scrollTop === scrollHeight - height && event.deltaY < 0 || this.scrollTop === 0 && event.deltaY > 0;
        return !blockScrolling;
    });
    window.magHetLuikOpen = true;
    console.log(window.magHetLuikOpen);
    var url = "https://api.nasa.gov/planetary/apod?api_key=Cx60f5lFRtpTvqMKW0BMbpxpmoMZdcojFf69str1";


    var card = $("apod_vid_id");
    $.getJSON(url, function (data) {
        console.log(data);

        //https://api.nasa.gov/#live_example
        $.ajax({
            url: url,
            success: function (result) {

                if ("copyright" in result) {
                    $("#copyright").text("Image Credits: " + result.copyright);
                }
                else {
                    $("#copyright").text("Image Credits: " + "Public Domain");
                }

                if (result.media_type == "video") {
                    $("#apod_img_id").css("display", "none");
                    $("#apod_vid_id").attr("src", result.url);
                    card = $("apod_vid_id");
                }
                else {
                    $("#apod_vid_id").css("display", "none");
                    $("#apod_img_id").attr("src", result.url);
                    $("#fullImage").attr("href", result.url);
                    console.log($("#fullImage"));

                    card = $("apod_img_id");
                }
                console.log("############################");
                console.log(result);
                $("#reqObject").text(url);
                $("#apod_explaination").text(result.explanation);
                $("#apod_title").text(result.title);
            }
        });
    });
    var formulier = $('#formulier');
    var text = "Hello there";
    var text2 = "Welcome to Photo of the day inspired by Nasa";
    var tex3 = "But first let's make a wish and throw it in space...";
    var tex4 = "Ready to go, let's go in space!";
    var delay = 60;
    var elem = $("#text");
    var displayWish = $('#displayWish');
    var ready = 0;
    var addTextByDelay = function (text, elem, delay) {
        elem.fadeIn();
        if (text.length > 0) {
            //append first character
            elem.append(text[0]);
            setTimeout(
                function () {
                    //Slice text by 1 character and call function again
                    addTextByDelay(text.slice(1), elem, delay);
                }, delay
            );
        }
        else if (text.length == 0) {
            ready++;
        }
    };

    function fixTextAndScrollDown() {
        addTextByDelay(text, elem, delay);
        setTimeout(function () {
            elem.fadeOut('slow').empty()
        }, 2000);
        setTimeout(function () {
            console.log("eerste regel");
            addTextByDelay(text2, elem, delay)
        }, 4000);
        setTimeout(function () {
            console.log("hier komt de 2de tekst");
            elem.fadeOut('slow').empty()
        }, 7000);
        setTimeout(function () {
            console.log("text 3 moet nu verschijnen");
            addTextByDelay(tex3, elem, delay)
        }, 10000);
        setTimeout(function () {
            formulier.fadeIn('slow');
            console.log("het formulier is zichtbaar");
        }, 14000)
    }

    fixTextAndScrollDown();



    function postWishes() {
        var wish = $('#wishText').val();
        if (wish != "") {
            var data = '{"wens":"' + wish + '"}';
            console.log(data);
            var xhttp = new XMLHttpRequest();
            xhttp.open("post", "https://dashboardcreate.azurewebsites.net/api/dashboard/addWish", true);
            xhttp.send(data);
        }

    }

    var i = 15;

    function sendToSpace() {
        setTimeout(function () {
            $("#displayWish").css({
                fontSize: i
            });
            i--;
            if (i > -1) {
                sendToSpace();
            }
            if (i == 0) {
                setTimeout(function () {
                    addTextByDelay(text5, toggletext, delay);
                }, 1000);
            }
        }, 70)
    }

    var toggletext = $('#toggleText');
    var text5 = "Our mission is complete and your wish is safe in space. Toggle the red button to reveal Today's secret";
    var value = $("#wishText").val();

    var teller = 0;
    $('#wishButton').click(function () {
        window.magHetLuikOpen = true;
        teller++;
        console.log("# of clicks: " + teller);
        console.log($('#wishText').val());
        postWishes();
        // Submitform($('#wishText'));
        setTimeout(function () {
            elem.fadeOut('slow').empty();
            formulier.fadeOut('slow');
        }, 2000);


        setTimeout(function () {
            console.log("4de regel");

            addTextByDelay(tex4, elem, delay)
        }, 4000);

        setTimeout(function () {
            $(document).scrollTop($(document).height(), 2000);
        }, 8000);

        // setTimeout(function () {
        displayWish.text($('#wishText').val());
        // }, 9000);

        setTimeout(function () {
            sendToSpace();

        }, 9000);


    });

    var uitleg = $('.holder__toggleSwitch__text');
    var copyright = $('#copyright');
    var explaination = $('#apod_explaination');
    var title = $('#apod_title');
    var counter = 1;
    $('.checkbox').click(function () {
        counter++;
        console.log(counter);
        if (counter % 2 == 0) {
            uitleg.text('show data');
            copyright.fadeOut('slow');
            explaination.fadeOut('slow');
            title.fadeOut('slow');
        }
        else {
            uitleg.text('hide data');
            copyright.fadeIn('slow');
            explaination.fadeIn('slow');
            title.fadeIn('slow');
        }
    });
    $('html').bind('keypress', function (e) {
        if (e.keyCode == 13) {
            return false;
        }
    });
});








