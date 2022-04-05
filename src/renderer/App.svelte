<script lang="ts">
  import "verdu/fonts/circular.css";
  import "verdu/fonts/operator.css";
  import { lineStore } from "@lib/store";
  import Line from "@lib/components/Line.svelte";
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
    background: $black;
  }

  .wrapper {
    position: fixed;
    inset: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    -webkit-app-region: no-drag;
  }
</style>
