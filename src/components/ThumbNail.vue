<template lang="">
  <div>
    <div class="thumb">
      <!-- <b-img src="../1.png" alt="thumb.png" width="50px"></b-img> -->
      <!-- <img v-bind="mainProps" class="thumb-img" alt="thumb" src="../assets/thumb1.png" width="100%"></img> -->
      <img v-bind="mainProps" class="thumb-img" alt="thumb" :src="info.image"  style="background: transparent; margin: auto;"></img>
      <div class="leftItem">
        <span>{{leftText}}</span>
        <br>
        <span><strong>{{leftValue}}</strong></span>
      </div>
      <div class="rightItem">
        <span>{{rightText}}</span>
        <br>
        <span><strong>{{rightValue}}</strong></span>
      </div>
      <div></div>
    </div>
    <div class="thumb-info">
      <span class="thumb-info-name">{{info.name}}</span>
      <span class="thumb-info-title">{{info.name}}</span>
      <span class="thumb-info-sub" :style="{ 'color': titleColor}">{{}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "ThumbNail",
  props: {
    leftText:{
      type: String,
      default: ""
    },
    rightText: {
      type: String,
      default: ""
    },
    leftValue: {
      type: String,
      default: ""
    },
    rightValue: {
      type: String,
      default: ""
    },
    titleColor: {
      type: String,
      default: "red"
    },
    info: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      mainProps: { blank: true, blankColor: '#777', width: "100%", class: 'm1', borderRadius: "10px" },
    }
  }
}
</script>
<style lang="">
.thumb {
  position: relative;
  border-radius: 10px;
  margin: 10px 10px;
  text-align: left;
  background-color: #c0c0c040;
  display: flex;
  justify-content: center;
  width: 150px;
  height: 200px;
}
.leftItem {
  position: absolute;
  bottom: -10px;
  left: 0px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #00eff9;
  text-align: center;

}
.rightItem {
  position: absolute;
  bottom: -10px;
  right: 0px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #9eff00;
  text-align: center;
}
.thumb-img {
  border-radius: 10px;
}
.thumb-info-name {
  color: white;
  font-style: italic;
}
.thumb-info-title {
  color: gray;
}
.thumb-info-sub {
  font-style: italic;
}
.thumb-info {
  font-size: 14px;
  text-align: left;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 150px;
  height: 70px;
}

</style>
