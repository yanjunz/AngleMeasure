<template>
	<view class="level-container">
		<view class="level-background">
			<view class="level-indicator" :style="indicatorStyle"></view>
		</view>
		<view class="angle-display">
			{{ angle.toFixed(1) }}°
		</view>
		<view class="status-text">{{ statusText }}</view>
		<button v-if="showPermissionButton" class="permission-button" @tap="startListening">开始测量</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				angle: 0,
				indicatorStyle: {},
				statusText: '点击下方按钮开始测量',
				showPermissionButton: true
			}
		},
		methods: {
			startListening() {
				this.showPermissionButton = false
				this.statusText = '正在测量...'
				
				// 开始监听加速度计
				wx.startAccelerometer({
					interval: 'game',
					success: () => {
						wx.onAccelerometerChange((res) => {
							// 计算倾斜角度
							const x = res.x
							const y = res.y
							const z = res.z
							
							// 计算水平角度（使用反正切函数）
							this.angle = Math.atan2(x, z) * (180 / Math.PI)
							
							// 更新指示器样式
							this.indicatorStyle = {
								transform: `rotate(${this.angle}deg)`
							}
							
							// 当接近水平时显示绿色
							if (Math.abs(this.angle) < 1) {
								this.statusText = '水平'
							} else {
								this.statusText = '正在测量...'
							}
						})
					},
					fail: (err) => {
						console.error('加速度计启动失败:', err)
						this.statusText = '设备不支持加速度计'
						this.showPermissionButton = true
					}
				})
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

	.permission-button {
		margin-top: 20px;
		background-color: #07c160;
		color: #fff;
		border: none;
		padding: 10px 20px;
		border-radius: 5px;
	}
</style>
