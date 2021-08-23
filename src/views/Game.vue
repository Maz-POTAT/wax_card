<template>
  <div id="game_area">
  </div>
</template>

<script>

import Phaser from "phaser";
import {GameScene} from "../phaser/game"
const GameConfig = {
  title: "NFT Trick",
  backgroundColor: "#2e0101",
  scene: [GameScene],
  scale: {
      mode: Phaser.Scale.FIT,
      parent: "game_area",
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 800,
      height: 600,
  },
};
export class NFTGame extends Phaser.Game {
  constructor(GameConfig) {
    super(GameConfig);
  }
};

export default {
  name: 'Game',
  components: {
  },
  props: {
  },
  data () {
    return {
      waxName: localStorage.getItem('userInfo') == undefined ? '' : localStorage.getItem('userInfo'),
    }
  },
  methods: {

  },
  mounted: function(){
    var game = new NFTGame(GameConfig);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#game_area{
  margin: auto;
}
</style>
