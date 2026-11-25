import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const read = (path: string) => readFileSync(new URL(path, root), "utf8");

test("the site no longer ships a light theme toggle", () => {
  const home = read("src/components/home/MinimalHome.tsx");
  const resources = read("src/pages/Resources.tsx");
  const css = read("src/index.css");
  const main = read("src/main.tsx");
  const sidebar = read("src/components/AppSidebar.tsx");

  assert.doesNotMatch(home, /useNpTheme|np-light|home-theme|Switch to light/);
  assert.doesNotMatch(resources, /useNpTheme|np-light/);
  assert.doesNotMatch(css, /np-light/);
  assert.doesNotMatch(main, /ThemeProvider/);
  assert.doesNotMatch(sidebar, /setTheme|useTheme/);
  assert.match(css, /color-scheme:\s*dark/);
  assert.match(home, /Book a Call/);
  assert.match(home, /Open menu/);
});
