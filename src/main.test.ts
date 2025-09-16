import { describe, expect, it } from "vitest";
import { main } from "./main";

describe("main", () => {
  it("runs without an error", () => {
    expect(() => main()).not.toThrow();
  });
});
