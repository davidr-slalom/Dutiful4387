function printHelloWithInt(num: number): void {
  console.log(`Hello from test runner ${num}`);
}

const inputInt: number = parseInt(process.argv[2]);
printHelloWithInt(inputInt);
