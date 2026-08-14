const { expect } = require("@playwright/test");

exports.DirectoryPage = class DirectoryPage {
  constructor(page) {
    this.page = page;
    this.directoryBtn =
      "//span[@class='oxd-text oxd-text--span oxd-main-menu-item--name'][normalize-space()='Directory']";
    this.jobTitle = "(//div[@class='oxd-select-wrapper'])[1]";
    this.location = "(//div[@class='oxd-select-wrapper'])[2]";
    this.chooseJobTitle =
      "//div[contains(@class, 'oxd-select-option') and .//span[text()='Chief Financial Officer']]";
    this.chooseLocation =
      "//div[contains(@class, 'oxd-select-option') and .//span[text()='New York Sales Office']]";
    this.searchBTn = "//button[normalize-space()='Search']";
    this.lastElement = "//div[@class='oxd-grid-4']/div";
    this.inputName = "input[placeholder='Type for hints...']";
    this.reset = "button[type='reset']";
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
  async scrollMouseDown() {
    await this.page.waitForTimeout(1000); // если ничего не появляетсь поставь задержку
    const elements = await this.page.locator(
      "span[class='oxd-text oxd-text--span']"
    );

    const text = await elements.allTextContents();
    const recordText = text.find((text) => text.includes("Records Found"));

    const number = Number(recordText.match(/\d+/)[0]); //Убираем лишнее. Оставляем цифры
    console.log("Records:", number);

    const records = this.page.locator(this.lastElement);
    let count = await records.count(); // Считаем сколько элементов на странице

    while (count < number) {
      // Сравниваем количество
      await records.nth(count - 1).scrollIntoViewIfNeeded(); // Прокручивает до последнего элемента
      await this.page.waitForTimeout(500);
      count = await records.count();
    }
    await records.nth(count - 1).scrollIntoViewIfNeeded();
    console.log("Reached last record:", count);
  }
  async scrollToFooter() {
    await this.page.waitForTimeout(1000);
    await this.page.getByText("OrangeHRM OS 5.9").scrollIntoViewIfNeeded();
  }
  async dropdownContent() {
    await this.page.locator(this.jobTitle).click();
    // const wrapper = this.page.locator(
    //   "(//div[@class='oxd-select-wrapper'])[1]"
    // );
    // console.log(await wrapper.innerHTML());
    const options = this.page.locator("//div[@class='oxd-select-option']");
    // console.log(await options.allInnerTexts()); // выводим содежимое dropdown
    const count = await options.count();
    // console.log(count); выводим кол-во dropdown
    await expect(count).toBeGreaterThan(0);
  }
  async resetBtn() {
    const random = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetters = random[Math.floor(Math.random() * random.length)];
    await this.page.locator(this.inputName).fill(randomLetters);
    await this.page.locator(this.jobTitle).click();
    await this.page.locator(this.chooseJobTitle).waitFor({ state: "visible" });
    await this.page.locator(this.chooseJobTitle).click();
    await this.page.locator(this.location).click();
    await this.page.locator(this.chooseLocation).waitFor({ state: "visible" });
    await this.page.locator(this.chooseLocation).click();
    await this.page.locator(this.reset).click();
  }
};
