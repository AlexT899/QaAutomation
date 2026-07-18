// Использовано 84 % доступного пространства. … Когда свободное место закончится, вы не сможете создавать, редактировать и загружать файлы.
exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = '//input[@name="username"]';
    this.passwordInput = '//input[@name="password"]';
    this.loginButton = "button";
    this.dropdownBtn = ".oxd-icon.bi-caret-down-fill.oxd-userdropdown-icon";
    this.logoutBtn = "//a[normalize-space()='Logout']";
    this.launchBlock =
      "//div[@class='oxd-grid-item oxd-grid-item--gutters orangehrm-quick-launch-card']";
  }

  async gotoLoginPage() {
    await this.page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
  }
  async login(username, password) {
    await this.page.locator(this.usernameInput).fill(username);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.loginButton).click();
  }
  async checkLogin() {
    await this.page.locator(this.dropdownBtn).click();
    return await this.page.locator(this.logoutBtn);
  }
};

/*
exports.LoginPage = class LoginPage {
Эта строка кода определяет класс LoginPage и делает его доступным для других модулей через exports. Это означает, что класс LoginPage можно будет импортировать и использовать в других файлах проекта.

constructor(page)
Конструктор — это специальный метод класса, который вызывается при создании нового объекта этого класса. В данном случае, конструктор принимает один аргумент page, который, представляет собой объект страницы в Playwright. Этот объект страницы используется для управления и взаимодействия с веб-страницей в тестах.

this.page = page;
Внутри конструктора происходит инициализация свойства this.page. Ключевое слово this в контексте класса ссылается на текущий экземпляр объекта класса. Используя this.page = page;, мы сохраняем переданный в конструктор объект page в свойство page текущего объекта LoginPage. Это позволяет использовать переданную страницу (page) в других методах класса LoginPage.
*/
