<script>
import Home from "./Home.vue";
import Artist from "./Artist.vue";
import About from "./About.vue";

const routes = {
  "/": Home,
  "/art": Artist,
  "/about":About,
};
export default {
  data() {
    return {
      currentPath: window.location.hash,
    };
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || "/"] || NotFound;
    },
  },
  mounted() {
    window.addEventListener("hashchange", () => {
      this.currentPath = window.location.hash;
    });
  },
  methods: {},
};
</script>

<template>
  <main>
    <v-app>
      <v-app-bar title="Music">
        <v-btn href="#/" icon="mdi-home"></v-btn>
        <v-btn href="#/art" icon="mdi-pen"></v-btn>
        <v-btn href="#/about" icon="mdi-help"></v-btn>
      </v-app-bar>
      <v-main>
        <component :is="currentView" />
      </v-main>
    </v-app>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}
</style>

<style>
.application {
  background-color: #a4508b !important;
  background-image: linear-gradient(326deg, #a4508b 0%, #5f0a87 74%) !important;
}
</style>
