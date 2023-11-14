async function main() {
  const pwd = '3595736B-435D-4A5D-BEFB-8E552F32BA71'
  const hash = await Bun.password.hash(pwd);
  console.log(hash);
};

main();
