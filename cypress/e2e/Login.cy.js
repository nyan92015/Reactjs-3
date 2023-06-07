describe("Form Validation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("email error", () => {
    cy.get('input[name="email"]').type("invalid-email@aaa");
    cy.get('input[name="password"]').type("validPassword");
    cy.get('button[type="submit"]').click();

    //エラーメッセージが表示されることを確認
    cy.contains("無効なEメールアドレスです。");
  });

  it("password error", () => {
    cy.get('input[name="email"]').type("valid-email@example.com");
    cy.get('input[name="password"]').type("1234567");
    cy.get('button[type="submit"]').click();

    // エラーメッセージが表示されることを確認
    cy.contains("無効なパスワードです。");
  });

  it("success", () => {
    cy.get('input[name="email"]').type("valid-email@example.com");
    cy.get('input[name="password"]').type("validPassword");
    cy.get('button[type="submit"]').click();

    // エラーメッセージが表示されないことを確認
    cy.contains(".error").should("not.exist");
  });
});
