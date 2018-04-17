<template>
  <div class="page has-navbar" v-nav="{title: '搜索框'}">
    <div class="page-content">
      <search v-model="keywords" placeholder="输入关键字" :on-search="onSearch" :on-cancel="onCancel" id="aass"></search>
      <div class="padding" v-show="searching">
        
        <span v-if="keywords">searching for '{{keywords}}'.</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        keywords: '',
        searching: false
      }
    },

    methods: {
      onSearch(keywords) {
        this.searching = true;
        let searchurl = "http://music.163.com/#/search/m/?s="+keywords+"&type=1"
      this.$http.get(searchurl).then((body) =>{
          console.log(body)
      }).catch(e => {
              // 打印一下错误
              console.log(e)
      })
        // http://music.163.com/#/search/m/?s=%E6%AD%A6%E6%B1%89&type=1
         this.keywords = 'aaa'
      },

      onCancel() {
        this.searching = false;
        this.keywords = 'sss'
      }
    }
  }
</script>
<style>
  .ddd{
    background-color: aliceblue;
    color: #000;
  }
</style>
