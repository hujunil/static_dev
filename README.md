# 基于node的前端静态页面开发服务器

- 使用 `express` 作为静态服务器
- `nunjucks` 作为模板
- `browser-sync` 同步代码更新

# 使用说明

做二次开发

```
nmp run dev
```

开发静态文件

```
npm run static
```

生成静态文件，把模板文件导出生成为静态文件，具体的目录配置参见`dist.js`

```
npm run dist
```
