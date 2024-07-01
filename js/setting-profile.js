$(document).ready(function() {
    function getQueryParams() {
        const params = {};
        const queryString = window.location.search.substring(1);
        const regex = /([^&=]+)=([^&]*)/g;
        let match;
        while (match = regex.exec(queryString)) {
            params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
        }
        return params;
    }

    const queryParams = getQueryParams();
    const userId = queryParams.userId;
    if (!userId) {
        console.error('No userId found in URL');
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found in localStorage');
        return;
    }

    function populateProfileForm(data) {
        $('#firstName-setting').val(data.firstName);
        $('#lastName-setting').val(data.lastName);
        $('#email-setting').val(data.email);
        $('#selectedPhoneCode').text(data.phoneCode);
        $('#phoneNumber-setting').val(data.phoneNumber);
        $('#selectedCountryCode').text(data.countryCode);
        $('#selectedCountryCode').attr('countrycode', data.countryCode);
    }

    $.ajax({
        url: baseURL + '/auth/myProfile?userId=' + userId,
        type: 'GET',
        dataType: 'json',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function(response) {
            if (!response.success) {
                console.error('Error retrieving profile data');
                return;
            }

            const data = response.data;
            populateProfileForm(data);
        },
        error: function(xhr, status, error) {
            console.error('AJAX error:', error);
        }
    });

    $('#editProfile').click(function(event) {
        event.preventDefault();
        $('.popup-input_field').removeClass('is-disabled');
        $('.country-code_toggle').removeClass('is-disabled');
        $('.form-dropdown_toggle').removeClass('is-disabled');
        $('#profileUpdate').removeClass('is-disabled');
    });

    $('#profileUpdate').click(function(event) {
        event.preventDefault();
        if ($(this).hasClass('is-disabled')) return;

        const updatedProfile = {
            firstName: $('#firstName-setting').val(),
            lastName: $('#lastName-setting').val(),
            email: $('#email-setting').val(),
            phoneCode: $('#selectedPhoneCode').text(),
            phoneNumber: $('#phoneNumber-setting').val(),
            countryCode: $('#selectedCountryCode').attr('countrycode')
        };

        localStorage.setItem('profileData', JSON.stringify(updatedProfile));

        const storedData = JSON.parse(localStorage.getItem('profileData'));
        populateProfileForm(storedData);
        
        $('.popup-input_field').addClass('is-disabled');
        $('.country-code_toggle').addClass('is-disabled');
        $('.form-dropdown_toggle').addClass('is-disabled');
        $('#profileUpdate').addClass('is-disabled');
    });
});