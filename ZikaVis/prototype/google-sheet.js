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