// tailwind 17/03/23
// async wait
let fetchData = [];
const fetchCategories = () => {
    fetch("https://openapi.programming-hero.com/api/news/categories")
        .then(res => res.json())
        .then(data => showCategories(data.data))
}

//  show categories data

const showCategories = data => {
    // capture categories container to append all the categories links
    const categoriesContainer = document.getElementById('categories-container');
    data.news_category.forEach(singleNews => {
        categoriesContainer.innerHTML += `
    <a class="nav-link active" aria-current="page" href="#" onclick="fetchCategoryNews('${singleNews.category_id}', '${singleNews.category_name}')">${singleNews.category_name}</a>
    `;
    })
}

// fetch all newses available in a category

const fetchCategoryNews = (category_id, category_name) => {
    const url = (`https://openapi.programming-hero.com/api/news/category/${category_id}`)
    fetch(url)
        .then(res => res.json())
        .then(data => {
            fetchData = data.data,
            showAllNews(data.data, category_name)
        })
}

// show total news number and news category name 

const showAllNews = (data, category_name) => {
    // console.log(data, category_name)
    const newsCount = document.getElementById('news-count');
    newsCount.innerText = data.length;
    const categoryName = document.getElementById('category-name');
    categoryName.innerText = category_name;
    // show all news
    const newsContainer = document.getElementById('all-news');
    newsContainer.textContent=" ";
    data.forEach(singleNews => {
        // console.log(singleNews)
        const {image_url,title,details,author,total_view,rating,_id
        } = singleNews;
        newsContainer.innerHTML += `
     <div class="card mb-3" style="max-width: 100%;">
     <div class="row g-0">
         <div class="col-md-4" >
             <img src="${image_url}" class="img-fluid rounded-start" style="height:250px;"  alt="...">
         </div>
         <div class="col-md-8 d-flex flex-column">
            <div class="card-body">
                 <h5 class="card-title">${title}</h5>
                 <p class="card-text">${details.slice(0,200)}...</p>
            </div>

            <div class ="card-footer border-0 bg-body d-flex justify-content-between">
                <div class =d-flex gap-4>
                 <img src="${author.img}" class="img-fluid rounded-circle mx-2" height="40px" width="40px" alt=". . .">
                 <div>
                     <p class="p-0 m-0">${author.name ? author.name : "Not available"}</p>
                     <p class="p-0 m-0">${author.published_date}</p>
                 </div>
                </div>
                

             <div class="d-flex align-items-center">
                <i class="fas fa-eye"></i>
                <p class="px-1 m-0">${total_view ? total_view : "Not available"}</p>
             
             </div>

             <div class="d-flex align-items-center">
             <p class="px-1 m-0">${rating.number}</p>
             <i class="fas fa-star"></i>
             <i class="fas fa-star"></i>
             <i class="fas fa-star"></i>
             <i class="fas fa-star"></i>
             <i class="fas fa-star-half"></i>
             </div>
             <div>
             <i class="fas fa-arrow-right" 

             onclick="LoadNewsDetail('${_id}')" 
             
             data-bs-toggle="modal" 
             
             data-bs-target="#exampleModal">
             </i>
             </div>
            </div>
         </div>
     </div>
 </div>
     `
    })
}

// Load News detail

const LoadNewsDetail = news_id =>{
    let url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch (url)
    .then(res => res.json())
    .then(data =>  showNewsDetail(data.data[0]))
}


//  Show news detail in modal

const showNewsDetail = newsDetail =>{
    console.log(newsDetail)
    const {image_url,title,details,author,total_view,rating,others_info} = newsDetail;
const modalDetail = document.getElementById('exampleModal');
modalDetail.innerHTML =`
<div class="modal-dialog">
    <div class="modal-content">

        <div class="modal-header"></span></h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
        <h5 class="card-title mb-1">${title} <span class="badge  text-bg-info">${others_info.is_trending
            ? "Trending" : ""}</span><span class="badge  text-bg-info">${others_info.is_todays_pick ? "Todays pick" : ""}</span></h5>
            <img src="${image_url}" class="img-fluid rounded-start mb-2" style="height:250px;"  alt="...">
            <p>${details}</p>

            <div class ="border-0 bg-body d-flex justify-content-between">

            <div class =d-flex gap-4>
                <img src="${author.img}" class="img-fluid rounded-circle mx-2" height="40px" width="40px" alt=". . .">
                <div>
                    <p class="p-0 m-0">${author.name ? author.name : "Not available"}</p>
                    <p class="p-0 m-0">${author.published_date}</p>
                </div>
            </div>


            <div class="d-flex align-items-center">
                <i class="fas fa-eye"></i>
                <p class="px-1 m-0">${total_view ? total_view : "Not available"}</p>
            </div>

            <div class="d-flex align-items-center">
                <p class="px-1 m-0">${rating.number}</p>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half"></i>
            </div>
            
        </div>


        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    </div>
</div>
`
}

// show trending news 

const showTrending = () =>{
    const trendingNews = fetchData.filter(singleData => singleData.others_info.is_trending === true);
    const category_name = document.getElementById('category-name').innerText;
    showAllNews(trendingNews, category_name)
}

// show Todays Pick

const showTodaysPick = () =>{
    const todaysPickNews = fetchData.filter(pickNews => pickNews.others_info.is_todays_pick === true);
    const category_name = document.getElementById('category-name').innerText;
    showAllNews(todaysPickNews,category_name);
}
