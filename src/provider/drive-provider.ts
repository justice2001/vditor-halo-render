import {IOptions, Provider} from "./provider";
import "../less/drive.less"
import {RENDER_CLASS} from "../constant";

const PLATFORM_LIST: {[key: string]: Platform } = {
    "baidu": {
        icon: "/icons/drive/baidu.svg",
        name: "百度网盘"
    },
    "ali": {
        icon: "/icons/drive/ali.png",
        name: "阿里云盘"
    }
}

export class DriveProvider implements Provider {
    check(type: string): boolean {
        return type.startsWith("drive")
    }

    process(type: string, content: string, options: IOptions): string {
        // Parse Content
        const driveInfo = this.parseContent(type, content);
        if (driveInfo instanceof Object) {
            let html = `<div class="${RENDER_CLASS} drive">`;
            // Platform info
            const platform = `<div class="platform">` +
                `<img class="drive-icon" src="${options.cdn}${PLATFORM_LIST[driveInfo.platform].icon}"  alt="${driveInfo.platform}"/>` +
                `<span>${PLATFORM_LIST[driveInfo.platform].name}</span>` +
                `</div>`
            html += `<div class="drive-info"> ${platform} <div class="drive-title">${driveInfo.name}</div></div>`
            html += `<div class="download-info"><a class="btn" href="${driveInfo.link}" target="_blank"><span class="iconfont">&#xeb2c;</span>下载资源</a>`
            if (driveInfo.password) {
                html += `<div class="drive-password">提取码: ${driveInfo.password}</div>`
            }
            html += "</div>"
            return html + "</div>";
        }
        return `<div class="${RENDER_CLASS} drive error">语法错误(${driveInfo})</div>`;
    }

    parseContent(type:string, content: string): DriveOptions | string {
        const [_, platform] = type.split(":");
        if (!PLATFORM_LIST[platform]) return `不支持的平台: ${platform}`
        const info: DriveOptions = {
            link: "",
            name: "",
            password: "",
            platform: platform
        }
        content.split("\n").forEach(line => {
            console.log(line.indexOf(":"))
            const value = line.slice(line.indexOf(":") + 1).trim()
            const key = line.slice(0, line.indexOf(":")) || ""
            if (Object.keys(info).includes(key)) {
                // @ts-ignore
                info[key] = value
            }
        })
        return info
    }
}

interface DriveOptions {
    link: string;
    name: string;
    password?: string;
    platform: string;
}

interface Platform {
    icon: string;
    name: string;
}
