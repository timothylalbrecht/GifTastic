// Where the magic happens

var heros = ["superman", "batman", "spiderman", "wonder woman", "the hulk", "ironman"];

function printButtons() {

    $("#button-div").empty();

    for(i=0; i < heros.length; i++) {
        var heroButton = $("<button>");
        heroButton.addClass("hero-button hero-button-color");
        heroButton.attr("data-name", heros[i]);
        heroButton.text(heros[i]);
        $("#button-div").append(heroButton);
    }
};

function getGifs() {

    var hero = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=46KcVyEWb5mvpD90w7OcfGpKJIH7IgxB&rating=PG&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            $("#gif-div").empty();
            
            for(var i =0; i<response.data.length; i++) {

                console.log("Still Image: " + response.data[i].images.fixed_height_still.url);
                console.log("Animate Image: " + response.data[i].images.fixed_height.url);
                console.log("Rating: " + response.data[i].rating.toUpperCase());
                console.log("-------------------------------");

                var gifDiv = $("<div>");
                var p = $("<p>").text("Rated: " + response.data[i].rating.toUpperCase());
                

                var gifs = $("<img>");
                gifs.attr("src", response.data[i].images.fixed_height_still.url);
                gifs.addClass("gif");
                gifs.attr("data-still", response.data[i].images.fixed_height_still.url);
                gifs.attr("data-animate", response.data[i].images.fixed_height.url);
                gifs.attr("data-state", "still");


                gifDiv.append(p);
                gifDiv.append(gifs);
                

                $("#gif-div").append(gifDiv);
            }
      });
    }

$(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});


$("#add-superhero").on("click", function(event) {
    event.preventDefault();
    var newHero = $("#superhero-input").val().trim().toLowerCase();
    heros.push(newHero);
    console.log(heros)
    printButtons();
});


$(document).on("click", ".hero-button", getGifs);

printButtons();
