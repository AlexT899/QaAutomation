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
    this.lastElement = "//div[@class='oxd-grid-4']/div";
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
};
