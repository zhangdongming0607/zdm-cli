### zdm_cli
随便写的一个脚手架   
参考（抄）了很多 vue-cli 的代码    
感谢尤大~~

#### 安装
```
npm install -g zdm_cli
```
#### 命令
```
cli 查看可用命令

cli init [path] [project-name] <Options>

```
path：模板的本地路径或 github repo 的地址
project-name 生成的项目文件名
Options 本地模板（--offline）还是线上模板（默认） 

目前支持的暂时只有 https://github.com/zhangdongming1989/webpack-template
这一个模板
所以想体验请用命令
本地：
```
cli init https://github.com/zhangdongming1989/webpack-template my_project

```
或   
远程：

```
cli init <存放上面这个模板的本地路径> my_project --offline

```

已经支持使用本地模板，但是模板引擎还没有换。。。