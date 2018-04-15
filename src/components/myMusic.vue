<template>
    <div class="page-content text-center">
        <importMusic></importMusic>
        <list class="myMusic-content-musiclist">
        <div @click="playSelectedSong(musiclist.musicIndex)" v-for="musiclist in this.$store.state.musicList" >
            <item>{{musiclist.musicName}}
            <md-button v-if="musiclist.musicIndex == $store.state.playerIndex" class="button button-small button-balanced button-fab playedInMusicList" > 
            <i class="icon ion-checkmark"></i>
            </md-button>
            </item>
        </div>
        </list>
    </div>
  </div>
</template>
<script>
  //导入vuex的仓库
  import store from '../vuex/store'
  export default {
    data () { 
      return {
      }
    },
    methods: {
      playSelectedSong(neededplaysong){
        //点击播放列表中的歌曲切歌
        store.commit('changeSong',neededplaysong)
        // let media = document.getElementById("playerInBottom")
        // media.src =store.state.musicList[neededplaysong].musicSrc
        this.$emit('child-say',neededplaysong);
      },
    }
  }
</script>