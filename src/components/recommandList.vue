<template>
    <div  class="recommand-list">
          <accordion  v-for="recommandMusic in this.$store.state.recommandList">
            <accordion-item :title="recommandMusic.recommandTitle" content-height="110">
            <p>{{recommandMusic.recommandContent}}
            </p>
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
      onSearch(keywords) {
        this.searching = true;
      },

      onCancel() {
        this.searching = false;
        this.keywords = ''
      },
    },
    mounted:function initIndexPage(){

    }
  }
</script>