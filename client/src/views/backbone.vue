<template>
  <div>
    <router-view /> 
    <BackTop />
  </div>
</template>
<script>
import Footer from '@c/Footer'

export default {
  name: 'backbone',
  components: { Footer, BackTop }
}
</script>
