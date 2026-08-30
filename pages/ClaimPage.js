const { expect } = require("@playwright/test");

exports.ClaimPage = class ClaimPage {
  constructor(page) {
    this.page = page;
    this.claimBtn =
      "//span[@class='oxd-text oxd-text--span oxd-main-menu-item--name'][normalize-space()='Claim']";
  }
  async clickClaimBtn() {
    await this.page.locator(this.claimBtn).click();
  }
  async checkAmountValue() {
    // Не забывай про задержки
    await this.page.waitForSelector("(//div[@class='oxd-table-card'])//div[8]");
    const values = await this.page
      .locator("(//div[@class='oxd-table-card'])//div[8]")
      .allTextContents();
    for (const text of values) {
      const value = text.trim();

      console.log("VALUE:", value);

      expect(value).toMatch(/^\d{1,3}(,\d{3})*\.\d{2}$/); // регулярка для цифр 7,300.32
    }
  }
  async checkViewBtn() {
    // Не забывай про задержки
    const viewBtn = await this.page.locator(
      "(//button[@type='button'][normalize-space()='View Details'])"
    );
    const count = await viewBtn.count();
    console.log(count);

    for (let i = 0; i < count; i++) {
      await expect(viewBtn.nth(i)).toHaveAttribute("type", "button");
    }
  }
};
