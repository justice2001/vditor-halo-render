import {getGitHubInfo} from "./github-utils";
import {LANGUAGE_COLOR, RENDER_CLASS} from "../../constant";

export const cache: {[key: string]: RepoInfo|-1} = {}

export const utils: {[key: string]: (args: IGitArgs) => Promise<RepoInfo>} = {
    "github": getGitHubInfo
}

export const icons: {[key: string]: string} = {
    "gitlab": "&#xe881;",
    "github": "&#xe885;",
    "gitee": "&#xe7d5;",
    "gitea": "&#xeba0;"
}

export function fillContent(id: string,
                            func: string,
                            args: IGitArgs): string | null {
    // 检测类型是否合法
    if (!utils[func]) return "<div class='error'>Unknown Platform</div>"
    // 检测缓存
    if (cache[id] === -1) return null
    if (cache[id]) {
        // 直接处理;
        return fill(id, <RepoInfo>cache[id])
    }
    // 检测本地缓存
    const storageCache = localStorage.getItem(`git_cache:${id}`)
    if (storageCache) {
        return fill(id, <RepoInfo>(JSON.parse(storageCache)))
    }
    cache[id] = -1
    utils[func](args).then(r => {
        cache[id] = r
        localStorage.setItem(`git_cache:${id}`, JSON.stringify(r))
        fill(id, r)
        document.querySelectorAll("." + id).forEach(el => {
            el.innerHTML = fill(id, r)
        })
    }).catch(e => {
        document.querySelectorAll("." + id).forEach(el => {
            el.innerHTML = `<div class='${RENDER_CLASS} git error'>Error Fetch: ` + e.code + `(${e.msg})</div>`
        })
        delete cache[id]
    })
    return null
}

function fill(id: string, info: RepoInfo):string {
    const languageColor = LANGUAGE_COLOR[info.language||"Default"] || "#333333"
    const lang = `<span class="language" style="color: ${languageColor}">` +
        `<span class="dot" style="background-color: ${languageColor};"></span>${info.language}</span>`
    const count = `<div class="count">`+
        `<span class="count-item"><span class="icon">&#xe7df;</span>${info.stars}</span>`+
        `<span class="count-item"><span class="icon">&#xe764;</span>${info.openIssues}</span>` +
        `</div>`
    return `<span class="icon">${icons[info.platform || "github"]}</span>` +
    `<div class="information"><div class="repo-name"><a href="${info.url}">${info.owner}/${info.name}</a></div>` +
        `<div class="description">${info.description}</div>` +
        `<div class="info">${lang} ${count}</div>` +
        `</div>`
}

export declare interface IGitArgs {
    owner?: string
    repo?: string
}

export declare interface RepoInfo {
    platform?: string
    name?: string
    owner?: string
    url?: string
    forks?: number
    stars?: number
    watchers?: number
    license?: string
    openIssues?: number
    description?: string
    language?: string
    lastPush?: string
}
