import {IGitArgs, RepoInfo} from "./git-processor";


export async function getGitHubInfo(args: IGitArgs): Promise<RepoInfo> {
    const info = await fetch(`https://api.github.com/repos/${args.owner}/${args.repo}`)
    const json = await info.json()
    if (info.status !== 200) return new Promise((resolve, reject) => {
        reject({
            code: info.status,
            msg: json['message']
        })
    })
    return {
        platform: "github",
        url: json["html_url"],
        owner: json["owner"]["login"],
        name: json["name"],
        stars: json["stargazers_count"],
        watchers: json["watchers_count"],
        language: json["language"],
        description: json["description"],
        openIssues: json["open_issues"],
        lastPush: json["pushed_at"]
    }
}
