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
			// 检查是否在浏览器环境
			if (process.env.NODE_ENV === 'development') {
				this.statusText = '浏览器环境模拟'
				// 模拟设备方向变化
				setInterval(() => {
					this.angle = Math.random() * 10 - 5 // 模拟 -5 到 5 度的变化
					this.indicatorStyle = {
						transform: `rotate(${this.angle}deg)`
					}
					if (Math.abs(this.angle) < 1) {
						this.statusText = '水平'
					} else {
						this.statusText = '正在测量...'
					}
				}, 1000)
				return
			}

			// 请求设备方向权限
			uni.authorize({
				scope: 'scope.deviceMotion',
				success: () => {
					this.startDeviceMotion()
				},
				fail: () => {
					this.statusText = '未获得设备方向权限'
					uni.showModal({
						title: '提示',
						content: '需要设备方向权限才能使用水平仪功能',
						confirmText: '去设置',
						success: (res) => {
							if (res.confirm) {
								uni.openSetting()
							}
						}
					})
				}
			})
		},
		methods: {
			startDeviceMotion() {
				// 开始监听设备方向
				uni.startDeviceMotionListening({
					interval: 'game',
					success: () => {
						this.statusText = '正在测量...'
						uni.onDeviceMotionChange((res) => {
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
			uni.stopDeviceMotionListening()
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
