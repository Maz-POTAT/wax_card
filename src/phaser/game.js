import Phaser from "phaser";
import { readImage } from '../functions';
const io = require("socket.io-client");

export class GameScene extends Phaser.Scene {
    socket;
    constructor() {
        super({
            key: "GameScene"
        });
    }
    init(params){
        // TODO
    }
    preload(){
        // TODO
    }
    
    create(){
        this.wax_name = localStorage.getItem('userInfo');
        this.socket = io('http://8.210.59.229:3000');
        this.socket.on('connect', () => {
            console.log(this.socket.id);
            this.text = this.add.text(300, 300, "Connected to server");
            this.socket.emit('join', {user_name: this.wax_name});
        });
        this.socket.on('round_start', (round_info) => {
            this.round_info = round_info;
            this.is_available = false;
            this.initUser(round_info.player1);
            this.initUser(round_info.player2);
        });
        this.socket.on('turn_end', (round_info) => {
            this.round_info = round_info;
            this.my_score.setText(this.wax_name == round_info.player1.name ? round_info.player1.score : round_info.player2.score);
            this.oppo_score.setText(this.wax_name == round_info.player1.name ? round_info.player2.score : round_info.player1.score);
            this.processTurn(this.wax_name == round_info.player1.name ? round_info.player2 : round_info.player1);
            this.is_available = true;
        });
        this.socket.on('connect_error', (err) => {
            console.log(err);
        });
        this.socket.on('disconnect', () => {
            this.text.setText('Disconnected from server');
        });
        // TODO
    }
    
    update(time){
        // TODO
    }

    processTurn(userInfo){
        if(userInfo.cards.length == 2)
        {
            this.oppo_card3.setVisible(false);
        }
        if(userInfo.cards.length == 1)
        {
            this.oppo_card2.setVisible(false);
        }
        if(userInfo.cards.length == 0)
        {
            this.oppo_card1.setVisible(false);
        }
        readImage(userInfo.out.id).then((url) => {
            if(this.oppo_card_url != undefined){
                this.oppo_card.destroy();
                this.oppo_card_url = undefined;
            }
            this.textures.remove('oppo_card');
            this.oppo_card = this.add.container(450,300);
            this.oppo_card_url = url;
            this.load.image('oppo_card', 'https://ipfs.io/ipfs/' + this.oppo_card_url);
            this.load.on('complete', () => 
            {
                this.oppo_card_back = this.add.graphics();
                this.oppo_card_back.fillStyle(0x0000ff, 1);
                this.oppo_card_back.fillRoundedRect(0, 0, 70, 100, 5);
                this.oppo_card_img = this.add.image(35,50,'oppo_card').setDisplaySize(70,100).setDepth(1);
                this.oppo_card.add(this.oppo_card_back);
                this.oppo_card.add(this.oppo_card_img);
            });
            this.load.start();
        });
    }

    initUser(userInfo){
        if(this.wax_name != userInfo.name){
            this.add.text(50, 100, 'Name:');
            this.oppo_name = this.add.text(120, 100, userInfo.name);

            this.add.text(50, 200, 'Score:');
            this.oppo_score = this.add.text(120, 200, userInfo.score);

            this.oppo_card1_back = this.add.graphics();
            this.oppo_card1_back.fillStyle(0x0000ff, 1);
            this.oppo_card1_back.fillRoundedRect(300, 100, 70, 100, 5);
            this.oppo_card1 = this.oppo_card1_back;

            this.oppo_card2_back = this.add.graphics();
            this.oppo_card2_back.fillStyle(0x0000ff, 1);
            this.oppo_card2_back.fillRoundedRect(400, 100, 70, 100, 5);
            this.oppo_card2 = this.oppo_card2_back;

            this.oppo_card3_back = this.add.graphics();
            this.oppo_card3_back.fillStyle(0x0000ff, 1);
            this.oppo_card3_back.fillRoundedRect(500, 100, 70, 100, 5);
            this.oppo_card3 = this.oppo_card3_back;

        } else {
            this.add.text(50, 400, 'Name:');
            this.my_name = this.add.text(120, 400, userInfo.name);

            this.add.text(50, 500, 'Score:');
            this.my_score = this.add.text(120, 500, userInfo.score);

            this.my_card1_back = this.add.graphics();
            this.my_card1_back.fillStyle(0xffffff, 1);
            this.my_card1_back.fillRoundedRect(0, 0, 70, 100, 5);
            this.my_card1 = this.add.container(300, 400);
            this.my_card1.add(this.my_card1_back);

            this.my_card2_back = this.add.graphics();
            this.my_card2_back.fillStyle(0xffffff, 1);
            this.my_card2_back.fillRoundedRect(0, 0, 70, 100, 5);
            this.my_card2 = this.add.container(400, 400);
            this.my_card2.add(this.my_card2_back);

            this.my_card3_back = this.add.graphics();
            this.my_card3_back.fillStyle(0xffffff, 1);
            this.my_card3_back.fillRoundedRect(0, 0, 70, 100, 5);
            this.my_card3 = this.add.container(500, 400);
            this.my_card3.add(this.my_card3_back);

            console.log(userInfo.cards);
            this.load.on('complete', () => 
            {
                this.my_card1_img = this.add.image(35,50,'card1').setDisplaySize(70,100);
                this.my_card1.add(this.my_card1_img);
                this.my_card2_img = this.add.image(35,50,'card2').setDisplaySize(70,100);
                this.my_card2.add(this.my_card2_img);
                this.my_card3_img = this.add.image(35,50,'card3').setDisplaySize(70,100);
                this.my_card3.add(this.my_card3_img);
                this.my_card1.setInteractive(new Phaser.Geom.Rectangle(0, 0, 70, 100), Phaser.Geom.Rectangle.Contains).on('pointerdown', () => {
                    if(this.is_available){
                        this.my_card1.setPosition(250, 300);
                        this.socket.emit('card_out', {user_name: this.wax_name, asset_id: userInfo.cards[0].id});
                        this.is_available = false;
                        this.my_card1.disableInteractive();
                        if(this.oppo_card_url != undefined){
                            this.oppo_card.destroy();
                            this.oppo_card_url = undefined;
                        }
                    }
                });
                this.my_card2.setInteractive(new Phaser.Geom.Rectangle(0, 0, 70, 100), Phaser.Geom.Rectangle.Contains).on('pointerdown', () => {
                    if(this.is_available){
                        this.my_card2.setPosition(250, 300);
                        this.socket.emit('card_out', {user_name: this.wax_name, asset_id: userInfo.cards[1].id});
                        this.is_available = false;
                        this.my_card2.disableInteractive();
                        if(this.oppo_card_url != undefined){
                            this.oppo_card.destroy();
                            this.oppo_card_url = undefined;
                        }
                    }
                });
                this.my_card3.setInteractive(new Phaser.Geom.Rectangle(0, 0, 70, 100), Phaser.Geom.Rectangle.Contains).on('pointerdown', () => {
                    if(this.is_available){
                        this.my_card3.setPosition(250, 300);
                        this.socket.emit('card_out', {user_name: this.wax_name, asset_id: userInfo.cards[2].id});
                        this.is_available = false;
                        this.my_card3.disableInteractive();
                        if(this.oppo_card_url != undefined){
                            this.oppo_card.destroy();
                            this.oppo_card_url = undefined;
                        }
                    }
                });
                this.is_available = true;
            })
            
            readImage(userInfo.cards[0].id).then((url) => {
                this.my_card1_url = url;
                readImage(userInfo.cards[1].id).then((url) => {
                    this.my_card2_url = url;
                    readImage(userInfo.cards[2].id).then((url) => {
                        this.my_card3_url = url;
                        this.load.image('card1', 'https://ipfs.io/ipfs/' + this.my_card1_url);
                        this.load.image('card2', 'https://ipfs.io/ipfs/' + this.my_card2_url);
                        this.load.image('card3', 'https://ipfs.io/ipfs/' + this.my_card3_url);
                        this.load.start();
                    })
                });
            });
        }
    }
};