<template>
  <div class="content">
    <div class="title flex align-center">
      <div class="flex align-center"><span></span>个人信息设置</div>
    </div>
    <el-form class="form" ref="form" :model="form" label-width="80px">
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="mainUrl + '/ossUpload'"
          :disabled="userInfo.id !== 1"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.avatar" :src="form.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker
          v-model="form.birthday"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="座右铭">
        <el-input v-model="form.motto"></el-input>
      </el-form-item>
      <el-form-item v-if="userInfo.id === 1">
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
    
  </div>
</template>

<script>
import { updateUserInfo } from '@/api/user'
import { mapState, mapMutations } from 'vuex' 
export default {
  computed: mapState(['userInfo']),
  data () {
    return {
      imageUrl: '',
      form: {
        userName: '',
        birthday: '',
        motto: '',
        avatar: '',
        id: ''
      }
    }
  },
  watch: {
    'userInfo': {
      immediate: true,
      handler (newval) {
        for (let key in this.form) {
          newval[key] && (this.form[key] = newval[key])
        }
      },
    }
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    handleAvatarSuccess(res, file) {
      this.form.avatar = res.data
      this.$message.success('图片上传成功')
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    onSubmit () {
      updateUserInfo(this.form).then(res => {
        this.$message.success(res.data.msg)
        this.setUserInfo(res.data.data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .img-outer {
    width: 90px;
    height: 90px;
    background-color: #40a0ff59;
    border-radius: 50%;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }
  /deep/ .el-form-item__content {
    display: flex;
  }
  .form {
    margin-top: 40px;
  }

  /deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  /deep/ .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  /deep/ .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  /deep/ .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>