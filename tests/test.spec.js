const { test, expect } = require("@playwright/test");
import { LoginPage } from "../pages/LoginPage.js";
import { HomePage } from "../pages/HomePage.js";
import { AdminPage } from "../pages/AdminPage.js";
import { PimPage } from "../pages/PimPage.js";
import { DirectoryPage } from "../pages/DirectoryPage.js";
import { MaintenancePage } from "../pages/MaintenancePage.js";
test("Login", async ({ page }) => {
  //Login
  const login = new LoginPage(page);
  await login.gotoLoginPage();
  await login.login("Admin", "admin123");
  await page.waitForTimeout(2000);
});
test.beforeEach("Check Login", async ({ context, page }) => {
  //Login
  const login = new LoginPage(page);
  await context.clearCookies();
  await login.gotoLoginPage();
  await login.login("Admin", "admin123");
  await page.waitForTimeout(2000);
  // await page.pause();
  // const checkLoginLocator = await login.checkLogin();
  // // await expect(checkLoginLocator).toBeVisible();
  // await page.waitForTimeout(2000);
});
test("Check Length", async ({ page }) => {
  //Login
  const checkLength = new HomePage(page);
  await checkLength.launchBlockLength().length;
  console.log(await checkLength.launchBlockLength());
  await expect(await checkLength.launchBlockLength()).toBe(6);
  await page.waitForTimeout(2000);
});
test("Check Posts ", async ({ page }) => {
  //Login
  const checkLength = new HomePage(page);
  console.log(await checkLength.postLength());
  await expect(await checkLength.postLength()).toBeGreaterThan(0);
  await page.waitForTimeout(2000);
});
test("Check Actions ", async ({ page }) => {
  const homePage = new HomePage(page);
  const qty = await homePage.actionsQty();
  console.log(qty);
  await expect(qty).toBeGreaterThanOrEqual(0);
  await page.waitForTimeout(2000);

  const actions = await homePage.actionsTxt();
  console.log(actions);
  expect(actions.length).toBeGreaterThan(0);

  for (let i = 0; i < actions.length; i++) {
    console.log(actions[i]);
    expect(actions[i].length).toBeGreaterThan(0);
  }
  await page.waitForTimeout(2000);
});
test("Check Buzz Post Qty", async ({ page }) => {
  const checkBuzzLength = new HomePage(page);
  await checkBuzzLength.buzz().length;
  console.log(await checkBuzzLength.buzz());
  await expect(await checkBuzzLength.buzz()).toBeGreaterThanOrEqual(0);
  await page.waitForTimeout(2000);
});
test("Search", async ({ page }) => {
  const search = new HomePage(page);
  await search.searchWord();
  console.log(await search.value);
  await expect(search.value.toLowerCase()).toContain(search.char);
  await page.waitForTimeout(2000);
});
test("Search1", async ({ page }) => {
  const search = new HomePage(page);

  const results = await search.searchWord();
  console.log(results);
  for (const result of results) {
    expect(result.text.toLowerCase()).toContain(result.char);
  }
});
test("Click checkbox", async ({ page }) => {
  const click = new HomePage(page);
  await click.checkBoxClick();
  await page.waitForTimeout(5000);
});
test("Check username exist", async ({ page }) => {
  const ap = new AdminPage(page);
  await ap.clickAdminBtn();
  await ap.checkSearchUsername();
  await expect(
    ap.checkSearchUsername.username1 == ap.checkSearchUsername.username2
  ).toBeTruthy();
  await page.waitForTimeout(5000);
});
test("Update form", async ({ page }) => {
  const pim = new PimPage(page);
  await pim.clickPimBtn();
  await page.waitForTimeout(2000);
  await pim.clickUserList();
  await page.waitForTimeout(1000);
  await pim.randomName();
  await pim.middleName();
  await pim.surName();
  await pim.newId();
  await pim.newOtherId();
  await pim.newLicenseNumber();
  await pim.clickLicenseExpiry();
  await pim.nationality();
  await pim.maritalStatus();
  await pim.clickDobBtn();
  await pim.genderBox();
  await pim.saveButton();
  await pim.chooseBloodType();
  await pim.chooseTestField();
  await pim.saveButton1();
  await pim.addFiles();
  await pim.attachFiles();
  await pim.addComment();
  await pim.saveButton2();
  await page.waitForTimeout(10000);
});
test("Check user", async ({ page }) => {
  const directory = new DirectoryPage(page);
  await directory.clickDirectoryBtn();
  await directory.workTitle();
  await directory.chooseWorkTitle();
  await directory.clickSearchBTn();
  let checkJob = await page
    .locator(
      "//div[@class='oxd-grid-item oxd-grid-item--gutters']//p[text()='Chief Financial Officer']"
    )
    .textContent();
  await expect(
    await page.locator(
      "//div[@class='oxd-grid-item oxd-grid-item--gutters']//p[text()='Chief Financial Officer']"
    )
  ).toContainText("Chief Financial Officer");
  console.log(checkJob);
  await page.waitForTimeout(3000);
});
test("Check quantity of users", async ({ page }) => {
  const directory = new DirectoryPage(page);
  await directory.clickDirectoryBtn();
  await directory.scrollToFooter();
  await directory.scrollMouseDown();
  await page.waitForTimeout(3000);
});
test.only("Maintenance", async ({ page }) => {
  const maintenance = new MaintenancePage(page);
  await maintenance.clickBtn();
  await maintenance.enterPassword();
  await maintenance.clickAccess();
  await maintenance.fillInput();
  await page.waitForTimeout(3000);
});
