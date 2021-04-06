const now = new Date()
const year = now.getFullYear()
const month = now.getMonth() + 1
const day = now.getDate()
const hours = now.getHours()
let min = now.getMinutes()
if ((min) < 10) min = '0' + min


function loadAppeal(appeal) {
    let appealOutput = `
    <div class="section-text">
        <p>${appeal}</p>
        <div class="info-appeal">
            <p class="date-appeal">${day}-${month}-${year} ${hours}:${min}</p>
            <p class="name-fan">Ігор Дубас</p>
        </div>
    </div><hr>`
    document.getElementById('new-appeal').innerHTML += appealOutput
}

function addComment() {
    let appeal = document.getElementById('appeal').value
    if (appeal.length > 3 && appeal.trim() && navigator.onLine) {
        loadAppeal(appeal)
    } else if (!navigator.onLine) {
        window.client.setItem('appeal', appeal)
        setStorageData(appeal)
    } 
    else {
        alert('Введіть текст!')
    }
    document.getElementById('appeal').value = ''
}

window.onload = function () {
    const client = initClient()
    window.client = client

    function readCom(){
        client.getItem("appeal", loadAppeal)
    }
    
    window.addEventListener('online', readCom)
}

function setStorageData(appeal) {
    window.client.setItem('appeal', JSON.stringify(appeal))
    alert('Ви оффлайн, Ваш коментар добавиться, як тільки у Вас буде доступ до інтернету!')
    document.getElementById('appeal').value = ''
}
