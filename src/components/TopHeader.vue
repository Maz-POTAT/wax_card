<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#" style="width: 10%"><img v-bind="mainProps" alt="Vue logo" src="../assets/logo.png" height="50" width="50"></img></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav style="width: 80%; justify-content: center">
            <b-nav-item :to="{ path: '/' }" active v-show="isLogIn">Dashboard</b-nav-item>
            <b-nav-item :to="{ path: '/MyNfts' }" v-show="isLogIn">My NFTs</b-nav-item>
            <b-button variant="danger" v-show="isLogIn">Play</b-button>
            <b-nav-item href="#" v-show="isLogIn">Market</b-nav-item>
            <b-nav-item href="#" v-show="isLogIn">Help</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto" v-show="isLogIn">
            <b-nav-item>
                <b-icon icon="bell-fill" class="rounded-circle bg-dark" variant="light"></b-icon>
            </b-nav-item>
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>{{waxName}}</em>
                <img v-bind="mainProps" rounded="circle" alt="Circle image" src="../assets/logo.png" height="30"></img>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#" v-on:click="signOut">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto" v-show="!isLogIn">
            <div id="ual-div"> </div>
          </b-navbar-nav>

        </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { BModal, VBModal } from 'bootstrap-vue'

export default {
  name: 'TopHeader',
  props: {
    isLogIn: Boolean,
    waxName: {
      type: String,
      default: ""
    },
  },
  methods:{
    signOut: () =>{
      this.isLogIn = false;
      UAL.logoutUser();
      localStorage.removeItem('userInfo');
      document.location = '/';
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      mainProps: { blank: true, blankColor: '#777', width: 30, height: 30, class: 'm1' }
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul li {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
