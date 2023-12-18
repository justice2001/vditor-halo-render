import {Provider} from "./provider";
import "../less/tips.less"
import {RENDER_CLASS} from "../constant";

export class TipsProvider implements Provider {
    check(type: string): boolean {
        return type.startsWith("tips")
    }

    process(type: string, content: string): string {
        const lines = content.split("\n")
        let html = ""
        html = `<div class="${RENDER_CLASS} tips ${type.replace(":", "-")}">`
        lines.forEach((line: string) => {
            if (line) html += `<div>${line}</div>`
        })
        html += "</div>"
        return html
    }
}
