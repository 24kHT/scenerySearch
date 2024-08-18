import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore(
  'counterStore',
  () => {
    let isShow = ref(true)

    const setShow = () => {
      isShow.value = false
    }
    const WeatherArr = ref([])
    // 添加天气收藏
    const setWeather = (obj) => {
      console.log(obj)
      WeatherArr.value.push(obj)
    }

    const logA = () => {
      console.log('logA')
    }

    // 清空收藏夹
    const clearStar = () => {
      WeatherArr.value = []
    }

    return { setShow, WeatherArr, setWeather, logA, clearStar, isShow }
  },
  {
    persist: true
  }
)
