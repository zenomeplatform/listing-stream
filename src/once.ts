import type EventEmitter from "events";

export function once(emitter: EventEmitter, event: string | symbol) {
    return new Promise((resolve, reject) => {
        let eventhandler: any, errorhandler: any;
        emitter.on(event, eventhandler = function (value) {
            resolve(value);
            emitter.off(event, eventhandler);
            emitter.off("error", errorhandler);
        });
        emitter.on("error", errorhandler = function (error) {
            reject(error);
            emitter.off(event, eventhandler);
            emitter.off("error", errorhandler);
        });
    });
}
