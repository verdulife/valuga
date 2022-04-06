<script lang="ts">
  import "verdu/fonts/circular.css";
  import "verdu/fonts/operator.css";

  import type { themeType } from "@lib/types";
  import { onMount } from "svelte";
  import { lineStore, themeStore } from "@lib/store";
  import Line from "@lib/components/Line.svelte";

  const theme = $themeStore.find((theme: themeType) => theme.active);

  onMount(() => {
    const main: HTMLElement = document.querySelector("main") || document.createElement("main");
    const wrapper: HTMLElement = document.querySelector(".wrapper") || document.createElement("div");

    main.style.cssText = theme.styles.main;
    wrapper.style.cssText = theme.styles.wrapper;
  });
</script>

<main class="col fcenter fill">
  <div class="wrapper col fcenter">
    {#each $lineStore as line}
      <Line {line} />
    {/each}
  </div>
</main>

<style lang="scss">
  :global {
    @import "./_reset.scss";
    @import "verdu/verdu.scss";
  }

  main {
    -webkit-app-region: drag;
    background: rgba($white, 0.3);
    box-shadow: inset 0 0 2px 1px rgba($white, 0.3);
    border-radius: 8px;
  }

  .wrapper {
    -webkit-app-region: no-drag;
    position: fixed;
    inset: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    background: $black;
    border-radius: 6px;
    box-shadow: 0 5px 10px -5px rgba(#000, 0.7);
  }
</style>
