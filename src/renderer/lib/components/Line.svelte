<script lang="ts">
  import type { lineType } from "@lib/types";
  import Result from "@lib/components/Result.svelte";
  export let line: lineType;
</script>

<div class="line row nowrap xfill">
  <code class="grow" contenteditable="true" bind:textContent={line.value} autofocus />
  <Result bind:req={line.value} />
</div>

<style lang="scss">
  code {
    color: turquoise;
    font-size: 22px;
    padding: 0 20px;
  }
</style>
