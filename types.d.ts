import { TagImplOptions } from "liquidjs";

declare module "easy-tag-for-liquidjs" {
    interface Fill {
        [index: string]: any;
    }

    type SetVar = (index: string, value: any) => void;

    interface Tag<Context = Fill, Data = Fill> {
        render(
            this: TagImplOptions,
            context: Context,
            index: string,
            value: Data,
            set: SetVar
        ): Promise<string> | string;
    }
    //TagImplOptions
    export default function (tag: Tag): TagImplOptions;
}
