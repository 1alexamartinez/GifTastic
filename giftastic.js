// Initial array of topics
	var topic = ["Saved by the Bell", "Pokemon", "Nintendo 64", "Friends", "Backstreet Boys", "Britney Spears", "GameBoy", "The 90s"];

// display displayGif function re-renders the HTML to display the appropriate content
	function displayGif () {
		var topic = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=10&api_key=RPxQK6gdY7RI33Zyt9U3jnUf9aZOocKu";
		console.log("Artist: " + topic);
		console.log("queryURL: " + queryURL);

// AJAX call for the specific button being clicked 
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {

// div to hold all the gifs 
	dAll = $("<div>");

// For loop to append a button for each string in the array
	for (var i = 0; i < 10; i++) {

// div to hold the gif 
	dTag = $("<div class='gifs'>");

// Create div to hold and display the rating 
	dRating = $("<div>");
	dRating.append ("Rating:" + response.data[i].rating);

//Create div to hold and display the gif
	dGif = $("<div>");

	var image = $("<img class='gif' data-state='still'>");
		image.attr("src", response.data[i].images.fixed_height_still.url);
		image.attr("data-still", response.data[i].images.fixed_height_still.url);
		image.attr("data-animate", response.data[i].images.fixed_height.url)

	dGif.append(image)

			
//put the div dTag together
	dTag.append(dRating);
	dTag.append(dGif);
	dAll.append(dTag);

	}

		$("#gifDiv").html(dAll);

	}); // ends AJAX call

} // ends displayGif function


//Function to render buttons
	function renderButtons() {

//Empties the div
	$("#buttons-view").empty();

//Loops through the array of topics
	for (var i = 0; i < topic.length; i++) {
		var a = $("<button class='newTopic'>");
		a.attr("data-name", topic[i]);
		a.text(topic[i]);
		$("#buttons-view").append(a);
	}

} //end of renderButtons function


//Function for add new topic button
$("#add-topic").on("click", function(event) {

	event.preventDefault();
	var newTopic = $("#topic-input").val().trim();
	topic.push(newTopic);
	renderButtons();

}); // ends add new topic button


//  click event listener 
$(document).on("click", ".newTopic", displayGif);


//animate on click
$(document).on("click", ".gif", function() {

	var state = $(this).attr("data-state");
	var animateUrl = $(this).attr("data-animate");
	var stillUrl = $(this).attr("data-still");

	if (state === "still") {
		$(this).attr("src", animateUrl);
		$(this).attr("data-state", "animate");
	}

	if (state === "animate") {
		$(this).attr("src", stillUrl);
		$(this).attr("data-state", "still")
	}

}); // ends animate on click


//renders buttons on load
renderButtons();