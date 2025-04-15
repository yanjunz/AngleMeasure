<template>
  <view class="level-container">
    <view class="level-background">
      <view class="level-indicator" :style="indicatorStyle"></view>
    </view>
    <view class="angle-display">
      {{ angle.toFixed(1) }}°
    </view>
    <view class="status-text">{{ statusText }}</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      angle: 0,
      indicatorStyle: {},
      statusText: '请授权设备方向权限'
    }
  },
  onLoad() {
    this.startDeviceMotion()
  },
  methods: {
    startDeviceMotion() {
      // 开始监听设备方向
      wx.startDeviceMotionListening({
        interval: 'game',
        success: () => {
          this.statusText = '正在测量...'
          wx.onDeviceMotionChange((res) => {
            if (res.beta !== null) {
              this.angle = res.beta
              this.indicatorStyle = {
                transform: `rotate(${this.angle}deg)`
              }
              // 当接近水平时显示绿色
              if (Math.abs(this.angle) < 1) {
                this.statusText = '水平'
              } else {
                this.statusText = '正在测量...'
              }
            }
          })
        },
        fail: (err) => {
          console.error('设备方向检测失败:', err)
          this.statusText = '设备不支持方向检测'
        }
      })
    }
  },
  onUnload() {
    // 停止监听
    wx.stopDeviceMotionListening()
  }
}
</script>

<style>
.level-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.level-background {
  width: 300px;
  height: 300px;
  border-radius: 150px;
  background-color: #333;
  position: relative;
  overflow: hidden;
}

.level-indicator {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #fff;
  transform-origin: center;
  transition: transform 0.1s ease-out;
}

.angle-display {
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
}

.status-text {
  margin-top: 10px;
  font-size: 16px;
  color: #999;
}
</style> 