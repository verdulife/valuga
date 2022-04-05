<script lang="ts">
  import { _op } from "@lib/dictionaries/operators";
  import { _currency } from "@lib/dictionaries/currency";
  import { getCurrency } from "@lib/scripts/utils";

  export let req: string;

  function getRes() {
    let copy = req;
    _op.forEach(({ input, output }) => {
      const regex = new RegExp(input, "g");
      copy = copy.replace(regex, output);
    });

    let matches = [];
    _currency.forEach((val) => {
      const regexSymbol = new RegExp(`([0-9,.]+)?\\s?${val.symbol}\\s?([0-9,.]+)?`, "g");
      const matchSymbol = req.toUpperCase().match(regexSymbol);

      if (matchSymbol) matches.push(matchSymbol);
    });

    console.log(matches);

    try {
      return new Function(`return ${copy}`)();
    } catch (error) {
      return "--";
    }
  }

  let res = getRes();
  $: if (req) res = getRes();
</script>

<code>{res || "--"}</code>

<style lang="scss">
  code {
    color: $link;
    font-size: 22px;
    padding: 0 20px;
  }
</style>
