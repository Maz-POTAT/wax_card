import {fetch} from 'node-fetch';
import {JsonRpc, Serialize} from 'eosjs';

import {ExplorerApi, serialize, deserialize, ObjectSchema} from "atomicassets"

const Explorerapi = new ExplorerApi("https://wax.api.atomicassets.io", "atomicassets", {fetch, rateLimit: 10});

// standard import

/*
*   Connect to a WAX API only for read operations.
*   Write operations require a key and will be performed from UAL.
*/
const rpc = new JsonRpc('https://wax.greymass.com', {fetch});

/**
 * Sample read function. Read account liquid balance in WAX
 * 
 * @param {string} user Name account
 * @returns liquid balance
 */
async function readFunds(user) {
    const account = await rpc.get_account(user);

    if (account.account_name === undefined) 
        throw Error('Reading error!');
    
    return account.core_liquid_balance;
}

export {readFunds};

async function readAccount(user) {
    const account = await rpc.get_account(user);
    console.log(rpc);
    if (account.account_name === undefined) 
        throw Error('Reading error!');
    
    return account;
}

export {readAccount};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function readAssets(user, collection_list) {
    const assetsInfo = await rpc.get_table_rows({code:'atomicassets', table: 'assets', scope: user, limit:-1});
    let assetsData = [];
    for(let i=0; i<assetsInfo.rows.length; i++){
        if(!collection_list.includes(assetsInfo.rows[i].collection_name))
            continue;
        let asset = await Explorerapi.getAsset(assetsInfo.rows[i].asset_id);
        console.log(asset);
        assetsData.push(asset);
        await sleep(300);
    }
    return assetsData;
}

export {readAssets};

async function readImage(asset_id) {
    let asset = await Explorerapi.getAsset(asset_id);
    return asset.data.img;
}

export {readImage};