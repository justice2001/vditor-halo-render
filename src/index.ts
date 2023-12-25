import "./less/render.less"
import {RENDER_CLASS} from "./constant";
import {ProviderFactory} from "./provider/provider";

class HaloJs {
    public static renderHalo = (src: string): string => {
        src = src.trim()
        const line = src.split("\n");
        const type = line[0]
        line.splice(0, 1)
        const content = line.join("\n")
        return ProviderFactory.getFactory().process(type, content)
    }
}

export default HaloJs
