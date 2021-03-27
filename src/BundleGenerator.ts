import { Stats } from "fs";
import { ListingStream } from "./ListingDirectoryStream"
import { once } from "./once";

export class BundleGenerator {

    readonly directory: string;

    constructor({ directory }: { directory: string }) {
        this.directory = directory;
    }

    add({ path, stat }: { path: string, stat: Stats }) {
        return [
            stat.size, 
            stat.mode,
            path
        ]
    }

    async run(onEntry: (data: any) => void) {
        const bundle = this;
        const stream = new ListingStream(this.directory);
        stream.on("data", function (element) {
            onEntry(bundle.add(element));
        })

        await once(stream, "end")
    }

}
