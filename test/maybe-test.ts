import {Just, Nothing} from "../src";

const a = new Just(2);
const b = new Nothing();

a.peek(a => console.log({a}));
b.peek(b => console.log({b}));

console.log('a >> b',a.then(b));
console.log('b >> a',b.then(a));
