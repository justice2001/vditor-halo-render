# 资源分享组件

资源分享组件可以帮助用户生成一个分享展示的模块，它会包含资源平台、资源内容、链接按钮和提取码的信息。

当前资源平台支持百度网盘和阿里网盘的显示。

## 语法

```markdown
drive:<platform>
name: <title>
link: <link>
password: <password>
```

- `name`: 展示的资源标题
- `link`: 跳转到资源的链接
- `password`: 可选，资源提取码

## platform

当前支持的平台：

- `baidu`: 百度网盘
- `ali`: 阿里云盘

平台实际上只是一个icon和标题的组合，并不会影响资源的访问，如果您不介意，您可以在下方的配置中填写任意的链接。

## 示例

- 阿里云盘
  
    ```markdown
    drive:ali
    name: 网站资源集合
    link: https://www.ali.com/
    ```
  
- 百度网盘

    ```markdown
    drive:baidu
    name: 网站资源集合
    link: https://www.baidu.com/
    password: 1234
    ```
