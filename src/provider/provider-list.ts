import {TipsProvider} from "./tips-provider";
import {Provider} from "./provider";
import {GitProvider} from "./git-provider";
import {DriveProvider} from "./drive-provider";

export const ProviderList:Array<Provider> = [
    new TipsProvider(),
    new GitProvider(),
    new DriveProvider()
]
