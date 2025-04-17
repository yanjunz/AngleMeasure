<template>
	<view class="level-container">
		<!-- 角度显示区域 -->
		<view class="angle-section">
			<text class="angle-value">{{ Math.abs(angle).toFixed(0) }}°</text>
			<view class="angle-marks">
				<text class="mark-line">—</text>
				<text class="mark-line">—</text>
			</view>
		</view>
		
		<!-- 水平仪显示区域 -->
		<view class="level-section">
			<view class="level-box">
				<view class="liquid-container">
					<view class="liquid" :style="liquidStyle"></view>
				</view>
				<view class="level-marks">
					<text class="mark-line">—</text>
					<text class="mark-line">—</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Welcome from '../welcome/welcome.vue'
	
	export default {
		components: {
			Welcome
		},
		data() {
			return {
				angle: 0,
				liquidStyle: {},
				angleHistory: [],
				smoothingWindow: 5,
				calibrationOffset: 0,
				isListening: false,
				maxAngle: 60 // 最大角度范围
			}
		},
		onLoad() {
			this.startListening()
		},
		methods: {
			startListening() {
				this.isListening = true
				this.angleHistory = []
				
				wx.startAccelerometer({
					interval: 'game',
					success: () => {
						wx.onAccelerometerChange((res) => {
							// 只使用 x 轴数据计算左右倾斜角度
							const x = res.x
							
							// 计算倾斜角度
							let rawAngle = Math.atan2(x, 1) * (180 / Math.PI)
							rawAngle -= this.calibrationOffset
							
							// 数据平滑处理
							this.angleHistory.push(rawAngle)
							if (this.angleHistory.length > this.smoothingWindow) {
								this.angleHistory.shift()
							}
							
							// 计算平均值
							const sum = this.angleHistory.reduce((a, b) => a + b, 0)
							this.angle = sum / this.angleHistory.length
							
							// 限制角度范围
							this.angle = Math.max(-this.maxAngle, Math.min(this.maxAngle, this.angle))
							
							// 更新液体样式
							this.liquidStyle = {
								transform: `rotate(${-this.angle}deg)`
							}
						})
					}
				})
			}
		},
		onUnload() {
			if (this.isListening) {
				wx.stopAccelerometer()
			}
		}
	}
</script>

<style>
	page {
		background-color: #000;
	}

	.level-container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background-color: #000;
	}

	.angle-section {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.angle-value {
		color: #fff;
		font-size: 120px;
		font-weight: 200;
	}

	.angle-marks {
		display: flex;
		justify-content: space-between;
		width: 60px;
		margin-top: 10px;
	}

	.mark-line {
		color: #fff;
		font-size: 24px;
	}

	.level-section {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
	}

	.level-box {
		width: 100%;
		height: 300px;
		position: relative;
		border-radius: 20px;
		overflow: hidden;
		background-color: rgba(255, 255, 255, 0.1);
	}

	.liquid-container {
		position: absolute;
		width: 200%; /* 增加容器宽度以适应更大角度 */
		height: 200%; /* 增加容器高度以适应更大角度 */
		left: -50%; /* 调整偏移以保持居中 */
		top: -50%; /* 调整偏移以保持居中 */
		transform-origin: center center;
	}

	.liquid {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #4CAF50;
		transform-origin: center center;
		transition: transform 0.1s ease-out;
		clip-path: polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%);
	}

	.level-marks {
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-between;
		padding: 0 20px;
		transform: translateY(-50%);
		z-index: 1;
	}
</style>
