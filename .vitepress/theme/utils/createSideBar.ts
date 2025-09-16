export function createSideBar() {
  return {
    '/notes/': [
      {
        text: '📚 基础',
        collapsed: false,
        items: [
          {
            text: 'JavaScript 基础',
            collapsed: true,
            items: [
              { text: 'JS 基础', link: '/notes/basic/js-basics' },
              { text: 'ES6+ 特性', link: '/notes/basic/es6-features' },
              { text: '事件循环', link: '/notes/basic/event-loop' },
              { text: 'Promise', link: '/notes/basic/promise' },
              { text: '迭代器', link: '/notes/basic/iterator' },
              { text: '生成器', link: '/notes/basic/generator' },
              { text: 'Proxy', link: '/notes/basic/proxy' },
              { text: 'Reflect', link: '/notes/basic/reflect' },
              { text: '数组 API', link: '/notes/basic/array-api' },
              { text: 'Map', link: '/notes/basic/map' },
              { text: 'Set', link: '/notes/basic/set' },
              { text: 'WeakSet', link: '/notes/basic/weakset' }
            ]
          },
          {
            text: 'Web 技术',
            collapsed: true,
            items: [
              { text: 'CSS3', link: '/notes/basic/css3' },
              { text: 'HTML5', link: '/notes/basic/html5' },
              { text: '尺寸位置', link: '/notes/basic/dimensions' },
              { text: '浏览器渲染', link: '/notes/basic/rendering' },
              { text: '移动端适配', link: '/notes/basic/mobile' }
            ]
          },
          {
            text: '工程化',
            collapsed: true,
            items: [
              { text: '包管理器', link: '/notes/basic/package-manager' },
              { text: 'Fetch API', link: '/notes/basic/fetch-api' },
              { text: 'OAuth2', link: '/notes/basic/oauth2' }
            ]
          }
        ]
      },
      {
        text: '🌐 网络',
        collapsed: false,
        items: [
          {
            text: '网络基础',
            collapsed: true,
            items: [
              { text: '网络概述', link: '/notes/network/overview' },
              { text: '网络模型', link: '/notes/network/network-model' },
              { text: 'TCP 协议', link: '/notes/network/tcp' },
              { text: 'DNS 解析', link: '/notes/network/dns' }
            ]
          },
          {
            text: 'HTTP 协议',
            collapsed: true,
            items: [
              { text: 'HTTP 方法', link: '/notes/network/http-methods' },
              { text: 'HTTP 版本', link: '/notes/network/http-versions' },
              { text: '同源策略', link: '/notes/network/same-origin-policy' },
              { text: '文件下载', link: '/notes/network/file-download' }
            ]
          },
          {
            text: '认证与安全',
            collapsed: true,
            items: [
              { text: 'Cookie', link: '/notes/network/cookies' },
              { text: 'Session', link: '/notes/network/session' },
              { text: 'JWT', link: '/notes/network/jwt' },
              { text: 'CSRF', link: '/notes/network/csrf' },
              { text: 'XSS', link: '/notes/network/xss' }
            ]
          },
          {
            text: '性能优化',
            collapsed: true,
            items: [
              { text: '缓存机制', link: '/notes/network/caching' }
            ]
          }
        ]
      },
      {
        text: '🔧 Web API',
        collapsed: false,
        items: [
          {
            text: '交互 API',
            collapsed: true,
            items: [
              { text: '拖拽 API', link: '/notes/webAPI/01-拖拽' },
              { text: '文件 API', link: '/notes/webAPI/02-文件API' },
              { text: '文件上传', link: '/notes/webAPI/02-文件上传' },
              { text: '剪贴板 API', link: '/notes/webAPI/08-clipBoard' }
            ]
          },
          {
            text: '浏览器 API',
            collapsed: true,
            items: [
              { text: 'History API', link: '/notes/webAPI/06-history' },
              { text: '地理位置 API', link: '/notes/webAPI/07-geolocation' },
              { text: 'Worker API', link: '/notes/webAPI/05-worker' }
            ]
          },
          {
            text: '观察者 API',
            collapsed: true,
            items: [
              { text: 'Intersection Observer', link: '/notes/webAPI/10-intersectionObserverAPI' },
              { text: 'Mutation Observer', link: '/notes/webAPI/11-mutationObserver' },
              { text: 'Request Animation Frame', link: '/notes/webAPI/09-requestAnimationFrame' }
            ]
          }
        ]
      }
    ]
  }
}