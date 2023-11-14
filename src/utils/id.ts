import FlakeId from 'flakeid';

const flake = new FlakeId({
  timeOffset: (2022 - 1970) * 31536000 * 1000, //optional, define a offset time
});
export function generateId(): BigInt {
  return flake.gen();
}
