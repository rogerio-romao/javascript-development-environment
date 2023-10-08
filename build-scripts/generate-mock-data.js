/* eslint-disable no-console */
import { faker } from "@faker-js/faker";
import chalk from "chalk";
import fs from "fs";
import { JSONSchemaFaker } from "json-schema-faker";
import { schema } from "./mock-data-schema.js";

// Extend JSF with the fake library.
JSONSchemaFaker.extend("faker", () => faker);

// Generate JSON data based on the schema.
const json = JSON.stringify(JSONSchemaFaker.generate(schema));

// Write the data to a file.
fs.writeFile("./src/api/db.json", json, (err) => {
    if (err) return console.log(chalk.red(err));
    console.log(chalk.green("Mock data generated."));
});
