---
updateTime: 2024/03/01
title: Android 反编译
tags: Android|反编译
---

## 1| 相关工具
1.  apktool [APKTOOL - 如何安装 (ibotpeaches.github.io)](https://ibotpeaches.github.io/Apktool/install/)
2.  jdk 1.8 [jdk1.8](https://dl-download.csdn.net/down11/20210724/a3d92a0c8a5be881d5cdeb8612a11076.7z?Expires=1667987511&OSSAccessKeyId=STS.NUMfHhXuimeBeeHXGzUvEZt36&Signature=BON0pkp3GtBq3u83qADep7TwN%2BU%3D&response-content-disposition=attachment%3Bfilename%3D%22jdk%25208u%26jdk%25208u%2520docs.7z%22&Date=1667987511&security-token=CAISgwJ1q6Ft5B2yfSjIr5b4LfLctapI2qepZ0P5vEcvWflptbGY1Dz2IHxFf3FoCOEYv%2Fk1nWlU6%2FoTlqF%2FTIBDQUvNYZOfMHLfXFvzDbDasumZsJYw6vT8a1fxZjf%2F2MjNGaCbKPrWZvaqbX3diyZ32sGUXD6%2BXlujQ%2BDr6Zl8dYY4UxX6D1tBH8wEAgp5tI1gQhm3D%2Fu2NQPwiWf9FVdhvhEG6Vly8qOi2MaRmHG85R%2FYsrZJ%2FtuvecD%2FMJI3Z8kvC4uPsbYoJvab4kl58ANX8ap6tqtA9Arcs8uVa1sruEnXaLKMo4wxfVIjP%2FFmRvIVtprnieY9tuiWkJ%2Fs25qImF%2BBkY61GoABV1bQIInsAbzfub3OHrztBkAshRBV91wofcgNu0FfEdARlnrUM6lxuWGb9YY5lNEa4czEU1S8R9bNEDaBFRcXlq3NFL2h%2BoV3ea%2FHj55pn1tK1vbgv6os1CNlG5y6I4b59WPoPhjyOX8ydAH1FnSbqkVS04HdUJs1wP%2FofiDDEQw%3D)
3.  dex-tool [dex-tool]([发布 ·PXB1988/DEX2jar (github.com)](https://github.com/pxb1988/dex2jar/releases))
4.  luyten [luyten]([deathmarine/Luyten: An Open Source Java Decompiler Gui for Procyon (github.com)](https://github.com/deathmarine/Luyten))

## 2| apktool 使用
1. 解包apk

   ```bash
   apktool.bat -d -f xxx.apk -o xxx
   ```

   -d 解包 

   -r 表示不解压res文件出来

2. 打包apk

   ```bash
   apktool.bat -b --user-aapt2 xxx
   ```

   --user-aapt 如果报xml资源相关错误，可使用此项选项

## 3| apk签名
1. 方式一 

   生成v1版本，对于Android 7 版本以下适用

   ```bash
   "C:\Program Files\Java\jdk1.8.0_301\bin\jarsigner" -keystore C:\Users\13736\Documents\AndroidProjects\123456.jks -signedjar C:\Users\13736\apktools\kuan\dist\kuan_singed.apk C:\Users\13736\apktools\kuan\dist\kuan.apk key0
   ```

2. 方式二

   1. 生成v2,v3,v4版本签名

      1. 先字节对齐

      ```bash
      C:\Users\13736\AppData\Local\Android\Sdk\build-tools\30.0.3\zipalign.exe -f -v 4 douyin.apk douyin_zip.apk
      ```

      2. 再签名

      ```bash
      java -jar C:\Users\13736\AppData\Local\Android\Sdk\build-tools\30.0.3\lib\apksigner.jar sign  -v  --out douyin_zip_signer.apk --ks C:\Users\13736\myapp.jks --ks-key-alias key0  douyin_zip.apk
      ```

​		[签名参考链接](https://liapp.lockincomp.com/blog/blog-Post/tech-apk-signature-scheme-v2-with-apksigner/)


