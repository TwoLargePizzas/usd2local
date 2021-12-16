<template>
  <v-container fill-height fluid class="page-layout">
    <slot />
  </v-container>
</template>

<script>
export default {
  name: "PageLayout",
};
</script>

<style>
.page-layout {
  --stripe: #3f3f3f22;
  --bg: #1f1f1f22;

  background: linear-gradient(135deg, var(--bg) 25%, transparent 25%) -50px 0,
    linear-gradient(225deg, var(--bg) 25%, transparent 25%) -50px 0,
    linear-gradient(315deg, var(--bg) 25%, transparent 25%),
    linear-gradient(45deg, var(--bg) 25%, transparent 25%);
  background-size: 100px 100px;
  background-color: var(--stripe);
}
</style>
