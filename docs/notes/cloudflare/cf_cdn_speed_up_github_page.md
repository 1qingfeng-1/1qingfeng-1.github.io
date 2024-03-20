---
updateTime: 2024/03/20
title: 使用Cloudflare CDN 免费加速Github Pages访问
tags: CDN|Cloudflare|GitHub Pages
---


## 前言
`github page` 在国内访问速度比较慢，使用`cloudflare`的`cdn`可以加速访问速度。 免费版本请求次数限制，每天10w次，超过限制会返回403错误。

## 前提
 1. 有一个域名，没有就买一个
 2. 有`cloudflare`账号，没有就注册一个 
 3. 准备 `github page`页面，没有就去搜索`vitepress github page`
### 准备域名
   域名很便宜，在`www.dynadot.com` 买一个`.xyz`结尾的域名买一年才15元，只需要认证邮箱，不需要实名，也不需要备案。付款可以使用支付宝，方便了不少。 花了15元买`aihuan.xyz`一年期。

## 设置 `Github Page`
  导航到github ${username}.github.io仓库的设置页面找到对应设置，把自定义域名配置上去，如下图：

![](/assets/notes/cloudflare/cf_cdn_speed_up_github_page_1.png){data-fancybox=gallery}

点击`Save` 后会自动检测`DNS`

## 设置域名解析

  打开`https://dash.cloudflare.com`，登入后导航到 `网站`  然后点击`添加站点`， 然后将*您的已分配的 Cloudflare 名称服务器*。

```bash
dax.ns.cloudflare.com
josephine.ns.cloudflare.com
```

填入到`dynadot.com` 我的域名->DNS设置，如下图：

![](/assets/notes/cloudflare/cf_cdn_speed_up_github_page_2.png){data-fancybox=gallery}

到`cf的仪表盘`，修改`DNS`，通过A记录分别解析到如下4个`IP`， 通过CNAME记录解析到`github page域名`

```markdown
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

示例图：

![](/assets/notes/cloudflare/cf_cdn_speed_up_github_page_3.png){data-fancybox=gallery}

此时通过[https://bolg.aihuan.xyz](https://bolg.aihuan.xyz)访问`Github Page` 如果报301重定向次数过多，导致打不开网页，需做如下图所示的设置：

![](/assets/notes/cloudflare/cf_cdn_speed_up_github_page_4.png){data-fancybox=gallery}

## 测试

上述步骤走完之后，等待一段时间用命令验证一下：

```bash
$ mrpeng dig bolg.aihuan.xyz +noall +answer
> bolg.aihuan.xyz.        0       IN      A       104.21.72.157
> bolg.aihuan.xyz.        0       IN      A       172.67.152.116
```

可以看到 `dns` 解析的 `IP` 已经变了，说明`github page`已经被 `cloudflare cdn` 接管了, 相比于原来通过github.io访问速度快了不少呢。

