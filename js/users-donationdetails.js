var id = getUrlParameter('id')
if(!id) location.href = '/donation.html'

$('.text-link-copied').text(siteURL + '/donation-details.html?id=' + id)

$('#share-trigger').click(function(){
    $('.popup-wrapper#share').css({'display' : 'flex'})
})

$('#payment-trigger').click(function(){
    $('.popup-wrapper.input-donation').css({'display' : 'flex'})
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

/* GET DONATION DETAIL FROM API */
$.ajax({
    url: baseURL + '/donation/detail/' + id,
    type : 'get',
    success: function(response){
        if(response.success === true){
            var title = response.data.title
            var image = response.data.image
            var location = response.data.location
            var targetedFund = response.data.targetedFund
            var collectedFund = response.data.collectedFund
            var category = response.data.category
            var story = response.data.story
            var endDate = formatDate(response.data.endDate)
            var history = response.data.history
            var gallery = response.data.gallery

            var totalPercentage = (collectedFund * 100) / targetedFund
            var percentage = (totalPercentage <= 20) ? '20%' : totalPercentage + '%';

            var formattedTargetFund = parseFloat(targetedFund).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
            })

            var formattedColledtedFund = parseFloat(collectedFund).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
            })

            /* SET TEXT VALUE */
            $(document).prop('title', 'Donation Details - ' + title)
            $('.breadcrumb-text.is-active').text(title)
            $('.heading-large').text(title)
            $('.location-text').text(location)
            $('.text-rich').html(story)
            $('.target-text').text(formattedTargetFund)
            $('.raised-text').text(formattedColledtedFund)
            $('.end-date-text').text(endDate)

            /* SET DONATION BAR WIDTH */
            $('#donation-bar_active').css({'width': percentage})

            /* LOOP LABEL TAG */
            for (let c = 0; c < category.length; c++) {
                $('.label-tag_list').append(`<div class="label-tag">${ category[c] }</div>`)
            }

            /* LOOP HISTORY */
            for (let h = 0; h < history.length; h++) {
                if(history[h].image){
                    $('.donate-update_list').append(`<div class="donate-update_item">
                            <div class="donate-update_date-wrap">
                            <div class="donate-update_date-circle"></div>
                            <div class="issueddate">
                                ${ formatDate(history[h].issuedDate) }
                            </div>
                        </div>
                        <div class="donate-update_rt w-richtext">
                            <figure class="w-richtext-align-floatleft w-richtext-figure-type-image">
                                <div><img src="${ history[h].image }" loading="lazy" alt=""></div>
                            </figure>
                            <p>${ history[h].description }</p>
                        </div>
                    </div>`)
                }else{
                    $('.donate-update_list').append(`<div class="donate-update_item">
                            <div class="donate-update_date-wrap">
                            <div class="donate-update_date-circle"></div>
                            <div class="issueddate">
                                ${ formatDate(history[h].issuedDate) }
                            </div>
                        </div>
                        <div class="donate-update_rt w-richtext">
                            <p>${ history[h].description }</p>
                        </div>
                    </div>`)
                }
            }

            $('.donate-update_list').append(`<div class="text-align-center">
                <div class="text-size-small text-weight-semibold text-color-branddark">See More</div>
            </div>
            <div class="donate-update_line"></div>`)

            /* APPEND TO SLIDER SLICK */
            $('.donate-detail_main-image').append(`<img src="${ image }" loading="lazy" alt="${ title }" class="donate-detail_image">`)
            $('.donate-detail_gallery-list').append(`<img src="${ image }" loading="lazy" alt="${ title }" class="donate-detail_gallery-item">`)

            /* LOOP GALLERY THEN APPEND TO SLIDER SLICK */
            for (let g = 0; g < gallery.length; g++) {
                $('.donate-detail_main-image').append(`<img src="${ gallery[g] }" loading="lazy" alt="${ title }" class="donate-detail_image">`)
                $('.donate-detail_gallery-list').append(`<img src="${ gallery[g] }" loading="lazy" alt="${ title }" class="donate-detail_gallery-item">`)
            }

            /* Initialize SlickSlider for main image */
            $('.donate-detail_main-image').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '.donate-detail_gallery-list'
            })

            /* Initialize SlickSlider for gallery */
            $('.donate-detail_gallery-list').slick({
                slidesToShow: 3, // Adjust this value as needed
                slidesToScroll: 1,
                asNavFor: '.donate-detail_main-image',
                dots: false,
                centerMode: true,
                focusOnSelect: true
            })

            /* Next and Previous buttons for the main image slider */
            $('#nextSlide1').click(function () {
                $('.donate-detail_main-image').slick('slickNext');
            })

            $('#prevSlide1').click(function () {
                $('.donate-detail_main-image').slick('slickPrev');
            })

            /* Additional initialization and event handlers for other sliders */
            $('#slickslider2').slick({ 
                slidesToShow: 3, 
                infinite: true, 
                arrows: false, 
                responsive: [{ 
                breakpoint: 768, 
                settings: { 
                    slidesToShow: 1 
                } 
                }] 
            })
            $('#nextSlide2').click(function () { $('#slickslider2').slick('slickNext') })
            $('#prevSlide2').click(function () { $('#slickslider2').slick('slickPrev') })
        }else{
            location.href = '/'
        }
    }
})
/* END */

/* INIT SLICK SLIDER  - Featured Campaign */
$.ajax({
    url: baseURL + '/donation/list',
    type: 'get',
    success: function(response){
      var slideItems = '';
      if(response.success === true){
        for (let a = 0; a < response.data.length; a++) {
          var donationId = response.data[a].donationId
          var title = response.data[a].title
          var image = response.data[a].image
          var location = response.data[a].location
          var targetedFund = response.data[a].targetedFund
          var collectedFund = response.data[a].collectedFund
          var category = response.data[a].category
          var story = response.data[a].story
          var percentage = (collectedFund / targetedFund) * 100 + '%'
          var endDate = response.data[a].endDate
  
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

          slideItems += `<div class="donation-slider_item">
          <a href="${ siteURL }/users/donation-details.html?id=${ donationId }" class="donation-item w-inline-block" tabindex="-1">
            <img src="${ image }"
              loading="lazy" alt="${ title }"
              class="donation-item_image">
            <div class="donation-content">
              <div class="donation-top_detail">
                <div class="text-icon_wrap is-narrow">
                  <div class="icon-embed-xsmall w-embed">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M12 2C7.58172 2 4 6.00258 4 10.5C4 14.9622 6.55332 19.8124 10.5371 21.6744C11.4657 22.1085 12.5343 22.1085 13.4629 21.6744C17.4467 19.8124 20 14.9622 20 10.5C20 6.00258 16.4183 2 12 2ZM12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
                        fill="CurrentColor"></path>
                    </svg>
                  </div>
                  <div class="donation-location">${ location }</div>
                </div>
                <div class="enddate">${ daysLeft } Days Left</div>
              </div>
              <div class="label-tag_wrap">${ labelTag }</div>
              <h2 class="heading-xsmall text-weight-semibold text-lineheight-normal">${ title }</h2>
            </div>
            <div class="donation-card_bar-wrap">
              <div class="donation_bar">
                <div class="donation-bar_active" style="width: ${ percentage }!important"></div>
              </div>
              <div class="margin-top margin-custom3">
                <div class="text-size-small text-color-light3">Collected<span class="collectedfund">&nbsp;${ formattedFund }</span></div>
              </div>
            </div>
          </a>
          </div>`
        }
  
        $('#slickslider3').append(slideItems)
        $("#slickslider3").slick({
            slidesToShow: 3,
            infinite: true,
            arrows: false,
            responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }],
        }), $("#nextSlide3").click(function () {
            $("#slickslider3").slick("slickNext");
        }), $("#prevSlide3").click(function () {
            $("#slickslider3").slick("slickPrev");
        });
      }
    }
})
/* END SLICK SLIDER 1 - Featured Campaign */

/* Other Function */
function formatDate(dateString) {
    var options = { day: 'numeric', month: 'long', year: 'numeric' };
    var date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
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

function calculateDaysLeft(e) {
    let t = new Date();
    e = new Date(e);
    let a = Math.round(Math.abs((t - e) / 864e5));
    return a;
}

document.getElementById("input-donation").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  const amount = document.getElementById("amount").value;
  const currency = document.getElementById("currency").innerText;
  const formData = {
    amount: parseFloat(amount),
    currency: currency
  };

  if (!token) {
    alert("Please log in or sign up to make a donation.");
    window.location.href = '/';
    return;
  }
  const fetchURL = `${baseURL}/donation/payment/${id}`;

  fetch(fetchURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to process donation');
    }
  })
  .then(data => {
    if (data.success && data.data.url) {
      window.location.href = data.data.url;
    } else {
      throw new Error('Invalid response from API');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});