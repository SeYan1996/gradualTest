# Gradual Test Project

### 简易的聊天室 技术栈有 React NestJS MongoDB Graphql

主要侧重在实现Requirements, 所以没有做用户系统的设计, 只用一个用户名就可以创建账号

## 主要设计思路
- 客户端向服务端的请求通过Graphql请求，消息的推送使用SSE
- 存储用户在每个频道的最后一条已读消息的id, 用来计算和标识未读消息
- 每个消息的结构中包含有引用回复的消息Id，以及被@人的用户Id

## 完成的API模块

### 频道
- 创建频道
- 查询频道列表
- 查询用户频道未读消息数量 超过100直接返回100 显示99+
- 查询频道内用户列表

### 消息
- 给指定频道发送消息
- 拉取频道消息 拉取时提供一个起始消息的id 不提供则拉取最新 


### 用户
- 创建或者登录
- 加入聊天频道
- 退出聊天频道
- 更新频道最后已读消息id


## 安装运行(需要安装docker 服务使用docker-compose编排)

1. 克隆仓库:

   ```bash
   git clone https://github.com/your-username/simple-test-project.git

2. 使用docker-compose运行

   ```bash
   docker-compose up

3. 可能首次拉取镜像可能耗时有点久
   api在3000端口
   前端在30001端口（时间有点紧，前段还是施工现场，只能实现简单的发送接收 0_0）