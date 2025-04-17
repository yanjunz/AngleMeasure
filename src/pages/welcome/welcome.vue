<template>
	<view class="welcome-container">
		<image class="app-logo" src="../../static/angle_icon.png" mode="aspectFit"></image>
		<view class="app-title">水平仪</view>
		<view class="app-description">一个简单实用的水平测量工具</view>
		<view class="features">
			<view class="feature-item">
				<text class="feature-icon">📏</text>
				<text class="feature-text">实时测量</text>
			</view>
			<view class="feature-item">
				<text class="feature-icon">🎯</text>
				<text class="feature-text">精确显示</text>
			</view>
			<view class="feature-item">
				<text class="feature-icon">⚡</text>
				<text class="feature-text">快速响应</text>
			</view>
		</view>
		<button class="start-button" @click="startMeasuring">开始测量</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			startMeasuring() {
				uni.navigateTo({
					url: '/src/pages/index/index',
					success: () => {
						console.log('导航成功')
					},
					fail: (err) => {
						console.error('导航失败:', err)
					}
				})
			}
		}
	}
</script>

<style>
	.welcome-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		padding: 40rpx;
		background-color: #f5f5f5;
	}

	.app-logo {
		width: 160rpx;
		height: 160rpx;
		margin-bottom: 40rpx;
		border-radius: 30rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
	}

	.app-title {
		font-size: 48rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 20rpx;
	}

	.app-description {
		font-size: 28rpx;
		color: #666;
		margin-bottom: 60rpx;
		text-align: center;
	}

	.features {
		width: 100%;
		margin-bottom: 60rpx;
	}

	.feature-item {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 12rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	}

	.feature-icon {
		font-size: 40rpx;
		margin-right: 20rpx;
	}

	.feature-text {
		font-size: 28rpx;
		color: #333;
	}

	.start-button {
		width: 80%;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		background-color: #007AFF;
		color: #fff;
		font-size: 32rpx;
		border-radius: 44rpx;
		margin-top: 40rpx;
	}

	.start-button:active {
		opacity: 0.8;
	}
</style> 