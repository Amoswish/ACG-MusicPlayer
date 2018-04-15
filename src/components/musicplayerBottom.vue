<template>
        <div class="Music-Player-bottom" >
            <div class="Music-Player-bottom-picture">
            <!-- 音乐进度条 -->
                <div class="progress-bar" style="display: flex;"    ref="progressBar" @click="touchSlider">
                    <div class="progress-bar-left"  :style="{width:haveplayed+'px'}"  ref="progressBarLeft"></div>
                    <div class="progress-bar-slider" @touchmove="moveSlider" @mousemove="moveSlider" @mousedown="mouseDown" @mouseup="mouseUp"></div>
                    <div class="progress-bar-right" :style="{width:willplay+'px'}" ref="progressBarRight"></div>
                </div>          
                <router-link class="link" @click.native="linkToMusicDetail" to="/MusicDetail">
                <img :src="playerimg" alt="" >
                </router-link>
                <div style="margin-top:10px; font-size:30px">{{playingmusicname}}</div><br>
                <audio id ="playerInBottom" loop="loop"   ref ="playerInBottom" autoplay="true" @timeupdate="updateTime"  ></audio>
                <button class="button-small button button-calm ion-chevron-left" @click="playLastSong()"></button>
                <button :class="played?'ion-pause':'ion-play' " class ="button-small button button-calm "  @click="playMusic()"></button>
                <button class="button-small button button-calm ion-chevron-right" @click="playNextSong()"></button>
                <button class="button-small button button-royal">l</button>
            </div>
      </div>
</template>
<script>
  //导入vuex的仓库
  import store from '../vuex/store'
  export default {
    data () {
      return {
        haveplayed:0,
        willplay:0,
        processwidth:0,
        persent:0,
        playerimg: require('../assets/1.jpg'),
        tabIndex: 0,
        isMouseDown:"false",
        played:true,
        playingmusicname:"",
        currentTime:''
      }
 
    },
    props:{
      neededplayingsong:0
    }, 
    watch:{
      //监视进度条变化
      persent:function(val){
        let media = this.$refs.playerInBottom
        this.haveplayed = this.persent;
        this.willplay = this.processwidth-this.persent;
        if(this.willplay < 5){
          store.commit('playNextSong',media)
          let Nextplay= store.state.playerIndex
          media.src =store.state.musicList[Nextplay].musicSrc
          this.playingmusicname = store.state.musicList[Nextplay].musicName
        }
      },
      neededplayingsong:function(val){
        let media = this.$refs.playerInBottom
        media.src =store.state.musicList[this.neededplayingsong].musicSrc
        this.playingmusicname = store.state.musicList[this.neededplayingsong].musicName
      }
    },
    methods: {
      playLastSong(){
        let media = this.$refs.playerInBottom
        store.commit('playLastSong',media)
        let Lastplay= store.state.playerIndex
        media.src =store.state.musicList[Lastplay].musicSrc
        this.playingmusicname = store.state.musicList[Lastplay].musicName
      },
      playNextSong(){
        let media = this.$refs.playerInBottom
        //let media = document.getElementById("playerInBottom")
        store.commit('playNextSong',media)
        let Nextplay= store.state.playerIndex
        media.src =store.state.musicList[Nextplay].musicSrc
        this.playingmusicname = store.state.musicList[Nextplay].musicName
      },
      playMusic(){
        let media = this.$refs.playerInBottom
        store.commit('changeSong',media)
        //let media = document.getElementById("playerInBottom")
        if(media.paused) {  
        media.play()
        this.played = true
        } 
        else {  
        media.pause()
        this.played = false
        }  
      },
      //进度条随时间变化
      updateTime(e){
        //console.log(e.target.currentTime);
        let currentTime = e.target.currentTime
        let duration = e.target.duration
        this.persent = this.processwidth*currentTime/duration
        return this.persent
      },
      //进度条事件
      touchSlider(e){
        e.preventDefault()
        //点击播放器中的进度条改变播放器播放进度
        let clickprocess = e.clientX-this.$refs.progressBarLeft.getBoundingClientRect().x
        this.haveplayed = clickprocess
        this.willplay = this.processwidth-clickprocess
        //修改音频播放进度
        this.$refs.playerInBottom.currentTime = (clickprocess/this.processwidth)*this.$refs.playerInBottom.duration
        this.persent = clickprocess
        
      },
      mouseDown(){
        this.isMouseDown = "true"
      },
      mouseUp(){
        this.isMouseDown = "false"
      },
      moveSlider(e){
        //移动播放器中的小滑块改变播放器播放进度
        e.preventDefault()
        //点击播放器中的进度条改变播放器播放进度
        if(isMouseDown){
        let moveprocess = e.clientX-this.$refs.progressBarLeft.getBoundingClientRect().x
        this.haveplayed = moveprocess
        this.willplay = this.processwidth-moveprocess
        //修改音频播放进度
        this.$refs.playerInBottom.currentTime = (moveprocess/this.processwidth)*this.$refs.playerInBottom.duration
        this.persent = clickprocess
        }
      },
      linkToMusicDetail(e){
        //router跳转时保存当前播放的音乐的状态
        let media = this.$refs.playerInBottom
        //let media = document.getElementById("playerInBottom")
        store.commit('savePlayerState',media)
        //console.log(store.state.playercurrenttime)
      }
    },
    mounted:function initIndexPage(){
      //初始化播放链接
      let media = this.$refs.playerInBottom
      let initplay= store.state.playerIndex
      media.src =store.state.musicList[initplay].musicSrc
      this.playingmusicname = store.state.musicList[initplay].musicName
      //初始化进度条长度
      let player = document.getElementsByClassName("Music-Player-bottom")
       console.log(player)
      this.processwidth = player[0].offsetWidth*0.97;
      this.willplay = this.processwidth-1;
      //初始化推荐列表
      //store.commit('getRecommandList')
      //修改当前播放器时间为跳转页面之前的时间   
        media.currentTime = store.state.playercurrenttime
        console.log(store.state.playercurrenttime)
    }
  }
</script>
<style scoped>
  /* h2 {
    font-family: Candara,Calibri,Segoe,Segoe UI,Optima,Arial,sans-serif;
    color: #888;
  }

  .page.has-navbar .page-content {
    padding-top: 100px;
  } */
  .Music-Player-bottom {
    display: flex;
    position: fixed;
    bottom: 3%;
    left: 5%;
    height: 15%;
    width: 90%;
    border-style:solid;
    border-color:black;
    border-width: 1px;
    box-shadow: 10px 10px 5px #87c6eb;
  }
  .Music-Player-bottom-picture > .link >img {
    float: left;
    margin-left: 3%;
    margin-top: 3%;
    width: 30%;
    height: 70%;
  }
  .Music-Player-bottom > audio{
    border-style:solid;
    width: 50%;
  }
  .Music-Player-bottom > button{
    width: 3%;
    height: 3%;
    border: none;
    background-color: aqua;
  }
  .progress-bar {
    margin-top: 0px;
    height: 8px;
  }
  .progress-bar > .progress-bar-left{
    
    display:block; 
    background:#d8eb28; 
    width:0; 
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    background-image:linear-gradient(-45deg,rgba(255,255,255,.2) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.2) 50%,rgba(255,255,255,.2) 75%,transparent 75%,transparent); 
    /* -webkit-transition:width .8s ease; 
    -moz-transition:width .8s ease; 
    transition:width .8s ease;
    -webkit-animation:progressbar 7s infinite; 
    animation:progressbar 7s infinite */
  }
  .progress-bar > .progress-bar-right{
    
    display:block; 
    background:gray; 
    width:0; 
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .progress-bar > .progress-bar-slider{
    width: 10px;
    border-radius: 5px;
    border-color: black;
    background-color: blue;
  }
  .playedInMusicList{
    height: 30px;
  }
</style>