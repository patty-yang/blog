## 多文件预览

##### `解决思路`

- 预览内容分类

  - 浏览器本身就支持的
    - 使用了 FileReader 读取 dataUrl 实现本地预览
  - 视频
    - 使用了 URL.createObjectURL 将文件转换为 blob URL 实现本地预览
  - txt、代码、md
    - marked、highlight.js 实现代码高亮
  - xmind、pdf
    - 使用第三方库会暴漏资源的公网地址,通过 BFF 层做中转,隐藏真实连接

- 使用 `FileReader` 将文件转换为 data URL
- 使用 `URL.createObjectURL` 将文件转换为 blob URL
