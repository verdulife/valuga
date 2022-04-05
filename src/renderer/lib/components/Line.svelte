<script lang="ts">
  import type { lineType } from "@lib/types";
  import Result from "@lib/components/Result.svelte";
  import { onMount } from "svelte";
  export let line: lineType;

  function goURL(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();

      const isURL = new RegExp(
        "^(http(s)?:\\/\\/.)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)$"
      );

      const encoded = encodeURIComponent(line.value);

      if (line.value.match(isURL)) {
        window.open(line.value.startsWith("http") ? line.value : `https://${encoded}`);
      } else {
        window.open(`https://www.google.com/search?q=${encoded}`);
      }
    }
  }

  onMount(() => {
    const code = document.querySelector("code");
    code?.focus();

    code?.addEventListener("blur" as any, () => {
      code?.focus();
    });
  });
</script>

<div class="line row nowrap xfill">
  <code type="text" class="grow" contenteditable="true" bind:textContent={line.value} on:keydown={(e) => goURL(e)} />
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
