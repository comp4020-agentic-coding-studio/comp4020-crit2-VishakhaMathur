import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

// C2 · Unsolicited redesign — the mechanically checkable lines from the
// published spec. Everything else (is the org real, is your site actually
// better, did you rewrite rather than paste) is judged by a person at the
// crit; see spec/README.md.
//
// These assert the CONTRACT — an outward link exists, the org is named, a way
// to find them is given — via data-testid hooks, not any particular markup.
// Attach the same three attributes to whatever elements your real page ends
// up with.
const home = resolve("dist/index.html");
const doc = new JSDOM(readFileSync(home, "utf8")).window.document;

describe("unsolicited redesign", () => {
  it("links out to the organisation's real, existing site", () => {
    const link = doc.querySelector<HTMLAnchorElement>('[data-testid="org-link"]');
    expect(link, "add an <a data-testid=\"org-link\"> pointing at their real site").toBeTruthy();

    const href = link?.getAttribute("href") ?? "";
    expect(href, "org-link needs a real href").not.toBe("");
    expect(
      /^https?:\/\//.test(href),
      `org-link should point off-site to their real URL, got "${href}"`,
    ).toBe(true);
  });

  it("names the organisation being redesigned", () => {
    const name = doc.querySelector('[data-testid="org-name"]');
    expect(name, "add a data-testid=\"org-name\" element naming who this is").toBeTruthy();
    expect(name?.textContent?.trim(), "org-name is present but empty").not.toBe("");
  });

  it("tells the reader how to find the organisation", () => {
    const howToFind = doc.querySelector('[data-testid="how-to-find"]');
    expect(
      howToFind,
      "add a data-testid=\"how-to-find\" element with an address, map link, or contact info",
    ).toBeTruthy();
    expect(howToFind?.textContent?.trim(), "how-to-find is present but empty").not.toBe("");
  });
});
