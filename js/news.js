var id = getUrlParameter('id')
if(!id) location.href = '/news.html'

$('.text-link-copied').text(siteURL + '/news-article.html?id=' + id)

$('#share-trigger').click(function(){
    $('.popup-wrapper#share').css({'display' : 'flex'})
})

$('.copy-link').click(function(){
    var text = $('.text-link-copied').text()
    var $temp = $("<input>")
    $("body").append($temp)
    $temp.val(text).select()
    document.execCommand("copy")
    alert('Link Copied')
    $('.form-close_button').click()
    $temp.remove()
})

/* GET NEWS DETAIL FROM API */
$.ajax({
    url: baseURL + '/news/detail/' + id,
    type : 'get',
    success: function(response){
        if(response.success === true){
            var title = response.data.title
            var image = response.data.image
            var location = response.data.location
            var category = response.data.category
            var story = response.data.story
            var createdAt = formatDate(response.data.createdAt)
            var gallery = response.data.gallery
            var richtext = response.data.descriptionDetail


            /* SET TEXT VALUE */
            $(document).prop('title', 'Donation Details - ' + title)
            $('.breadcrumb-text.is-active').text(title)
            $('.heading-large').text(title)
            $('.location-text').text(location)
            $('.story-text').text(story)
            $('.crated-date-text').text(createdAt)
            $('.news-rich_text.w-richtext').html(richtext)

            /* LOOP LABEL TAG */
            for (let c = 0; c < category.length; c++) {
                $('.label-tag_list').append(`<div class="label-tag">${ category[c] }</div>`)
            }

            /* APPEND TO SLIDER SLICK */
            $('.donate-detail_main-image').append(`<img src="${ image }" loading="lazy" alt="${ title }" class="donate-detail_image">`)
            $('.donate-detail_gallery-list').append(`<img src="${ image }" loading="lazy" alt="${ title }" class="donate-detail_gallery-item">`)

            /* LOOP GALLERY THEN APPEND TO SLIDER SLICK */
            for (let g = 0; g < gallery.length; g++) {
                $('.donate-detail_main-image').append(`<img src="${ gallery[g] }" loading="lazy" alt="${ title }" class="donate-detail_image">`)
                $('.donate-detail_gallery-list').append(`<img src="${ gallery[g] }" loading="lazy" alt="${ title }" class="donate-detail_gallery-item">`)
            }

            // Initialize SlickSlider for main image
            $('.donate-detail_main-image').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
            });
            // Initialize SlickSlider for gallery
            $('.donate-detail_gallery-list').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
            });
            // Next and Previous buttons for the main image slider
            $('#nextSlide1').click(function () {
                $('.donate-detail_main-image').slick('slickNext');
            });
            $('#prevSlide1').click(function () {
                $('.donate-detail_main-image').slick('slickPrev');
            });
            // Additional initialization and event handlers for other sliders
            $('#slickslider2').slick({ slidesToShow: 3, infinite: true, arrows: false, responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }] });
            $('#nextSlide2').click(function () { $('#slickslider2').slick('slickNext') });
            $('#prevSlide2').click(function () { $('#slickslider2').slick('slickPrev') });
        }else{
            location.href = '/'
        }
    }
})
/* END */

/* RELATED CAMPAIGN */
$.ajax({
    url: baseURL + '/donation/list',
    type: 'get',
    data: {
        page: 1,
        limit: 3,
    }, success: function(response){
        if(response.success === true){
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
                })

                $('.related-campaign').append(`<a href="${ siteURL }/donation-details.html?id=${ donationId }" class="donation-item w-inline-block">
                    <img src="${ image }" loading="lazy" alt="${ title }"
                        class="donation-item_image">
                    <div class="donation-content">
                        <div class="donation-top_detail">
                        <div class="text-icon_wrap is-narrow">
                            <div class="icon-embed-xsmall w-embed"><svg width="24" height="24" viewbox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M12 2C7.58172 2 4 6.00258 4 10.5C4 14.9622 6.55332 19.8124 10.5371 21.6744C11.4657 22.1085 12.5343 22.1085 13.4629 21.6744C17.4467 19.8124 20 14.9622 20 10.5C20 6.00258 16.4183 2 12 2ZM12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
                                fill="CurrentColor"></path>
                            </svg></div>
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
                        <div class="text-size-small text-color-light3">Collected<span class="collectedfund"> ${formattedFund}</span></div>
                        </div>
                    </div>
                </a>`)
            }
        }
    }
})
/* END */

/* RELATED NEWS */
$.ajax({
    url: baseURL + '/news/list',
    type: 'get',
    data: {
        page: 1,
        limit: 3
    }, success: function(response){
        if(response.success === true){
            for (let i = 0; i < response.data.length; i++) {
                var newsId = response.data[i].newsId
                var title = response.data[i].title
                var image = response.data[i].image
                var description = response.data[i].description
                var category = response.data[i].category
                var createdAt = formatDate(response.data[i].createdAt)

                $('.news-detail_list').append(`<a href="${ siteURL }/news-article.html?id=${ newsId }" class="donation-item w-inline-block">
                    <img src="${ image }" loading="lazy" alt="" class="donation-item_image">
                    <div class="donation-content">
                    <div class="donation-top_detail">
                        <div class="label-tag">${ category }</div>
                        <div class="text-icon_wrap">
                        <div class="icon-embed-xsmall w-embed">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.75 2.5C7.75 2.08579 7.41421 1.75 7 1.75C6.58579 1.75 6.25 2.08579 6.25 2.5V4.07926C4.81067 4.19451 3.86577 4.47737 3.17157 5.17157C2.47737 5.86577 2.19451 6.81067 2.07926 8.25H21.9207C21.8055 6.81067 21.5226 5.86577 20.8284 5.17157C20.1342 4.47737 19.1893 4.19451 17.75 4.07926V2.5C17.75 2.08579 17.4142 1.75 17 1.75C16.5858 1.75 16.25 2.08579 16.25 2.5V4.0129C15.5847 4 14.839 4 14 4H10C9.16097 4 8.41527 4 7.75 4.0129V2.5Z" fill="#747474"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 11.161 2 10.4153 2.0129 9.75H21.9871C22 10.4153 22 11.161 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12ZM17 14C17.5523 14 18 13.5523 18 13C18 12.4477 17.5523 12 17 12C16.4477 12 16 12.4477 16 13C16 13.5523 16.4477 14 17 14ZM17 18C17.5523 18 18 17.5523 18 17C18 16.4477 17.5523 16 17 16C16.4477 16 16 16.4477 16 17C16 17.5523 16.4477 18 17 18ZM13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13ZM13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17ZM7 14C7.55228 14 8 13.5523 8 13C8 12.4477 7.55228 12 7 12C6.44772 12 6 12.4477 6 13C6 13.5523 6.44772 14 7 14ZM7 18C7.55228 18 8 17.5523 8 17C8 16.4477 7.55228 16 7 16C6.44772 16 6 16.4477 6 17C6 17.5523 6.44772 18 7 18Z" fill="#747474"></path>
                            </svg>
                        </div>
                        <div>${ createdAt }</div>
                        </div>
                    </div>
                    <div class="news-card_content">
                        <h3 class="heading-small text-weight-semibold text-lineheight-normal">${ title }</h3>
                        <p class="max-h-72">${ description }</p>
                    </div>
                    </div>
                </a>`)
            }
        }
    }
  })
/* END */

/* Other Function */
function formatDate(dateString) {
    var options = { day: 'numeric', month: 'long', year: 'numeric' };
    var date = new Date(dateString);
    return date.toLocaleDateString('id-ID', options);
}

function getUrlParameter(sParam) {
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
    return false;
}

function calculateDaysLeft(e){
    let t = new Date();
    e = new Date(e);
    let a = Math.round(Math.abs((t - e) / 864e5));
    return a;
}