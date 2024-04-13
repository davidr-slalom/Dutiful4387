function getRandomNumber(): number {
  return Math.floor(Math.random() * 4) + 2;
}

const randomNumber = getRandomNumber();
console.log(randomNumber);
