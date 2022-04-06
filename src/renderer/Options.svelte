<script lang="ts">
  import type { themeType } from "@lib/types";
  import { themeStore } from "@lib/store";

  function installTheme() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const data = JSON.parse(reader.result);
        data.active = false;
        const themeExists = $themeStore.some((theme: themeType) => theme.name === data.name);

        if (themeExists) {
          alert("This theme already exists");
          return;
        }

        $themeStore = [...$themeStore, data];
      };

      reader.readAsText(file);
    };

    input.click();
  }

  function changeTheme(theme: themeType) {
    $themeStore = $themeStore.map((themeItem: themeType) => {
      if (themeItem.name === theme.name) {
        themeItem.active = true;
      } else {
        themeItem.active = false;
      }

      return themeItem;
    });
  }
</script>

<div class="options col fill">
  <header class="row jbetween acenter xfill">
    <h2>Themes</h2>
    <button class="install-btn" on:click={installTheme}>NEW THEME</button>
  </header>

  <ul class="col xfill">
    {#each $themeStore as theme}
      <li class="row jbetween acenter xfill">
        <div class="col">
          <h3>{theme.name}</h3>
          <small>{theme.description}</small>
        </div>

        {#if theme.active}
          <p class="label">ACTIVE</p>
        {:else}
          <button class="activate-btn" on:click={() => changeTheme(theme)}>USE THEME</button>
        {/if}
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  .options {
    height: 600px;
    color: $white;
    padding: 40px;
  }

  header {
    margin-bottom: 40px;
  }

  button {
    font-size: 12px;
    color: $white;
    padding: 10px 20px;
  }

  .install-btn {
    background: $link;
  }

  li {
    border-bottom: 1px solid $grey;
    padding: 20px 10px;
  }

  .label {
    color: $success;
    font-size: 12px;
  }

  .activate-btn {
    background: $success;
  }
</style>
