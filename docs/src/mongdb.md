> 修改 config/local.yml 文件内容

```yaml
data:
  mongodb:
    host: 127.0.0.1
    port: 27018 # 以实际为准
    username: XXXXX
    password: XXXXX
    database: XXXXX
    authSource: XXXXX
```

## systemd服务 管理脚本
> 修改 internal/repository/repository.go 中的 NewDb 代码块
```gotemplate

import (
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

type Repository struct {
    client *mongo.Client
    db     *mongo.Database
    /*
    * 其他代码块
    */
    logger *log.Logger
}

// 创建 MongoDB 客户端实例
// 注意 conf.Config 读取的是配置文件，仅供参考适用
func NewDb(c *conf.Config) {
    dsn := fmt.Sprintf("mongodb://%s:%d", c.Host, c.Port)
    clientOptions := options.Client().ApplyURI(dsn).SetAuth(options.Credential{
        AuthSource: c.AuthSource,
        Username:   c.Username,
        Password:   c.Password,
    })
    client, err := mongo.NewClient(clientOptions)
    if err != nil {
        panic(fmt.Sprintf("failed create client of mongodb: %v", err))
    }
    
    // 连接 MongoDB 数据库
    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()

    err = client.Connect(ctx)
    if err != nil {
        panic(fmt.Sprintf("failed opening connection to mongodb: %v", err))
    }
    
    // 检查连接是否成功
    err = client.Ping(ctx, nil)
    if err != nil {
        panic(fmt.Sprintf("failed ping client of mongodb: %v", err))
    }
    
    // 设置全局的 MongoDB 客户端实例
    r.client = client
    r.db = client.Database(c.Database)
}

```