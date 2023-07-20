// const option= document.getElementById
// const answer =document.getElementById('answer')
// const bad =getElementsByClassName('false')
// answer.onclick=function(){
//     answer.textContent="〇"

// }

// false.onclick=function(){
//     answer.textContent="×"

// }


// function checkAnswer(select){
//     const answer =document.getElementById('answer')
//     if(select===answer){
//         // document.textContent='〇'
//         select.innerHTML='〇'
//     }else{
//         // document.textContent='〇'
//         select.innerHTML='×'
//     }
// const option=document.getElementsByTagName('li')
// for(let i=0;i<option.length;i++){
//     option[i].removeAttribute('onclick')
// }
// }

// const option = document.getElementById('option').getElementsByTagName('li')
// const answer = document.getElementById('answer')

// for (let i = 0; i < option.length; i++) {
//     option[i].addEventListener('click', check)
// }
// function check() {
//     if (this === answer) {
//         this.innerHTML = '〇'
//         alert('せいかい')
//     } else {
//         this.innerHTML = '×'
//         alert('はずれ')
//     }
//     const option = document.getElementsByTagName('li')
//     for (let i = 0; i < option.length; i++) {
//         option[i].removeEventListener('click', check)
//     }
// }
// const option=document.getElementsByTagName('li')
// const answer=document.getElementById('answer')
// for(let i=0;i<option.length;i++){
//     option[i].addEventListener('click', check)
// }
// function check(){
//     if(this===answer){
//         this.innerHTML='〇'
//     }else{
//         this.innerHTML='×'
//     }
//     const option=document.getElementsByTagName('li')
//     for(let i=0;i<option.length;i++){
//         option[i].removeEventListener('click', check)
//     }
// }
// const quiz={theme:'日本で一番の山',
// a:'富士',
// b:'金剛山',
// c:'huzi',
// d:'huzi',
// ans:'a'
// }
const quiz = {
    a: '日本で一番高い山は？',
    option: ['富士', '北岳', '葛城山', '蓋神山'],
    ans: 0
}
const array = quiz.option
const ulElement = document.querySelector('#option')
const ans = quiz.ans//後で使用する正解時の為に作成

//お題を表示
document.querySelector('h2').textContent = quiz.a

//li要素を作成し順に表示させ、正解の選択肢にid要素追加するfor文
for (let i = 0; i < array.length; i++) {
    const liElement = document.createElement("li")
    liElement.textContent = array[i]
    if (i === ans) {
        liElement.id = "answer"
    }
    ulElement.appendChild(liElement)
}
//正解なら〇、不正解なら×を表示
const option = document.querySelectorAll('li')
const answer = document.querySelector('#answer')
for (let i = 0; i < option.length; i++) {
    option[i].addEventListener('click', check)
}
function check() {
    if (this === answer) {
        this.innerHTML = '〇'
    } else {
        this.innerHTML = '×'
    }

    //一つ選択すると他をクリックしても変わらなくする
    const option = document.querySelectorAll('li')
    for (let i = 0; i < option.length; i++) {
        option[i].removeEventListener('click', check)
    }
}

// const q = {
//     t: '日本で一番高い山は？',
//     a:'富士', 
//     b:'北岳', 
//     c:'葛城山', 
//     d:'蓋神山',
//     ans: 0
// }
// const liA=document.querySelector('ul li')
// liA.classList.add('fail')

// const liB=document.querySelector('ul li:nth-child(2)')
// liB.classList.add('answer')

// const liC=document.querySelector('ul li:nth-child(3)')
// liC.classList.add('fail')

// const liD=document.querySelector('ul li:nth-child(4)')
// liD.classList.add('fail')