import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import MyNfts from "@/views/MyNfts.vue";
import Game from "@/views/Game.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/MyNfts",
      name: "MyNfts",
      component: MyNfts
    },
    {
      path: "/Game",
      name: "Game",
      component: Game
    },
  ],
  mode: "history"
});
