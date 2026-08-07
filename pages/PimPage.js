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
    this.radioBox = "input[type='radio']";
    this.saveBtn = "(//button[@type='submit'][normalize-space()='Save'])[1]";
    this.saveBtn2 = "(//button[@type='submit'][normalize-space()='Save'])[2]";
    this.saveBtn3 = "(//button[@type='submit'][normalize-space()='Save'])[3]";
    this.bloodType = "(//div[@class='oxd-select-wrapper'])[3]";
    this.testField = "(//input[@class='oxd-input oxd-input--active'])[7]";
    this.addButton = "(//button[normalize-space()='Add'])[1]";
    this.inputFile = "//input[@type='file']";
    this.comment = "(//textarea[@placeholder='Type comment here'])[1]";
    this.inputDob = "(//input[@placeholder='yyyy-dd-mm'])[2]";
    this.licenceNum = "(//input[@placeholder='yyyy-dd-mm'])[1]";
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
    console.log("Name:", randomName);
  }
  async middleName() {
    let middleName = ["V", "F", "G", "A"];
    let randomMiddleName =
      middleName[Math.floor(Math.random() * middleName.length)];
    await this.page.locator(this.middleNameInput).fill(randomMiddleName);
    console.log("Middle Name:", randomMiddleName);
  }
  async surName() {
    let surname = ["Tarvids", "Cuellar", "Gorbachev", "Aleksejev"];
    let randomSurname = surname[Math.floor(Math.random() * surname.length)];
    await this.page.locator(this.lastName).fill(randomSurname);
    console.log("Surname:", randomSurname);
  }
  async newId() {
    let id = Math.floor(Math.random() * 900) + 100;

    await this.page.locator(this.id).fill(id.toString());
    console.log("ID:", id);
  }
  async newOtherId() {
    let id = ["hop", "12321", "45678", "pikachu", "belka"];
    let randomId = id[Math.floor(Math.random() * id.length)];
    await this.page.locator(this.id).fill(randomId);
    console.log("Other ID:", randomId);
  }
  async newLicenseNumber() {
    let licenseNumber = Math.floor(Math.random() * 90000) + 10000;
    // let randomNumber =
    //   licenseNumber[Math.floor(Math.random() * licenseNumber.length)];
    await this.page.locator(this.licenseNumber).fill(licenseNumber.toString());
    console.log("License Number:", licenseNumber);
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
  async clickDobBtn() {
    const randomYear = Math.floor(Math.random() * (2026 - 1976 + 1)) + 1976;
    const randomMonth = String(Math.floor(Math.random() * 12) + 1).padStart(
      2,
      "0"
    );
    const daysInMonth = new Date(randomYear, randomMonth + 1, 0).getDate(); // проверяем сколько дней в выбраном месяце
    const randomDay = String(
      Math.floor(Math.random() * daysInMonth) + 1
    ).padStart(2, "0");
    const randomBirthDate = `${randomYear}-${randomMonth}-${randomDay}`;
    await this.page.locator(this.inputDob).fill(randomBirthDate);
    console.log("DOB:", randomBirthDate);
  }
  async clickLicenseExpiry() {
    const randomYear = String(
      Math.floor(Math.random() * (2036 - 2026 + 1)) + 2026
    ); // Выбираем рандмоный год от текущего + 10 лет
    const randomMonth = String(Math.floor(Math.random() * 12) + 1).padStart(
      2,
      "0"
    ); // Выбираем рандмоный месяц
    const daysInMonth = new Date(randomYear, randomMonth + 1, 0).getDate(); // проверяем сколько дней в выбраном месяце
    const randomDay = String(
      Math.floor(Math.random() * daysInMonth) + 1
    ).padStart(2, "0"); // Выбираем рандмоный день
    const randomExpiryDate = `${randomYear}-${randomMonth}-${randomDay}`;
    await this.page.locator(this.licenceNum).fill(randomExpiryDate);
    console.log("Expiry Date:", randomExpiryDate);
  }
  async genderBox() {
    // Находим все радиокнопки
    const radios = this.page.locator(this.radioBox);

    // Получаем количество найденных радиокнопок
    const count = await radios.count();

    // Генерируем случайный индекс от 0 до count - 1
    const randomIndex = Math.floor(Math.random() * count);

    // Выбираем случайную радиокнопку
    await radios.nth(randomIndex).check({ force: true });

    // Проверяем, что она выбрана
    await expect(radios.nth(randomIndex)).toBeChecked();
  }
  async saveButton() {
    await this.page.locator(this.saveBtn).click();
  }
  async chooseBloodType() {
    await this.page.locator(this.bloodType).click();
    const bloodGroup = this.page.locator("//div[@role='listbox']//span");
    let count = await bloodGroup.count();
    let randomIndex = Math.floor(Math.random() * count);
    await bloodGroup.nth(randomIndex).click();
  }
  async chooseTestField() {
    let randomTestNumber = Math.floor(Math.random() * 9000) + 1000;
    await this.page.locator(this.testField).fill(randomTestNumber.toString());
  }
  async saveButton1() {
    await this.page.locator(this.saveBtn2).click();
  }
  async addFiles() {
    await this.page.locator(this.addButton).click();
  }
  async attachFiles() {
    await this.page
      .locator(this.inputFile)
      .setInputFiles("C:/Users/lexa5/Desktop/file/1.jpg"); // Добавляем путь до файла
  }
  async addComment() {
    let comments = [
      "Thnak you for your choise",
      "Have a good Day",
      "How are you today?",
      "Lets Do this!!!",
    ];
    let randomComments = comments[Math.floor(Math.random() * comments.length)];
    await this.page.locator(this.comment).fill(randomComments);
  }
  async saveButton2() {
    await this.page.locator(this.saveBtn3).click();
  }
};
