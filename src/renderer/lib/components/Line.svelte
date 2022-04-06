<script lang="ts">
  import type { lineType, pluginType } from "@lib/types";
  import { onMount } from "svelte";
  import { pluginStore } from "@lib/store";
  import Result from "@lib/components/Result.svelte";

  export let line: lineType;

  function loadPlugins(e: KeyboardEvent) {
    if (e.key === "Enter") e.preventDefault();

    $pluginStore.forEach((plugin: pluginType) => {
      if (plugin.active) {
        const fn = new Function(`return ${plugin.function}`)();
        fn(e, line.value);
      }
    });
  }

  onMount(() => {
    const code = document.querySelector("code") as HTMLElement;
    code?.focus();
  });
</script>

<div class="line row nowrap xfill">
  <code
    type="text"
    class="grow"
    contenteditable="true"
    bind:textContent={line.value}
    on:keydown={(e) => loadPlugins(e)}
  />
  <Result bind:req={line.value} />
</div>

<style lang="scss">
  code {
    color: $border;
    font-size: 22px;
    text-shadow: 0 0 5px rgba($white, 0.5);
    padding: 0 20px;

    b {
      color: $link;
    }
  }
</style>
