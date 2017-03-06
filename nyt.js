var apiKey = "&api-key=0a156cdac7664279a87c57512ec0bbe7";
var q;
var startYear = "&begin_date=";
var endYear = "&end_date=";
var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
var number;

//click events
$(document).on('click', '#runSearch', getArticle);
$(document).on('click', '#clearAll', clearResults);

function getArticle(){
	q = "?q="+$('#searchTerm').val().trim();
	queryURL+= q; 
	console.log(queryURL);

	//how many articles are we running
	number = $('#numRecordsSelect').val().trim();

	//add start year if using
	if($('#startYear').val().trim() != ""){
		startYear += $('#startYear').val().trim();
		startYear += "0101";
		queryURL+=startYear;
		console.log(startYear);
	}
	//add end year if using	
	if($('#endYear').val().trim() !=""){
		endYear += $('#endYear').val().trim();
		endYear += "1231";
		queryURL+=endYear; 
		console.log(endYear);
	}
	// add api key
	queryURL+= apiKey;
	console.log(queryURL);
	$('#articleSection').empty();

	//appends to #articleSection
    $.ajax({
    	url: queryURL, 
    	method: 'GET'
    }).done(function(response) {
  		for(var i = 0; i < number; i++){
  			$('#articleSection').append("<div class ='well' id ='articleWell-'"+i+"><h1>"+response.response.docs[i].headline.main+"</h1><p>"+response.response.docs[i].byline.original+"</p>"+"<p>"+response.response.docs[i].abstract+"</p><p>Read more at: </p><a href ='"+response.response.docs[i].web_url+"'>"+response.response.docs[i].web_url+"</a></div>");  			
  		}
    });
    queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
return false; 
}

//clears everything ..... remember to clear everything!
function clearResults(){
	$('#searchTerm').val("");
	$('#startYear').val("");
	$('#endYear').val("");
	$('#numRecordsSelect').val("5");
	$('#articleSection').empty();
}

