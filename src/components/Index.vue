<template>
  <div class="page has-navbar" v-nav="{ title: 'ACG Music Player' }">
    <div class="page-content text-center">
      <tabs class="tabs music-header"   :tab-items="tabs" :tab-index="tabIndex" :on-tab-click="onTabClick"></tabs>
      <div class="main-content">
        <div v-if="tabIndex==0" class="recommand">
          <accordion class="recommand-list" v-for="recommandMusic in recommandList">
            <accordion-item :title="recommandMusic.recommandTitle" content-height="110">
            <p>{{recommandMusic.recommandContent}}
            </p>
            </accordion-item>
          </accordion>
        </div>
        <div v-if="tabIndex==1" class="myMusic">
            <accordion class="">
            <accordion-item title="农夫" content-height="110">
            <p>
              如果有一天我能够拥有一个大果园，
              我愿放下所有追求做个农夫去种田，
              每一个早晨我耕耘在绿野田园，
              每一个黄昏我守望在乡间的麦田。
              我会把忧虑都融化在夕阳里，
              让孤独的心等待秋收的欢喜。
            </p>
            </accordion-item>
            <accordion-item title="渔夫" content-height="110">
            <p>
              如果有一天我能够拥有一条渔船，
              我愿放下所有执着做个渔夫住在海边，
              每一个早晨我航行在晨曦的海面，
              每一个黄昏我遥望在无际的海云间。
              我会把思绪都消失在波涛里，
              让澎湃的心等待风雨后的平息。
            </p>
            </accordion-item>
          </accordion>
        </div>
        <div v-if="tabIndex==2" class="search">
            <accordion>
            <accordion-item title="农夫" content-height="110">
            <p>
              如果有一天我能够拥有一个大果园，
              我愿放下所有追求做个农夫去种田，
              每一个早晨我耕耘在绿野田园，
              每一个黄昏我守望在乡间的麦田。
              我会把忧虑都融化在夕阳里，
              让孤独的心等待秋收的欢喜。
            </p>
            </accordion-item>
            <accordion-item title="渔夫" content-height="110">
            <p>
              如果有一天我能够拥有一条渔船，
              我愿放下所有执着做个渔夫住在海边，
              每一个早晨我航行在晨曦的海面，
              每一个黄昏我遥望在无际的海云间。
              我会把思绪都消失在波涛里，
              让澎湃的心等待风雨后的平息。
            </p>
            </accordion-item>
          </accordion>
        </div>
      </div>
      <h2 class="padding" v-text="msg"></h2>
      <div class="Music-Player-bottom" style="display: flex;">
        <div class="Music-Player-bottom-picture">
          
          <router-link class="link" @click.native="linkToMusicDetail" to="/MusicDetail">
          <img :src="playerimg" alt="" >
          </router-link>
        </div>
        <audio id ="playerInBottom" loop="loop" :src="audiosrc"  ref ="playerInBottom" autoplay="true" @timeupdate="updateTime"></audio>
        <button class="ion-chevron-left"></button>
        <button :class="played?'ion-pause':'ion-play'" @click="playMusic()"></button>
        <button class="ion-chevron-right"></button>
        <div class="progress-bar" style="display: flex;"    ref="progressBar" @click="touchSlider">
          <div class="progress-bar-left"  :style="{width:haveplayed+'px'}"  ref="progressBarLeft"></div>
          <div class="progress-bar-slider ion-happy-outline"  @mousemove="moveSlider" @mousedown="mouseDown" @mouseup="mouseUp"></div>
          <div class="progress-bar-right" :style="{width:willplay+'px'}" ref="progressBarRight"></div>
        </div>
        <button>loop</button>
      </div>
      <!-- <div><router-link class="button button-assertive" to="/about">
        <i class="ion-information-circled"></i> About
      </router-link></div> -->
      
    </div>
  </div>
</template>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script>
  //导入vuex的仓库
  import store from '../vuex/store'
  export default {
    data () {
      return {
        msg: 'My First  MusicPlayer.',
        audiosrc:'http://sc1.111ttt.cn/2016/1/12/10/205102107353.mp3',
        msaag: 'ss',
        tabs: [
        "推荐",
        "我的音乐",
        "搜索"
        ],
        haveplayed:'1',
        willplay:'199',
        persent:'0',
        playerimg: require('../assets/1.jpg'),
        tabIndex: 0,
        isMouseDown:"false",
        recommandList:[
          {
            recommandTitle:"推荐1",
            recommandContent:"如果有一天我能够拥有一个大果园",
          },
          {
            recommandTitle:"推荐2",
            recommandContent:"aaaz"
          }
        ],
        played:true,
      }
      currentTime:''
    },
    watch:{
      persent:function(val){
        this.haveplayed = this.persent;
        this.willplay = 200-this.persent;
        //console.log(val+"sss")
      },
    },
    methods: {
      onTabClick(index) {
        this.tabIndex = index
      },
      playMusic(){
        let media = document.getElementById("playerInBottom")
        if(media.paused) {  
        media.play();
        this.played = true;
        } 
        else {  
        media.pause();
        this.played = false;
        }  
      },
      //进度条随时间变化
      updateTime(e){
        //console.log(e.target.currentTime);
        let currentTime = e.target.currentTime;
        let duration = e.target.duration
        this.persent = 200*currentTime/duration;
        return this.persent;
      },
      //进度条事件
      touchSlider(e){
        e.preventDefault()
        //点击播放器中的进度条改变播放器播放进度
        let clickprocess = e.clientX-this.$refs.progressBarLeft.getBoundingClientRect().x;
        this.haveplayed = clickprocess;
        this.willplay = 200-clickprocess;
        //修改音频播放进度
        this.$refs.playerInBottom.currentTime = (clickprocess/200)*this.$refs.playerInBottom.duration;
        this.persent = clickprocess;
        
      },
      mouseDown(){
        this.isMouseDown = "true";
      },
      mouseUp(){
        this.isMouseDown = "false";
      },
      moveSlider(e){
        //移动播放器中的小滑块改变播放器播放进度
        e.preventDefault()
        //点击播放器中的进度条改变播放器播放进度
        if(isMouseDown){
        let moveprocess = e.clientX-this.$refs.progressBarLeft.getBoundingClientRect().x;
        this.haveplayed = moveprocess;
        this.willplay = 200-moveprocess;
        //修改音频播放进度
        this.$refs.playerInBottom.currentTime = (moveprocess/200)*this.$refs.playerInBottom.duration;
        this.persent = clickprocess;
        }
      },
      linkToMusicDetail(e){
        //router跳转时保存当前播放的音乐的状态
        let media = document.getElementById("playerInBottom")
        store.commit('savePlayerState',media)
        //console.log(store.state.playercurrenttime)
      }
    },
    mounted:function initIndexPage(){
      //修改当前播放器时间为跳转页面之前的时间
        let media = document.getElementById("playerInMusicDetail")
        media.currentTime = store.state.playercurrenttime
        console.log(store.state.playercurrenttime)
      
    }
  }
  
</script>
<style>
  h2 {
    font-family: Candara,Calibri,Segoe,Segoe UI,Optima,Arial,sans-serif;
    color: #888;
  }

  .page.has-navbar .page-content {
    padding-top: 100px;
  }
  .Music-Player-bottom {
    height: 20px;
  }
  .Music-Player-bottom-picture > .link >img {

    width: 30px;
    height: 30px;
  }
  .Music-Player-bottom > audio{
    border-style:solid;
    width: 50%;
  }
  .Music-Player-bottom > button{
    width: 5%;
    border: none;
    background-color: aqua;
  }
  .progress-bar {
  }
  .progress-bar > .progress-bar-left{
    background-color: red;
  }
  .progress-bar > .progress-bar-right{
    background-color:palegreen;
  }
  .progress-bar > .progress-bar-slider{
    background-color: yellow;
  }
</style>
