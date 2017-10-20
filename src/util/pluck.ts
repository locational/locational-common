export function pluck(o: any, ...props: string[]): any {
  return Object.assign({}, ...props.map(prop => ({[prop]: o[prop]})));
}