<script setup>
document.title = '在杭州玩'

import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps({
  weatherData: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const handleTap = () => {
  // console.log('点击了卡片');
  console.log('跳转')
  document.querySelector('.btn-audio').play()
}

// 跳转详情页
const goPlay = () => {
  console.log('跳转')
  router.push({
    path: '/play',
    query: {
      condition: props.weatherData.condition,
      fengli: props.weatherData.fengliData,
      temperature: props.weatherData.temperature
    }
  })
}
</script>

<template>
  <div class="weather-card" @click="handleTap">
    <img
      :src="weatherData?.icon || '暂未加载'"
      alt="Weather Icon"
      class="weather-icon"
    />
    <h2 class="city">{{ weatherData?.city || '杭州' }}</h2>
    <p class="temperature">{{ weatherData?.temperature }}</p>
    <p class="condition">{{ weatherData?.condition }}</p>
    <p class="week cute-text">{{ weatherData?.week }}</p>
    <p class="fengli cute-text">{{ weatherData?.fengli }}</p>
    <div class="btn" :style="{ right: btnRight }" @click="goPlay()">去玩？</div>
    <audio class="btn-audio">
      <source src="/assets/btn.mp3" type="audio/mpeg" />
    </audio>
  </div>
</template>

<style lang="scss" scoped>
.weather-card {
  position: relative;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  font-family: 'Dancing Script', cursive; /* 可爱的字体 */
  overflow: hidden;
  // border: 1px solid #c28eb9;
  .btn {
    position: absolute;
    top: 100px;
    right: -200px;
    width: 160px;
    height: 100px;
    color: #9e2824;
    background-image: url('/assets/next.png');
    background-size: contain;
    background-repeat: no-repeat;
    text-align: end;
    font-size: medium;
    font-weight: 300;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    transition: all 0.6s ease;
  }
}

.weather-card:hover {
  transform: scale(0.92); /* 悬停时放大效果 */
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  .cute-text {
    transform: scale(1.1) rotate(20deg); /* 悬停时的缩放和旋转效果 */
    color: #4a90e2; /* 悬停时改变颜色 */
  }
  .btn {
    right: 0;
  }
}

.weather-icon {
  width: 80px;
  height: 80px;
}

.city {
  font-size: 22px;
  color: #c28eb9;
}

.temperature {
  font-size: 26px;
  font-weight: bold;
}

.condition {
  font-size: 16px;
  font-weight: bold;
  color: #ff6b81;
}

.week {
  position: absolute;
  color: #c28eb9;
  top: 10px;
  right: 20px;
}

.cute-text {
  font-size: 20px; /* 字体大小 */
  color: #c28eb9; /* 字体颜色 */
  transition:
    transform 0.3s ease,
    color 0.3s ease; /* 添加过渡效果 */
}

.fengli {
  position: absolute;
  top: 36px;
  right: 4px;
}
</style>
