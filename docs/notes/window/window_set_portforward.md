---
updateTime: 2024/03/04
title: windows下通过端口转发访问WSL中的服务
tags: WSL|端口转发|windows
---

同一个网段下，其他用户访问本机WSL中某个端口上的服务，需要在window侧做端口转发

`powershell`管理员模式，添加端口转发。

- 172.26.111.220 为`wsl` `IP`地址

```bash
netsh interface portproxy add v4tov4 listenport=12351 connectaddress=172.26.111.220 connectport=12351 listenaddress=* protocol=tcp
```

删除端口转发

```bash
netsh interface portproxy delete v4tov4 listenport=80 protocol=tcp
```

