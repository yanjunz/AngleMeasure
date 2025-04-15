<template>
	<view class="level-container">
		<view class="level-background">
			<view class="bubble" :style="bubbleStyle"></view>
			<view class="scale-marks">
				<view class="mark" v-for="i in 5" :key="i" :style="{ left: `${(i-1) * 25}%` }"></view>
			</view>
		</view>
		<view class="angle-display">
			{{ angle.toFixed(1) }}°
		</view>
		<view class="status-text">{{ statusText }}</view>
		<view class="controls">
			<button class="control-button" @tap="startListening" v-if="!isMeasuring">开始测量</button>
			<button class="control-button" @tap="calibrate" v-if="isMeasuring">校准</button>
			<button class="control-button" @tap="stopListening" v-if="isMeasuring">停止</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				angle: 0,
				bubbleStyle: {},
				statusText: '点击开始测量',
				isMeasuring: false,
				// 用于数据平滑的数组
				angleHistory: [],
				// 平滑窗口大小
				smoothingWindow: 5,
				// 校准偏移量
				calibrationOffset: 0
			}
		},
		methods: {
			startListening() {
				this.isMeasuring = true
				this.statusText = '正在测量...'
				this.angleHistory = []
				
				// 开始监听加速度计
				wx.startAccelerometer({
					interval: 'game',
					success: () => {
						wx.onAccelerometerChange((res) => {
							// 只使用 x 轴数据计算左右倾斜角度
							const x = res.x
							
							// 计算倾斜角度（使用反正切函数）
							let rawAngle = Math.atan2(x, 1) * (180 / Math.PI)
							
							// 应用校准偏移
							rawAngle -= this.calibrationOffset
							
							// 数据平滑处理
							this.angleHistory.push(rawAngle)
							if (this.angleHistory.length > this.smoothingWindow) {
								this.angleHistory.shift()
							}
							
							// 计算平均值
							const sum = this.angleHistory.reduce((a, b) => a + b, 0)
							this.angle = sum / this.angleHistory.length
							
							// 限制角度范围在 -30 到 30 度之间
							this.angle = Math.max(-30, Math.min(30, this.angle))
							
							// 计算气泡位置（从 -50% 到 50%）
							const bubblePosition = (this.angle / 30) * 50
							
							// 更新气泡样式
							this.bubbleStyle = {
								left: `${50 + bubblePosition}%`,
								transform: 'translateX(-50%)'
							}
							
							// 当接近水平时显示绿色
							if (Math.abs(this.angle) < 1) {
								this.statusText = '水平'
							} else {
								this.statusText = this.angle > 0 ? '向右倾斜' : '向左倾斜'
							}
						})
					},
					fail: (err) => {
						console.error('加速度计启动失败:', err)
						this.statusText = '设备不支持加速度计'
						this.isMeasuring = false
					}
				})
			},
			stopListening() {
				this.isMeasuring = false
				this.statusText = '已停止测量'
				wx.stopAccelerometer()
			},
			calibrate() {
				// 将当前角度设置为校准点
				this.calibrationOffset = this.angle
				this.statusText = '已校准，当前角度设为0°'
			}
		},
		onUnload() {
			// 停止监听
			wx.stopAccelerometer()
		}
	}
</script>

<style>
	page {
		background-color: #000;
		color: #fff;
	}

	.level-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		width: 100vw;
		background-color: #000;
		color: #fff;
	}

	.level-background {
		width: 300px;
		height: 100px;
		background-color: #333;
		position: relative;
		overflow: hidden;
		border-radius: 50px;
	}

	.bubble {
		position: absolute;
		top: 50%;
		width: 40px;
		height: 40px;
		background-color: #fff;
		border-radius: 50%;
		transform: translate(-50%, -50%);
		transition: left 0.1s ease-out;
	}

	.scale-marks {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.mark {
		position: absolute;
		top: 50%;
		width: 2px;
		height: 20px;
		background-color: rgba(255, 255, 255, 0.5);
		transform: translate(-50%, -50%);
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

	.controls {
		margin-top: 20px;
		display: flex;
		gap: 10px;
	}

	.control-button {
		background-color: #07c160;
		color: #fff;
		border: none;
		padding: 10px 20px;
		border-radius: 5px;
	}

	.control-button:active {
		opacity: 0.8;
	}
</style>
