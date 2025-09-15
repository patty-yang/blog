---
title: 剪贴板 API
date: 2020-09-15
tags:
- js
---

## 🔍 概述

Clipboard API 提供了读取和写入系统剪贴板内容的能力，支持文本、图片等多种数据格式。

## 📝 基础操作

- 文本

  - `navigator.clipboard.readText()`
    ```javascript
    const text = await navigator.clipboard.readText()
    ```
  - `navigator.clipboard.writeText(text)`
    ```javascript
    await navigator.clipboard.writeText(text)
    ```

- 任意内容

  - `navigator.clipboard.read()`

    ```javascript
    async function readClipboard() {
      try {
        const clipboardItems = await navigator.clipboard.read()
        for (const clipboardItem of clipboardItems) {
          for (const type of clipboardItem.types) {
            const blob = await clipboardItem.getType(type)
            const fr = new FileReader()
            fr.onload = (e) => {
              console.log(e.target.result)
            }
            fr.readAsText(blob)
          }
        }
      } catch (err) {
        console.error('读取失败:', err)
      }
    }
    ```

    - `navigator.clipboard.write([items])`

    ```javascript
    async function writeClipboardImage(imageBlob) {
      try {
        const item = new ClipboardItem({
          'image/png': imageBlob
        })
        await navigator.clipboard.write([item])
        console.log('图片写入成功')
      } catch (err) {
        console.error('写入失败:', err)
      }
    }
    ```
