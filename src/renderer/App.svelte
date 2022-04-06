<script lang="ts">
  import "verdu/fonts/circular.css";
  import "verdu/fonts/operator.css";

  import type { themeType } from "@lib/types";
  import { onMount } from "svelte";
  import { optionStore, lineStore, themeStore } from "@lib/store";
  import Line from "@lib/components/Line.svelte";
  import Options from "/Options.svelte";

  $: theme = $themeStore.find((theme: themeType) => theme.active);

  function setTheme() {
    const main: HTMLElement = document.querySelector("main") || document.createElement("main");
    const wrapper: HTMLElement = document.querySelector(".wrapper") || document.createElement("div");

    main.style.cssText = theme.styles.main;
    wrapper.style.cssText = theme.styles.wrapper;
  }

  $: if (theme) setTheme();

  onMount(() => {
    setTheme();

    window.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === ",") {
        $optionStore = !$optionStore;
      }
    });

    window.addEventListener("blur", (e) => {
      $optionStore = false;
    });
  });
</script>

<main class="col fcenter fill" class:options={$optionStore}>
  <div class="wrapper col fcenter">
    {#if !$optionStore}
      {#each $lineStore as line}
        <Line {line} />
      {/each}
    {:else}
      <Options />
    {/if}
  </div>
</main>

<style lang="scss">
  :global {
    @import "./_reset.scss";
    @import "verdu/verdu.scss";
  }

  main {
    -webkit-app-region: drag;
    position: relative;
    height: 80px;
    background: rgba($white, 0.3);
    box-shadow: inset 0 0 2px 1px rgba($white, 0.3);
    border-radius: 8px;
    transition: height 500ms;
  }

  .options {
    height: 600px;
  }

  .wrapper {
    -webkit-app-region: no-drag;
    position: absolute;
    inset: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    background: $black;
    border-radius: 6px;
    box-shadow: 0 5px 10px -5px rgba(#000, 0.7);
  }
</style>
