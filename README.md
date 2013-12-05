[Node入门](http://www.nodebeginner.org/)图片上传显示的完整例子代码
---
### 文件说明
+   首先请安装好nodejs，并且使用`npm install -g nodemon`命令安装好nodemon
    >   nodemon用于监测文件的修改，省去每次都要手动结束node进程并且重新启动的麻烦
    >   nodemon适用于nodejs开发环境，pm2适用于生产环境。
    >
    >   链接地址：[nodemon](https://github.com/remy/nodemon), [pm2](https://github.com/Unitech/pm2)

+   如果没有安装formidable，请运行`npm install formidable`
    > `-g`选项是可选的，加上表示在全局安装，不加的话只在这个文件夹中安装
    >使用formidable时会出现`cross-device link not permitted`错误
    > 解决方法，在`form.parse`代码前加上`form.uploadDir = './'`也就是将上传目录
    > 改到当前目录即可。因为上面的错误提示正是因为文件默认上传到了windows的临时
    > 文件夹，而当前文件放在了其他盘符。

+   图片上传显示的代码
    +   index.js #入口文件，使用`nodemon index.js`来运行
    +   server.js #服务器，使用http模块来创建http服务器
    +   router.js #url请求的转发，即路由器程序
    +   requestHandlers.js  #请求处理文件

+   其他
    +   hello.js    # hello world to nodejs
    +   node-formidable.js  # hello world to formidable
    +   server.js   # hello world to node http server
    +   test.png    #示例文件

+   [代码地址]()
