import fs from "fs";

/**
 * Represents a test with a name and a duration.
 */
class Test {
  test: string;
  duration: number;

  constructor(test: string, duration: number) {
    this.test = test;
    this.duration = duration;
  }
}

/**
 * Returns a random number between 1 and 20.
 *
 * @returns A random number.
 */
function getRandomNumber(): number {
  return Math.floor(Math.random() * 20) + 1;
}

/**
 * Returns a random subset of tests from the `tests.json` file.
 *
 * @returns An array of tests.
 */
function getRandomSubset(): Test[] {
  const tests = JSON.parse(fs.readFileSync("tests.json", "utf-8"));
  const subsetSize = getRandomNumber();
  const subset: Test[] = [];

  while (subset.length < subsetSize) {
    const randomIndex = Math.floor(Math.random() * tests.length);
    const randomTest = tests[randomIndex];

    if (!subset.includes(randomTest)) {
      subset.push(randomTest);
    }
  }

  return subset;
}

/**
 * Packs tests into bins based on their duration.
 * Each bin contains tests whose total duration does not exceed a given limit.
 *
 * @param tests - An array of tests to be packed into bins.
 * @param maximumDuration - The maximum duration allowed for each bin.
 * @returns An array of bins, where each bin is an array of tests.
 */
function binPackTests(tests: Test[], maximumDuration: number): Test[][] {
  const bins: Test[][] = [];
  let currentBin: Test[] = [];
  let currentBinDuration = 0;

  for (const test of tests) {
    if (currentBinDuration + test.duration <= maximumDuration) {
      currentBin.push(test);
      currentBinDuration += test.duration;
    } else {
      bins.push(currentBin);
      currentBin = [test];
      currentBinDuration = test.duration;
    }
  }

  if (currentBin.length > 0) {
    bins.push(currentBin);
  }

  return bins;
}

const maximumDuration = process.argv[2] ? parseInt(process.argv[2]) : 20;

// Get a random subset of tests
// Replace with call to test selection api
const randomSubset = getRandomSubset();

// console.log(randomSubset);

// binPackTests(randomSubset, maximumDuration).forEach((bin, i) => {
//   console.log(`Bin ${i + 1}: ${bin.map((test) => test.test).join(", ")}`);
// });

// console.log(binPackTests(randomSubset, maximumDuration));
const bins = binPackTests(randomSubset, maximumDuration);
let json = JSON.stringify(bins, null, 2);

// Write JSON data to a file
try {
  fs.writeFileSync("tests_distribution.json", json);
  console.log("JSON data is saved.");
} catch (err) {
  console.log("An error occurred while writing JSON Object to File.");
  console.error(err);
}

console.log(json);
