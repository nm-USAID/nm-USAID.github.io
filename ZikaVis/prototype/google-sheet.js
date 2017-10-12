var $form = $('form#postComment'),
    url = 'https://script.google.com/macros/s/AKfycbyCpuPg6s5sqEAatoRYIRHygF-VV6Zx-PJU9pEAeXCrAQyrZkEx/exec'

$('#submit-form2').on('click', function(e) {		
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