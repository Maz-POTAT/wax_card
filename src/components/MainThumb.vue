<template lang="">
  <div>
    <div class="">
      <!-- <b-img src="../1.png" alt="thumb.png" width="50px"></b-img> -->
      <img v-bind="mainProps" class="thumb-img" alt="thumb" src="../assets/avatar.png" width="100%"></img>
    </div>
    <p class="thumb-name">{{name}}</p>
    <p class="thumb-title">{{title}}</p>
  </div>
</template>
<script>
export default {
  name: "MainThumb",
  props: {
    name: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
  },
  data () {
    return {
      mainProps: { blank: true, blankColor: '#777', width: "100%", class: 'm1', borderRadius: "10px" }
    }
  }
}
</script>
<style lang="">
.thumb {
  position: relative;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: left;
}
.thumb-img {
  border-radius: 10px;
}
.thumb-name {
  color: white;
  font-size: 24px;

}
.thumb-title {
  color: white;
  font-size: 26px;
}
</style>
