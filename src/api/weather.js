import axios from 'axios'

// 获取天气信息
export const getWeatherService = () => {
  return axios.get('https://api.vvhan.com/api/weather', {
    params: {
      city: '杭州',
      type: 'week'
    }
  })
}
