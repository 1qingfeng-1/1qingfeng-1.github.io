---
updateTime: 2024/03/04
title: vitepress 放大预览图片
tags: vitepress|放大图片|前端
---

# vitepress 如何添加点击图片放大预览

## 实现点击图片放大预览功能
:::tip 提示
 **插件介绍**
 `makrdown-it-custom-attrs` 是一个`Markdown`解析器（`parser`）插件，用于扩展`Markdown`解析器的功能，允许用户在`Markdown`中内容中自定义属性（`attributes`）和类（`class`），从而实现更加灵活和个性化的`Markdown`样式差异化定制。
:::

### `vitepress` 图片放大预览配置步骤

#### Step.1: 安装依赖
```bash
yarn add markdown-it-custom-attrs --dev
```

#### Step.2: 配置 `vitepress` 配置文件
```js
import mdItCustomAttrs from "markdown-it-custom-attrs";
```

#### Step.3: 配置 .vitepress/config.js 文件
```js
import mdItCustomAttrs from "markdown-it-custom-attrs";
export default { // [!code focus:10]
  markdown: {
    config: (md) => {
      // use more markdown-it plugins!
      md.use(mdItCustomAttrs, "image", {
        "data-fancybox": "gallery",
      });
    },
  },
};
```

#### Step.4: 引入相关js和css文件
```js
export default {
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css",
      },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js",
      },
    ],
  ],
};
```
```
export default {
 head: [
    // 引入图片灯箱 js 和 css 文件
    [ // [!code focus:16]
      "script",
      {},
      `
        const script = document.createElement("script");
        script.defer = "";
        script.sync = "";
        script.src = "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js";
        document.body.append(script);
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css";
        document.head.append(link);
      `
    ],
  ],
};
```

#### Step.5: 渲染效果
```markdown
<!-- ![](图片地址) -->
<img src="图片地址" data-fancybox="gallery"/>
```
或者

```makrdown
![图片描述](图片地址){data-fancybox=gallery}
```

### 最终效果

<img src="https://ts1.cn.mm.bing.net/th/id/R-C.d31cd6663d7f03e9f3262501c6b93c5d?rik=3SbWFNxtZzQJSg&riu=http%3a%2f%2fpic.bizhi360.com%2fbbpic%2f20%2f6320.jpg&ehk=dbSxYupjjj1OlCFHBaPN2vMAAmRMqGGeKKg7y4ope0g%3d&risl=&pid=ImgRaw&r=0" alt="test-markdown-preview" id="V1" data-fancybox="gallery">

<img src="https://ts1.cn.mm.bing.net/th/id/R-C.d31cd6663d7f03e9f3262501c6b93c5d?rik=3SbWFNxtZzQJSg&riu=http%3a%2f%2fpic.bizhi360.com%2fbbpic%2f20%2f6320.jpg&ehk=dbSxYupjjj1OlCFHBaPN2vMAAmRMqGGeKKg7y4ope0g%3d&risl=&pid=ImgRaw&r=0" alt="test-markdown-preview" id="V1" data-fancybox="gallery">

<a onclick="document.querySelector('#V1').click()">点击看大图</a>

```makrdown
![鲜花](https://ts1.cn.mm.bing.net/th/id/R-C.d31cd6663d7f03e9f3262501c6b93c5d?rik=3SbWFNxtZzQJSg&riu=http%3a%2f%2fpic.bizhi360.com%2fbbpic%2f20%2f6320.jpg&ehk=dbSxYupjjj1OlCFHBaPN2vMAAmRMqGGeKKg7y4ope0g%3d&risl=&pid=ImgRaw&r=0){data-fancybox=gallery}

![鲜花](https://ts1.cn.mm.bing.net/th/id/R-C.d31cd6663d7f03e9f3262501c6b93c5d?rik=3SbWFNxtZzQJSg&riu=http%3a%2f%2fpic.bizhi360.com%2fbbpic%2f20%2f6320.jpg&ehk=dbSxYupjjj1OlCFHBaPN2vMAAmRMqGGeKKg7y4ope0g%3d&risl=&pid=ImgRaw&r=0){data-fancybox=gallery}

```
