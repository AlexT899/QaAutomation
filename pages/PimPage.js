const { expect } = require("@playwright/test");

exports.PimPage = class PimPage {
  constructor(page) {
    this.page = page;
    this.pimBtn = "//aside[@class='oxd-sidepanel']//li[2]";
    this.usersList = "(//div[@class='oxd-table-card'])[last()]";
    this.usernameInput = "input[placeholder='First Name']";
    this.middleNameInput = "input[placeholder='Middle Name']";
    this.lastName = "input[placeholder='Last Name']";
  }
  async clickPimBtn() {
    await this.page.locator(this.pimBtn).click();
  }
  async clickUserList() {
    await this.page.locator(this.usersList).click();
  }
  async randomName() {
    const name = ["Kevin", "Alex", "Vitalii", "Yuri"];
    let randomName = name[Math.floor(Math.random() * name.length)];
    await this.page.locator(this.usernameInput).fill(randomName);
    // await this.page.waitForTimeout(200);
  }
  async middleName() {
    let middleName = ["V", "F", "G", "A"];
    let randomMiddleName =
      middleName[Math.floor(Math.random() * middleName.length)];
    await this.page.locator(this.middleNameInput).fill(randomMiddleName);
  }
  async surName() {
    let surname = ["Tarvids", "Cuellar", "Gorbachev", "Aleksejev"];
    let randomSurname = surname[Math.floor(Math.random() * surname.length)];
    await this.page.locator(this.lastName).fill(randomSurname);
  }
};
