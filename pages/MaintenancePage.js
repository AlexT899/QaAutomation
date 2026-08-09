const { expect } = require("@playwright/test");
exports.MaintenancePage = class MaintenancePagePage {
  constructor(page) {
    this.page = page;
    this.maintenanceBtn =
      "//span[@class='oxd-text oxd-text--span oxd-main-menu-item--name'][normalize-space()='Maintenance']";
    this.password = "//input[@name='password']";
    this.confrim = "button[type='submit']";
    this.access = "a[class='oxd-topbar-body-nav-tab-item']";
    this.searchInput =
      "//label[normalize-space()='Employee Name']/following::input[@placeholder='Type for hints...'][1]"; // following позволяет найти элемент который находится после укaзаного элемента в начале.
    this.searchBtn = "//button[normalize-space()='Search']";
  }
  async clickBtn() {
    this.page.locator(this.maintenanceBtn).click();
  }
  async enterPassword() {
    this.page.locator(this.password).fill("admin123");
    await this.page.waitForTimeout(500);
    this.page.locator(this.confrim).click();
  }
  async clickAccess() {
    this.page.locator(this.access).click();
  }
  async fillInput() {
    // const randomLetter = String.fromCharCode(
    //   65 + Math.floor(Math.random() * 26)
    // );
    const random = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetters = random[Math.floor(Math.random() * random.length)];
    await this.page.locator(this.searchInput).fill(randomLetters);
    // const wrapper = this.page.locator(".oxd-autocomplete-wrapper");
    // console.log(await wrapper.innerHTML()); // позводяет увидить нужный HTMl
    const options = this.page.locator(
      "//div[contains(@class, 'oxd-autocomplete-option')]"
    );

    const selectedUser = await options.nth(2).textContent();
    await options.nth(2).click();

    console.log("Выбран пользователь:", selectedUser);
    await this.page.locator(this.searchBtn).click();
    const foundUser = this.page.locator("input[placeholder='First Name']");
    const foundUserText = await foundUser.inputValue();
    console.log("Найден пользователь:", foundUserText);
    await expect(selectedUser).toContain(foundUserText);
    // console.log(randomLetters);
  }
};
