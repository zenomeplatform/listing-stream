import { Readable } from 'stream'
import fs from 'fs'
import path from 'path'

export class ListingStream extends Readable {

    readonly _stack: string[] = []

    constructor(readonly _root: string) {
        super({ objectMode: true })
        this._stack.push(_root)
    }

    _read() {
        if (this._stack.length === 0) {
            this.push(null)
            return;
        }

        const next = this._stack.pop()
        const stat = fs.statSync(next)

        if (stat.isDirectory()) {
            const list = fs.readdirSync(next)
            for (const name of list) {
                this._stack.push(
                    path.join(next, name)
                )
            }
        }

        this.push({
            path: path.relative(this._root, next),
            stat: stat
        })
    }
}
