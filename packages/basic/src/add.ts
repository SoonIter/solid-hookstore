function add(...args: number[]) {
  return args.reduce((a, b) => a + b);
}
export default add
