const articles = document.getElementById('articles');
let init = true;
let articleArray = [];
let page = 0;
let pageSize = '7';
let apiKey = '15df675860ff45ecbed003696cdabd86';
let topic = 'cats';
// let url = `https://newsapi.org/v2/everything?q=${topic}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;
// console.log(url);

function getArticles() {
  if (window.scrollY > (window.outerHeight - 550) || init === true) {
    init = false;
    page += 1;
    url = `https://newsapi.org/v2/everything?q=${topic}&pageSize=${parseInt(pageSize)}&page=${page}&apiKey=${apiKey}`
    console.log(url);
    let req = new Request(url);
    return fetch(req)
      .then(response => response.json())
      .then(data => data.articles.forEach(article => articleArray.push(article)))
      .then(() => createArticleHtml());
  }
};

function createArticleHtml() {
  console.log('Scrolling and loading...');
  let indexFromPage = (page - 1) * pageSize;
  for (let i = indexFromPage; i < articleArray.length; i++) {
    articles.innerHTML +=
      `
      <div class="article">
        <div class="articleImg">
          <img src=${articleArray[i].urlToImage}>
        </div>
        <div class="articleTxt">
          <h2>${articleArray[i].title}</h2>
          <h3>${articleArray[i].author}</h3>
          <h4>${articleArray[i].description}</h4>
          <a href="${articleArray[i].url}"> <h5>Source: ${articleArray[i].source.name}</h5>
        </div>
      </div>
      `
  }
}

const debounce = (func, delay) => {
  let inDebounce
  // console.log('Higher order fn context: ', this)
  return function() {
    const context = this
    // console.log('Nested fn context: ', context)
    const args = arguments
    clearTimeout(inDebounce)
    inDebounce = setTimeout(() => func.apply(context, args), delay)
  }
}

getArticles();
window.addEventListener('scroll', debounce(getArticles, 500));
console.log(articleArray);




window.addEventListener('resize', debounce(function() {
  console.info('Hey! It is', new Date().toUTCString());
  console.log(this);
}, 1000));
