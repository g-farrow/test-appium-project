# Cross Device Testing

- [Cross Device Testing](#cross-device-testing)
  - [Installation](#installation)
  - [Typescript](#typescript)
  - [Running Appium on a Local Device](#running-appium-on-a-local-device)
    - [Enabling Access to an Android Device](#enabling-access-to-an-android-device)
    - [Install Chrome Driver](#install-chrome-driver)

## Installation

- Install Appium
- Install ADB

## Typescript

[Webdriver IO Typescript Docs](https://webdriver.io/docs/typescript/)
[Example Repo](https://github.com/igniteram/appium-webdriverio-typescript)

## Running Appium on a Local Device

### Enabling Access to an Android Device

On Device:

- Enable USB Debugging
- Revoke USB Debugging Authorizations (trouble shooting step in case of `unauthorised error`
- Disable adb authorization timeout
- Disable “Verify Apps over USB”

On Desktop

- start adb server: `adb start-server`
- Plug in device

On Device:

- Look for pop-up prompt - click “allow” remote debugging

### Install Chrome Driver

[Appium Docs](http://appium.io/docs/en/writing-running-appium/web/chromedriver/)
[Chrome Driver Docs](https://sites.google.com/chromium.org/driver/getting-started)

- Download new driver from https://sites.google.com/chromium.org/driver/downloads
- Move it to somewhere sensible (e.g. `~/.appium/chromedrivers/)
- Open it by double clicking (Mac OS will tell you it cant be opened because its not a trusted dev.)
- Go to System Preferences > Security & Privacy > General and click “Allow”

Run appium server with: `appium --chromedriver-executable /path/to/my/chromedriver`
