---
updateTime: 2024/03/07
title: 解决wsl2 删除文件后，磁盘空间不释放问题
tags: WSL||windows|vdisk|磁盘压缩
---

## 问题描述

在wsl2中，删除文件后，C盘磁盘空间不释放。

## 原因分析
这是因为wsl2的文件系统是虚拟的(VHDX)，VHDX支持自动扩容，但一般不会自动缩容，所以删除文件后，磁盘空间不会立即释放。需要删除文件后手动压缩vhdx文件才能释放空间。

## 解决方法
查找` Linux distributions`
```sh
wsl -l -v
  NAME                   STATE           VERSION
* Ubuntu-20.04           Running         2
```
我搜索到的`ext4.vhdx`文件路径如下：
- C:\Users\用户名\AppData\Local\Docker\wsl\data\ext4.vhdx
- C:\Users\用户名\AppData\Local\Docker\wsl\distro\ext4.vhdx
- C:\Users\用户名\AppData\Local\Packages\CanonicalGroupLimited.Ubuntu20.04onWindows\LocalState\ext4.vhdx 

由于这里磁盘空间不足主要是wsl中删除大量文件后， `ext4.vhdx`没有缩容引起的，所以这里压缩`ext4.vhdx`。

如果出现删除 Docker 镜像、删除 Docker 容器后磁盘占用没有缩小，应该也可以类比操作。
### 压缩虚拟磁盘文件
首先确保wsl已关机，在wsl2中执行以下命令：
```bash
wsl --shutdown
```
然后执行以下命令：
```bash
diskpart
```
在diskpart中执行以下命令：
```bash
# 选择虚拟磁盘文件
select vdisk file=" C:\Users\用户名\AppData\Local\Packages\CanonicalGroupLimited.Ubuntu20.04onWindows\LocalState\ext4.vhdx"
# 压缩文件
compact vdisk
# 压缩完毕后卸载虚拟磁盘
detach vdisk
```

以上操作完毕，`wsl`删除文件后，虚拟磁盘得以缩容。

# 启动wsl
```bash
# cmd 执行
wsl
```
