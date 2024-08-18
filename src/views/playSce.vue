<script setup>
import hangzhouMap from '@/components/hangzhouMap.vue'
import { SunArr, RainArr } from '@/utils/scenery'
import { getRandomInt } from '@/utils/getRandom'
import { useRoute } from 'vue-router'
import { nextTick, onMounted, ref } from 'vue'
import { useCounterStore } from '@/stores/counter'

const route = useRoute()
const condition = route.query.condition
const placeName = ref()
let ran = 0
const images = ref([])
const mp3 = getRandomInt(0, 10)

if (condition.includes('雨') === true) {
  // console.log(1);
  ran = getRandomInt(0, 21)
  images.value = RainArr[ran].imgUrls
  placeName.value = RainArr[ran].name
} else {
  ran = getRandomInt(0, 18)
  images.value = SunArr[ran].imgUrls
  placeName.value = SunArr[ran].name
}

console.log(123)

console.log(images.value)

// document.querySelector('.btn-audio').play()

console.log(mp3.value)

// 召唤dance
const dance = () => {
  if (condition.includes('雨') === true) {
    showRain.value = true
    showSun.value = false
  } else {
    showSun.value = true
    showRain.value = false
  }
  if (showRain.value === true) {
    nextTick(() => {
      document.querySelector('.isRain').style.bottom = '0px'
      document.querySelector('.xh').style.right = '500px'
      document.querySelector('.title-wrap ').style.top = '-150px'
    })
  } else {
    nextTick(() => {
      setTimeout(() => {
        document.querySelector('.isSun').style.bottom = '0px'
        document.querySelector('.xh').style.right = '500px'
        document.querySelector('.title-wrap ').style.top = '-150px'
      }, 100)
    })
  }
  let timer = null
  let timer2 = null
  clearTimeout(timer)
  timer = setTimeout(() => {
    console.log(222)
    document.querySelector('.sourceRef').src = `/assets/audio-${mp3}.mp3`
    document.querySelector('.btn-audio').load()
    document.querySelector('.btn-audio').play()
  }, 800)
  clearTimeout(timer2)
  timer2 = setTimeout(() => {
    isDance.value = true
    document.querySelector('.btnS').style.right = '0px'
  }, 2000)
}
// 展示弹窗
const show = ref(false)
const showSun = ref(false)
const showRain = ref(false)

// 召唤标题
const showTitle = () => {
  document.querySelector('.title-wrap').style.top = '-100px'
  nextTick(() => {
    let timer3 = null
    clearTimeout(timer3)
    timer3 = setTimeout(() => {
      document.querySelector('.title-wrap').style.top = '300px'
    }, 200)
  })
}

onMounted(() => {
  showTitle()
})

const isDance = ref(false)

// 乘坐地铁
const handleDt = () => {
  show.value = true
}

// 添加收藏
const isStar = ref(true)
const useStore = useCounterStore()

const starImg = images.value[0]
const pName = placeName.value
const addStar = () => {
  isStar.value = false
  console.log('收藏')
  console.log(starImg)
  useStore.logA()
  useStore.setWeather({ pName, starImg })
}
</script>

<template>
  <van-icon v-if="isStar" class="icon" name="star-o" @click="addStar" />
  <div class="placePage">
    <img v-if="images.length > 0" class="testImg" :src="images[0]" alt="" />
    <van-button class="btnS" plain type="success" @click="handleDt"
      >去这里</van-button
    >
    <img class="xh" src="/assets/xh.png" alt="" />
    <img v-if="showSun" class="isSun bg" src="/assets/bg-01.png" alt="" />
    <img v-if="showRain" class="isRain bg" src="/assets/bg.png" alt="" />
    <div class="title-wrap" @click="dance">
      <h1 class="cute-title">{{ placeName }}</h1>
    </div>
    <div class="card" v-if="isDance">
      <van-swipe :autoplay="3000" :show-indicators="false" lazy-render>
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image" class="card-image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <audio class="btn-audio">
      <source class="sourceRef" src="" type="audio/mpeg" />
    </audio>
  </div>
  <van-dialog
    v-model:show="show"
    title="计算杭州几号线地铁直达"
    confirmButtonText="开发中..."
    show-cancel-button
  >
    <hangzhouMap></hangzhouMap>
  </van-dialog>
</template>

<style lang="scss" scoped>
.placePage {
  overflow: hidden;
}

.bg {
  position: fixed;
  width: 100%;
  bottom: -300px;
  left: 0px;
  transition: all 3s ease-in-out;
}

.card {
  width: 300px;
  height: 300px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
  margin-top: 100px;
  margin-left: 0px;
  overflow: hidden;
  transition: transform 3s;
  .card-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
}
.title-wrap {
  position: fixed;
  top: -200px;
  left: 60px;
  transition: all 2s ease-in-out;
  border-radius: 15px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  .cute-title {
    color: #4a90e2; /* 粉色文字 */
    font-size: 3rem; /* 大字体 */
    letter-spacing: 2px; /* 字母间距 */
    font-family: 'Dancing Script', cursive; /* 可爱的字体 */
    text-align: center;
  }
}

.xh {
  position: fixed;
  top: 200px;
  right: -200px;
  width: 100px;
  z-index: 999;
  transition: all 10s ease-in-out;
}

.btnS {
  position: fixed;
  top: 0px;
  right: -200px;
  transition: all 6s ease-in-out;
}

.testImg {
  position: fixed;
  right: 500px;
}

.icon {
  position: fixed;
  right: 0px;
  bottom: 60%;
  font-size: 30px;
  color: #4a90e2;
}
</style>
