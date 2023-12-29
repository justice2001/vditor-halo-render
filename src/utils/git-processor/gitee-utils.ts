import {IGitArgs, RepoInfo} from "./git-processor";

export async function getGiteeInfo(args: IGitArgs): Promise<RepoInfo> {
    const info = await fetch(`https://gitee.com/api/v5/repos/${args.owner}/${args.repo}`)
    const json = await info.json()
    console.log(info)
    if (info.status !== 200) return new Promise((resolve, reject) => {
        reject({
            code: info.status,
            msg: json['message']
        })
    })
    const topics: Array<string> = []
    json["project_labels"].forEach((label: {
        id: number;
        name: string;
        ident: string
    }) => {
        topics.push(label.name)
    })
    return {
        platform: "gitee",
        url: json["html_url"],
        owner: json["owner"]["login"],
        name: json["name"],
        stars: json["stargazers_count"],
        watchers: json["watchers_count"],
        language: json["language"],
        description: json["description"],
        openIssues: json["open_issues_count"],
        lastPush: json["pushed_at"],
        forks: json["forks_count"],
        topic: topics
    }
}
