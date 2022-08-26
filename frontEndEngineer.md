# Redis
## Redis与MySOL
 - Redis 内存数据库，访问快，用于存储公共和极少更改的数据(登录信息)
 - MySQL 硬盘数据库，访问慢，用于存储静态数据集合
## Redis操作
 - 启动 redis-server
 - 链接客户端：redis-cli
 - 设置或修改redis：set name 'js'
 - 获取Redis：get name
 - 获取reids所有key：keys *
 - 删除Redis key：del name
 - 推出客户端：exit
## Redis适用情况
  1. session数据量小
  2. session不考虑数据丢失问题
  3. session访问频率高，要求访问快，性能高
## Redis不适用情况
  1. 操作频率不高
  2. 数据不能丢失
  3. 数据量太大，内存无法承受
## Redis使用
