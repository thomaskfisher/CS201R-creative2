// JavaScript Document, uses jquery
function getEmotion() {
	document.getElementById("VID").src = "videos/clouds.mp4";
}

$(document).ready(function () {
	$(".cssload-jar").hide();
    $(document).ajaxStart(function () {
        $("#input-box").hide();
		$(".cssload-jar").show();
	});
	$(document).ajaxStop(function() {
        $("#input-box").show();
		$(".cssload-jar").hide();
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
			var emotions = data['document_tone']['tone_categories'][0]
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
			$("#result").html(everything);
		}
	 });
});

