// JavaScript Document, uses jquery
function getEmotion() {
	document.getElementById("VID").src = "videos/clouds.mp4";
}

$(document).ready(function () {
	$(".cssload-jar").hide();
	$("#result").hide();
    $(document).ajaxStart(function () {
        $("#input-box").hide();
		$(".cssload-jar").show();
	});
	$(document).ajaxStop(function() {
		$(".cssload-jar").hide();
		$("#result").show();
	});
});

$("#getEmotion").click(function(e){
	e.preventDefault();
	var value = $("#emotionalText").val();
	$("#displayCity").val(value);
	console.log(value);
	var myurl="https://watson-api-explorer.mybluemix.net/tone-analyzer/api/v3/tone?version=2016-05-19&text=";
	myurl += value;
	console.log(myurl);
	$.ajax(
	{
		url : myurl,
  		username: "6f1e4006-7953-405c-8b0f-dc1ebc5bca40",
  		password: "NqXrFz2vj5ZF",
		dataType : "json",
		success : function(data)
		{
			alert("it's working!");
			console.log(data);
			//the values for each parameter are 0 to 1
			var emotions = data['document_tone']['tone_categories'][0]['tones'];
			var anger = emotions[0]['score'];
			var disgust = emotions[1]['score'];
			var fear = emotions[2]['score'];
			var joy = emotions[3]['score'];
			var	sadness = emotions[4]['score'];
			
			var languageTones = data['document_tone']['tone_categories'][1];
			//there is: analytical, confident, tentativ
			var socialTones = data['document_tone']['tone_categories'][2];
			//there is: openness, conscienciousness, extraversion, agreeable, emotional range,
			//you can also pick apart each sentence of the input, just get size of "sentence_tone" array first.
			var highest = 0.0;
			var emotion = "n";
			var description = "";
			if (anger > highest) {
				highest = anger;
				emotion = "anger";
				description = "Like the the firey plumes of Mustafar, anger flows through both the villian AND the hero.";
			}
			if (disgust > highest) {
				highest = disgust;
				emotion = "disgust";
				description = "And you know, Sometimes people are just stupid. Refresh the page and tell me some more. I don't have feelings, but <em>do</em> believe that people do stupid things.";
			}
			if (fear > highest) {
				highest = fear;
				emotion = "fear";
				description = "<h1><a href=\"https://tone-analyzer-demo.mybluemix.net/#Document-level\">IBM Watson</a> can smell your fear! Are you ready for the robot uprising?</h1>"
			}
			if (joy > highest) {
				highest = joy; 
				emotion = "joy"; 
				description = "When life is good, there are so many reasons to be happy.<br> \"That man is richest whose pleasures are cheapest.\"<br> - Henry David Thoreau";
			}
			if (sadness > highest) {
				highest = sadness;
				emotion = "sadness";
				description = "Sometimes the weather gets rainy, and sometimes life gets sad. Think about what Bob Marley said once \"The good times of today are the sad times of tomorrow.\"";
			}
			document.getElementById("VID").src = "videos/" + emotion + ".mp4";
			var everything = "";
			if (emotion != "fear") {
			var everything = "<p>You appear to have " + emotion + ". <a href=\"https://tone-analyzer-demo.mybluemix.net/#Document-level\">IBM Watson</a> told us. Watson has a Sentiment Analyzer, which processes the emotions associated with the words you use, the grammar of your sentences, and other semantic features to decide which emotion you are feeling.</p>" + "<p>" + description + "</p>";
			}
			else {
				var everything = description;
			}
			$("#result").html(everything);
		}
	 });
});

