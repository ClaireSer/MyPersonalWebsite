
$(function() { 
  
  $('#my-contact-form').on('submit', function(ev) {
    // Prevent the form from actually submitting
    ev.preventDefault();

    // Send it to the server
    $.post({
        url: '/',
        dataType: 'json',
        data: $(this).serialize(),
        success: function(response) {
          $('.form-message').removeClass('error-message').addClass('success-message');
          $('.form-message').text(response.message);
        },
        error: function(jqXHR) {
          // The response body will be an object containing the following keys:
          // - `message` – A high level message for the response
          // - `submission` – An object containing data from the attempted submission
          // - `errors` – An object containing validation errors from the submission, indexed by attribute name
          $('.form-message').removeClass('success-message').addClass('error-message');
          const response = jqXHR.responseJSON;
          $('.form-message').text(response.message);
          if (response.errors) {
            $('.form-message').append('<br>');
            $.each(response.errors, function( key, value ) {
              $('.form-message').append('<br>' + value);
            });
          }
        }
    });
  });

});
