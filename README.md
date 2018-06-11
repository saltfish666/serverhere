## 技术栈
nodejs http、fs模块

## how to use
require node npm installed
```
git clone [thisrepo]
cd [thisrepo]
npm install
npm link
```

```
$serverhere -p 3000
```
now you can visit localhost:3000/path/to/file

## 思路
创建一个http服务器，将网络请求中的url转化为文件路径，并允许用户访问