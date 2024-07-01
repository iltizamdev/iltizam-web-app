var pagenum = 1
var total_pages = 0

getNews(pagenum)

/* Get News */
function getNews(pagenum){
    $.ajax({
        url: baseURL + '/news/list',
        type: 'get',
        data: {
            page: pagenum,
            limit: 18
        }, success: function(response){
            if(response.success === true){
                $('.news-detail_list').empty()
                for (let i = 0; i < response.data.length; i++) {
                    var newsId = response.data[i].newsId
                    var title = response.data[i].title
                    var image = response.data[i].image
                    var description = response.data[i].description
                    var category = response.data[i].category
                    var createdAt = formatDate(response.data[i].createdAt)

                    $('.news-detail_list').append(`<a href="${ siteURL }/users/news-article.html?id=${ newsId }" class="donation-item w-inline-block">
                        <img src="${ image }" loading="lazy" alt="${ title }" class="donation-item_image">
                        <div class="donation-content">
                        <div class="donation-top_detail">
                            <div class="label-tag">${ category }</div>
                            <div class="text-icon_wrap">
                                <div class="icon-embed-xsmall w-embed"><svg width="24" height="24" viewbox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7.75 2.5C7.75 2.08579 7.41421 1.75 7 1.75C6.58579 1.75 6.25 2.08579 6.25 2.5V4.07926C4.81067 4.19451 3.86577 4.47737 3.17157 5.17157C2.47737 5.86577 2.19451 6.81067 2.07926 8.25H21.9207C21.8055 6.81067 21.5226 5.86577 20.8284 5.17157C20.1342 4.47737 19.1893 4.19451 17.75 4.07926V2.5C17.75 2.08579 17.4142 1.75 17 1.75C16.5858 1.75 16.25 2.08579 16.25 2.5V4.0129C15.5847 4 14.839 4 14 4H10C9.16097 4 8.41527 4 7.75 4.0129V2.5Z"
                                            fill="#747474"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M2 12C2 11.161 2 10.4153 2.0129 9.75H21.9871C22 10.4153 22 11.161 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12ZM17 14C17.5523 14 18 13.5523 18 13C18 12.4477 17.5523 12 17 12C16.4477 12 16 12.4477 16 13C16 13.5523 16.4477 14 17 14ZM17 18C17.5523 18 18 17.5523 18 17C18 16.4477 17.5523 16 17 16C16.4477 16 16 16.4477 16 17C16 17.5523 16.4477 18 17 18ZM13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13ZM13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17ZM7 14C7.55228 14 8 13.5523 8 13C8 12.4477 7.55228 12 7 12C6.44772 12 6 12.4477 6 13C6 13.5523 6.44772 14 7 14ZM7 18C7.55228 18 8 17.5523 8 17C8 16.4477 7.55228 16 7 16C6.44772 16 6 16.4477 6 17C6 17.5523 6.44772 18 7 18Z"
                                            fill="#747474"></path>
                                    </svg></div>
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

                createpagination(pagenum, response.totalPage)
            }
        }
    })
}

/* Other Functions */
function createpagination(pagenum, total_pages){
    var paginationWrap = $('.pagination-wrap').empty()

    if (pagenum > 1) {
        paginationWrap.append(`<div class="pagination previous" onclick="getNews(${ pagenum - 1 })" style="cursor: pointer">
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
        paginationWrap.append(`<div class="pagination${ isActive }" onclick="getNews(${ i })"${ isDisabled } style="cursor: pointer">
            <a href="#" onclick="getNews(${ i })"${ isDisabled }>${ i }</a>
        </div>`)
    }

    if (pagenum < total_pages) {
        paginationWrap.append(`<div class="pagination next" onclick="getNews(${ pagenum + 1 })" style="cursor: pointer">
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