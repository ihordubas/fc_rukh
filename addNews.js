function loadNews(news) {
    if (!news) return
    let path = 'file:///home/ihor/webtask1/fcrukh/img/'
    path += news.image
    alert('Новину додано!')
    let newsOutput = `
    <div class="news-card">
        <img src="${path}">
        <h3 class="news-card-header">${news.title}</h3>
        <p class="news-card-text">${news.text}</p>
    </div> `
    document.getElementById('new-news').innerHTML += newsOutput
}


function addNews() {
    const text = document.getElementById('text').value
    const title = document.getElementById('title').value
    const image = document.getElementById("img").files[0].name;
    const news = { text, title, image }
 
    if (text.length > 3 && text.trim() && title.length > 3 && title.trim() && navigator.onLine) {
        loadNews(news)
        document.getElementById('text').value = ''
        document.getElementById('title').value = ''
        document.getElementById('img').value = ''
    } else if (!navigator.onLine) {
        window.client.setItem('news', news)
        alert('Ви оффлайн, Ваша новина добавиться, як тільки у Вас буде доступ до інтернету!')
        document.getElementById('text').value = ''
        document.getElementById('title').value = ''
        document.getElementById('img').value = ''
    } else {
        alert('Заповніть усі необхідні поля')
    }
}


function showNews () {
    const client = initClient()
    window.client = client
    if (navigator.onLine) {
        let path = 'file:///home/ihor/webtask1/fcrukh/img/'
        window.client.getItem("news", loadNews)
    }
}

window.addEventListener('online', showNews)