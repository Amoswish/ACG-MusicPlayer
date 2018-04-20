import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
// const state = {
//   count: 1
// }
export default new Vuex.Store(
  {
    state:{
      musicList:[
        {
          musicName:"沙滩",
          musicSrc:"http://sc1.111ttt.cn/2016/1/12/10/205102107353.mp3",
          musicImg:"",
          musicIndex:0
        },
        {
          musicName:"bgm",
          musicSrc:"http://sc1.111ttt.cn/2016/1/12/04/205041336213.mp3",
          musicImg:"",
          musicIndex:1
        },
        {
          musicName:"天才白痴梦",
          musicSrc:"http://music.163.com/song/media/outer/url?id=172416.mp3",
          musicImg:"",
          musicIndex:2
        },
      ],
      recommandList:[
        // recommandTitle
        // recommandMusicSrc
      ],
      playercurrenttime:0,
      playerIndex:0,//现在播放的歌曲的index
      playerLength:3,//播放列表长度
    },

    mutations:{
      //页面跳转时保存播放歌曲的当前状态
      savePlayerState (state,currentaudio) {
        //由于页面跳转有延迟，所以加点时间
        state.playercurrenttime = currentaudio.currentTime+0.5;
      },
      playNextSong(state,currentaudio){
        state.playerIndex =(state.playerIndex+1)%state.playerLength;
      },
      playLastSong(state,currentaudio){
        state.playerIndex =(state.playerIndex+state.playerLength-1)%state.playerLength;
      },
      changeSong(state,neededplaysong){
        state.playerIndex =neededplaysong;
      },
      getRecommandList(state){
        console.log(getRecommandList())
        let recommandlist = getRecommandList();
        for(item in recommandlist){
          let newObj = {};
          newObj.recommandTitle = item.title;
          newObj.recommandMusicSrc = item.linkUrl.substring(9);
          state.recommandlist.push(newObj);
        }
      },
      //将后台api获得的排行榜信息加入到推荐列表
      setRecommandList(state,itemlist){
        for(let i=0;i<itemlist.length;i++){
          let newObj = {};
          newObj.recommandTitle = itemlist[i].title;
          newObj.recommandMusicSrc = itemlist[i].linkUrl.substring(9);;
          state.recommandList.push(newObj);
        }
      },
      //将推荐列表中的选中的音乐加入到播放列表
      addtoplayerList(state,music){
        let isinmusiclist = false
        for(let i = 0; i<state.playerLength;i++){
          if(state.musicList[i].musicName == music.recommandTitle){
            isinmusiclist = true
          }
        }
        if(!isinmusiclist){
          let newObj = {};
          newObj.musicName = music.recommandTitle;
          newObj.musicSrc ="http://music.163.com/song/media/outer/url?id=" + music.recommandMusicSrc + ".mp3";
          newObj.musicIndex = state.playerLength;
          state.playerLength = state.playerLength+1;
          state.musicList.push(newObj);
        }
      },
      //将推荐列表中的选中的音乐加入到播放列表并播放
      playAndAddToPlayerList(state ,music){
        let isinmusiclist = false
        let recordedmusicIndex = 0
        for(let i = 0; i<state.playerLength;i++){
          if(state.musicList[i].musicName == music.recommandTitle){
            isinmusiclist = true
            recordedmusicIndex = i
          }
        }
        if(!isinmusiclist){
          let newObj = {};
          newObj.musicName = music.recommandTitle;
          newObj.musicSrc ="http://music.163.com/song/media/outer/url?id=" + music.recommandMusicSrc + ".mp3";
          newObj.musicIndex = state.playerLength;
          state.playerLength = state.playerLength+1;
          state.musicList.push(newObj);
          state.playerIndex = state.playerLength-1
        }
        else{
          //
          state.playerIndex = recordedmusicIndex;
        }
      },
      //根据歌曲index从播放列表删除
      deleteSong(neededeletedsongIndex){

      }

    }
  }
)