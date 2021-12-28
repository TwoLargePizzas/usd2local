<template>
  <v-app>
    <v-main>
      <app-layout>
        <router-view></router-view>
      </app-layout>
    </v-main>
  </v-app>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";

export default {
  components: { AppLayout },
  name: "App",
};
</script>
