function getColorFromScore(score) {
	if(score >= 75) {
		return '#00ff00'; //green
	}
	else if(score < 60) {
		return '#ff0000'; //red
	}
	else {
		return '#ffff00'; //yellow
	}
}

function getScore(url, elem) {
	console.log(url);

	GM_xmlhttpRequest({
		method : "GET",
		url : url,
		onload : function(response) {
			var responseXML = null;
			// Inject responseXML into existing Object (only appropriate for XML content).
			if (!response.responseXML) {
				responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
			}

			var parsed = $.parseHTML(response.responseText);

			parsed = $('<div />').append(parsed);

			score = parsed.find('.first_result').find('.metascore_w').text();
			console.log(score);
			console.log(elem);
			color = getColorFromScore(parseInt(score.trim()));
			$(elem).append("<div class='metacritic subtitle' style='color:" + color + "'>" + score + "</div>");
		}
	});
}