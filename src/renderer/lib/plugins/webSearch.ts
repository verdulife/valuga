import type { pluginType } from '@lib/types';

export const searchPlugin: pluginType = {
  active: true,
  name: 'web search',
  description: 'Search in the web',
  function: (e: KeyboardEvent, value: string) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (value.length === 0) return;

      const isURL = new RegExp(
        "^(http(s)?:\\/\\/.)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)$"
      );

      if (value.match(isURL)) {
        window.open(value.startsWith("http") ? value : `https://${encodeURIComponent(value)}`);
      }

      if (value.startsWith("g:")) {
        let tmp = value;
        tmp = tmp.replace("g:", "");

        window.open(`https://www.google.com/search?q=${encodeURIComponent(tmp)}`);
      }

      if (value.startsWith("w:")) {
        let tmp = value;
        tmp = tmp.replace("w:", "");

        window.open(`https://es.wikipedia.org/wiki/${encodeURIComponent(tmp)}`);
      }

      if (value.startsWith("y:")) {
        let tmp = value;
        tmp = tmp.replace("y:", "");

        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(tmp)}`);
      }
    }
  }
};