const PRICE_FORMATTER = Intl.NumberFormat(undefined, {
  currency: "PLN",
  style: "currency",
});

export function formatPrice(price: number) {
  return PRICE_FORMATTER.format(+price.toFixed(2));
}

const SYMBOLS_TO_FORMAT = {
  ą: "a",
  ć: "c",
  ę: "e",
  ł: "l",
  ń: "n",
  ó: "o",
  ś: "s",
  ź: "z",
  ż: "z",
  " ": "-",
  ".": "",
};

type TO_FORMAT = "ż" | "ź" | "ć" | "ń" | "ó" | "ł" | "ę" | "ą" | "ś" | " " | ".";

export function formatToURL(title: string) {
  return title
    .replace(/[żźćńółęąś .]/gi, (match: string) => SYMBOLS_TO_FORMAT?.[match as TO_FORMAT])
    .toLowerCase();
}

export function assert(condition: unknown, message: string = "Something went wrong"): asserts condition {
  if (!condition) throw new Error(message);
}

export function areEqual(array1: unknown[], array2: unknown[]): boolean {
  const equality = array1.sort().join(",") === array2.sort().join(",");
  return equality;
}
