import "./less/tips.less"
import "./less/render.less"
import {RENDER_CLASS} from "./constant";

export const haloRender = (src: string): string => {
    src = src.trim()
    const lines = src.split("\n");
    let html: string = ""
    const type = lines[0]
    if (type.startsWith("tips")) {
        html = `<div class="${RENDER_CLASS} tips ${type.replace(":", "-")}">`
        lines.forEach((line: string, index: number) => {
            if (index === 0) return
            if (line) html += `<div>${line}</div>`
        })
        html += "</div>"
        return html
    }
    return "<p>Working</p>"
}
