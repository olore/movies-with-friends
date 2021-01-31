describe("First", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Logged in", () => {
    it("launches Recently Rated", () => {
      cy.dataCy("launch").click();
      cy.get(".headline").should("have.text", "Recently Rated");
    });
  });
});
