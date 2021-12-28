<template>
  <v-app>
    <v-main>
      <!-- <app-layout>
        <router-view></router-view>
      </app-layout> -->
      <pre>
        {{ hello }}
      </pre>
    </v-main>
  </v-app>
</template>

<script>
// import AppLayout from "@/layouts/AppLayout.vue";
import axios from "axios";

export default {
  // components: { AppLayout },
  name: "App",

  data() {
    return {
      hello: "world",
    };
  },

  async created() {
    const response = await axios.get("https://localhost:5001/api/blockchains");
    console.info(response);
  },
};
</script>
