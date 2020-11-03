<template>
  <div>
    <Markdown style="height: 700px" @contentChange="info.aboutMe = $event" :defaultContent="info.aboutMe" />
    <div class="submit flex align-center" v-if="userInfo.id === 1">
      <el-button class="subBtn" type="primary" icon="el-icon-position" @click="saveAboutMe">保存</el-button>
    </div>
  </div>
</template>

<script>
import Markdown from '@c/markdown'
import { updateUserInfo } from '@/api/user'
import { mapState, mapMutations } from 'vuex' 
export default {
  components: { Markdown },
  data () {
    return {
      info: {
        id: '',
        aboutMe: ''
      }
    }
  },
  watch: {
    'userInfo': {
      immediate: true,
      handler (newval) {
        console.log(newval)
        for (let key in this.info) {
          newval[key] && (this.info[key] = newval[key])
        }
      },
    }
  },
  computed: { ...mapState(['userInfo']) },
  methods: {
    ...mapMutations(['setUserInfo']),
    saveAboutMe () {
      if (!this.info.aboutMe) {
        this.$message.error('内容不能为空的~')
        return
      }
      updateUserInfo(this.info).then(res => {
        this.$message.success(res.data.msg)
        this.setUserInfo(res.data.data)
      })
    } 
  }
}
</script>

<style lang="scss" scoped>
  .submit {
    justify-content: flex-start;
    margin-top: 20px;
  }
</style>