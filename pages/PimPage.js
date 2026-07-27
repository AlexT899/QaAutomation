const { expect } = require("@playwright/test");

exports.PimPage = class PimPage {
  constructor(page) {
    this.page = page;
    this.pimBtn = "//aside[@class='oxd-sidepanel']//li[2]";
    this.usersList = "(//div[@class='oxd-table-card'])[last()]";
    this.usernameInput = "input[placeholder='First Name']";
    this.middleNameInput = "input[placeholder='Middle Name']";
    this.lastName = "input[placeholder='Last Name']";
    this.id = "(//input[@class='oxd-input oxd-input--active'])[2]";
    this.otherId = "(//input[@class='oxd-input oxd-input--active'])[3]";
    this.licenseNumber =
      "//body/div[@id='app']/div[@class='oxd-layout orangehrm-upgrade-layout']/div[@class='oxd-layout-container']/div[@class='oxd-layout-context']/div[@class='orangehrm-background-container']/div[@class='orangehrm-card-container']/div[@class='orangehrm-edit-employee']/div[@class='orangehrm-edit-employee-content']/div[@class='orangehrm-horizontal-padding orangehrm-vertical-padding']/form[@class='oxd-form']/div[@class='oxd-form-row']/div[2]/div[1]/div[1]/div[2]/input[1]";
    this.chooseCountry = "(//div[@class='oxd-select-wrapper'])[1]";
    this.mStatus =
      "(//div[@class='oxd-select-text oxd-select-text--active'])[2]";
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
  async newId() {
    let id = Math.floor(Math.random() * 900) + 100;

    await this.page.locator(this.id).fill(id.toString());
  }
  async newOtherId() {
    let id = ["hop", "12321", "45678", "pikachu", "belka"];
    let randomId = id[Math.floor(Math.random() * id.length)];
    await this.page.locator(this.id).fill(randomId);
  }
  async newLicenseNumber() {
    let licenseNumber = Math.floor(Math.random() * 90000) + 10000;
    // let randomNumber =
    //   licenseNumber[Math.floor(Math.random() * licenseNumber.length)];
    await this.page.locator(this.licenseNumber).fill(licenseNumber.toString());
  }
  async nationality() {
    await this.page.locator(this.chooseCountry).click();
    await this.page.waitForTimeout(300);
    const countries = this.page.locator("//div[@role='listbox']//span");
    const count = await countries.count();
    const randomIndex = Math.floor(Math.random() * count);
    await countries.nth(randomIndex).click();
  }
  async maritalStatus() {
    await this.page.locator(this.mStatus).click();
    await this.page.waitForTimeout(300);
    const statuses = this.page.locator("//div[@role='listbox']//span");
    const count = await statuses.count();
    const randomIndex = Math.floor(Math.random() * count);
    await statuses.nth(randomIndex).click();
  }
};
