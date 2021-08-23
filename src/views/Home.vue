<template>
  <div>
    <TopHeader msg="aaa" :isLogIn="isLogIn" :waxName="waxName" :activePage="Home"/>
    <b-container fluid class="bv-container">
      <!-- Content here -->
      <b-row>
        <b-col :md="3" class="bv-left hide-small" v-show="isLogIn">
          <b-row>
            <b-col cols="4">
              <ItemText title="RP" value="1785"/>
            </b-col>
            <b-col cols="4">
              <ItemText title="WP" value="500"/>
            </b-col>
            <b-col cols="4">
              <ItemText title="FP" value="1785"/>
            </b-col>
          </b-row>
          <b-row>
            <MainThumb
              :name="waxName"
              title="Level: Pro"
            />
          </b-row>
          <b-row>
            <b-col cols="6">
              <ItemText title="Wins" value="24"/>
            </b-col>
            <b-col cols="6">
              <ItemText title="Losses" value="24"/>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <div class="streak">
                Streak &nbsp &nbsp <span class="strongFormat">+ 5</span>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-button class="play-btn" variant="danger">Play Now</b-button>
            </b-col>
          </b-row>
        </b-col>
        <b-col :cols="12" :md="isLogIn ? 6 : 8" :class="isLogIn ? 'bv-center' : 'bv-logout-left'">
          <b-row>
            <b-col cols="12" class="img-content">
              <img v-bind="mainProps" alt="thumb" src="../assets/basic.png" width="100%"></img>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <div class="info-content">
                <span class="info-text">The best in the last 24h</span>
                <img class="avatar2" v-bind="mainProps" rounded="rounded" alt="thumb" :src="require('../assets/avatar2.png')" width="75" height="75"></img>
                <p>
                  <span class="info-name">name.wam</span>
                  <br>
                  <span class="info-value"><strong>1785</strong></span>
                </p>
              </div>
            </b-col>
          </b-row>
          <!-- <b-row class="thumb-group">
            <b-col cols="12">
              <div class="thumb-group-title">
                <span>My Best Hand</span>
                <span>NFTs Totals: 24</span>
              </div>
            </b-col>
            <b-row>
              <b-col cols="4">
                <ThumbNail
                name="NFTs Name"
                title="Collection name"
                subTitle="Fire"
                leftText="TW"
                leftValue="1500"
                rightText="PW"
                rightValue="19"
                titleColor="red"
                />
              </b-col>
              <b-col cols="4">
                <ThumbNail
                name="NFTs Name"
                title="Collection name"
                subTitle="Water"
                leftText="TW"
                leftValue="1450"
                rightText="PW"
                rightValue="17"
                titleColor="#0b98c0"
                />
              </b-col>
              <b-col cols="4">
                <ThumbNail
                name="NFTs Name"
                title="Collection name"
                subTitle="Ground"
                leftText="TW"
                leftValue="1247"
                rightText="PW"
                rightValue="16"
                titleColor="#31a73a"
                />
              </b-col>
            </b-row>
          </b-row> -->
        </b-col>
        <b-col :cols="12" :md="isLogIn ? 3 : 4" :class="isLogIn ? 'bv-right' : 'bv-logout-right'">
          <b-row>
            <p class="top-rank">TOP RANK</p>
            <p>
              <button class="last_seven">Last 7</button>
              <button class="last_month">Last Month</button>
            </p>
            <p style="color: lightgrey"><span style="color: red">Rank</span> | Wizard | Fidelity</p>
          </b-row>
          <b-row class="user-group">
            <b-col cols="12">
              <UserItem name="name.wam" value="1785" url=""/>
            </b-col>
            <b-col cols="12">
              <UserItem name="name.wam" value="1785" url=""/>
            </b-col>
            <b-col cols="12">
              <UserItem name="name.wam" value="1785" url=""/>
            </b-col>
            <b-col cols="12">
              <UserItem name="name.wam" value="1785" url=""/>
            </b-col>
            <b-col cols="12">
              <UserItem name="name.wam" value="1785" url=""/>
            </b-col>
            <b-col cols="12">
              <UserItem name="name.wam" value="1785" url=""/>
            </b-col>
            <b-col cols="12">
              <UserItem name="name.wam" value="1785" url=""/>
            </b-col>
            <b-col cols="12">
              <UserItem name="name.wam" value="1785" url=""/>
            </b-col>
            <b-col cols="12">
              <UserItem name="name.wam" value="1785" url=""/>
            </b-col>
            <b-col cols="12">
              <UserItem name="name.wam" value="1785" url=""/>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { UALJs } from 'ual-plainjs-renderer';
import { Wax } from '@eosdacio/ual-wax';    // WAX Cloud Wallet
import { User } from 'universal-authenticator-library'
import 'regenerator-runtime/runtime'

import TopHeader from '@/components/TopHeader.vue'
import ItemText from '@/components/ItemText.vue'
import ThumbNail from "@/components/ThumbNail.vue"
import UserItem from "@/components/UserItem.vue"
import MainThumb from "@/components/MainThumb.vue"

const myChain = {
    chainId: 'f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12',
    rpcEndpoints: [{
        protocol: 'https',
        host: 'testnet.waxsweden.org',
        port: ''
    }]
};

export default {
  name: 'Home',
  components: {
    TopHeader,
    ItemText,
    ThumbNail,
    UserItem,
    MainThumb
  },
  props: {
  },
  data () {
    return {
      msg: '',
      mainProps: { blank: true, blankColor: '#777', width: "100%", class: 'm1' },
      isLogIn: localStorage.getItem('userInfo') == undefined ? false : true,
      waxName: localStorage.getItem('userInfo') == undefined ? '' : localStorage.getItem('userInfo'),
      Home: 'Home',
      MyNfts: 'MyNfts'
    }
  },
  methods: {

  },
  mounted: function(){
        const myLoginCallback = users => {
          this.isLogIn = true;
          localStorage.setItem('userInfo', users[0].accountName);
          this.waxName = users[0].accountName;
          // this.$http.post('http://localhost:3000/login', {
          //     data: users
          // }, {
          //   emulateJSON: true  // <-- This was missing
          // })
          // .then(response => {
          //   this.isLogIn = true;
          // })
          // .catch(function (error) {
          //     console.error(error.response);
          // });
        }
        const myAppName = 'My Game'
        const wax = new Wax([myChain], { appName: myAppName });         // WAX Cloud Wallet connection
        const myAppRoot = {     // Attach DOM element for UAL embedding
            containerElement: document.getElementById('ual-div')
        }
        // Load UAL
        UAL = new UALJs(myLoginCallback, [myChain], myAppName, [wax], myAppRoot);
        (async () => {
            console.log('Loading...');
            const sesion = await UAL.init();
            const ual_button = document.getElementById('ual-button');
            ual_button.innerText = "Wax Login";
            ual_button.style.backgroundColor = "#c0c000";
            ual_button.style.color = "#000000";
        })()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.bv-container {
  background: #2e0101;
  height: auto;
  padding: 50px;
}

.bv-left {
  background: #0d0d0d;
  border-radius: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
}
.bv-center {
  background: transparent;
  padding-left: 2%;
  padding-right: 2%;
}
.bv-right {
  background: #0d0d0d;
  border-radius: 10px;
}

.bv-logout-left {
  background: transparent;
  padding-left: 2%;
  padding-right: 2%;
}

.bv-logout-right {
  background: #0d0d0d;
  border-radius: 10px;
}

@media screen and (max-width: 768px) {
  .hide-small{
    display:none;
  }
}

.streak {
  background: white;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 20px;
  letter-spacing: 1px;
}
.strongFormat {
  font-size: 26px;
  font-weight: 700;
  color: black;
}
.play-btn {
  width: 100%;
  border-radius: 10px;
  background: red;
  padding: 20px;
}
.img-content {
  border-radius: 10px;
}
.info-content {
  border-radius: 10px;
  width: 100%;
  background: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  margin-top: 30px;
  margin-bottom: 30px;
  padding-left: 30px;
}
.info-text {
  font-size: 30px;
}
.info-name {
  font-size: 26px;
}
.info-value {
  font-size: 30px;
}
.thumb-group {
  padding: 10px 50px;
}
.thumb-group-title {
  display: flex;
  justify-content: space-between;
  font-size: 30px;
  padding-right: 20px;
}
.user-group {
  padding-left: 20%;
  padding-right: 10%;
}
.thumb-group-title {
  color: white;
}
.avatar2 {
  border-radius: 10px;
}
.last_seven {
  background: transparent;
  border: 1px solid white;
  border-radius: 20px;
  color: lightgrey;
}
.last_month {
  background: transparent;
  border: 1px solid red;
  border-radius: 20px;
  color: red;
}
.top-rank {
  font-size: 30px;
  color: lightgrey;
}
.row > * {
}
.row {
  margin-top: 10px;
  margin-bottom: 10px;
}

</style>
