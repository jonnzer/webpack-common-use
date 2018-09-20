module.exports={
    "webpack":{
        entry:{
            "jd":"./dev/js/jd/one.js"
        },
        chunkFilename:'jd-chunk-[chunkhash:5].js',
         // publicPath:'https://nscdn.huodongxing.com/Content/v2.0/dist/js/'
        publicPath: 'http://127.0.0.1:3013/dist/js/'
          // publicPath:'/Content/v2.0/dist/js/'
    },
    gulp:{
        webPort:"3013",
        nodejsPath:"../generate-dir",//copy 文件至nodejs中 nodejs的路径
        gulpBase64File:[
                         // 'hdx-new-admin'
                            '1',
                        ],//sass文件名存在于此数组内的才会去进行base64打包 : dist/css/sass filename need add in here
        compilePugFile:[
                        'dev/output-html/jd/one.pug'
        ],//按需编译某些pug
        // compilePugFile:['dev/output-html/**/*.pug'], // 编译 output-html目录底下所有pug
        compileSassFile:[
                            'dev/sass/output/1.scss',
                        ],//按需编译某些sass
        //copyJsPath:"../facepass-console/public/console/dist/js",//js文件默认复制到 hdx-nodejs-web这个项目
        //copyCssPath:""    //同上
        //copyImgPath:""    //同上
        watchCompileSass: ["dev/sass/**/*.scss"], // 监听哪些文件变动并且编译Sass
        watchCompileJs: ["dev/js/**/*.js","dev/js/**/*.vue"],  // 监测js，vue
        watchCompilePug: ["dev/layout-component/**/*.pug", "dev/output-html/**/*.pug"] // 监听pug
    }
};