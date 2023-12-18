import {Provider} from "./provider";
import {fillContent} from "../utils/git-processor/git-processor";
import "../less/git.less"

export class GitProvider implements Provider {
    check(type: string): boolean {
        return type.startsWith("git");
    }

    /**
     * 处理格式 git:[url@platform/owner/repo]
     * 例如: git:[git.mczhengyi.top@gitea/justice2001/halo-render]
     * 例如: git:[@github/justice2001/halo-plugin-vditor]
     * @param type
     * @param content
     */
    process(type: string, content: string): string {
        let list = type.split(":");
        let rp = list[1]
        if (!rp || !rp.endsWith("]")) return "<div class='git'><div class='error'>Git: Syntax Error</div></div>"
        rp = rp.replace("[", "")
            .replace("]", "")
        const [platformRaw, owner, repo] = rp.split("/");
        const [url, platform] = platformRaw.split("@")
        // 处理
        const res = fillContent(`git-${owner}-${repo}`, platform.toLowerCase(), {
            owner: owner,
            repo: repo
        })
        if (res) {
            return `<div class='git git-${owner}-${repo}'>${res}</div>`
        }
        return `<div class='git git-${owner}-${repo}'>Waiting</div>`;
    }

}
