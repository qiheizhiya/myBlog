<template>
  <div>
    <router-view /> 
    <!-- <Footer /> -->
    <BackTop />
  </div>
</template>
<script>
import Footer from '@c/Footer'
import BackTop from '@c/backToTop'
export default {
  components: { Footer, BackTop }
}
</script>
