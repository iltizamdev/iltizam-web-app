$(document).ready(function() {
    const token = localStorage.getItem('token');
    
    function fetchProfileData() {
        return $.ajax({
            url: `${baseURL}/auth/myProfile`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
    
    function fetchCountryCodes() {
        return $.ajax({
            url: `${baseURL}/auth/getCountryCodes`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
    
    $.when(fetchProfileData(), fetchCountryCodes()).done(function(profileResponse, countryCodesResponse) {
        const profileData = profileResponse[0].data;
        const countryCodes = countryCodesResponse[0].data;
        const countryName = countryCodes.find(country => country.code === profileData.countryCode)?.name || profileData.countryCode;
        const profileImageSrc = profileData.profileImage ? profileData.profileImage : '../images/avatar-default.svg';
        const settingsUrl = `/users/settings.html?userId=${profileData.userId}`;
        const phoneCode = profileData.phoneCode;
        const phoneNumber = profileData.phoneNumber;
        
        $('#profileId').attr('href', settingsUrl);
        $('#avatarProfile').attr('src', profileImageSrc);
        $('#countryProfile').text(countryName);
        $('#emailProfile').attr('href', `mailto:${profileData.email}`).text(profileData.email);
        $('#phoneCodeProfile').text(phoneCode);
        $('#phoneNumberProfile').text(phoneNumber);
        $('a[href^="tel:"]').attr('href', `tel:${phoneCode}${phoneNumber}`);
        $('#profilefirstName').text(profileData.firstName);
        $('#profilelastName').text(profileData.lastName);
    
    }).fail(function(err) {
        console.error('Error fetching data:', err);
    });
});
