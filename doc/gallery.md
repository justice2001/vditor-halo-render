# 🧩 图集组件



该模块提供给用户上传图集的功能，可以让用户在一个模块中上传多张图片，组成一个图集，现在为用户提供两种排列方式：

- 九宫格排列：将会让图片按照九宫格排列，上下可拓展。
- 线性排列：使图片线性排列，提供左右滚动能力。

## 🖊️ 语法

> 规划阶段语法，后续可能会变更

```markdown
gallery:<type>[<title>]
![<image1 alt>](<image1 url>)
![<image2 alt>](<image2 url>)
```

### type

模块支持下面两种排列类型：

- `linear`：线性排列(默认)
- `grid`：九宫格排列

### image title

图集的介绍，如果没有填写字段则会显示为图集

### image alt

图片的介绍，暂时计划放置在图片下方。

### image url

图片的链接

## 📄 示例

```plaintext
gallery:grid
[Image 1](https://img.example.com/img1.jpeg)
[Image 2](https://img.example.com/img2.jpeg)
```
