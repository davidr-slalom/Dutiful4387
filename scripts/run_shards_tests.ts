import fs from "fs";

const shardNumber: number = parseInt(process.argv[2]);

const filePath = process.argv[3] ?? "tests_distribution.json";

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const testObjects = JSON.parse(data);
  const shardTests = testObjects[shardNumber - 1];
  console.log("Shard tests:", shardTests);

  for (const test of shardTests) {
    console.log(`Running test: ${test.test}`);

    // insert logic to run individual test by name here
  }
});
