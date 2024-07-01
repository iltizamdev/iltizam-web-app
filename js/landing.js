/* HERO SLIDER */
$.ajax({
  url: baseURL + '/donation/list',
  type: 'get',
  success: function(response){
    var heroSlider = '';
    if(response.success === true){
      for (let s = 0; s < response.data.length; s++) {
        if(response.data[s].isBanner){
          var donationId = response.data[s].donationId
          var title = response.data[s].title
          var image = response.data[s].image
          var location = response.data[s].location
          var targetedFund = response.data[s].targetedFund
          var collectedFund = response.data[s].collectedFund
          var category = response.data[s].category
          var story = response.data[s].story
          var totalPercentage = (collectedFund / targetedFund) * 100
          var percentage = (totalPercentage <= 20) ? 20 : totalPercentage
          var endDate = response.data[s].endDate

          var storyText = $(story).text()
          var truncatedText = storyText.substring(0, 400) + '....'

  
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
  
          var formattedTargetFund = parseFloat(targetedFund).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })
  
          heroSlider += `<div class="home-hero_slide">
            <div class="home-hero_row">
                <div class="home-hero_column">
                    <div class="home-hero_text">
                        <h1 class="home-donation_heading">${ title }</h1>
                        <p class="home-donation_summary">${ truncatedText }</p>
                    </div>
                    <div class="home-donation_bar-wrap">
                        <div class="home-bar_title">Goal ${ formattedTargetFund }</div>
                        <div class="donation_bar">
                            <div class="donation-bar_active" style="width: ${ percentage }%">
                                <div class="donation-bar_active-tips">
                                    <div class="bar-tip_polygon w-embed"><svg width="14" height="11" viewbox="0 0 14 11"
                                            fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 0.5L13.0622 11H0.937822L7 0.5Z" fill="#EC7929"></path>
                                        </svg></div>
                                    <div class="home-bar_collected">${ formattedFund }</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="button-wrapper">
                        <a href="${ siteURL }/donation-details.html?id=${ donationId }" class="button-primary w-inline-block">
                            <div class="text-icon_wrap">
                                <div>Donate Now</div>
                                <div class="icon-embed-custom18 w-embed"><svg width="20" height="21" viewbox="0 0 20 21"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M1.66666 8.11425C1.66666 12.1667 5.01618 14.3262 7.4681 16.2591C8.33332 16.9411 9.16666 17.5833 9.99999 17.5833C10.8333 17.5833 11.6667 16.9411 12.5319 16.2591C14.9838 14.3262 18.3333 12.1667 18.3333 8.11425C18.3333 4.0618 13.7499 1.18789 9.99999 5.08386C6.25012 1.18789 1.66666 4.0618 1.66666 8.11425Z"
                                            fill="CurrentColor"></path>
                                    </svg></div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="home-hero_image-wrap">
                  <img alt="${ title }" src="${ image }" loading="lazy" class="home-hero_image">
                </div>
            </div>
          </div>`}
        }
      }
    $('.home-hero_slider').append(heroSlider)
    $('.home-hero_slider').slick({
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear',
    })
  }
})
/* END HERO SLIDER */

/* INIT SLICK SLIDER  - Featured Campaign */
$.ajax({
  url: baseURL + '/donation/list',
  type: 'get',
  success: function(response){
    var slideItems = '';
    if(response.success === true){
      for (let a = 0; a < response.data.length; a++) {
        if(!response.data[a].isBanner){
          var donationId = response.data[a].donationId
          var title = response.data[a].title
          var image = response.data[a].image
          var location = response.data[a].location
          var targetedFund = response.data[a].targetedFund
          var collectedFund = response.data[a].collectedFund
          var category = response.data[a].category
          var story = response.data[a].story
          var percentage = (collectedFund * 100) / targetedFund + '%'
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
          <a href="${ siteURL }/donation-details.html?id=${ donationId }" class="donation-item w-inline-block" tabindex="-1">
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
      }

      $('#slickslider1').append(slideItems)
      $("#slickslider1").slick({
          slidesToShow: 3,
          infinite: true,
          arrows: false,
          responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }],
      }), $("#nextSlide1").click(function () {
          $("#slickslider1").slick("slickNext");
      }), $("#prevSlide1").click(function () {
          $("#slickslider1").slick("slickPrev");
      });
    }
  }
})
/* END SLICK SLIDER 1 - Featured Campaign */

/* INIT SLICK SLIDER 2 - Latest News */
$.ajax({
  url: baseURL + '/news/list',
  type: 'get',
  data: {
      page: 1,
      limit: 10
  }, success: function(response){
      var slide2Items = '';
      if(response.success === true){
          for (let i = 0; i < response.data.length; i++) {
              var newsId = response.data[i].newsId
              var title = response.data[i].title
              var image = response.data[i].image
              var description = response.data[i].description
              var category = response.data[i].category
              var createdAt = formatDate(response.data[i].createdAt)

              slide2Items += `<div class="margin-xsmall">
              <a href="${ siteURL }/news-article.html?id=${ newsId }" class="donation-item w-inline-block">
                <img src="${ image }" loading="lazy" sizes="(max-width: 479px) 75vw, (max-width: 767px) 24vw, 17vw" alt="" class="donation-item_image" />
                <div class="donation-content">
                  <div class="donation-top_detail">
                    <div class="label-tag">${ category }</div>
                    <div class="text-icon_wrap">
                      <div class="icon-embed-xsmall w-embed">
                        <svg width="24" height="24" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              </a>
            </div>`
          }

          $('#slickslider2').append(slide2Items)

          $('#slickslider2').slick({
              slidesToShow: 3,
              infinite: true,
              arrows: false,
              responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }],
          }), $("#nextSlide2").click(function () {
              $("#slickslider2").slick("slickNext");
          }), $("#prevSlide2").click(function () {
              $("#slickslider2").slick("slickPrev");
          });
      }
  }
})
/* END SLICK SLIDER 2 - Latest News */

/* Other Functions */
function formatDate(dateString) {
  var options = { day: 'numeric', month: 'long', year: 'numeric' };
  var date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}

function calculateDaysLeft(e) {
  let t = new Date();
  e = new Date(e);
  let a = Math.round(Math.abs((t - e) / 864e5));
  return a;
}