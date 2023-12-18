import {getGitHubInfo} from "./github-utils";

export const cache: {[key: string]: RepoInfo|-1} = {}

export const utils: {[key: string]: (args: IGitArgs) => Promise<RepoInfo>} = {
    "github": getGitHubInfo
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
    cache[id] = -1
    utils[func](args).then(r => {
        cache[id] = r
        fill(id, r)
        document.querySelectorAll("." + id).forEach(el => {
            el.innerHTML = fill(id, r)
        })
    }).catch(e => {
        document.querySelectorAll("." + id).forEach(el => {
            el.innerHTML = "<div class='error'>Error Fetch: " + e.code + `(${e.msg})</div>`
        })
        delete cache[id]
    })
    return null
}

function fill(id: string, info: RepoInfo):string {
    return `<div class="repo-name"><a href="${info.url}">${info.owner}/${info.name}</a></div>` +
        `<div class="description">${info.description}</div>` +
        `<div class="info">Stars: ${info.stars} / Watchers: ${info.watchers} / OpenIssues: ${info.openIssues}</div>`
}

export declare interface IGitArgs {
    owner?: string
    repo?: string
}

export declare interface RepoInfo {
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
