import {useState, useEffect} from "react"
import "./game.css"; 


export default function Game() {
  const date = new Date();
  const getYear = date.getFullYear();
  const [gameContants, setGameConstans] = useState({
    gridCellHeight: 20,
    gridCellWidth: 20,
  });
  const [food, setFood] = useState({});
  const [snake, setSnake] = useState([]);
  const [direction, setDirection] = useState("");
  const [score, setScore] = useState(0)
  const [change, setChange] = useState(false);


  // oyuna yılan ve yemi ekleyen fonksiyon ayrıca oyunu durdurur.
  const startGame = () => {
    setFood(randomValueForSnakeAndFood(18));
    setSnake([randomValueForSnakeAndFood(20)])
    alert("Yön tuşları ile yılanı yönlendir. Duvara ve kendine temas etmemeye dikkat et.")
  }

  // yılan kendi vücuduna temas ettiğinde oyunu sıfırlayan fonksiyon.
  const snakeTouchItself = () =>  {
    alert("Yılana temas etmemeye dikkat et :)")
    setSnake([randomValueForSnakeAndFood(20)])
    setFood(randomValueForSnakeAndFood(18))
    setDirection("")
    setScore(0)
  }

  // yılanın duvara teması halinde oyunu sıfırlayan fonksiyon.
  const neverTouchWall = () => {
    alert("Duvarlara dikkat!")
    setSnake([randomValueForSnakeAndFood(20)])
    setFood(randomValueForSnakeAndFood(18))
    setDirection("")
    setScore(0)
  }

  // map edilen kordinatlı grid hücrelerinin yılanın vücudu ile eşleşen alanlarını kontrol eder eşleşmesi halinde true değerini döner.
  const isItSnake = (e, r) => e.x === r.x && e.y === r.y ;

  // yem ve yılan için oyun başlangıcı ve yanma durumlarında rastgele konum belirler.
  const randomValueForSnakeAndFood = (max) => {
    return {
      x: Math.floor(Math.random() * max ),
      y: Math.floor(Math.random() * max ) 
    }
  }

  // yılanın verilen yön ile otomatik hareket etmesini sağlayan kod bloğu ayrıca
  // yılanın duvara ve kendine temas etmesi veya bir yem yemesi halinde gerekli fonksiyonları çağırır.
  const autoMove = (keyvalue) => {
    let snakeNewBody = [...snake];
    let head = {...snake[snake.length - 1]}
    let newBody = {x:0, y:0}

    
    const eatYourself = (e, head) => e.x === head.x && e.y === head.y ;

      switch(keyvalue) {
        case "ArrowLeft":
          head.y += -1;
          // yılanın kendine temas edip etmediğini kontrol eder
          if(snakeNewBody.some((e) => eatYourself(e,head))) {
            snakeTouchItself();
            return
          }
          // yılanın duvara temas edip etmediğini kontrol eder
          if(head.y === -1 ) {
            neverTouchWall();
            return
          }
          // yılanın yemi yiyip yemediğini kontrol eder eğer yediyse boyunu uzatır
          if (food.x === head.x && food.y === head.y) {
            newBody.x = head.x;
            newBody.y = head.y - 1;
            snakeNewBody.push(head) 
            snakeNewBody.push(newBody) 
            snakeNewBody.shift();
            setSnake(snakeNewBody) 
            setFood(randomValueForSnakeAndFood(19))
            setScore(score + 1)
            return
          }
          break;
        case "ArrowRight":
          head.y += 1;
          if(snakeNewBody.some((e) => eatYourself(e,head))) {
            snakeTouchItself();
            return
          }
          if(head.y === 20) {
            neverTouchWall();
            return
          }
          if (food.x === head.x && food.y === head.y) {
            newBody.x = head.x;
            newBody.y = head.y + 1;
            snakeNewBody.push(head) 
            snakeNewBody.push(newBody) 
            snakeNewBody.shift();
            setSnake(snakeNewBody) 
            setFood(randomValueForSnakeAndFood(18))
            setScore(score + 1)
            return
          }
          break;
        case "ArrowUp":
          head.x += -1;
          if(snakeNewBody.some((e) => eatYourself(e,head))) {
            snakeTouchItself();
            return
          }
          if(head.x === -1) {
            neverTouchWall();
            return
          } 
          if (food.x === head.x && food.y === head.y) {
            newBody.x = head.x - 1;
            newBody.y = head.y;
            snakeNewBody.push(head)
            snakeNewBody.push(newBody)  
            snakeNewBody.shift();
            setSnake(snakeNewBody) 
            setFood(randomValueForSnakeAndFood(18))
            setScore(score + 1)
            return
          }
          break;
        case "ArrowDown":
          head.x += 1; 
          if(snakeNewBody.some((e) => eatYourself(e,head))) {
            snakeTouchItself();
            return
          }
          if(head.x === 20) {
            neverTouchWall();
            return
          }
          if (food.x === head.x && food.y === head.y) {
            newBody.x = head.x + 1;
            newBody.y = head.y;
            snakeNewBody.push(head) 
            snakeNewBody.push(newBody) 
            snakeNewBody.shift();
            setSnake(snakeNewBody) 
            setFood(randomValueForSnakeAndFood(18))
            setScore(score + 1)
            return
          }
          break;
          default:
            return
      }
      snakeNewBody.push(head) 
      snakeNewBody.shift();
      setSnake(snakeNewBody)     
  }


  // tüm oyunun ana fonksiyonu bu kod bloğudur. Klavyede basılan ilk yön tuş autoMove fonksiyonunu tetikler 
  // ve oyunu başlatır yem yenmesi durumunda yılanın boyunu uzatır ayrıca yılanın duvarlara veya kendi vücuduna
  // teması halinde gerekli fonkisyonları çağırarak oyunu sıfırlar.
  const snakeMove = (e) => {
    setDirection(e.code)
    let snakeNewBody = [...snake];
    let head = {...snake[snake.length - 1]}
    let newBody = {x:0, y:0}
    const eatYourself = (e, head) => e.x === head.x && e.y === head.y ;

    switch (e.code) {
                  case "ArrowLeft":  
                  head.y += -1;
                  // yılanın kendine temas edip etmediğini kontrol eder
                  if(snakeNewBody.some((e) => eatYourself(e,head))) {
                    snakeTouchItself();
                    return
                  }
                  // yılanın duvara temas edip etmediğini kontrol eder
                  if(head.y === -1 ) {
                    neverTouchWall();
                    return
                  }
                  // yılanın yemi yiyip yemediğini kontrol eder eğer yediyse boyunu uzatır
                  if (food.x === head.x && food.y === head.y) {
                    newBody.x = head.x;
                    newBody.y = head.y - 1;
                    snakeNewBody.push(head) 
                    snakeNewBody.push(newBody) 
                    snakeNewBody.shift();
                    setSnake(snakeNewBody) 
                    setFood(randomValueForSnakeAndFood(19))
                    setScore(score + 1)
                    return
                  }
                  snakeNewBody.push(head) 
                  snakeNewBody.shift();
                  setSnake(snakeNewBody) 
                  break;    
                  case "ArrowUp":    
                  head.x += -1; 
                  if(snakeNewBody.some((e) => eatYourself(e,head))) {
                    snakeTouchItself();
                    return
                  }
                  if(head.x === -1) {
                    neverTouchWall();
                    return
                  }
                  if (food.x === head.x && food.y === head.y) {
                    newBody.x = head.x - 1;
                    newBody.y = head.y;
                    snakeNewBody.push(head)
                    snakeNewBody.push(newBody)  
                    snakeNewBody.shift();
                    setSnake(snakeNewBody) 
                    setFood(randomValueForSnakeAndFood(18))
                    setScore(score + 1)
                    return
                  }
                  snakeNewBody.push(head) 
                  snakeNewBody.shift();
                  setSnake(snakeNewBody) 
                  break;
                  case "ArrowRight": 
                  head.y += 1; 
                  if(snakeNewBody.some((e) => eatYourself(e,head))) {
                    snakeTouchItself();
                    return
                  }
                  if(head.y === 20) {
                    neverTouchWall();
                    return
                  }
                  if (food.x === head.x && food.y === head.y) {
                    newBody.x = head.x;
                    newBody.y = head.y + 1;
                    snakeNewBody.push(head) 
                    snakeNewBody.push(newBody) 
                    snakeNewBody.shift();
                    setSnake(snakeNewBody) 
                    setFood(randomValueForSnakeAndFood(18))
                    setScore(score + 1)
                    return
                  }
                  snakeNewBody.push(head) 
                  snakeNewBody.shift();
                  setSnake(snakeNewBody) 
                  break;
                  case "ArrowDown":  
                  head.x += 1; 
                  if(snakeNewBody.some((e) => eatYourself(e,head))) {
                    snakeTouchItself();
                    return
                  }
                  if(head.x === 20) {
                    neverTouchWall();
                    return
                  }
                  if (food.x === head.x && food.y === head.y) {
                    newBody.x = head.x + 1;
                    newBody.y = head.y;
                    snakeNewBody.push(head) 
                    snakeNewBody.push(newBody) 
                    snakeNewBody.shift();
                    setSnake(snakeNewBody) 
                    setFood(randomValueForSnakeAndFood(18))
                    setScore(score + 1)
                    return
                  }
                  snakeNewBody.push(head) 
                  snakeNewBody.shift();
                  setSnake(snakeNewBody) 
                  break;
                  default: return;
              }
              
  }


let emptyRows = [] 
emptyRows = () => [...Array(gameContants.gridCellWidth)].map((e, x) => [...Array(gameContants.gridCellHeight)].map((r, y) => {return {x:x, y:y}} ));
const gridboard = emptyRows();

// 20 * 20 şeklinde grid tablosu oluşturan map fonksiyonu.
const createGridBoard = gridboard.map((e,i) => {
 return e.map((r, p) => {
   if (r.x === food.x && r.y === food.y) {
     return <div key={`${r.x} / ${r.y}`} className="gridFoodCell" />
   } 
   if(snake.some((e) => isItSnake(e,r))) {
    return <div  key={`${r.x} / ${r.y}`} className="gridSnakeCell" />
   } 
     return <div key={`${r.x} / ${r.y}`} className="gridCell" /> 
  })
})

// otomatik yönlendirmeyi sağlayan fonksiyonu 3ms'de bir çalıştırır.
useEffect(() => {
  setTimeout(() => {
    setChange(!change)
    },300)
  autoMove(direction)
},[change])

// useEffect'in tetiklenmesi için dependency değişkeni 3ms'de bir değiştirir.


  return (
    <div className="container" onKeyDown={(e) => snakeMove(e)}  tabIndex="1">
      <div className="gameWrapper">
        <div className="scoreBoard" >
    <p className="scoreNumber">Skor: {score}</p>
        </div>
      <div className="gridBoard" >
        {createGridBoard}
      </div>
      <button onClick={() => startGame()} className="button" >Oyunu Başlat</button>
      <span className="footerText">Diyar Kılıç - {getYear} </span>
      </div>
    </div>
  )
}



