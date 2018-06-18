import {Left, Right} from "../src/either";

console.log(new Left(1).then(new Right(2)) instanceof Left);
console.log(new Right(2).then(new Left(1)) instanceof Left);

console.log(new Left(1).then(new Left(2)).getLeft()===1);
console.log(new Right(1).then(new Right(2)).getRight()===2);
