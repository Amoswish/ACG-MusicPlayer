<template>
    <div  class="recommand-list">
          <accordion  v-for="recommandMusic in this.$store.state.recommandList" class="recommand-list-accordion">
            <accordion-item :title="recommandMusic.recommandTitle" content-height="110" class="recommand-list-accordion-item">
              <p>{{recommandMusic.recommandContent}}</p>
            </accordion-item>
            <div class="recommandoption" >
            <button  class="ion-play"  @click="playRecommandMusic(recommandMusic)"></button>
            <button  class="ion-plus-round" @click="addSelectRecommandMusicToPlayerIndex(recommandMusic)"></button>
          </div>
          </accordion>
          </div>
</template>
<script>
import store from '../vuex/store'
  export default {
    data() {
      return {
        keywords: '',
        searching: false
      }
    },
    methods: {
      playRecommandMusic(e){  
        store.commit('playAndAddToPlayerList',e)
        this.$emit('playSelectRecommandMusic',store.state.playerIndex);
      },
      addSelectRecommandMusicToPlayerIndex(e){
        //console.log(e)
        store.commit('addtoplayerList',e)

      }
    },
    mounted:function initRecommandList(){
        this.$http.get('http://localhost:8080/api/recommandList').then((body) =>{
          //console.log(body.data.data)
          store.commit('setRecommandList',body.data.data)
        //http://music.163.com/song/media/outer/url?id=ID数字.mp3
      }).catch(e => {
              // 打印一下错误
              console.log(e)
      })
      }
    
  }
</script>
<style>
  .recommand-list{
    overflow-y: auto;
    overflow-x: hidden;
    /* overflow: auto; */
    height: 52ex;
    /* height: 100ex; */
  }
  .recommandoption{
    float: right;
    margin-left: 2%;
  }
  .recommand-list-accordion{
    display: flex;
  }
  .recommand-list-accordion >.recommand-list-accordion-item{
    width: 78%;
  }
</style>
