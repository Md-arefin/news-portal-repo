const fetchCategories = () =>{
    fetch("https://openapi.programming-hero.com/api/news/categories")
    .then(res => res.json())
    .then(data => showCategories(data.data))
}

const showCategories = data =>{
// capture categories container to append all the categories links
const categoriesContainer = document.getElementById('categories-container');
data.news_category.forEach(singleNews =>{
    categoriesContainer.innerHTML +=`
    <a class="nav-link active" aria-current="page" href="#">${singleNews.category_name}</a>
    `;
})
}