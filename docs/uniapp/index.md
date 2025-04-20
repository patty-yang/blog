# uni-app

一套代码多端发布

学习成本低 开发成本低 周边生态良好 平台能力不受限

view

text

rick-text

progress

...

网络请求
uni.request

文件处理
uni.uploadFile

uni.downloadFile

图片处理
uni.chooseImage

uni.previewImage

uni.getImageInfo

数据缓存
un.getStorage

uni.setStorage

uni.removeStorage

uni.removeStorageSync

交互
uni.showToast 提示框
uni.showLoading 加载框
uni.showModal 弹出框
uni.showActionSheet 显示菜单列表

路由
同小程序
navigateTo

生命周期
onLanuch
onshow

// 组件实例
created  
onLoad
onshow
onReady
onHide
onShow

uni.scss

```scss
@mixin flex(
  $level_style: space-between,
  $vertical_style: row,
  $isWrapper: nowrap
) {
  display: flex;
  align-items: center;
  justify-content: $level_style;
  flex-wrap: $isWrapper;
  flex-direction: $vertical_style;
}
$base-color: #f25037;
```

```json
{
  "pages": [
    //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
    {
      "path": "pages/index/index",
      "style": {
        // navBar 标题
        "navigationBarTitleText": "Are you ok?",
        //              自定义标题
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/test/test",
      "style": {
        "navigationBarTitleText": "test page"
      }
    }
  ],
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "uni-app",
    "navigationBarBackgroundColor": "#F8F8F8",
    "backgroundColor": "#F8F8F8"
  },
  "uniIdRouter": {},
  "tabBar": {
    "color": "#666",
    "selectedColor": "#4cd964",
    "backgroundColor": "#fff",
    // 底步 tabbar 的配置
    "list": [
      {
        "pagePath": "pages/index/index",
        "iconPath": "/static/logo.png",
        "selectedIconPath": "/static/logo.png",
        "text": "首页"
      },
      {
        "pagePath": "pages/test/test",
        "iconPath": "/static/logo.png",
        "selectedIconPath": "/static/logo.png",
        "text": "test"
      }
    ]
  }
}
```

uni.getSystemInfoSync 获取设备的系统信息

> statusBarHeight 状态栏的高度
> getMenuButtonBoundingClientRect 微信小程序胶囊获取

- input bug

  - uni-input 提交会剩 1-2 字符
  - css 调整

- 小程序不支持 refs 方法

<!-- - 短信定制服务
  -  -->
