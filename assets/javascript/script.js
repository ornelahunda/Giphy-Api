$(document).ready(function () {

    // Emotions array is going to hold emotions Giphy
    var emotions = ["excited", "happy", "confused", "hungry", "awkward", "relaxed"];
    var emotion;
    //Creating functions that I am going to be using


    // Function to display emotion buttons 
    function displayButtons() {
        // remove previous user input
        $("#buttonsDisplay").empty();

        for (var i = 0; i < emotions.length; i++) {
            var gifBtn = $("<button>");
            gifBtn.addClass("Emotion");
            gifBtn.addClass("btn btn-primary btn-emotions");
            gifBtn.attr("data-name", emotions[i]);
            gifBtn.text(emotions[i]);
            $("#buttonsDisplay").append(gifBtn);
        }
    }

    // Listening to a click event on add button and on clisk execute function
    $(document).on("click", "#addButton", function () {
        console.log("add button clicked");
        var emotion = $("#emotion-input").val().trim();
        if (!emotion) {
            alert("Please enter emotion");
        } else {
            emotions.push(emotion);
         displayButtons();
        }

        event.preventDefault();
        // call the following function to update the buttons view section


    });
    // Function to remove last emotion from the array


    $("#removeButton").on("click", function () {
        emotions.pop();
        displayButtons();
        return false;
    });

    $(document).on("click", ".btn-emotions", displayGifs);
    // Function that displays all of the gifs
    function displayGifs() {
        var emotion = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            emotion + "&api_key=03Ym4PwOuCDcI8LSvXdNGMoKzyqJOS9m";

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function (response) {

            $("#gifsDisplay").empty();
            //save the results in a variable
            var results = response.data;
            if (results == "") {
                alert("There isn't a gif for the selected button");
            }
            for (var i = 0; i < 10; i++) {

                var gifDiv = $("<div style='float:left'>");
                gifDiv.addClass("gifDiv");
                // rating of gif
                var rating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(rating);
                // gif images
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
                gifImage.attr("data-still", results[i].images.fixed_height_small_still.url); // still image
                gifImage.attr("data-animate", results[i].images.fixed_height_small.url); // animated image
                gifImage.attr("data-state", "still"); // set the image state
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                // still image of gif
                // adding div of gifs to gifsView div
                $("#gifsDisplay").prepend(gifDiv);
            }
        });
    }





    displayButtons();
    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});