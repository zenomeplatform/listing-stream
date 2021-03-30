import { Deferred } from "@esfx/async-deferred";

import Message from "msgpack5"
export const codec = Message();

export type StateType = {
    type: "file",
    data: (number|string)[],
    slug: string
}

export class Pending extends Deferred<Buffer> {

    constructor(readonly payload: StateType) {
        super();
    }

    get body() {
        return codec.encode(this.payload.data);
    }
}
