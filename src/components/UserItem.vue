<template>
  <div class="user-info-bg">
    <img alt="avatar" src="../assets/avatar2.png" width="50px" height="50px"></img>
    <span class="item-text-format">
      {{name}}
    </span>
    <br>
    <span class="item-value-format">
      <strong>{{value}}</strong>
    </span>
  </div>
</template>

<script>
export default {
  name: 'UserItem',
  props: {
    url: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: ""
    },
    height: {
      type: String,
      default: "100%"
    }
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.user-info-bg {
  position: relative;
  background: white;
  border-radius: 20px;
  width: 100%;
  color: black;
  padding: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.item-text-format {
  font-size: 16px;
}
.item-value-format {
  font-size: 18px;
  font-weight: 500;
}
img {
  position: absolute;
  left: -20px;
  border-radius: 20px;
}
</style>
