
<template lang='pug'>
.upload_img_custom
  .main
    .cell(
      v-for='(item, index) in imgList'
      :key = 'index'
      v-if = 'imgList && imgList.length > 0')
      image(:src='item' @click = 'seeImg(index)' mode = 'scaleToFill')
      i.iconfont.icon-close(@click = 'close(item)')
    .cell.flex(@click = 'upload')
      i.iconfont.icon-upload-photo
      text.fz28 照片
</template>

<script>
export default {
  props: ['value', 'tip'],
  watch: {
    value () {
      if (this.value === 'null' || this.value === 'undefined') return false
      this.imgList = this.value || null
    }
  },
  data () {
    return {
      imgList: []
    }
  },
  methods: {
    updataIMg (dataImg) {
      console.log('558845')
      wx.uploadFile({
        url: 'https://www.3elogistics.cn/api/upload/uploadImg', // 开发者服务器 url
        filePath: dataImg, // 要上传文件资源的路径
        name: 'filePath', // 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
        header: { 'Content-Type': `multipart/form-data` },
        success: res => {
          const result = JSON.parse(res.data)
          if (result.code === 200) {
            this.imgList.push(result.updateImg)
            this.$emit('input', this.imgList)
          }
        },
        fail: () => {},
        complete: () => {}
      })
    },
    upload () {
      this.$tips.loading()
      wx.chooseImage({
        count: '1', // 最多可以选择的图片张数,
        sizeType: ['compressed'],
        sourceType: ['camera'],
        success: res => {
          this.updataIMg(res.tempFilePaths[0])
        }, // 返回图片的本地文件路径列表 tempFilePaths,
        fail: () => {},
        complete: () => { this.$tips.loaded() }
      })
    },
    close (data) {
      console.log(data)
      wx.showModal({
        title: '提示', // 提示的标题,
        content: '确定要删除该图片吗？', // 提示的内容,
        showCancel: true, // 是否显示取消按钮,
        cancelText: '取消', // 取消按钮的文字，默认为取消，最多 4 个字符,
        cancelColor: '#000000', // 取消按钮的文字颜色,
        confirmText: '确定', // 确定按钮的文字，默认为取消，最多 4 个字符,
        confirmColor: '#EC7F5A', // 确定按钮的文字颜色,
        success: res => {
          if (res.confirm) {
            this.imgList = this.imgList.filter(res => res !== data)
            this.$emit('input', this.imgList)
            // this.delete_file({ fileId: data.img })
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    seeImg (res) {
      const current = this.imgList[res]
      wx.previewImage({
        current,
        urls: this.imgList // 需要预览的图片链接列表,
      })
    }
  }
}
</script>

<style lang='less' scoped>
@import '../style/mixin.less';
@icon-size: 60rpx;
@close-size: 40rpx;
.upload_img_custom {
  width:100%;
  .title {
    display: flex;
    padding: 20rpx;
    align-items: center;
    .h3 {
      font-weight: 700;
      color: @vms-color-black;
    }
    .p {
      color: @vms-color-wathet;
      padding-left: 20rpx;
    }
  }
  .main {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    padding: 0 20rpx;
    text-align: left;
    margin: 0 auto;
    .cell {
      position: relative;
      .width-height(30%, 200rpx);
      border: 1rpx solid @vms-color-page-bg;
      margin-bottom: 20rpx;
      margin-right: 20rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      // overflow: hidden;
      image {
        display: inline-block;
        .width-height(100%, 200rpx);
        font-size: 0;
      }
      i.icon-upload-photo {
        .icon-size(@icon-size, @icon-size, @icon-size, #C2C2C2);
        margin-bottom: 10rpx;
      }
      i.icon-close {
        position: absolute;
        top: -12rpx;
        right: -12rpx;
        .icon-size(@close-size, @close-size, @close-size, @vms-color-wathet)
      }
    }
    .flex {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #F6F4F5;
      text {
        color: #C2C2C2
      }
    }
  }
}
</style>
