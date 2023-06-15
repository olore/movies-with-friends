/// <reference types="Cypress" />

function terminalLog(violations) {
  cy.task(
    "log",
    `${violations.length} accessibility violation${
      violations.length === 1 ? "" : "s"
    } ${violations.length === 1 ? "was" : "were"} detected`
  );
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    })
  );

  cy.task("table", violationData);
}

describe("Accessibility", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.injectAxe();
  });

  describe("a11y in", () => {
    it("Home page has no detectable a11y violations", () => {
      cy.checkA11y(null, null, terminalLog);
    });

    it("Recently Rated screen has no detectable a11y violations", () => {
      cy.dataCy("launch").click();
      cy.get(".headline").should("have.text", "Recently Rated");
      cy.dataCy("movie-card", { timeout: 10000 }).should("have.length", 8);
      cy.checkA11y(null, null, terminalLog);
    });
  });
});
