<template>
  <div class="item-text-bg">
    <span class="item-text-format">
      {{ title }}
    </span>
    <br />
    <span class="item-value-format">
      <strong>{{ value }}</strong>
    </span>
  </div>
</template>

<script>
export default {
  name: "ItemText",
  props: {
    title: {
      type: String,
      default: ""
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
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
.item-text-bg {
  background: white;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  color: black;
  padding-top: 10%;
  padding-bottom: 10%;
}
.item-text-format {
  font-size: 1.5rem;
}
.item-value-format {
  font-size: 1.5rem;
  font-weight: 500;
}
</style>
