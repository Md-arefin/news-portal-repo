// tailwind 17/03/23
// async wait

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
    <a class="nav-link active" aria-current="page" href="#" onclick="fetchCategoryNews('${singleNews.category_id}')">${singleNews.category_name}</a>
    `;
    })
}

// fetch all newses available in a category

const fetchCategoryNews =category_id =>{
    const url =(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data.data))
}