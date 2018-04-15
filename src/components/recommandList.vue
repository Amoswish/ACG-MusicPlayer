<template>
    <div  class="recommand-list">
          <accordion  v-for="recommandMusic in this.$store.state.recommandList">
            <accordion-item :title="recommandMusic.recommandTitle" content-height="110">
              <p>{{recommandMusic.recommandContent}}</p>
            </accordion-item>
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
    overflow: auto;
    height: 55ex;
    /* height: 100ex; */
  }
</style>
