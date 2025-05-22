export function printBanner(isProduction: boolean, port: number) {
  return console.log(`
<><><><><><><><><><><><><><><>
<> 🚀 http://localhost:${port} <>
<> ⏱️ ${Date.now()}         <>
<><><><><><><><><><><><><><><>
  `);
}
