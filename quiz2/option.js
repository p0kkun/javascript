
const quiz = {
    a: '日本で一番の山は',
    option: ['富士山', '北岳', '生駒山', '葛城山'],
    ans: 0
}
document.querySelector('h2').textContent = quiz.a

const array = quiz.option
const ulElement = document.querySelector('#option')
const answer = quiz.ans


for (let i = 0; i < array.length; i++) {
    const liElement = document.createElement("li")
    liElement.textContent = array[i]
    if (i === answer) {
        liElement.id = "answer"
    }
    ulElement.appendChild(liElement)
}
const option = document.querySelectorAll('li')
const ans = document.querySelector('#answer')
for (let i = 0; i < option.length; i++) {
    option[i].addEventListener('click', check)
}
function check() {
    if (this === ans) {
        this.innerHTML = '〇'
    } else {
        this.innerHTML = '×'
    }
    for (let i = 0; i < option.length; i++) {
        option[i].removeEventListener('click', check)
    }
}

let end = new Date()
end.setSeconds(end.getSeconds()+10)
// end.setHours(end.getHours()+1)


function countDown() {
    const currentTime = new Date()
    const timeDiffernce = end - currentTime
    const hours = Math.floor(timeDiffernce / (1000 * 60 * 60))
    const min = Math.floor((timeDiffernce / (1000 * 60)) % 60)
    const sec = Math.floor((timeDiffernce / 1000) % 60)

    document.querySelector('#timer').textContent = 
    '残りあと '+
    // hours + '時間' + 
    // String(min).padStart(2, '0') + '分' +
    String(sec).padStart(2, '0') + '秒'

    if (timeDiffernce <= 0) {
        clearInterval(interval)
        document.querySelector('#timer').textContent = '終了'
    }
}
const interval = setInterval(countDown, 1000)

countDown()
