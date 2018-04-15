<template>
    <div>
        <!-- <button v-on:click="aaa">导入歌曲</button> -->
        <input id="fileItem" type="file">
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
    }
 // }
  }
</script>