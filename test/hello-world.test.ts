import { remote } from "webdriverio";
import { assert } from "chai";
import { setupBrowser } from "@testing-library/webdriverio";

describe("Hello world", function () {
  it("Making the tests work", async function () {
    const client = await remote({
      capabilities: {
        automationName: "uiautomator2",
        platformName: "android",
        deviceName: "RF8M21KYYEH",
        browserName: "chrome",
      },
      path: "/wd/hub",
      port: parseInt(process.env.APPIUM_PORT || "4723"),
      logLevel: "info",
    });

    const browser = setupBrowser(client);

    await client.url("https://www.google.com");
    const title = await client.getTitle();
    assert.equal(title, "Google");

    browser.getByText("Google");

    await client.deleteSession();
  });
});
