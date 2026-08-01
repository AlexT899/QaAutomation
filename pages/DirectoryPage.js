const { expect } = require("@playwright/test");

exports.DirectoryPage = class DirectoryPage {
  constructor(page) {
    this.page = page;
    this.directoryBtn =
      "//span[@class='oxd-text oxd-text--span oxd-main-menu-item--name'][normalize-space()='Directory']";
    this.jobTitle = "(//div[@class='oxd-select-wrapper'])[1]";
    this.chooseJobTitle =
      "//div[contains(@class, 'oxd-select-option') and .//span[text()='Chief Financial Officer']]";
    this.searchBTn = "//button[normalize-space()='Search']";
  }
  async clickDirectoryBtn() {
    await this.page.locator(this.directoryBtn).click();
  }
  async workTitle() {
    await this.page.locator(this.jobTitle).click();
    await this.page.locator(this.chooseJobTitle).waitFor({ state: "visible" });
  }
  async chooseWorkTitle() {
    await this.page.locator(this.chooseJobTitle).click();
    await this.page.waitForTimeout(300);
    // console.log(await this.page.locator(this.chooseJobTitle).textContent());
    // for (let i = 0; i < 3; i++) {
    //   await this.page.keyboard.press("ArrowDown");
    // }
    // await this.page.keyboard.press("Enter");
  }
  async clickSearchBTn() {
    await this.page.locator(this.searchBTn).click();
  }
};
