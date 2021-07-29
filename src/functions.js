import {fetch} from 'node-fetch';
import {JsonRpc, Serialize} from 'eosjs';

import {serialize, deserialize, ObjectSchema} from "atomicassets"

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

async function readAssets(user, collection_list) {
    const assetsInfo = await rpc.get_table_rows({code:'atomicassets', table: 'assets', scope: user, limit:-1});
    let assetsData = [];
    for(let i=0; i<assetsInfo.rows.length; i++){
        let assetData = {};
        if(!collection_list.includes(assetsInfo.rows[i].collection_name))
            continue;
        assetData.collection_name = assetsInfo.rows[i].collection_name;
        assetData.schema_name = assetsInfo.rows[i].schema_name;
        assetData.template_id = assetsInfo.rows[i].template_id;
        const schema_form = await rpc.get_table_rows({code:'atomicassets', table: 'schemas', scope: assetData.collection_name, limit:-1});
        const templates = await rpc.get_table_rows({code:'atomicassets', table: 'templates', scope: assetData.collection_name, limit:-1});
        for(let j=0; j<schema_form.rows.length; j++){
            if(schema_form.rows[j].schema_name == assetData.schema_name){
                assetData.schema_form = ObjectSchema(schema_form.rows[j].format);
                break;
            }     
        }
        for(let j=0; j<templates.rows.length; j++){
            if(templates.rows[j].template_id == assetData.template_id){
                assetData.resource = templates.rows[j].immutable_serialized_data;
                assetData.deserialized = deserialize(assetData.resource, assetData.schema_form);
                break;
            }     
        }
        assetsData.push(assetData);
    }
    return assetsData;
}

export {readAssets};