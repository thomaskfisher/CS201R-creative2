// JavaScript Document, uses jquery
function getEmotion() {
	document.getElementById("VID").src = "videos/clouds.mp4";
}

$("#getEmotion").click(function(e){
	e.preventDefault();
	var value = $("#emotionalText").val();
	$("#displayCity").val(value);
	console.log(value);
	var myurl="https://gateway.watsonplatform.net/tone-analyzer/api/v3";
	myurl += value;
	myurl += ".json";
	console.log(myurl);
	$.ajax(
	{
		url : myurl,
		dataType : "json",
		success : function(data)
		{
			console.log(data);
			var location = data['location']['city'];
			var temp_string = data['current_observation']['temperature_string'];
			var current_weather = data['current_observation']['weather'];
			var everything = "<ul>";
			everything += "<li>Location: "+location;
			everything += "<li>Temperature: "+temp_string;
			everything += "<li>Weather: "+current_weather;
			everything += "</ul>";
			$("#weather").html(everything);
		}
	 });
});