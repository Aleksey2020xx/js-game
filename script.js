(() => {
  function createFormGame() {
    const form = document.createElement('form')
    const input = document.createElement('input')
    const btnStart = document.createElement('button')
    const btnRestart = document.createElement('button')
    const textFormTimer = document.createElement('span')
    const textFormCart = document.createElement('span')

    form.classList.add('form', 'active')
    input.classList.add('input')
    btnStart.classList.add('btn')
    btnRestart.classList.add('btn', 'restart')
    textFormCart.classList.add('form-text', 'restart')
    textFormTimer.classList.add('form-text', 'restart')

    textFormCart.innerHTML = 'Вы открыли все карты!'
    textFormTimer.innerHTML = 'Время истекло!'
    btnStart.innerHTML = 'Начать игру'
    btnRestart.innerHTML = 'Начать новую игру'
    input.placeholder = 'Выберите: 4 или 6 карт по верт./гориз. '

    form.append(textFormCart)
    form.append(textFormTimer)
    form.append(input)
    form.append(btnStart)
    form.append(btnRestart)

    return {
      form,
      input,
      btnStart,
      btnRestart,
      textFormCart,
      textFormTimer
    }
  }

  function createContainerGame() {
    const container = document.createElement('div')

    container.classList.add('container')

    return container
  }

  function createListGame() {
    const list = document.createElement('ul')

    list.classList.add('list')

    return list
  }
   
  function createListGameItem(el) {
    
    const itemCart = document.createElement('li')
    itemCart.classList.add('item')

    const itemCartFront = document.createElement('div')
    itemCartFront.classList.add('item-front')
    itemCart.append(itemCartFront)

    const itemCartBack = document.createElement('div')
    itemCartBack.classList.add('item-back')
    itemCart.append(itemCartBack)

    const textCart = document.createElement('span')
    textCart.classList.add('text')
    textCart.innerHTML = el

    itemCartFront.append(textCart)

    itemCart.append(itemCartFront)
    itemCart.append(itemCartBack)

    return {
      itemCart,
      itemCartFront,
      itemCartBack,
      textCart
    }
  }

    function intervalDiv() {
      let div = document.createElement('div')
      div.classList.add('timer', 'restart')
      div.innerHTML = 60;

      return div
    }

  function itemNthChild(el) {
    let listSize = document.querySelector('.list');
    listSize.setAttribute('style', `width: calc(126px * ${el})`)
  }

  let arrayIndexCart = [];
  
  const objCart = {
    one: 0,
    two: 0
  }

  //вспомогательная функция
  function putToCache(elem, cache){
    if(cache.indexOf(elem) != -1){
      return;
    }
    var i = Math.floor(Math.random()*(cache.length + 1));
    cache.splice(i, 0, elem);
  }
  //функция, возвращающая свеженький компаратор
  function madness(){
    var cache = [];
    return function(a, b){
      putToCache(a, cache);
      putToCache(b, cache);
      return cache.indexOf(b) - cache.indexOf(a);
    }
  }
  //собственно функция перемешивания
  function shuffle(arr){
    var compare = madness();
    return arr.sort(compare);
  }

  function deleteElem(parent) {

    while (parent.lastElementChild) {
      parent.removeChild(parent.lastElementChild)
    }
  }

  function createGameContainerWindow(containerDocument) {
    const formGame = createFormGame()
    const containerGame = createContainerGame()
    const listGame = createListGame()
    let divTimer = intervalDiv()

    containerGame.append(formGame.form);
    
    containerDocument.append(containerGame)

    let arrayGameCart = []

    let timeout;

    let interval;

    formGame.form.addEventListener('submit', (e) => {
      e.preventDefault()

      interval = setInterval(intervalItem, 1000)

      let count = Number(formGame.input.value)

      if (count === 4 || count == 6) {
        formGame.form.classList.remove('active')

        for (let i = 0; i < count * count; i++) {
          arrayIndexCart.push(i) 
        }
  
        for (let i = 0; i< arrayIndexCart.length / 2; i++) {
          arrayGameCart.push(i + 1)
        }
        arrayIndexCart.length = 0
        shuffle(arrayGameCart)
        
        containerGame.append(divTimer)

        containerGame.append(listGame)
        for (let i = 0; i < arrayGameCart.length; i++) { 
          
          
          let cartGameOne = createListGameItem(arrayGameCart[i])
          let cartGameTwo = createListGameItem(arrayGameCart[i])
    
          listGame.append(cartGameOne.itemCart)
          listGame.append(cartGameTwo.itemCart)
  
          const listItem = document.querySelector('ul')
          const liItems = document.querySelectorAll('li')
  
          for (let i = liItems.length; i >= 0; i--) {
  
            listItem.appendChild(liItems[Math.random() * i | 0])
          }
          
          itemNthChild(count)
  
          let opens = document.getElementsByClassName('open')
          
          let listElementActive = listItem.getElementsByClassName('active')
  
          cartGameOne.itemCart.addEventListener('click', (el) => {
            let contentOne = el.target.previousSibling.children[0].innerHTML
            cartGameOne.itemCart.classList.add('open')
            
            if (objCart.one != 0 && objCart.one != contentOne) {
              
              objCart.one = 0
              timeout = setTimeout(() => {
                while(opens.length) {
                  opens[0].classList.remove('open')
                }
              }, 1000)
              return
            }
            objCart.one = contentOne
            
            if (objCart.one != 0 && objCart.two != 0) {
              if (objCart.one === objCart.two) {
                objCart.one = 0
                objCart.two = 0
                cartGameOne.itemCart.classList.add('active')
                cartGameTwo.itemCart.classList.add('active')
                if(listElementActive.length === count * count) {
                  timeout = setTimeout(() => {
                    arrayGameCart.length = 0
                    arrayIndexCart.length = 0
                    deleteElem(listItem) 
                    formGame.form.classList.add('active')
                    formGame.btnStart.classList.add('restart')
                    formGame.btnRestart.classList.remove('restart')
                    formGame.textFormCart.classList.remove('restart')
                    formGame.input.value = ''
                  }, 1000)
                } 
                
                return
              } else {
                objCart.one = 0
                objCart.two = 0
                timeout = setTimeout(() => {
                  while(opens.length) {           
                    opens[0].classList.remove('open')
                  }
                }, 1000)
                return
              } 
            }
          })
  
          cartGameTwo.itemCart.addEventListener('click', (el) => {
            let contentTwo = el.target.previousSibling.children[0].innerHTML
            cartGameTwo.itemCart.classList.add('open')
            
            if (objCart.two != 0 && objCart.two != contentTwo) {
              
              timeout = setTimeout(() => {
                while(opens.length) {               
                  opens[0].classList.remove('open')
                }
              }, 1000)
              objCart.two = 0
              return
            }
            objCart.two = contentTwo
  
            if (objCart.one != 0 && objCart.two != 0) {
              if (objCart.one === objCart.two) {
                objCart.one = 0
                objCart.two = 0
                cartGameTwo.itemCart.classList.add('active')
                cartGameOne.itemCart.classList.add('active')
  
                if(listElementActive.length === count * count) {
                  timeout = setTimeout(() => {
                    arrayGameCart.length = 0
                    arrayIndexCart.length = 0
                    deleteElem(listItem) 
                    formGame.form.classList.add('active')
                    formGame.btnStart.classList.add('restart')
                    formGame.btnRestart.classList.remove('restart')
                    formGame.textFormCart.classList.remove('restart')
                    formGame.input.value = ''
                  }, 1000)
                }
                
                return
              } else {
                objCart.one = 0
                objCart.two = 0
                timeout = setTimeout(() => {
                  while(opens.length) {
                    opens[0].classList.remove('open')
                  }
                }, 1000)
                return
              }
            } 
          }) 
        }

        interval = setInterval(intervalItem, 1000)
        function intervalItem() {
          let counter = divTimer.innerHTML
          const listItem = document.querySelector('ul')
          let listElementActive = listItem.getElementsByClassName('active')
          divTimer.classList.remove('restart')
          if (counter > 0) {
            counter--
            divTimer.innerHTML = counter 
          }
          
          if (counter === 0) {
            clearInterval(interval)
            timeout = setTimeout(() => {
              arrayGameCart.length = 0
              arrayIndexCart.length = 0
              deleteElem(listItem) 
              formGame.form.classList.add('active')
              formGame.btnStart.classList.add('restart')
              formGame.btnRestart.classList.remove('restart')
              formGame.textFormTimer.classList.remove('restart')
              formGame.input.value = ''
            }, 1000)
            divTimer.innerHTML = 60
            divTimer.classList.add('restart')
          }
          if(listElementActive.length === count * count) {
            clearInterval(interval)
            divTimer.classList.add('restart')
            divTimer.innerHTML = 60
            formGame.textFormTimer.classList.add('restart')
          }
        }  
      } else {
        formGame.input.classList.add('errore')
        formGame.input.value = ''
      }
    })
  }
  
  
  document.addEventListener('DOMContentLoaded', () => {

    createGameContainerWindow(document.body)
    
  })
})()