import { expect } from "@jest/globals";
import fs from "fs";
import jsdom from "jsdom";

describe("our first test", () => {
    it("should pass", () => {
        expect(true).toEqual(true);
    });
});

describe("index.html", () => {
    it("should have h1 that says Users", () => {
        const index = fs.readFileSync("./src/index.html", "utf-8");
        const { JSDOM } = jsdom;
        const dom = new JSDOM(index);
        const h1 = dom.window.document.getElementsByTagName("h1")[0];
        expect(h1.innerHTML).toEqual("Users");
        dom.window.close();
    });
});
