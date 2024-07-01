var pagenum = 1
var total_pages = 0

getDonations(pagenum)

/* GET FILTER */
$.ajax({
    url: baseURL + '/donation/getFilterOptions',
    type: 'get',
    success: function(response){
        if(response.success === true){
            $('#sort-location-list').append(`<a href="#" class="sort-link select-location w-dropdown-link" onclick="filterLocation('all')">All</a>`)
            for (let l = 0; l < response.data.location.length; l++) {
                var locationName = response.data.location[l]
                $('#sort-location-list').append(`<a href="#" class="sort-link select-location w-dropdown-link" onclick="filterLocation('${ locationName }')">${ locationName }</a>`)
            }

            $('#sort-category-list').append(`<a href="#" class="sort-link select-category w-dropdown-link" onclick="filterCategory('all')">All</a>`)
            for (let c = 0; c < response.data.category.length; c++) {
                var categoryName = response.data.category[c]
                $('#sort-category-list').append(`<a href="#" class="sort-link select-category w-dropdown-link" onclick="filterCategory('${ categoryName }')">${ categoryName }</a>`)
            }

            $('#sort-by-list').append(`<a href="#" class="sort-link select-sort w-dropdown-link" onclick="filterSort('all')">All</a>`)
            for (let s = 0; s < response.data.sortBy.length; s++) {
                var sortName = response.data.sortBy[s]
                $('#sort-by-list').append(`<a href="#" class="sort-link select-sort w-dropdown-link" onclick="filterSort('${ sortName }')">${ sortName }</a>`)
            }
        }
    }
})

/* Get Donations */
function getDonations(pagenum){
    $.ajax({
        url: baseURL + '/donation/list',
        type: 'get',
        data: {
            page: pagenum,
            limit: 12,
            location: decodeURIComponent(getUrlParameter('location')),
            category: decodeURIComponent(getUrlParameter('category')),
            sortBy: decodeURIComponent(getUrlParameter('sort'))
        }, success: function(response){
            if(response.success === true){
                if(getUrlParameter('location')){
                    $('#selectedlocation-sorter').addClass('is-active')
                    $('#selectedlocation').text('Location : ' + decodeURIComponent(getUrlParameter('location')))
                }

                if(getUrlParameter('category')){
                    $('#selectedcategory-sorter').addClass('is-active')
                    $('#selectedcategory').text('Category : ' + decodeURIComponent(getUrlParameter('category')))
                }

                if(getUrlParameter('sort')){
                    $('#selectedsortby-sorter').addClass('is-active')
                    $('#selectedsortby').text('Sort By : ' + decodeURIComponent(getUrlParameter('sort')))
                }

                $('.donation-list').empty()
                for (let d = 0; d < response.data.length; d++) {
                    var donationId = response.data[d].donationId
                    var title = response.data[d].title
                    var image = response.data[d].image
                    var location = response.data[d].location
                    var targetedFund = response.data[d].targetedFund
                    var collectedFund = response.data[d].collectedFund
                    var category = response.data[d].category
                    var story = response.data[d].story
                    var endDate = response.data[d].endDate
                    var percentage = (collectedFund / targetedFund) * 100 + '%'
                    var daysLeft = calculateDaysLeft(endDate)
  
                    var labelTag = '';
                    if (category) {
                        var parsedCategory = JSON.parse(category);
                        for (let l = 0; l < parsedCategory.length; l++) {
                            labelTag += `<div class="label-tag">${parsedCategory[l]}</div>`;
                        }
                    } 
            
                    var formattedFund = parseFloat(collectedFund).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    });

                    $('.donation-list').append(`<a href="${ siteURL }/users/donation-details.html?id=${ donationId }" class="donation-item w-inline-block">
                    <img
                        src="${ image }" loading="lazy" alt="${ title }" class="donation-item_image">
                        <div class="donation-content">
                        <div class="donation-top_detail">
                            <div class="text-icon_wrap is-narrow">
                                <img src="../images/map-icon-grey.svg" alt="Icon" class="icon-embed-xsmall">
                                <div class="donation-location">${ location }</div>
                            </div>
                            <div class="enddate">${ daysLeft } Days Left</div>
                        </div>
                        <div class="label-tag_wrap">${ labelTag }</div>
                        <h2 class="heading-xsmall text-weight-semibold text-lineheight-normal">${ title }</h2>
                        </div>
                        <div class="donation-card_bar-wrap">
                        <div class="donation_bar">
                            <div class="donation-bar_active" style="width: ${ percentage };"></div>
                        </div>
                        <div class="margin-top margin-custom3">
                            <div class="text-size-small text-color-light3">Collected <span class="collectedfund">${ formattedFund }</span></div>
                        </div>
                        </div>
                    </a>`)
                }

                createpagination(pagenum, response.totalPage)
            }
        }
    })
}

/* Other Function */
function filterLocation(location){
    (location === 'all') ? addParamsToUrl({location: ''}) : addParamsToUrl({location: encodeURIComponent(location)})
}

function filterCategory(category){
    (category === 'all') ? addParamsToUrl({category: ''}) : addParamsToUrl({category: encodeURIComponent(category)})
}

function filterSort(sort){
    (sort === 'all') ? addParamsToUrl({sort: ''}) : addParamsToUrl({sort: encodeURIComponent(sort)})
}

function addParamsToUrl(params){
    var url = new URL(currentURL)
    params.location ? url.searchParams.set('location', params.location) : ((params.location === '') ? url.searchParams.delete('location') : null)
    params.category ? url.searchParams.set('category', params.category) : ((params.category === '') ? url.searchParams.delete('category') : null)
    params.sort ? url.searchParams.set('sort', params.sort) : ((params.sort === '') ? url.searchParams.delete('sort') : null)
    location.href = url.href
}

function createpagination(pagenum, total_pages){
    var paginationWrap = $('.pagination-wrap').empty()

    if (pagenum > 1) {
        paginationWrap.append(`<div class="pagination previous" onclick="getDonations(${ pagenum - 1 })" style="cursor: pointer">
            <div class="icon-embed-custom w-embed">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6668 9.37502C17.012 9.37502 17.2918 9.65484 17.2918 10C17.2918 10.3452 17.012 10.625 16.6668 10.625H8.9585V15C8.9585 15.2528 8.80622 15.4807 8.57267 15.5774C8.33913 15.6742 8.0703 15.6207 7.89156 15.442L2.89155 10.442C2.77434 10.3247 2.7085 10.1658 2.7085 10C2.7085 9.83426 2.77434 9.67529 2.89155 9.55808L7.89155 4.55808C8.0703 4.37933 8.33913 4.32586 8.57267 4.42259C8.80622 4.51933 8.9585 4.74723 8.9585 5.00002L8.9585 9.37502H16.6668Z"fill="#5D5D5D"></path>
                </svg>
            </div>
            <a href="#">Previous</a>
        </div>`)
    }

    for (var i = Math.max(1, pagenum - 2); i <= Math.min(total_pages, pagenum + 2); i++) {
        var isActive = i === pagenum ? ' is-active' : ''
        var isDisabled = i === pagenum ? ' disabled' : ''
        paginationWrap.append(`<div class="pagination${ isActive }" onclick="getDonations(${ i })"${ isDisabled } style="cursor: pointer">
            <a href="#">${ i }</a>
        </div>`)
    }

    if (pagenum < total_pages) {
        paginationWrap.append(`<div class="pagination next" onclick="getDonations(${ pagenum + 1 })" style="cursor: pointer">
            <a href="#">Next</a>
            <div class="icon-embed-custom w-embed">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.3335 9.37502C2.98832 9.37502 2.7085 9.65484 2.7085 10C2.7085 10.3452 2.98832 10.625 3.3335 10.625H11.0418V15C11.0418 15.2528 11.1941 15.4807 11.4277 15.5774C11.6612 15.6742 11.93 15.6207 12.1088 15.442L17.1088 10.442C17.226 10.3247 17.2918 10.1658 17.2918 10C17.2918 9.83426 17.226 9.67529 17.1088 9.55808L12.1088 4.55808C11.93 4.37933 11.6612 4.32586 11.4277 4.42259C11.1941 4.51933 11.0418 4.74723 11.0418 5.00002V9.37502H3.3335Z" fill="#5D5D5D"></path>
                </svg>
            </div>
        </div>`)
    }
}

function formatDate(dateString){
    var options = { day: 'numeric', month: 'long', year: 'numeric' };
    var date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

function getUrlParameter(sParam){
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return '';
}

function calculateDaysLeft(e){
    let t = new Date();
    e = new Date(e);
    let a = Math.round(Math.abs((t - e) / 864e5));
    return a;
}