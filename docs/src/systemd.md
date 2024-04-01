# 适用systemd服务来部署您的应用 
**适用**：linux相关服务器

**前置**：需要编译好二进制文件，可参考makefile命令，执行

```makefile
go build -ldflags="-X 'main.BuildTime=`date`' -w -s" -buildvcs=false -o ./bin/ ./...
```

## systemd服务 管理脚本
> 其中 XXX 请自定替换成您的项目数据。
```editorconfig
[Unit]
Description= XXXX # 此行应包含单元的描述。通常用于描述单元的目的。
After=network.target # 指定单元应在网络启动后启动

[Service]
Type=simple # `simple`表示服务预计在前台启动
WorkingDirectory= XXX # 指定服务的工作目录
Environment=GIN_MODE=release # 设置环境变量 `GIN_MODE` 为 `release`
ExecStart= XXX # 指定启动服务的命令行
Restart=on-failure # 定义服务的重启行为
RestartSec=5s # 指定重新启动尝试之间的延迟
StandardOutput=syslog  # 将服务的标准输出重定向到 syslog
StandardError=syslog # 将服务的标准错误重定向到 syslog
SyslogIdentifier= XXX # 指定 syslog 消息中使用的标识符
KillMode=mixed # 定义服务进程应如何终止
TimeoutStopSec=5 # 指定等待服务正常停止的时间

[Install]
WantedBy=multi-user.target

```