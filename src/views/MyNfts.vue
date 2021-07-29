<template>
  <div>
    <TopHeader msg="aaa" :isLogIn="true"  :waxName="waxName"/>
    <b-container fluid class="bv-container">
      <!-- Content here -->
      <b-row>
        <b-col cols="2" class="bv-left">
          <b-row>
            <b-col cols="4">
              <ItemText title="RP" value="1785" />
            </b-col>
            <b-col cols="4">
              <ItemText title="WP" value="500" />
            </b-col>
            <b-col cols="4">
              <ItemText title="FP" value="1785" />
            </b-col>
          </b-row>
          <b-row>
            <MainThumb :name="waxName" title="Level: Pro" />
          </b-row>
          <b-row>
            <b-col cols="6">
              <ItemText title="Wins" value="24" />
            </b-col>
            <b-col cols="6">
              <ItemText title="Losses" value="24" />
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
        <b-col cols="10" class="bv-center">
          <b-row class="thumb-group">
            <b-col cols="12">
              <div class="thumb-group-title">
                <span>My Best Hand</span>
                <span>NFTs Totals: {{cards.length}}</span>
              </div>
            </b-col>
            <b-row>
              <div class="thumb-item" cols="3" v-for="card in cards" :key="card.id">
                <ThumbNail
                  name="NFTs Name"
                  title="Collection name"
                  subTitle="Fire"
                  leftText="TW"
                  leftValue="1500"  
                  rightText="PW"
                  rightValue="19"
                  titleColor="red"
                  url="../assets/thumb1.png"
                  :nftUrl="card"
                />
              </div>
            </b-row>
          </b-row>
          <b-row class="carousel">
            <b-col cols="12" class="carousel-wrapper">
              <span class="carousel-btn">
                <b-icon
                  icon="chevron-left"
                  class="carousel-icon"
                  variant="light"
                ></b-icon>
              </span>
              <span class="carousel-btn">
                <b-icon
                  icon="chevron-right"
                  class="carousel-icon"
                  variant="light"
                ></b-icon>
              </span>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
import ItemText from "@/components/ItemText.vue";
import ThumbNail from "@/components/ThumbNail.vue";
import UserItem from "@/components/UserItem.vue";
import MainThumb from "@/components/MainThumb.vue";

import 'regenerator-runtime/runtime'
import { readFunds, readAccount, readAssets } from '../functions';

export default {
  name: "Home",
  components: {
    TopHeader,
    ItemText,
    ThumbNail,
    UserItem,
    MainThumb
  },
  data() {
    return {
      msg: "",
      mainProps: { blank: true, blankColor: "#777", width: "100%", class: "m1" },
      waxName: localStorage.getItem('userInfo'),
      cards: [],
    };
  },
  created: async function() {
    this.$http.post('/collection_list', {
    }, {
      emulateJSON: true  // <-- This was missing
    })
    .then(async response => {
      let assetsData = await readAssets(this.waxName, response.data.collection_list);
      
      for(let i=0; i<assetsData.length; i++){
        this.cards.push('https://ipfs.io/ipfs/' + assetsData[i].deserialized.img);
      }
    })
    .catch(function (error) {
        console.error(error);
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
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
  width: 20%;
  border-radius: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
}
.bv-center {
  background: transparent;
  width: 80%;
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
.row > .col {
  width: calc(100%) / 5;
}
.row {
  margin-top: 10px;
  margin-bottom: 10px;
}
.thumb-item {
  width: 20%;
}
.carousel-btn {
  border-radius: 50%;
  background: white;
  font-size: 20px;
}
.carousel-icon {
  padding: 5px;
  color: #9f0303 !important;
  cursor: pointer;
}
.carousel-btn:hover {
  background: grey;
  font-size: 20px;
}
.carousel {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 50px;
}
.carousel-wrapper {
  padding-right: 4vh;
  text-align: end;
}
</style>
