$(document).ready(function() {
    $('#wf-form-Contact-Form').on('submit', function(e) {
        e.preventDefault();

        var formData = {
            firstName: $('#firstName1').val(),
            lastName: $('#lastName1').val(),
            email: $('#email1').val(),
            phoneCode: $('#selectedPhoneCode1').text(),
            phoneNumber: $('#phoneNumber1').val(),
            dateOfBirth: $('#date1').val(),
            country: $('#selectedCountryCode1').text(),
            city: $('#city').val(),
            message: $('#message1').val()
        };

        $.ajax({
            type: 'POST',
            url: '/php/volunteer-form.php',
            data: formData,
            success: function(response) {
                if (response === 'success') {
                    $('#response-message').show();
                    $('#error-message').hide();
                    $('#wf-form-Contact-Form')[0].reset();
                } else {
                    $('#response-message').hide();
                    $('#error-message').text(response).show();
                }
            },
            error: function(xhr) {
                var errorMsg = xhr.responseText ? xhr.responseText : "An error occurred. Please try again.";
                $('#response-message').hide();
                $('#error-message').text(errorMsg).show();
            }
        });
    });
});
