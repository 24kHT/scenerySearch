<script setup>
import { useCounterStore } from '@/stores/counter'
const useStore = useCounterStore()
// 清空收藏
const clearStar = () => {
  useStore.clearStar()
}
const isHave = useStore.WeatherArr.length > 0

const goBaidu = (pName) => {
  window.open(`https://www.baidu.com/s?wd=${pName}`)
}
</script>
<template>
  <div class="showPage" v-if="isHave">
    <div class="wrapper" v-for="item in useStore.WeatherArr" :key="item">
      <div class="card">
        <div class="card-content">
          <h2 class="card-title">{{ item.pName }}</h2>
          <img :src="item.starImg" alt="" />
          <button class="card-button" @click="goBaidu(item.pName)">
            了解更多
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <img
      src="http://hbimg.huaban.com/8f2d3b93cb95bdc92d5c96ac8d1befb33f6c009bc5a5-4ATNGY"
      alt=""
    />
  </div>
  <van-icon class="icon" name="delete-o" @click="clearStar" />
</template>

<style lang="scss" scoped>
.card {
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  width: 300px;
  text-align: center;
  position: relative;
}

/* 悬浮效果 */
.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.card-image {
  border-radius: 16px 16px 0 0;
  width: 100%;
  height: auto;
}

.card-content {
  padding: 20px;
}

.card-title {
  font-size: 1.5em;
  color: #333;
  margin: 10px 0;
}

.card-description {
  font-size: 1em;
  color: #666;
  margin: 10px 0;
}

.card-button {
  background-color: #ff69b4; /* 粉红色 */
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

/* 按钮悬浮效果 */
.card-button:hover {
  background-color: #ff1493; /* 深粉色 */
}

.wrapper {
  margin-top: 26px;
}

img {
  width: 100%;
  height: 300px;
}

.icon {
  position: fixed;
  right: 0px;
  top: 0px;
  font-size: 30px;
}
</style>
