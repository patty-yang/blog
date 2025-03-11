# 📍 地理位置 API (Geolocation)

## 🌍 基本概念

Geolocation API 允许网页应用获取用户的地理位置信息，可用于位置服务、地图显示等功能。

## 🛠️ 核心 API

- `getCurrentPosition`: 获取当前位置
- `watchPosition`: (return watchId) 持续监听位置变化
- `clearWatch`: 停止监听

### 获取当前位置

```javascript
navigator.geolocation.getCurrentPosition(
  (position) => {
    const { coords } = position
    console.log({
      latitude: coords.latitude, // 纬度
      longitude: coords.longitude, // 经度
      accuracy: coords.accuracy, // 精确度（米）
      altitude: coords.altitude, // 海拔（米）
      altitudeAccuracy: coords.altitudeAccuracy, // 海拔精确度
      heading: coords.heading, // 方向（度）
      speed: coords.speed // 速度（米/秒）
    })
  },
  (error) => {
    console.error('获取位置失败:', error.message)
  },
  {
    enableHighAccuracy: true, // 高精度模式
    timeout: 5000, // 超时时间（毫秒）
    maximumAge: 0 // 缓存时间
  }
)
```

## ⚠️ 注意事项

### 1. 权限处理

```javascript
async function checkLocationPermission() {
  try {
    const permission = await navigator.permissions.query({
      name: 'geolocation'
    })
    switch (permission.state) {
      case 'granted':
        return true
      case 'denied':
        console.warn('位置权限被拒绝')
        return false
      case 'prompt':
        console.log('需要请求位置权限')
        return 'prompt'
    }
  } catch (error) {
    console.error('权限检查失败:', error)
    return false
  }
}
```

### 2. 错误处理

```javascript
function handleLocationError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return '用户拒绝了位置请求'
    case error.POSITION_UNAVAILABLE:
      return '位置信息不可用'
    case error.TIMEOUT:
      return '请求超时'
    default:
      return '未知错误'
  }
}
```
