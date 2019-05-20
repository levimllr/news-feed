// INITIALIZING AND DECLARING VARIABLES
// variables to manage page loading and dom
let init = true;
const articles = document.getElementById('articles');
// variables to manage API request
let page = 0;
let pageSize = 7;
// let apiKey = '15df675860ff45ecbed003696cdabd86';
let apiKey = '7cc00ed80f114185973e068e7cdd1c80';
let topic = 'cats';
let url;

// FUNCTIONS TO GENERATE ARTICLE CONTENT
// function to make api request and process data
function getArticles() {
    page += 1;
    url = `https://newsapi.org/v2/everything?q=${topic}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;
    console.log('Fetching articles from', url);
    return fetch(url)
      .then(response => response.json())
      .then(data => createArticleHtml(data.articles));
};

// function to create HTML for articles
function createArticleHtml(articleArray) {
  // console.log('Creating article HTML...');
  for (let i = 0; i < articleArray.length; i++) {
    let element = document.createElement('div')
    element.innerHTML = `
    <a href="${articleArray[i].url}"><div class="article">
      <div class="articleImg">
        <img src=${articleArray[i].urlToImage}>
      </div>
      <div class="articleTxt">
        <h2>${articleArray[i].title}</h2>
        <h3>${articleArray[i].author}</h3>
        <h4>${articleArray[i].description}</h4>
        <h5>Source: ${articleArray[i].source.name}</h5>
      </div>
    </div>
    `
    articles.appendChild(element)
  }
}

getArticles();

// make something happen when we scroll in the document
document.addEventListener('scroll', throttle(handleScroll, 1000));

// handle the scroll by making sure it's near the bottom of the page
function handleScroll() {
  if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 300)) {
    getArticles();
  }
}

// throttle the calls to getArticles by making a passed-in function only callable once during a given time interval
function throttle(func, interval) {
  let throttled = false;
  return function() {
    if (!throttled) {
      func();
      throttled = true;
      console.log('Throttled!');
      setTimeout(() => throttled = false, interval);
    };
  };
};

// debounce: only call function once some time after the last of multiple, identical events are "heard" by a listener
function debounce(func, interval) {

}
