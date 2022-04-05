<script lang="ts">
  import { _op } from "@lib/dictionaries/operators";
  import { _currency } from "@lib/dictionaries/currency";
  import { getCurrency } from "@lib/scripts/utils";

  export let req: string;
  const emptyValue = "";

  function getRes() {
    let copy = req;

    _op.forEach(({ input, output }) => {
      const regex = new RegExp(input, "g");
      copy = copy.replace(regex, output);
    });

    /* let matches = [];
    _currency.forEach((val) => {
      const regexSymbol = new RegExp(`([0-9,.]+)?\\s?${val.symbol}\\s?([0-9,.]+)?`, "g");
      const matchSymbol = req.toUpperCase().match(regexSymbol);

      if (matchSymbol) matches.push(matchSymbol);
    });

    console.log(matches); */

    try {
      const evaluated = new Function(`return ${copy}`)();
      const formated = new Intl.NumberFormat("en-US", {
        maximumSignificantDigits: 5,
      }).format(evaluated);

      return formated;
    } catch (error) {
      return emptyValue;
    }
  }

  let res = getRes();
  $: if (req) res = getRes();
  $: if (req.length === 0) res = emptyValue;
</script>

<code>{res || emptyValue}</code>

<style lang="scss">
  code {
    cursor: pointer;
    color: $link;
    font-size: 22px;
    border-left: 1px solid darken($black, 5%);
    padding: 0 20px;
  }
</style>
