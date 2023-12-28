import {TipsProvider} from "./tips-provider";
import {ProviderList} from "./provider-list";

export declare interface Provider {
    check: (type: string) => boolean
    process: (type:string,content: string, options: IOptions) => string
}

export class ProviderFactory {
    static manager: ProviderFactory | null = null
    private providers: Array<Provider>

    constructor(providers: Array<Provider>) {
        this.providers = providers;
    }

    process(type: string, content: string, options: IOptions = {
        cdn: "."
    }) {
        let html = "<h2 class='invalid-type'>Invalid Type!</h2>"
        this.providers.forEach(provider => {
            if (provider.check(type)) {
                html = provider.process(type, content, options)
                return
            }
        })
        return html
    }

    static getFactory() {
        if (!this.manager) {
            this.manager = new ProviderFactory(ProviderList)
        }
        return this.manager
    }
}

export interface IOptions {
    cdn: string;
}
