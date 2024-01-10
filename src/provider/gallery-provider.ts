import {IOptions, Provider} from "./provider";
import {RENDER_CLASS} from "../constant";
import "../less/gallery.less"

export class GalleryProvider implements Provider {
    check(type: string): boolean {
        return type.startsWith("gallery");
    }
    process(type: string, content: string, options: IOptions): string {
        const imgInfoList = content.split("\n")
        const [, subtype, title=""] = type.match(/gallery:([a-zA-Z]+)(?:\[(.*?))?$/)
        console.log(subtype)
        let html = `<div class="${RENDER_CLASS} gallery ${subtype}">`
        html += `<div class="title"><span class="iconfont">&#xe61a;</span>${title.replace("]", "") || "图集"}</div>`
        // Start Image List
        html += `<div class="image-list">`
        imgInfoList.forEach(info => {
            if (!info) return;
            const [, alt, url] = info.match(/\[(.*)]\((.*)\)/)
            html+= `<div class="vditor--gallery-container"><img class="img" src="${url}" alt="${alt}" /></div>`
        })
        html += `</div>`
        // RETURN
        return html + "</div>"
    }
}