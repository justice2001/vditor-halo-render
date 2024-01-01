# vditor-halo-render

vditor halo render是一款用于halo-plugin-vditor的自定义解析器，可以解析自定义的语法来输出HTML结构。可以应用于文章的编写。 本解析器主要用于markdown编辑器。

例如:

**>>INPUT**

```plaintext
tips:info
This is a info tips
```

**<<OUTPUT**

```html
<div class="halo-render halo-render-wrapper tips tips-info">
    <div>This is a info tips</div>
</div>
```

## 如何使用

您可以直接引用releases包下的index.js和index.css，并将fonts和icons目录拷贝到可访问的路径。
解析器导出了一个`HaloJs`对象可供使用。

要进行解析处理您仅需要使用下面的方法即可进行处理。

```js
HaloJs.renderHalo("tips:info\nThis is a info tips", "/")
```

renderHalo方法会返回解析后的html结构。renderHalo的参数与返回值如下：

```ts
/**
 * 解析自定义渲染
 * @param content 待渲染的文本
 * @param cdn 资源链接前缀
 * @return 资源渲染结果
 */
function renderHalo(content: string, cdn: string): string;
```

## 语法参考

- [语法介绍](doc/general.md)
- [Tips组件](doc/tips.md)
- [Git组件](doc/git.md)
- [资源组件](doc/drive.md)

## 开发

1. 安装依赖

    ```shell
    npm install
    ```

2. 启动开发环境

    ```shell
    npm run dev
    ```

3. 打包

    ```shell
    npm run build
    ```

