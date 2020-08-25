<template>
  <div class="content">
    <div class="title flex align-center">
      <div class="flex align-center"><span></span>无所谓好或不好，人生一场虚空大梦，韶华白首，不过转瞬。惟有天道恒在，往复循环，不曾更改！</div>
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="ruleForm">
      <el-form-item prop="title">
        <el-input v-model.trim="ruleForm.title" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item prop="description">
        <el-input v-model.trim="ruleForm.description" placeholder="描述"></el-input>
      </el-form-item>
      <el-form-item prop="musicName">
        <el-input v-model.trim="ruleForm.musicName" placeholder="音乐名称"></el-input>
      </el-form-item>
    </el-form>
    <div class="imgs flex align-center">
      <el-upload
        class="upload"
        drag
        :action="mainUrl + '/ossUpload'"
        accept="image/*"
        :on-success="handleAvatarSuccess"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        >
        <img v-if="imgUrl" :src="imgUrl" class="avatar">
        <i class="iconfont icon-jurassic_image" v-if="!imgUrl"></i>
        <div class="el-upload__text" v-if="!imgUrl">封面图片 (680*440)</div>
      </el-upload>
      <el-upload
        class="upload"
        drag
        :show-file-list="false"
        accept="audio/*"
        :action="mainUrl + '/ossUpload'"
        :on-success="handleMusicSuccess"
        :before-upload="beforeMusicUpload"
        >
        <i class="iconfont icon-Music1"></i>
        <div class="el-upload__text">{{musicText}}</div>
      </el-upload>
    </div>
    <div class="markDown">
      <mavon-editor :subfield="true" @save="mkSave" @change="mkChange" v-model="ruleForm.content"/>
    </div>
    <div class="submit flex align-center" v-if="userInfo.id === 1">
      <el-button class="subBtn" type="primary" icon="el-icon-position" @click="addArticle">发布</el-button>
    </div>
    
  </div>
</template>

<script>
import { add } from '@/api/article'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      ruleForm: {
        title: '',
        description: '',
        musicName: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 0, max: 20, message: '不能超过20个字', trigger: 'blur' }
        ]
      },
      imgUrl: '',
      musicUrl: '',
      musicText: '背景音乐',
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    mkChange (val, ren) {
      this.content = val
    },
    mkSave (val, ren) {
      this.content = val
    },
    beforeAvatarUpload(file) {
      const isLt4M = file.size / 1024 / 1024 < 4;
      if (!isLt4M) {
        this.$message.error('上传封面图片大小不能超过 4MB!');
      }
      return isLt4M;
    },
    handleAvatarSuccess(res, file) {
      this.imgUrl = res.data
      this.$message.success('图片上传成功')
    },
    beforeMusicUpload (file) {
      const isLt4M = file.size / 1024 / 1024 < 4;
      if (!isLt4M) {
        this.$message.error('上传音频大小不能超过4MB!');
      }
      isLt4M && (this.musicText = file.name)
      return isLt4M
    },
    handleMusicSuccess (res, file) {
      this.musicUrl = res.data
      this.$message.success('音频上传成功')
    },
    addArticle () {
      if (!this.imgUrl) { this.$message.error('封面图片不能为空'); return }
      if (!this.ruleForm.content) { this.$message.error('文章内容不能为空'); return }
      const data = {
        ...this.ruleForm,
        imgUrl: this.imgUrl,
        musicUrl: this.musicUrl,
        content: this.content
      }
      add(data).then(res => {
        this.$message.success('添加文章成功')
      })
    }
  }
}
</script>

<style lang="scss" scoped>

  .ruleForm {
    margin-top: 40px;
  }

  .upload {
    &:first-of-type {
      margin-right: 20px;
    }
    &:hover {
      /deep/ .el-upload-dragger {
        border-color: #409EFF;
        .iconfont, .el-upload__text {
          color: #409EFF;
        }
      }
    }
    .avatar {
      width: 100%;
      height: 100%;
    }
    .iconfont {
      color: #a2a3a5;
      font-size: 34px;
      margin-bottom: 10px;
      transition: all .3s;
    }
    /deep/ .el-upload-dragger {
      width: 400px;
      height: 200px;
      transition: all .3s;
      border-color: #DCDFE6;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .el-upload__text {
        color: #a2a3a5;
        transition: all .3s;
      }
      
    }
  }

  .markDown {
    margin-top: 30px;
    .v-note-wrapper {
      min-height: 400px;
    }
  }

  .submit {
    justify-content: flex-start;
    margin-top: 20px;
  }
</style>