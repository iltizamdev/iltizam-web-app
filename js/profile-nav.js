$(document).ready(function() {
    const token = localStorage.getItem('token');

    $.ajax({
        url: baseURL + '/auth/myProfile',
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
            ['#firstName', '#firstName1'].forEach(id => $(id).text(data.firstName));
            ['#lastName', '#lastName1'].forEach(id => $(id).text(data.lastName));

            const profileUrl = `/users/profile.html?userId=${data.userId}`;
            const settingsUrl = `/users/settings.html?userId=${data.userId}`;
            ['#userId', '#userId1'].forEach(id => $(id).attr('href', profileUrl));
            ['#userSetting', '#userSetting1'].forEach(id => $(id).attr('href', settingsUrl));
        },
        error: function(xhr, status, error) {
            console.error('AJAX error:', error);
        }
    });
});
