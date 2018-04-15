<template>
  <div class="page has-navbar" v-nav="{ title: 'ACG Music Player' }">
    <div class="page-content text-center">
      <tabs class="tabs music-header"   :tab-items="tabs" :tab-index="tabIndex" :on-tab-click="onTabClick"></tabs>
      <div class="main-content">
        <div v-if="tabIndex==0" class="recommand">
          <recommandList></recommandList>
        </div>
        <div v-if="tabIndex==1" class="myMusic">
          <myMusic v-on:child-say="playSelectedSong"></myMusic>
        </div>
        <div v-if="tabIndex==2" class="search">
          <searchMusic></searchMusic>
        </div>
      </div>
      <musicplayerBottom  :neededplayingsong="nowneededplaysong" class="aaa"></musicplayerBottom>
      </div>
      <!-- <div><router-link class="button button-assertive" to="/about">
        <i class="ion-information-circled"></i> About
      </router-link></div> -->
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
        msaag: 'ss',
        tabs: [
        "推荐",
        "我的音乐",
        "搜索"
        ],
        tabIndex: 0,
        nowneededplaysong: 0,
      }
    },
    methods: {
      onTabClick(index) {
        this.tabIndex = index
      },
      playSelectedSong(neededplaysong){
        //点击播放列表中的歌曲切歌
        // store.commit('changeSong',neededplaysong)
        //let media = document.getElementById("playerInBottom")
        console.log(neededplaysong)
        this.nowneededplaysong = neededplaysong
        //console.log(neededplaysong)
      },
    },
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
  .playedInMusicList{
    height: 30px;
  }
</style>
