/// <reference types="Cypress" />

// bummer have to wait for images to load
// must be a better way!
const takeSnap = (str) => {
  cy.wait(2500);
  cy.compareSnapshot(str, {
    errorThreshold: 0.3,
  });
};

describe("First", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Logged in", () => {
    const movieTitleSel = "[data-cy=movie-card] > .v-card__subtitle";

    it("launches Recently Rated with 9 movies", () => {
      takeSnap("home");

      cy.dataCy("launch").click();
      cy.get(".headline").should("have.text", "Recently Rated");

      cy.log("Has 8 movie cards");
      cy.dataCy("movie-card", { timeout: 10000 }).should("have.length", 8);

      cy.log("Click on the first one");
      let title;
      cy.get(movieTitleSel)
        .first()
        .then(($div) => {
          title = $div.text();
        });
      takeSnap("recently-rated");

      cy.log("Make sure movie title matches");
      cy.get(movieTitleSel)
        .first()
        .click()
        .get(".headline")
        .should(($div) => {
          expect($div.text()).to.equal(title);
        });
      takeSnap("movie-details");
    });

    it("Can edit a rating", () => {
      cy.dataCy("launch").click();
      cy.get(movieTitleSel).first().click();
      cy.dataCy("rating-btn").click();
      cy.get(".headline").eq(1).should("contain.text", "What did you think");
      takeSnap("rating-dialog");

      cy.get("textarea[name='ratingText'").clear().type("This is my fave");
      cy.dataCy("save-rating").click();
      cy.dataCy("likes-list").should("contain.text", "This is my fave");
    });
  });
});
