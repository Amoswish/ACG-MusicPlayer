<template>
  <div class="page has-navbar" v-nav="{ title: 'About', showBackButton: true, onBackButtonClick: back }">
    <div class="page-content text-center">
      <a class="padding" v-text="show" @click = "transfer" v-bind:href="Aboutme">show</a>
    </div>
  </div>
</template>
<script>
  export default {
    data () { 
      return {
        Aboutme: 'https://github.com/Amoswish',
        show: 'AboutMe'
      }
    },
    methods: {
      back() {
        $router.back('/')
      },
    }
  }
</script>
