### webpack打包流程构建
### 基于webpack v4.17.2
### 时间 2018 09 07 13:54:46

```
webpack-dev-server: 起本地服务
```

```
babel loader 编译js 高级语法，或者jsx
babel-core babel-loader babel-preset-env babel-preset-react
注意本项目 babel-loader 用的是7.1.5版本
```

```
    style-loader css-loader 编译css
    css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能,
    style-loader将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中
    PostCSS 来为CSS代码自动添加适应不同浏览器的CSS前缀。
    autoprefixer
```