const { expect } = require("@playwright/test");

exports.AdminPage = class AdminPage {
  constructor(page) {
    this.page = page;
    this.adminBtn = "//aside[@class='oxd-sidepanel']//li[1]";
    this.username = "(//div[@role='cell'][2])[last()]";
    this.searchInput = "(//input[@class='oxd-input oxd-input--active'])[2]";
    this.searchBtn = "button[type='submit']";
    this.searchResults = "(//div[@role='cell'][2])[last()]";
  }
  async clickAdminBtn() {
    await this.page.locator(this.adminBtn).click();
  }
  async checkSearchUsername() {
    let usernameContent = await this.page.locator(this.username);
    let username = await usernameContent.textContent();
    let userNameContent2 = await this.page.locator(this.searchResults);
    let username2 = await userNameContent2.textContent();
    await this.page.locator(this.searchInput).fill(username);
    await this.page.locator(this.searchBtn).click();
    return { username1: username, username2: username2 };
  }
};
