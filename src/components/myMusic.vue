<template>
    <div class="page-content text-center">
      <div class="myMusic-content">
        <importMusic></importMusic>
        <list class="myMusic-content-musiclist">
          <div @click="playSelectedSong(musiclist.musicIndex)" v-for="musiclist in this.$store.state.musicList"  class="musicListItem">
              <item>{{musiclist.musicName}}
              <md-button  class="deleteMusic" @click="deletedSelectdeSong($store.state.playerIndex)"> 
                <i class="icon ion-close-round"></i>
              </md-button>
              <md-button v-show="musiclist.musicIndex == $store.state.playerIndex" class="playedInMusicList" > 
                <i class="icon ion-checkmark-round"></i>
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
      //将所选歌曲从播放列表中删除
      deletedSelectdeSong(neededdeletedsongindex){
        store.commit('deletSong',neededdeletedsongindex)
      }
    }
  }
</script>
<style>
  .myMusic-content{
    overflow: auto;
    height: 55ex;
  }
  .musicListItem{
  }
  .deleteMusic{
    float: right;
  }
  .playedInMusicList{
    float: right;
    height: 30%;
  }

</style>
