const fetch =  require('node-fetch');
const JsonRpc = require('eosjs').JsonRpc;
const Serialize = require('eosjs').Serialize;
const rpc = new JsonRpc('https://wax.greymass.com', {fetch});
const ExplorerApi = require("atomicassets").ExplorerApi;
const Explorerapi = new ExplorerApi("https://wax.api.atomicassets.io", "atomicassets", {fetch, rateLimit: 10});

const data = require('../data/');
const collections = data.collections;

var rooms = [];
var joined_user = [];
var waiting_user = undefined;
var waiting_id = undefined;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = async function socketConfig(io) {

        io.on('connection', (client) => {
        client.on('card_out', (data) => {
            for( let i=0; i<rooms.length; i++){
                if(rooms[i].player1.name == data.user_name){
                    for(let j=0; j<rooms[i].player1.cards.length; j++){
                        if(rooms[i].player1.cards[j].id == data.asset_id){
                            rooms[i].player1.out = rooms[i].player1.cards[j];
                            rooms[i].player1.cards.splice(j, 1);
                            if(rooms[i].player2.out != undefined){
                                if(rooms[i].player1.out.mint > rooms[i].player2.out.mint){
                                    rooms[i].player1.score++;
                                }
                                if(rooms[i].player1.out.mint < rooms[i].player2.out.mint){
                                    rooms[i].player2.score++;
                                }
                                io.sockets.sockets.get(rooms[i].player2.id).emit('turn_end', rooms[i]);
                                io.sockets.sockets.get(rooms[i].player1.id).emit('turn_end', rooms[i]);
                                rooms[i].player1.out = undefined;
                                rooms[i].player2.out = undefined;
                            }
                        }
                    }
                }
                else if(rooms[i].player2.name == data.user_name){
                    for(let j=0; j<rooms[i].player2.cards.length; j++){
                        if(rooms[i].player2.cards[j].id == data.asset_id){
                            rooms[i].player2.out = rooms[i].player2.cards[j];
                            rooms[i].player2.cards.splice(j, 1);
                            if(rooms[i].player1.out != undefined){
                                if(rooms[i].player1.out.mint > rooms[i].player2.out.mint){
                                    rooms[i].player1.score++;
                                }
                                if(rooms[i].player1.out.mint < rooms[i].player2.out.mint){
                                    rooms[i].player2.score++;
                                }
                                io.sockets.sockets.get(rooms[i].player1.id).emit('turn_end', rooms[i]);
                                io.sockets.sockets.get(rooms[i].player2.id).emit('turn_end', rooms[i]);
                                rooms[i].player1.out = undefined;
                                rooms[i].player2.out = undefined;
                            }
                        }
                    }
                }
            }
        });

        client.on('join', (data) => {
            joined_user.push({
                user_name: data.user_name,
                socket_id: client.id
            });

            const account = rpc.get_account(data.user_name).then(async (account) => {
                if(waiting_user == undefined){
                    waiting_user = data.user_name;
                    waiting_id = client.id;
                } else {

                    let list = await collections.getCollections();
                    let collection_list = [];
                    for(let i=0; i<list.length; i++){
                        collection_list.push(list[i].name);
                    }
                
                    let assetsInfo = await rpc.get_table_rows({code:'atomicassets', table: 'assets', scope: waiting_user, limit:-1});
                    let user1_cards = [];
                    for(let i=0; i<assetsInfo.rows.length; i++){
                        if(!collection_list.includes(assetsInfo.rows[i].collection_name))
                        {
                            assetsInfo.rows.splice(i, 1);
                            i--;
                        }
                    }

                    while(assetsInfo.rows.length>3){
                        let i = Number.parseInt(Math.random() * assetsInfo.rows.length);
                        assetsInfo.rows.splice(i, 1);
                    }

                    for(let i=0; i<assetsInfo.rows.length; i++){
                        let asset = await Explorerapi.getAsset(assetsInfo.rows[i].asset_id);
                        user1_cards.push({id: assetsInfo.rows[i].asset_id,
                            mint: asset.template_mint});
                        await sleep(300);
                    }

                    assetsInfo = await rpc.get_table_rows({code:'atomicassets', table: 'assets', scope: data.user_name, limit:-1});
                    console.log(assetsInfo.rows.length);
                    let user2_cards = [];
                    for(let i=0; i<assetsInfo.rows.length; i++){
                        if(!collection_list.includes(assetsInfo.rows[i].collection_name))
                        {
                            assetsInfo.rows.splice(i, 1);
                            i--;
                        }
                    }

                    console.log(assetsInfo.rows.length);

                    while(assetsInfo.rows.length>3){
                        let i = Number.parseInt(Math.random() * assetsInfo.rows.length);
                        assetsInfo.rows.splice(i, 1);
                    }

                    console.log(assetsInfo.rows.length);

                    for(let i=0; i<assetsInfo.rows.length; i++){
                        let asset = await Explorerapi.getAsset(assetsInfo.rows[i].asset_id);
                        user2_cards.push({id: assetsInfo.rows[i].asset_id,
                            mint: asset.template_mint});
                        await sleep(300);
                    }

                    console.log(user2_cards.length);

                    let room_info = {
                        player1: {
                            id: waiting_id,
                            name: waiting_user,
                            cards: user1_cards,
                            out: undefined,
                            score: 0,
                        },
                        player2: {
                            id: client.id,
                            name: data.user_name,
                            cards: user2_cards,
                            out: undefined,
                            score: 0,
                        }
                    };
    
                    rooms.push( room_info );
                    client.emit('round_start', room_info);
                    io.sockets.sockets.get(waiting_id).emit('round_start', room_info);
                    waiting_id = undefined;
                    waiting_user = undefined;
                }
            });
        })
    });
}
