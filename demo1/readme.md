# 初次使用 go 语言

## 安装 go

[下载](https://go.dev/dl/)

## 配置

```
# 启用 Go Modules 功能
$env:GO111MODULE="on"

# 配置 GOPROXY 环境变量，以下三选一

# 1. 七牛 CDN
$env:GOPROXY="https://goproxy.cn,direct"

# 2. 阿里云
$env:GOPROXY="https://mirrors.aliyun.com/goproxy/,direct"

# 3. 官方
$env:GOPROXY="https://goproxy.io,direct"
```

## 初始化项目

```
go mod init <project_name>
```

[网络请求](https://pkg.go.dev/net/http)
go 项目一般分为 server 和 client 两个部分，server 部分一般用于处理业务逻辑，client 部分一般用于处理用户请求。

数据库映射：[gorm](https://gorm.io/zh_CN/docs/)
