# free-cloud-disk-server

## 简介

单次免费获得185MB云盘空间
## 安装/使用
### 安装在[glitch](https://glitch.com)
#### 自动导入
直接在glitch的discover从github导入本项目
```text
https://github.com/my-name-is-not-available/free-cloud-disk-server.git
```
#### 手动导入
复制本项目的`package.json`和`index.js`，手动导入到glitch
#### 获取域名
glitch会为每个项目都分配一个域名，请保存好这个域名，在后续的版本中会作为连接云盘的重要凭证。
### 安装在个人服务器
复制本项目的`package.json`和`index.js`到服务器中
运行命令：

```bash
npm install
```
根据想要分配的容量修改`index.js`中的size数，默认为193986560（单位字节）~~当前版本没有任何卵用~~
为后续版本需要，请自行分配一个域名/公网IP，可以自行修改端口号为80（默认3000）

## 使用方法
额。。不想写，你翻翻`index.js`吧，总共没几行
现阶段几乎无法日常使用，建议等更新[确信]
