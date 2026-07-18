const { expect } = require("@playwright/test");

exports.HomePage = class HomePage {
  constructor(page) {
    this.page = page;
    this.launchBlock =
      "//div[@class='oxd-grid-item oxd-grid-item--gutters orangehrm-quick-launch-card']";
    this.postBlock =
      "//div[@class='oxd-grid-item oxd-grid-item--gutters orangehrm-buzz-widget-card']";
    this.actions = "div[class='orangehrm-todo-list-item']";
    this.buzzPost =
      "//div[@class='oxd-grid-item oxd-grid-item--gutters orangehrm-buzz-widget-card']";
    this.search = "input[placeholder='Search']";
    this.searchResult = `//a[@class="oxd-main-menu-item"]`;
    this.check = `(//span[@class="oxd-checkbox-input oxd-checkbox-input--active --label-right oxd-checkbox-input"])[position()>=0]`;
    this.adminBtn = "//aside[@class='oxd-sidepanel']//li[1]";
    // this.char = "";
    // this.value = "";
  }
  // async searchWord() {
  //   const searchBar = await this.page.locator(this.search);

  //   const alphabet = "abcdefghijklmnopqrstuvwxyz";
  //   for (let i = 0; i < alphabet.length; i++) {
  //     this.char = alphabet[i];
  //     await searchBar.fill(alphabet[i]);
  //     const searchResults = await this.page.locator(this.searchResult);
  //     const searchResultsCount = await searchResults.count();
  //     await this.page.waitForTimeout(100);
  //     for (let j = 0; j < searchResultsCount; j++) {
  //       this.value = await searchResults.nth(j).textContent();
  //       // await expect(this.value.toLowerCase()).toContain(this.char);
  //       // console.log(this.value);
  //     }
  //   }
  // }
  async checkBoxClick() {
    await this.page.locator(this.adminBtn).click();
    await this.page.waitForTimeout(2000);
    const checkBox = await this.page.locator(this.check);
    let clickCount = await checkBox.count();
    console.log(clickCount);
    for (let i = 0; i < clickCount; i++) {
      let box = checkBox.nth(i);
      let visible = await box.isVisible();
      console.log(i, visible);
      if (visible) {
        await box.click();
      }

      await this.page.waitForTimeout(500);
    }
    await this.page.waitForTimeout(2000);
  }
  async searchWord() {
    const searchBar = this.page.locator(this.search);
    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    const results = [];

    for (const char of alphabet) {
      await searchBar.fill(char);
      await this.page.waitForTimeout(200);

      const searchResults = this.page.locator(this.searchResult);
      const resultsCount = await searchResults.count();

      for (let i = 0; i < resultsCount; i++) {
        const text = (await searchResults.nth(i).textContent()) ?? "";

        results.push({
          char,
          text,
        });
      }
    }

    return results;
  }
  async buzz() {
    await this.page.waitForSelector(this.buzzPost);
    const buzzQty = await this.page.locator(this.buzzPost);
    return buzzQty.count();
  }
  async launchBlockLength() {
    const launchQty = await this.page.locator(this.launchBlock);
    return launchQty.count();
  }
  async postLength() {
    const postQty = await this.page.locator(this.postBlock);
    return postQty.count();
  }
  async actionsQty() {
    const actionQty = await this.page.locator(this.actions);
    return actionQty.count();
  }
  async actionsTxt() {
    const actionText = await this.page.locator(this.actions);
    let actionsTxtCounts = await actionText.count();
    let actionsArr = [];
    await this.page.waitForTimeout(1000);
    for (let i = 0; i < actionsTxtCounts; i++) {
      let value = await actionText.nth(i).textContent(); // nth ЭТО ИНДЕКС
      actionsArr.push(value);
      // console.log(value);
      // return value; // для считывания значения
    }
    return actionsArr;
  }
  // async actionsTxt() {
  //   const actionText = this.page.locator(this.actions);

  //   await actionText.first().waitFor();

  //   const actionsTxtCounts = await actionText.count();
  //   let actionsArr = [];

  //   for (let i = 0; i < actionsTxtCounts; i++) {
  //     const value = await actionText.nth(i).textContent();
  //     actionsArr.push(value?.trim());
  //   }

  //   return actionsArr;
  // }
  // async actionsTxt() {
  //   const actionText = this.page.locator(this.actions);

  //   await actionText.first().waitFor();

  //   return await actionText.allTextContents();
  // }
};
