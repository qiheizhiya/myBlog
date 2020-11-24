<template>
  <div class="markDown">
    <mavon-editor :subfield="true" @save="mkSave" @change="mkChange" ref="md" @imgAdd="imgAdd" @imgDel="imgDel" v-model="content"/>
  </div>
</template>

<script>
import { uploadImg } from '@/api/user'
import { mapState } from 'vuex'
export default {
  props: {
    defaultContent: {
      type: String,
      default: ''
    }
  },
  computed: { ...mapState(['userInfo']) },
  data () {
    return {
      content: ''
    }
  },
  watch: {
    'defaultContent': {
      handler (newval) {
        this.content = newval
      }
    }
  },
  methods: {
    mkChange (val, ren) {
      this.content = val
      this.$emit('contentChange', this.content)
    },
    mkSave (val, ren) {
      this.content = val
      this.$emit('contentChange', this.content)
    },
    async imgAdd (pos, $file) {
      if (this.userInfo.id !== 1) {
        this.$message.error('您并不是管理员哦~无法上传图片')
        return
      }
      const formdata = new FormData();
      formdata.append('file', $file);
      console.log(formdata.get('file'))
      try {
        const res = await uploadImg(formdata)
        const url = res.data.data
        this.$refs.md.$imglst2Url([[pos, url]])
      } catch (e) {}
    },
    imgDel () {
      console.log('删除图片')
    }
  }
}
</script>

<style lang="scss" scoped>
.markDown {
  margin-top: 30px;
  height: 600px;
    .v-note-wrapper {
      height: 100%;
    }
}
</style>