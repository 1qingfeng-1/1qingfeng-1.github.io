---
updateTime: 2024/03/04
title: 备份Linux根文件系统的方法
tags: Linux|备份|根文件系统
---
备份方式一
```bash
tar cvpzf backup.tgz --exclude=/proc --exclude=/lost+found --exclude=backup.tgz --exclude=/mnt --exclude=/sys --exclude=/media --exclude=/run /
```

备份方式二
```bash
dd if=/dev/sda of=/path/to/backup/rootfs_backup.img bs=4M status=progress
```
- if=/dev/sda 指定输入文件（即要备份的文件）。这里我们假设 /dev/sda 是你的根文件系统所在的设备。请根据你的实际情况修改这个值。
- of=/path/to/backup/rootfs_backup.img 指定输出文件（即备份文件）。请将 /path/to/backup/ 替换为你希望将备份文件存放的目录。
- bs=4M 指定复制的块大小。这个值可以根据你的系统和硬件性能进行调整。
- status=progress 命令显示进度信息
