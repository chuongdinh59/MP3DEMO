// ================== Loader =====================
const loader = document.querySelector(".loader")
window.addEventListener("load" , (e) => {
    setTimeout(() => {
        loader.parentElement.removeChild(loader)
    },800);
})
var allSlide = document.querySelectorAll(".slide")
const current = allSlide.length
const z = 1.5
// ========== khoi tao carousel ==================
const activeElement = document.querySelector(".active")
function handle (activeElement){
  var temp = [...allSlide]
      var index = temp.indexOf(activeElement)
      var i = 0
      var next = []
      var index_temp = index;
      while( i < Math.floor(allSlide.length/2) ){
        if ( index_temp > allSlide.length  - 2)
          index_temp = -1
        next.push(temp[index_temp + 1])
        index_temp++;
        i++;
      }
      next.forEach((item, index) => {
        item.style.transform  = `translate3d(${(index + 1) * 50}%,${0},${-(100 + index * 1.5*100 )}px)`
      })
      var pre = []
      var j = 0;
      var indexPre = index - 1
      while( j < Math.floor(allSlide.length/2) ){
        if ( indexPre < 0){
          indexPre = allSlide.length - 1
        }
        pre.push(temp[indexPre])
         indexPre--;
        j++;
      }
      pre.forEach((item, index) => {
        item.style.transform  = `translate3d(${-(index + 1) * 50}%,${0},${-(100 + index * 1.5*100 )}px)`
      })
}
handle(activeElement)
allSlide.forEach(item=>{
  item.addEventListener("click", e => {
    document.querySelector(".active").classList.remove("active")
    e.currentTarget.classList.add("active")
    handle(e.currentTarget)
  })
})  




// ================container-child-private=============
const container = document.querySelector(".container_1-child-1")
const listContainer = document.querySelectorAll(".container_1-child .child")
const category = document.querySelectorAll(".category__link")
document.addEventListener("DOMContentLoaded", () => {
  listContainer.forEach( (item,index) => {0
    item.style.transform = `translateX(${index * 120}%)`
  })
})
category.forEach((item) => {
  item.addEventListener("click", (e)=> {
      document.querySelector(".active-chose").classList.remove("active-chose")
      e.currentTarget.parentElement.classList.add("active-chose")
      const currentIndex = [...category].indexOf(e.currentTarget);
      container.style.transform = `translateX(${-currentIndex * 120}%)`
  })  
})


// ==================Live search==================== 
const songs = [
  {
      name: "Va Vào Giai Điệu Này",
      thumb: "img/mck.jpg",
      path: "music/Va Vào Giai Điệu Này.mp3",
      singer: "MCK"
  },
  {
      name: "Mai",
      thumb: "img/jimmy.jpg",
      path: "music/Mai.mp3",
      singer: "Jimmy"
  },
  {
      name: "Vì Yêu Cứ Đâm Đầu",
      thumb: "img/min.jpg",
      path: "music/ViYeuCuDamDau.mp3",
      singer: "Min"
  },
  {
    name: "Lớn Rồi",
    thumb: "img/dsk.jpg",
    path: "music/LonRoi.mp3",
    singer: "DSK"
  },
  {
    name: "Ngày Lang Thang",
    thumb: "img/den.jpg",
    path: "music/NgayLangThang.mp3",
    singer: "Đen" 
  },
  {
      name: "Cưới Thôi",
      thumb: "img/bray.jpg",
      path: "music/Cưới thôi.mp3", 
      singer: "bray ft tap"
  },
  {
      name: "Ghé Qua",
      thumb: "img/dick.jpg",
      path: "music/Ghé qua.mp3",
      singer :"Dick ft Tofu"
  },
  // {
  //     name: "Phiêu Bồng",
  //     thumb: "img/tofu.jpg",
  //     path: "music/Phiêu Bồng.mp3",
  //     singer: "Tofu"
  // },
  {
    name: "BSNL2",
    thumb: "img/youngH.jpg",
    path: "music/BSNL2.mp3",
    singer: "YoungH ft Bray"
},
  {
      name: "Wu Sen Mi Nu",
      thumb: "img/Liu_Grace.jpg",
      path: "music/wu sen mi nu.mp3",
      singer: "Liu Grace "
  }   
]
const searchConatiner = document.querySelector(".container__header-search ")
const searchHistory = document.querySelector(".search__container")
const searchTimes = document.querySelectorAll(".btn__times")
const containerGr = document.querySelector(".container__gr")
const barSearch = document.querySelector(".searchItem")
const icon = document.querySelectorAll(".fa-times")

barSearch.addEventListener("click" , (e) => {
  e.target.parentElement.classList.add("show-search");
  if ( searchHistory.children.length == 0)
          searchConatiner.classList.remove("show-search")
})
searchTimes.forEach(item => {
  item.addEventListener("click", (e) => {
    searchHistory.removeChild(e.currentTarget.parentElement)
    if ( searchHistory.children.length == 0)
          searchConatiner.classList.remove("show-search")
  })
})
function checkIcon (key) {
  for ( let i = 0 ; i < icon.length ; i++)
      if ( icon[i] == key)
        return false;
  return true;
}
document.addEventListener("click", (e) => {
    // console.log(e.target);
  if (e.target.parentElement.parentElement.parentElement
     != searchHistory
     && e.target.parentElement.parentElement != searchHistory
     && e.target.parentElement  !=searchHistory
      &&  e.target != barSearch && checkIcon(e.target)
    ){
      // Viet ham thay the
      // Lam tam sau nay hoan thien roi sua lai ~~ 
      // ?? 
      searchConatiner.classList.remove("show-search")
    }
})
var fillter
barSearch.addEventListener("keyup", (e) => {
    const key = barSearch.value.toUpperCase();
    if ( key != "") {
      // searchConatiner.classList.remove("show-search")
       fillter = songs.filter(item => {
        return item.name.toLocaleUpperCase().includes(key) || item.singer.toLocaleUpperCase().includes(key)
      })
      displaySearch(fillter)
    }
    else {
        fillter = []
        for ( let i = 0 ; i < 5 ; i++){
          fillter.push({name:songs[i].name})
        }
        displaySearch(fillter)
    }
})

function displaySearch (array) {
    const element = array.map(item => {
      return `<li class="search__item">
      <div class="search__link">
          <i class="fas fa-search"></i>
         <p>${item.name}</p> 
      </div>
          <a href="#" class="btn__times">
              <i class="fas fa-times"></i>
          </a>  
  </li>`
    }).join('')
    searchHistory.innerHTML = element
   
}


// ====================Theme======================
const btnTheme = document.querySelector
(".conatainer__header-control .control-item:first-child .control-link")
const timebtn = document.querySelector(".btn__times-theme")
btnTheme.addEventListener("click", () => {
  document.querySelector(".theme").classList.add("show-theme")
})

timebtn.addEventListener("click", () => {
  document.querySelector(".theme").classList.remove("show-theme")

})
// **Thu gon o phan tren
document.addEventListener("click", (e) => 
{
  if ( e.target.matches(".theme")){
    document.querySelector(".theme").classList.remove("show-theme")
  }
})

const colorbg =[
  [
    // nav_color: 
    "#7A2323",
    // theme_slide: 
    "#883236",
    // container: 
    "#731717",
    // listen: 
    "#5C1212",
    // search_his: 
    "#883236",
  ],
  [
    "#294162",
     "#274A78",
    "#1D375A",
    "#172C48",
    "#274A78",
  ],
  [
    "#1E4E3E",
    "#126E54;",
    "#124534",
    "#264B3F",
    "#126E54",
  ]
]
async function setColor(color){
  const header__nav = document.querySelector(".header__nav")
  const theme__main =  document.querySelector(".theme__main")
  const container = document.querySelector(".container")
  const listen = document.querySelector(".listen")
  const search__container = document.querySelector(".search__container")
  var value = [header__nav, 
    theme__main, container, listen, search__container]
  
  value.forEach((item,index) => {
    item.style.backgroundColor = colorbg[color][index]
  })
}
var indexDefault = 2
const btnsee = document.querySelectorAll(".chosen .overplay .btn.btn-see")
const btnuse = document.querySelectorAll(".chosen .overplay .btn.btn-use")
function handleBtn(arraybtn) {  
  arraybtn.forEach((item,index) => {
    item.addEventListener("click" , (e) => {
        if( e.currentTarget.parentElement.classList.contains("red")){
              if ( e.target == btnsee[0] ||  e.target == btnsee[1]){
                setColor(index).then(()=> {
                  document.addEventListener("click" , (e)=>{
                    if ( e.target === document.querySelector(".theme")){
                      setColor(indexDefault)
                      // console.log(1);
                    }
                  })
                })
              }
                else {
                   setColor(index).then(() =>{
                  document.addEventListener("click" , (e)=>{
                    if ( e.target === document.querySelector(".theme")){
                      setColor(index)
                      indexDefault = index
                    }
                  })
                })
                }
        }
        else if( e.currentTarget.parentElement.classList.contains("blue"))
         {
          if ( e.target == btnsee[0] ||  e.target == btnsee[1]){
            setColor(index).then(()=> {
              document.addEventListener("click" , (e)=>{
                if ( e.target === document.querySelector(".theme")){
                  setColor(indexDefault)
                }
              })
            })
          }
            else {
               setColor(index).then(() =>{
              document.addEventListener("click" , (e)=>{
                if ( e.target === document.querySelector(".theme")){
                  {
                    setColor(index)
                    indexDefault = index
                  }  
                }
              })
            })
            }
        } 
    })
  })
}
// Co bug
handleBtn(btnsee)
handleBtn(btnuse)




// ===============MUSIC PLAYER==================
const songList = document.querySelectorAll(".songs__list")
const cd = document.querySelector(".cd img")
const audio = document.getElementById("audio")
const timeEnd = document.querySelector(".end")
const playBtn = document.querySelector(".btn-toggle-play")
const timeStart = document.querySelector(".start")
const range = document.querySelector("#progress")
const nextBtn = document.querySelector(".btn-next")
const preBtn = document.querySelector(".btn-prev")
const randomBtn = document.querySelector(".btn-random")
const repeatBtn = document.querySelector(".btn-repeat")
const listImg = document.querySelectorAll("label")
const volume  = document.querySelector(".volumn__range")
const speakerBtn = document.querySelector(".btnspeaker")
const playAll = document.querySelector(".playall")
const searchItem = document.querySelectorAll(".search__item")
const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom:false,
  isRepeat: false,
  isSpeaker: true,
  songs: songs,
  render: function () {
      const htmlRender = songs.map(((song,index) => {
          return `<li class="songs__item  
          ${index == this.currentIndex ? 'active__song' :''}
          " data-index = ${index} }>
          <div class="song__name">
              <img src="${song.thumb}" alt="#">
              <div class="name">
                  <p>${song.name}</p>
                  <p>${song.singer}</p>
              </div>
          </div>
          <span>${getTime(song,index)}</span>
          <div class="reaction">
              <a href="#" class="heart">
                  <i class="far fa-heart"></i>
              </a>
              <a href="#" class="more">
                  <i class="fas fa-ellipsis-h"></i>
              </a>
          </div>
      </li>`
      })).join('')
      songList.forEach(item=> {item.innerHTML = htmlRender})
      listImg.forEach((item,index) => {
          const element = document.createElement("img")
          element.setAttribute("src", this.songs[index].thumb)
          item.setAttribute("data-index", index)
          item.appendChild(element)
      })
   
  },
  loadCurrentSong: function (){
    cd.setAttribute("src", this.currentSong.thumb)
    audio.setAttribute("src",this.currentSong.path)
  },
  defineProperties: function () {
    Object.defineProperty(this,"currentSong",{
      get: function (){
        return this.songs[this.currentIndex]
      }
    })
  },
  handleEvent: function () {
    const _this = this;
    // rotate cd
    const cdRotate = cd.animate([
      {transform: 'rotate(360deg)'}
    ],{
      duration: 10000,iterations:Infinity
    })
    cdRotate.pause()
    playBtn.addEventListener("click" , (e)=> {
        if ( _this.isPlaying){
            audio.pause()
            cdRotate.pause()
        }
        else {
            audio.play()
            cdRotate.play()
        }
    })
    audio.onplay = function () {
      _this.isPlaying = true;
      playBtn.classList.add("playing")
    }
    audio.onpause = function () {
      _this.isPlaying = false;
      playBtn.classList.remove("playing")
    } 
    
    audio.ontimeupdate = function (){
      if ( audio.duration){
          const progressPercent =  audio.currentTime/audio.duration * 100;
          range.value = progressPercent
         
      } 
      timeStart.innerHTML = format(audio.currentTime)
      timeEnd.innerHTML = format(audio.duration)
    }
    // seek
    range.addEventListener("input" , (e) => {
      const precent = e.target.value
      // doi sang giay 
      let second = (audio.duration*precent / 100)
      audio.currentTime = second
      timeStart.innerHTML = format(second);
    })
    nextBtn.addEventListener("click", () => {
      if ( _this.isRandom ){
        _this.radomSong()
      }
      else {
      _this.nextSong()
      }
      cdRotate.play()
      audio.play()
      _this.changeactive()
      _this.scrollintoView()
    })
    preBtn.addEventListener("click", () => {
      if ( _this.isRandom ){
        _this.radomSong()
      }
      else {
        _this.preSong()
      }
      audio.play()
      cdRotate.play()
      _this.changeactive()
      _this.scrollintoView()

    })
    randomBtn.addEventListener("click" , () => {
      _this.isRandom = !_this.isRandom
      randomBtn.classList.toggle("active-ra-re", _this.isRandom)
    })
    repeatBtn.addEventListener("click", () =>{
      _this.isRepeat = !_this.isRepeat
      repeatBtn.classList.toggle("active-ra-re", _this.isRepeat)
    })
    audio.onended = function () {
      if (_this.isRepeat ){
        audio.play()
      }
      else{
        nextBtn.click()
      }
    }

    songList.forEach(item=> {
      const clickList = item.querySelectorAll(".songs__item")
      clickList.forEach(item => {
        item.addEventListener("click", (e) => {
          if ( !e.currentTarget.classList.contains("active__song"))
          {
              _this.currentIndex = e.currentTarget.dataset.index;
              _this.loadCurrentSong()
              audio.play()
              _this.changeactive()
              cdRotate.play()
             _this.changeactiveLable()

             
          }
        })
      })
    })

    listImg.forEach(item => {
        item.addEventListener("click", e => {
          if ( e.currentTarget.dataset.index != _this.currentIndex) 
            {
                  _this.currentIndex = e.currentTarget.dataset.index
                  _this.loadCurrentSong()
                  audio.play()
                  _this.changeactive()
                  cdRotate.play()
                  songList.forEach(item => {
                    item.querySelector(".active__song").classList.remove("active__song");
                    item.querySelectorAll(".songs__item")[e.currentTarget.dataset.index].classList.add("active__song");
                  })  
                  _this.scrollintoView()
            }
            
        })
    })
    volume.addEventListener("input", (e)=> {
        volume.value = e.target.value
        audio.volume = e.target.value / 100
        console.log(e.target.value/100);
        if ( volume.value == 0 || audio.volume == 0)
          speakerBtn.classList.remove("active-speak")
          else 
          speakerBtn.classList.add("active-speak")
    })
    speakerBtn.addEventListener("click", (e) => {
        _this.isSpeaker = !_this.isSpeaker
        speakerBtn.classList.toggle("active-speak", _this.isSpeaker)
        if (!_this.isSpeaker){
          audio.volume = 0
          volume.value = 0
        }
        else {
          _this.initVolume()
        }
    })
    playAll.addEventListener("click", (e)=> {
        _this.currentIndex = 0;
        _this.loadCurrentSong()
        _this.changeactive()
        _this.scrollintoView()
        cdRotate.play()
        audio.play()
    })
    searchItem.forEach(item => {
      item.addEventListener("click", (e) => {
          const valueSearch = e.currentTarget.querySelector(".search__link p").innerHTML
          const songName = songs.map(item => {
            return item.name;
          })  
          _this.currentIndex = songName.indexOf(valueSearch)
          _this.loadCurrentSong()
          _this.scrollintoView()
          _this.changeactive()
          _this.changeactiveLable()
          cdRotate.play()
          audio.play()

      })
    })
    barSearch.addEventListener("keyup", (e)=> {
        const searchedList = document.querySelectorAll(".search__item")
        const songName = songs.map(item => {
          return item.name;
        })  
        searchedList.forEach(item => {
          item.addEventListener("click" , (e) => {
            const valueSearched =  e.currentTarget.querySelector(".search__link p").innerHTML
            _this.currentIndex = songName.indexOf(valueSearched)
            console.log(songName.indexOf(valueSearched));
            _this.loadCurrentSong()
            _this.scrollintoView()
            _this.changeactive()
            _this.changeactiveLable()
            cdRotate.play()
            audio.play()
          })
        })
       
    })
  },
  nextSong: function(){
    this.currentIndex++;
    if ( this.currentIndex >= this.songs.length){
      this.currentIndex = 0
    }
    this.loadCurrentSong()
  },
  preSong: function(){
    this.currentIndex--;
    if ( this.currentIndex < 0){
      this.currentIndex = this.songs.length - 1
    }
    this.loadCurrentSong()
  },
  radomSong: function () {
    let newIndex 
    do{
        newIndex = Math.floor(Math.random() * this.songs.length)
    }while(this.currentIndex == newIndex)
    this.currentIndex = newIndex
    this.loadCurrentSong()
  },

  changeactive : function () {
    songList.forEach(item => {
      item.querySelector(".active__song").classList.remove("active__song");
      item.querySelectorAll(".songs__item")[this.currentIndex].classList.add("active__song");
    })  
  },
  changeactiveLable : function (){
    document.querySelector(".slide.active").classList.remove("active");
    const t = listImg[this.currentIndex].classList.add("active")
    handle( document.querySelector(".slide.active"))
  },
  scrollintoView: function () {
    setTimeout(()=> {
      songList[0].querySelector(".active__song").scrollIntoView({
            behavior: 'smooth', block:'nearest'
          })
    },300
    ) 
  },

  initVolume: function (){
      audio.volume = 1
      volume.value = 100
  },

  start: function(){
    this.defineProperties()
    this.render()
    this.initVolume()
    this.loadCurrentSong()
    this.handleEvent()
  }
}
app.start()

function format(value) {
  var  minute = Math.floor(value/60)
  var second = Math.floor(value%60)
  if (value === NaN){
    return `0:00`
  }
  if ( value < 60){
    if ( second < 10)
        return `0:0${second}`
      return `0:${second}`
  }
  if (second < 10 ){
    second = `0${minute}`
  }
    return `${minute}:${second}`
}
function getTime (song, index){
  const element = document.createElement("audio")
  element.classList.add("adu")
  element.setAttribute("src", song.path)
  element.setAttribute("preload", "metadata")
  const p =  new Promise(resolve => {
    element.onloadedmetadata = function() {
      resolve(element.duration);
  }
  }).then(data => {
      songList.forEach(item=> {
        item.querySelectorAll(".songs__item span")[index].innerText
       = format(data)
      })
  })
}

