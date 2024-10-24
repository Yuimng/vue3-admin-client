# vue3-admin-client

### 前言
基于 vue3 制作的的通用后台管理系统 ym-admin

- 预览地址：[预览地址](http://175.178.159.253:3501) 
- 管理员账号：admin  密码：admin1234
- 普通用户账号：test   密码：test1234

### 1. 项目功能
- ✅ 用户登录 - 7天免登录
- ✅ 首页示例 - 数据卡片、折线图、饼状图
- ✅ 主题更换 - 自定义主题色
- ✅ 暗黑模式
- ✅ 用户管理 - 增删改查
- ✅ 角色管理 - 增删改查
- ✅ 菜单管理 - 增删改查
- ✅ 部门管理 - 增删改查

### 2. 项目截图

#### 2.1 登录
 ![login](https://raw.githubusercontent.com/Yuimng/Images/main/admin_images/login.png) 
 ![login_dark](https://raw.githubusercontent.com/Yuimng/Images/main/admin_images/login_dark.png) 
&nbsp;

#### 2.2 主页
 ![home](https://raw.githubusercontent.com/Yuimng/Images/main/admin_images/home.png) 
 ![home_dark](https://raw.githubusercontent.com/Yuimng/Images/main/admin_images/home_dark.png) 
 ![home_pink](https://raw.githubusercontent.com/Yuimng/Images/main/admin_images/home_pink.png) 
 ![home_pink_dark](https://raw.githubusercontent.com/Yuimng/Images/main/admin_images/home_pink_dark.png) 
&nbsp;

#### 2.3 用户管理
 ![account](https://raw.githubusercontent.com/Yuimng/Images/main/admin_images/account.png) 
&nbsp;

#### 2.4 角色管理
 ![role](https://raw.githubusercontent.com/Yuimng/Images/main/admin_images/role.png) 
&nbsp;

#### 2.5 菜单管理
 ![menu](https://raw.githubusercontent.com/Yuimng/Images/main/admin_images/menu.png) 
&nbsp;

#### 2.6 部门管理
 ![dept](https://raw.githubusercontent.com/Yuimng/Images/main/admin_images/dept.png) 

### 3. 技术栈
Vue3 + TypeScript + Vite + Vue-router + Pinia + Axios + Element-Plus + Sass

### 4. 项目规范
- **editorconfig配置**： 编辑器规范
- **prettier工具**：代码格式化
- **eslint工具**：代码格式化

### 5. 后端
koa-admin-server 通用后台管理系统 ym-admin的服务端

#### 5.1 技术栈
Node + Koa + Typescript + Mysql

#### 5.2 项目地址
github地址：[项目地址](https://github.com/Yuimng/koa-admin-server) 

#### 5.3 接口返回规范

```json
{
    "code": 200,
    "data": null,
    "msg": ""
}
```

### 6. 部署

vite工具打包前端项目，在云服务器上安装和使用nginx进行接口请求代理完成部署，后端采用pm2启动服务。
