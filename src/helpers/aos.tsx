import { connect, createDataItemSigner } from '@permaweb/aoconnect';
import { AOS_MODULE, AOS_SCHEDULER } from './constants';

export async function live(pid: string) {
    let cursor: any = "";

    const connection = {
        process: pid,
        sort: "DESC",
        cursor,
        limit: 1
    }

    let results = await connect().results(connection);

    const xnode = results.edges.filter(
        (x: any) => x.node.Output.print === true
    )[0]

    if (xnode) {
        cursor = xnode.cursor
        // console.log("xnode.node.Output.data", xnode.node.Output.data)
        return xnode.node.Output.data
    }

    return null
}




export async function register(name: string, signer: any) {
    if (name === "") {
        throw new Error("Name cannot be empty")
    }


    const aos = connect();
    const pid = await aos.spawn({
        module: AOS_MODULE,
        scheduler: AOS_SCHEDULER,
        signer: createDataItemSigner(signer),
        tags: [
            { name: 'Name', value: name },
            { name: 'Version', value: 'web-0.0.1' }
        ],
        data: '1984'
    })

    return pid
}