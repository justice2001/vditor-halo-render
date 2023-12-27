import "./less/render.less"
import {RENDER_CLASS} from "./constant";
import {ProviderFactory} from "./provider/provider";

class HaloJs {
    public static renderHalo = (src: string, fontCDN: string = null): string => {
        // Load Font
        let fontStyle = document.getElementById("halo-render-font-face");
        if (!fontStyle) {
            fontStyle = document.createElement("style");
            fontStyle.id = "halo-render-font-face"
            fontStyle.innerHTML = `@font-face {
 font-family: 'iconfont';
 src: url('${fontCDN || "."}/fonts/iconfont.woff2?t=1703484934750') format('woff2'),
 url('${fontCDN || "."}/fonts/iconfont.woff?t=1703484934750') format('woff'),
 url('${fontCDN || "."}/fonts/iconfont.ttf?t=1703484934750') format('truetype');
}
`
            document.getElementsByTagName("head")[0].append(fontStyle)
        }
        src = src.trim()
        const line = src.split("\n");
        const type = line[0]
        line.splice(0, 1)
        const content = line.join("\n")
        return ProviderFactory.getFactory().process(type, content)
    }
}

export default HaloJs
