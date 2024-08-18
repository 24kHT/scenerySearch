<script setup>
document.title = '在杭州玩'

import { ref } from 'vue'
import { getWeatherService } from '@/api/weather'
import WeatherCard from '@/components/WeatherCard.vue'
import router from '@/router'
import { useCounterStore } from '@/stores/counter'

// 获取天气图标
const getIcon = (w) => {
  if (w === '晴')
    return 'https://gd-hbimg.huaban.com/675d699eafab581d061847f03cd20749444f87f91b13eb-7oZlnN_fw480'
  else if (w === '多云') {
    return 'http://gd-hbimg.huaban.com/332d9510d0e7b899ad0791b2a77bd925f9bdf5f9207254-9mCNrn_fw480'
  } else if (w === '阴天')
    return 'http://gd-hbimg.huaban.com/d4781186670b6046181d0eb63670ddc1b8014b4419fa0e-ZI2Suf'
  else if (w === '小雨')
    return 'http://gd-hbimg.huaban.com/43569dcae1e69f57e7ba613fac77a2a11eaead69238f0d-Tlh5M9_fw480'
  else if (w === '大雨')
    return 'http://gd-hbimg.huaban.com/5f43e87c03712b3acac273a2ae5c04e5ab6097f01d8934-6pf9pF_fw480'
  else if (w === '雪天')
    return 'http://gd-hbimg.huaban.com/0aa37baa112490f8aa712b5ae1ce15f301c6d9de226207-RcaFa1_fw480'
  else if (w === '雷暴')
    return 'http://gd-hbimg.huaban.com/408d2b79c066183e777b1f603b13aea0306029a01b56cd-41zLUC'
  else if (w === '雷阵雨') {
    return 'http://gd-hbimg.huaban.com/7feaafc744426ca3ecc3c706874911606646089319c4a9-ZKZH8D'
  } else if (w === '中到大雨') {
    return 'http://gd-hbimg.huaban.com/5f43e87c03712b3acac273a2ae5c04e5ab6097f01d8934-6pf9pF'
  }
  return 'http://gd-hbimg.huaban.com/c29b18c89f635960641e53e96a51dcc008313ea5248534-CMIw2t_fw480'
}

// 获取风力信息
const getF = (f) => {
  if (f[0] === '0') {
    return '无风'
  }
  if (f[0] === '1') return '感觉不到风（舒适）'
  else if (f[0] === '2') return '微风（舒适）'
  else if (f[0] === '3') return '和风（舒适）'
  else if (f[0] === '4') return '清风（还行）'
  else if (f[0] === '5') return '强劲（风大）'
  else if (f[0] === '6') return '强风（风大）'
  return '大风（不建议户外）'
}
// 定义杭州天气数组
let weatherArr = ref([])
// 获取杭州一周天气
const getWeather = async () => {
  const res = await getWeatherService()
  console.log(res)
  weatherArr.value = res.data.data.map((item) => {
    return {
      city: '杭州',
      date: item.date,
      fengli: getF(item.fengli),
      fengliData: item.fengli,
      temperature: item.low + '~' + item.high,
      condition: item.type,
      week: item.week,
      icon: getIcon(item.type)
    }
  })
  console.dir(weatherArr.value)
  weatherArr.value[0].week = '今天'
}
getWeather()

const useStore = useCounterStore()
// 跳转收藏页
const goStar = () => {
  router.push('/star')
}

const show = ref(true)
if (localStorage.getItem('counterStore')) {
  // 如果存在，调用处理函数
  console.log(1)
  show.value = false
} else {
  console.log(2)
  show.value = true
}
const handleConfirm = () => {
  // console.log(1)
  console.log(useStore.isShow)
  useStore.setShow()
}
</script>
<template>
  <van-icon class="icon" name="star-o" @click="goStar" />
  <div>
    <WeatherCard
      :weatherData="item"
      v-for="(item, index) in weatherArr"
      :key="index"
    />
  </div>
  <van-dialog
    v-model:show="show"
    title="新增收藏功能，可以把喜欢的景点放在收藏夹里~"
    confirmButtonText="不再提醒"
    show-cancel-button
    @confirm="handleConfirm"
  >
  </van-dialog>
</template>

<style lang="scss" scoped>
.icon {
  position: fixed;
  right: 0px;
  bottom: 60%;
  font-size: 30px;
  color: #4a90e2;
}
</style>
