import {TipsProvider} from "./tips-provider";
import {Provider} from "./provider";
import {GitProvider} from "./git-provider";

export const ProviderList:Array<Provider> = [
    new TipsProvider(),
    new GitProvider()
]
