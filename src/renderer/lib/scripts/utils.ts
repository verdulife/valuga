const CURRENCY_API = "https://api.exchangerate-api.com/v4/latest/";

export async function getCurrency(from: string, to: string): Promise<number> {
  const req = await fetch(CURRENCY_API + from);
  const res = await req.json();
  return res.rates[to];
}