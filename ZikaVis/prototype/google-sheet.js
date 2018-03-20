var $form = $('form#postComment'),
    url = 'https://script.google.com/macros/s/AKfycbyCpuPg6s5sqEAatoRYIRHygF-VV6Zx-PJU9pEAeXCrAQyrZkEx/exec'

$('#submit-form').on('click', function(e) {		
  e.preventDefault();
  var jqxhr = $.ajax({
    url: 'https://script.google.com/macros/s/AKfycbyCpuPg6s5sqEAatoRYIRHygF-VV6Zx-PJU9pEAeXCrAQyrZkEx/exec',
    method: "GET",
    dataType: "json",
    data: $form.serializeObject()
  }).success(
	  //console.log("Worked!");
    // do something
  );
});


function postToGoogleC(){
    var comment = $('#comment').val();
	var country = $('#country').val();
    var lat = $('#lat').val();
    var lng = $('#lng').val();
    if ((comment !== "") && (lat !== "") && (lng !== "")) {
        $.ajax({
            url: "https://docs.google.com/forms/d/e/1FAIpQLSe63rT_PcCjDCMebQ3ToqUU5TH9hacCR1Bcv76c-IY3oC_lZw/formResponse",
            data: {"entry.997428847" : comment, "entry.603752285" : lat, "entry.1307082079": lng, "entry.323787096":country},
            type: "POST",
            dataType: "xml",
            statusCode: {
                0: function (){

                    $('#comment').val("");
					$('#country').val("");
                    $('#lat').val("");
                    $('#lng').val("");
                    //Success message
                },
                200: function (){
                    $('#comment').val("");
					$('#country').val("");
                    $('#lat').val("");
                    $('#lng').val("");
                    //Success Message
                }
            }
        });
		//if(tempMarker!=undefined){tempMarker.closePopup();}
		updateTempMarkerC(comment)
		//setTimeout(retrieveFootnotes,3000)
    }
    else {
        //Error message
    }
};

function postToGoogleG(){
    var lat = $('#lat').val();
    var lng = $('#lng').val();
	var zoom = $('#zoom').val();
	var zoomLevel = $('#zoomLevel').val();
	var ucountry = $('#ucountry').val();
	var usubregion = $('#usubregion').val();
	var region = $('#region').val();
	var time = $('#time').val();
	//var type = $('.type:checked').val();
	var type = $('input[name="type"]:checked').map(function(){ return this.value; }).get();
	var pipeline = $('input[name="pipeline"]:checked').map(function(){ return this.value; }).get();
	var indicators = $('input[name="indicators"]:checked').map(function(){ return this.value; }).get();//$('#indicators').val();
	var stype = $('input[name="stype"]:checked').val();
	//var pipeline = $('.pipeline:checked').val();
	var how = $('input[name="how"]:checked').val(); 
	var certainty = $('input[name="certainty"]:checked').val(); 
	var description = $('#description').val();
	
	console.log(lat);
	console.log(lng);
	console.log(zoom);
	console.log(zoomLevel);
	console.log(ucountry);
	console.log(usubregion);
	console.log(region);
	console.log(time);
	console.log(how);
	console.log(type);
	console.log(pipeline);
	console.log(indicators);
	console.log(stype);
	console.log(description);
	console.log(certainty);
	
	
	var popupContent="<strong>Region: </strong>"+region+"<br>"+
	"<strong>Description: </strong>"+description+"<br>"+
	"<strong>Error type: </strong>"+stype+"<br>"+
	"<strong>Discrepancy type: </strong>"+type+"<br>"+
	"<strong>Affected indicators: </strong>"+indicators+"<br>"+
	"<strong>where in the pipeline: </strong>"+pipeline+"<br>"+
	"<strong>How should the values be adjusted: </strong> value(s) should be <strong>"+how+"</strong><br>";
	"<strong>Level of certainty around this error: </strong>"+certainty+"</strong><br>";
	
	
    if ((lat !== "") && (lng !== "") && (zoom !== "") /*&& (region !== "") && (time !== "") && (type !== "") && (indicators !== "") && (pipeline !== "") && (how !== "") && (description !== "")*/) {
        $.ajax({
            url: "https://docs.google.com/forms/d/e/1FAIpQLSdD5tynmE1ofq9brkhBgQt5xatoH0fAh07aaMK08V0hEkJpHQ/formResponse",
            data: { "entry.1332359340" : lat, 
					"entry.404697926": lng, 
					"entry.1302319013" : zoom,
					"entry.1940074961" : region,
					"entry.1323627979" : time,
					"entry.1701345902" : type.join(),
					"entry.1529505701" : indicators,
					"entry.1252844767" : pipeline.join(),
					"entry.271199962" : how,
					"entry.247808391" : description,
					"entry.97543607" : zoomLevel,
					"entry.806743707" : ucountry,
					"entry.1346257199" : usubregion,
					"entry.1805140761" : stype,
					"entry.1160354319": certainty,
					},
            type: "POST",
            dataType: "xml",
            statusCode: {
                0: function (){
					
                    $('#lat').val("");
                    $('#lng').val("");
					$('#zoom').val("");
					$('#region').val("");
					$('#time').val("");
					$('input[name="type"]:checked').val("");
					$('#indicators').val("");
					$('input[name="pipeline"]:checked').val("");
					$('input[name="how"]:checked').val("");
					$('#description').val("");
                    //Success message
                },
                200: function (){
                    $('#lat').val("");
                    $('#lng').val("");
					$('#zoom').val("");
					$('#region').val("");
					$('#time').val("");
					$('input[name="type"]:checked').val("");
					$('#indicators').val("");
					$('input[name="pipeline"]:checked').val("");
					$('input[name="how"]:checked').val("");
					$('#description').val("");
                    //Success Message
                }
            }
        });
		//if(tempMarker!=undefined){tempMarker.closePopup();}
		updateTempMarkerAll(popupContent)
		//setTimeout(retrieveFootnotes,3000)
    }
    else {
		
        //Error message
    }
};

function postToGoogleAll(){
    var comment = $('#comment').val();
	var country = $('#country').val();
    var lat = $('#lat').val();
    var lng = $('#lng').val();
    if ((comment !== "") && (lat !== "") && (lng !== "")) {
        $.ajax({
            url: "https://docs.google.com/forms/d/e/1FAIpQLSe63rT_PcCjDCMebQ3ToqUU5TH9hacCR1Bcv76c-IY3oC_lZw/formResponse",
            data: {"entry.997428847" : comment, "entry.603752285" : lat, "entry.1307082079": lng, "entry.323787096":country},
            type: "POST",
            dataType: "xml",
            statusCode: {
                0: function (){

                    $('#comment').val("");
					$('#country').val("");
                    $('#lat').val("");
                    $('#lng').val("");
                    //Success message
                },
                200: function (){
                    $('#comment').val("");
					$('#country').val("");
                    $('#lat').val("");
                    $('#lng').val("");
                    //Success Message
                }
            }
        });
		//if(tempMarker!=undefined){tempMarker.closePopup();}
		updateTempMarkerG(comment)
		//setTimeout(retrieveFootnotes,3000)
    }
    else {
        //Error message
    }
};





//https://docs.google.com/spreadsheets/d/e/2PACX-1vR0s8uAHDAqWdg1Kb3iK4rFbFuXOW2IjVtD3WV_RLSb5PDfvc0f2UA8YIbbn3ZYq3ve8AooO-nuIwjY/pubhtml&output=csv
//https://docs.google.com/spreadsheets/d/1sIihpy3w0_-PG5l7JMVjlygtb60A50UWvTpCKqmj-R0/edit#gid=0