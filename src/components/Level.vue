<template>
  <div class="level-container">
    <div class="level-background">
      <div class="level-indicator" :style="indicatorStyle"></div>
    </div>
    <div class="angle-display">
      {{ angle.toFixed(1) }}°
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const angle = ref(0)
const indicatorStyle = ref({})

const handleOrientation = (event: DeviceOrientationEvent) => {
  if (event.beta !== null) {
    angle.value = event.beta
    indicatorStyle.value = {
      transform: `rotate(${angle.value}deg)`
    }
  }
}

onMounted(() => {
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', handleOrientation)
  }
})

onUnmounted(() => {
  if (window.DeviceOrientationEvent) {
    window.removeEventListener('deviceorientation', handleOrientation)
  }
})
</script>

<style scoped lang="scss">
.level-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
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
</style> 