<script setup lang="ts">
import { getMmemberProfileAPI, putMemberProfileAPI } from '@/services/profileapi'
import { useMemberStore } from '@/stores'
import type { Gender, ProfileDetail } from '@/types/member'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

//获取用户信息，修改个人信息需要提供初始值
const memberstore = useMemberStore()
const memberProfile = ref<ProfileDetail>({} as ProfileDetail)
const getMemberProfile = async () => {
  const res = await getMmemberProfileAPI()
  // console.log(res)
  memberProfile.value = res.result
}
//修改用户头像
const onAvatarChange = () => {
  uni.chooseMedia({
    count: 1,
    mediaType: ['image'],
    success: (event) => {
      //本地路径
      const { tempFilePath } = event.tempFiles[0]
      //文件上传
      uni.uploadFile({
        url: '/member/profile/avatar',
        name: 'file', // 后端数据字段名
        filePath: tempFilePath, // 新头像
        success: (res) => {
          // 判断状态码是否上传成功
          if (res.statusCode === 200) {
            // 提取头像
            const { avatar } = JSON.parse(res.data).result
            // 当前页面更新头像
            memberProfile.value!.avatar = avatar
            // 更新 Store 头像
            memberstore.profile!.avatar = avatar
            uni.showToast({ icon: 'success', title: '更新成功' })
          } else {
            uni.showToast({ icon: 'error', title: '出现错误' })
          }
        },
        fail: (fail) => {
          uni.showToast({ icon: 'error', title: '出现错误' })
        },
      })
    },
  })
}

//点击保存提交表单并返回上一页
const onSubmit = async () => {
  const res = await putMemberProfileAPI({
    nickname: memberProfile.value?.nickname,
    gender: memberProfile.value.gender,
    birthday: memberProfile.value.birthday,
    provinceCode: fullLocationCode[0],
    cityCode: fullLocationCode[1],
    countyCode: fullLocationCode[2],
    profession: memberProfile.value.profession,
  })
  console.log(res)
  uni.showToast({ icon: 'success', title: '保存成功' })
  //更新store里面的昵称
  memberstore.profile!.nickname = res.result.nickname
  setTimeout(() => {
    uni.navigateBack()
  }, 500)
}
//修改性别
const onGenderChange: UniHelper.RadioGroupOnChange = (event) => {
  memberProfile.value.gender = event.detail.value as Gender
}
//修改生日
const onBirthDayChange: UniHelper.DatePickerOnChange = (event) => {
  memberProfile.value.birthday = event.detail.value
}
//修改城市
let fullLocationCode: [string, string, string] = ['', '', '']
const onCityChange: UniHelper.RegionPickerOnChange = (event) => {
  //前端修改
  memberProfile.value.fullLocation = event.detail.value.join(' ')
  //后端修改
  fullLocationCode = event.detail.code!
}

onLoad(() => {
  getMemberProfile() // 获取用户信息
})
</script>

<template>
  <view class="viewport">
    <!-- 导航栏 -->
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <navigator open-type="navigateBack" class="back icon-left" hover-class="none"></navigator>
      <view class="title">个人信息</view>
    </view>
    <!-- 头像 -->
    <view class="avatar">
      <view @tap="onAvatarChange" class="avatar-content">
        <image class="image" :src="memberProfile?.avatar" mode="aspectFill" />
        <text class="text">点击修改头像</text>
      </view>
    </view>
    <!-- 表单 -->
    <view class="form">
      <!-- 表单内容 -->
      <view class="form-content">
        <view class="form-item">
          <text class="label">账号</text>
          <text class="account">{{ memberProfile?.account }}</text>
        </view>
        <view class="form-item">
          <text class="label">昵称</text>
          <input
            class="input"
            type="text"
            placeholder="请填写昵称"
            v-model="memberProfile!.nickname"
          />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="onGenderChange">
            <label class="radio">
              <radio value="男" color="#27ba9b" :checked="memberProfile?.gender === '男'" />
              男
            </label>
            <label class="radio">
              <radio value="女" color="#27ba9b" :checked="memberProfile?.gender === '女'" />
              女
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">生日</text>
          <picker
            @change="onBirthDayChange"
            class="picker"
            mode="date"
            start="1900-01-01"
            :end="new Date()"
            :value="memberProfile?.birthday ? memberProfile?.birthday : '2000-01-01'"
          >
            <view v-if="memberProfile?.birthday">{{ memberProfile.birthday }}</view>
            <view class="placeholder" v-else>请选择日期</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">城市</text>
          <picker
            @change="onCityChange"
            class="picker"
            mode="region"
            :value="memberProfile?.fullLocation?.split(' ')"
          >
            <view v-if="memberProfile?.fullLocation">{{ memberProfile.fullLocation }}</view>
            <view class="placeholder" v-else>请选择城市</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">职业</text>
          <input
            class="input"
            type="text"
            placeholder="请填写职业"
            v-model="memberProfile!.profession"
          />
        </view>
      </view>
      <!-- 提交按钮 -->
      <button @tap="onSubmit" class="form-button">保 存</button>
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
  background-size: auto 420rpx;
  background-repeat: no-repeat;
}

// 导航栏
.navbar {
  position: relative;

  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }

  .back {
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0;
    font-size: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// 头像
.avatar {
  text-align: center;
  width: 100%;
  height: 260rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .text {
    display: block;
    padding-top: 20rpx;
    line-height: 1;
    font-size: 26rpx;
    color: #fff;
  }
}

// 表单
.form {
  background-color: #f4f4f4;

  &-content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  &-item {
    display: flex;
    height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;

    &:last-child {
      border: none;
    }

    .label {
      width: 180rpx;
      color: #333;
    }

    .account {
      color: #666;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .radio {
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;
    }
    .placeholder {
      color: #808080;
    }
  }

  &-button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #27ba9b;
  }
}
</style>
