import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// const state = {
//   count: 1
// }

export default new Vuex.Store(
  {
    state:{
      playercurrenttime:0,
      playersrc:"http://sc1.111ttt.cn/2016/1/12/10/205102107353.mp3"
    },
    mutations:{
      //页面跳转时保存播放歌曲的当前状态
      savePlayerState (state,currentaudio) {
        //由于页面跳转有延迟，所以加点时间
        state.playercurrenttime = currentaudio.currentTime+0.3;
      }
    }
  }
)