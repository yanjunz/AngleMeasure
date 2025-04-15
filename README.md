# 水平仪小程序

一个简单而精确的水平仪小程序，用于测量物体的倾斜角度。使用设备的加速度传感器实现实时角度测量，界面简洁直观。

## 功能特点

- 实时测量左右倾斜角度（±60度范围）
- 直观的液体水平面显示效果
- 大字号角度数值显示
- 数据平滑处理，显示稳定
- 简洁的黑色主题界面

## 技术实现

- 基于 uni-app 框架开发
- 使用微信小程序原生 API 获取设备方向数据
- 使用 CSS transform 和 clip-path 实现液体效果
- 实现数据平滑算法降低数值抖动

## 使用方法

1. 打开小程序，自动开始测量
2. 将设备放置在需要测量的物体表面
3. 观察显示的角度值和液体水平面
4. 当液体水平时，表示测量面处于水平状态

## 开发环境

- HBuilderX
- 微信开发者工具
- Node.js

## 项目结构

```
AngleMeasure/
├── pages/
│   └── index/
│       └── index.vue      # 主页面
├── static/                # 静态资源
├── manifest.json         # 项目配置
├── pages.json           # 页面配置
└── README.md           # 项目说明
```

## 安装和运行

1. 克隆项目到本地
2. 使用 HBuilderX 打开项目
3. 在 manifest.json 中配置小程序 AppID
4. 运行到微信开发者工具或真机预览

## 注意事项

- 需要设备支持加速度传感器
- 建议在真机上测试，模拟器可能无法获取传感器数据
- 首次使用可能需要授权设备传感器权限

## 技术细节

### 角度计算

```javascript
// 使用 x 轴加速度计算倾斜角度
let angle = Math.atan2(x, 1) * (180 / Math.PI)
```

### 数据平滑

```javascript
// 使用滑动窗口平均值平滑数据
const smoothingWindow = 5
angleHistory.push(rawAngle)
if (angleHistory.length > smoothingWindow) {
    angleHistory.shift()
}
angle = angleHistory.reduce((a, b) => a + b, 0) / angleHistory.length
```

## 版本历史

- v1.0.0
  - 初始版本发布
  - 实现基本的水平测量功能
  - 添加液体效果显示

## 后续计划

- [ ] 添加角度校准功能
- [ ] 支持垂直角度测量
- [ ] 添加声音反馈
- [ ] 支持历史记录
- [ ] 添加截图分享功能

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进项目。

## 许可证

MIT License 