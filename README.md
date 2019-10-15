## 法学院课堂测试小程序

### 目录结构说明

```
|-- 根目录
	|-- assets	/**放置静态文件，如图片**/
	|-- components /**自定义组件**/
	|-- pages /**所有页面，请以平级存放**/
	|-- service /**网络请求相关配置**/
		|-- config.js
		|-- network.js /**微信请求函数的封装**/
	|-- utils /**工具函数封装**/
		|-- utils.js
	|-- README.md
	|-- app.js
	|-- app.json
	|-- app.wxss /**全局样式**/
	|-- project.config.json /**项目配置，可在此配置appid**/
```

* 备注：

  - example为网络请求示例，可供参考

  - 请严格遵循开发规范