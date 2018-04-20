<template>
  <div class="page has-navbar" v-nav="{title: '搜索框'}">
    <div class="page-content">
      <search v-model="keywords" placeholder="输入关键字" :on-search="onSearch" :on-cancel="onCancel" ></search>
      <div class="search-list" v-show="searching">
          <list  v-for="searcheditem in this.searchedMusicList" >
            <item >{{searcheditem.name}}</item>
          </list>
      </div>
  </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        keywords: '',
        searching: false,
        searchedMusicList:[]
      }
    },

    methods: {
      onSearch(keywords) {
        this.searching = true;
        let searchurl = "http://localhost:8080/api/searchMusic?searchname="+encodeURI(this.keywords)
        console.log(this.keywords)
        this.$http.get(searchurl).then((body) =>{
          var tempsearchList = JSON.parse(body.body.data).result.songs
           this.searchedMusicList = tempsearchList
          // for(let i = 0;i < tempsearchList.length;i++){
          //   let newObj = {};
          //   newObj.Title = tempsearchList[i].title;
          //   newObj.MusicSrc = tempsearchList[i].linkUrl.substring(9);
          //   this.searchedMusicList.push(newObj);
          // }
          console.log(JSON.parse(body.body.data).result)
      }).catch(e => {
              // 打印一下错误
              console.log(e)
      })
        // http://music.163.com/#/search/m/?s=%E6%AD%A6%E6%B1%89&type=1
      },

      onCancel() {
        this.searching = false;
      }
    }
  }
</script>
<style>
  .ddd{
    background-color: aliceblue;
    color: #000;
  }
  .search-list{
    overflow-y: auto;
    overflow-x: hidden;
    /* overflow: auto; */
    height: 52ex;
    /* height: 100ex; */
  }
</style>
