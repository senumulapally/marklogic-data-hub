/// <reference types="cypress"/>

import browsePage from "../../support/pages/browse";
import detailPage from "../../support/pages/detail";
import entitiesSidebar from "../../support/pages/entitiesSidebar";
import {BaseEntityTypes} from "../../support/types/base-entity-types";
import {Application} from "../../support/application.config";
import "cypress-wait-until";
// import detailPageNonEntity from "../../support/pages/detail-nonEntity";
import LoginPage from "../../support/pages/login";

describe("json scenario for table on browse documents page", () => {

  let facets: string[] = ["collection", "flow"];

  //login with valid account and go to /browse page
  before(() => {
    cy.visit("/");
    cy.contains(Application.title);
    cy.loginAsDeveloper().withRequest();
    LoginPage.postLogin();
    //Saving Local Storage to preserve session
    cy.saveLocalStorage();
  });
  beforeEach(() => {
    //Restoring Local Storage to Preserve Session
    cy.restoreLocalStorage();
  });
  after(() => {
    cy.resetTestUser();
    cy.waitForAsyncRequest();
  });
  it("select \"all entities\" and verify table default columns", () => {
    cy.visit("/tiles/explore");
    cy.wait(5000);
    browsePage.getTableView().click();
    browsePage.waitForSpinnerToDisappear();
    browsePage.waitForHCTableToLoad();

    entitiesSidebar.getBaseEntityOption("All Entities").should("be.visible");
    browsePage.getTotalDocuments().should("be.greaterThan", 25);
    browsePage.getColumnTitle(2).should("contain", "Identifier");
    browsePage.getColumnTitle(3).should("contain", "Entity Type");
    browsePage.getColumnTitle(4).should("contain", "Record Type");
    browsePage.getColumnTitle(5).should("contain", "Created");

    facets.forEach(function (item) {
      browsePage.getFacet(item).should("exist");
      browsePage.getFacetItems(item).should("exist");
    });
  });

  it("select \"all entities\" and verify table", () => {
    entitiesSidebar.getBaseEntityOption("All Entities").should("be.visible");
    browsePage.getTotalDocuments().should("be.greaterThan", 25);
    //check table rows
    browsePage.getHCTableRows().should("have.length", 20);
    //check table columns
    browsePage.getTableColumns().should("have.length", 5);
  });


  it("select Person entity and verify table", () => {
    entitiesSidebar.openBaseEntityDropdown();
    entitiesSidebar.selectBaseEntityOption("Person");
    browsePage.getHubPropertiesExpanded();
    browsePage.getTotalDocuments().should("be.greaterThan", 5);
    //check table rows. Validates the records were filtered
    browsePage.getHCTableRows().should("have.length.lt", 52);
    //check table columns
    browsePage.getTableColumns().should("to.have.length.of.at.most", 9);
  });


  it("search for a simple text/query and verify content", () => {
    entitiesSidebar.getMainPanelSearchInput().type("Alice");
    entitiesSidebar.getApplyFacetsButton().click();
    browsePage.waitForSpinnerToDisappear();
    browsePage.getTotalDocuments().should("be.equal", 1);
    browsePage.getHCTableRows().should("have.length", 1);
  });

  it("verify instance view of the document without pk", () => {
    entitiesSidebar.openBaseEntityFacets(BaseEntityTypes.PERSON);
    browsePage.getFacetItemCheckbox("fname", "Alice").click();
    browsePage.getGreySelectedFacets("Alice").should("exist");
    browsePage.getFacetApplyButton().click();
    browsePage.getTotalDocuments().should("be.equal", 1);
    browsePage.getTableViewInstanceIcon().click();
    detailPage.getInstanceView().should("exist");
    detailPage.getDocumentEntity().should("contain", "Person");
    detailPage.getDocumentTimestamp().should("exist");
    detailPage.getDocumentSource().should("contain", "PersonSourceName");
    detailPage.getDocumentRecordType().should("contain", "json");
    detailPage.getDocumentTable().should("exist");
    detailPage.getMetadataView().should("exist");
    detailPage.getMetadataView().click();
    detailPage.getDocumentUri().should("contain", "/json/persons/last-name-dob-custom1.json");
    //Verify navigating back from detail view should persist search options
    detailPage.clickBackButton();
    browsePage.waitForSpinnerToDisappear();
    cy.waitForAsyncRequest();
    browsePage.getDatabaseButton("final").should("have.attr", "checked");
    browsePage.getClearFacetSearchSelection("Alice").should("exist");
    browsePage.getSearchBar().should("have.value", "Alice");
    browsePage.getTableView().should("have.css", "color", "rgb(57, 68, 148)");

  });

  it("verify instance view of the document with pk", () => {
    browsePage.getClearAllFacetsButton().click();
    entitiesSidebar.getMainPanelSearchInput().type("10248");
    entitiesSidebar.openBaseEntityDropdown();
    entitiesSidebar.selectBaseEntityOption("All Entities");
    entitiesSidebar.getBaseEntityOption("All Entities").should("be.visible");
    entitiesSidebar.getApplyFacetsButton().click();
    cy.wait(1000);
    browsePage.waitForSpinnerToDisappear();
    browsePage.getTotalDocuments().should("be.equal", 1);
    browsePage.getTableViewInstanceIcon().click();
    detailPage.getInstanceView().should("exist");
    detailPage.getDocumentEntity().should("contain", "Order");
    detailPage.getDocumentID().should("contain", "10248");
    detailPage.getDocumentTimestamp().should("exist");
    detailPage.getDocumentSource().should("contain", "OrdersSourceName");
    detailPage.getDocumentRecordType().should("contain", "json");
    // detailPage.getDocumentTable().should("exist");
  });

  it("verify source view of the document", () => {
    cy.visit("/tiles/explore");
    cy.wait(5000);
    entitiesSidebar.openBaseEntityDropdown();
    entitiesSidebar.selectBaseEntityOption("Customer");
    entitiesSidebar.getBaseEntityOption("Customer").scrollIntoView().should("be.visible");
    browsePage.waitForSpinnerToDisappear();
    browsePage.getFinalDatabaseButton();
    browsePage.getClearAllFacetsButton().click({force: true});
    entitiesSidebar.getMainPanelSearchInput().scrollIntoView().type("Adams Cole");
    entitiesSidebar.getApplyFacetsButton().click();
    browsePage.waitForSpinnerToDisappear();
    entitiesSidebar.openBaseEntityFacets(BaseEntityTypes.CUSTOMER);
    browsePage.getFacetItemCheckbox("email", "adamscole@nutralab.com").click();
    browsePage.getFacetItemCheckbox("email", "coleadams39@nutralab.com").click();
    browsePage.getGreySelectedFacets("adamscole@nutralab.com").should("exist");
    browsePage.getGreySelectedFacets("coleadams39@nutralab.com").should("exist");
    entitiesSidebar.backToMainSidebar();
    browsePage.getHubPropertiesExpanded();
    browsePage.getFacetItemCheckbox("collection", "mapCustomersJSON").click({force: true});
    browsePage.getGreySelectedFacets("mapCustomersJSON").should("exist");
    browsePage.getFacetApplyButton().click();
    browsePage.getTableView().click();
    browsePage.getTotalDocuments().should("be.equal", 2);

    //Refresh the browser page at Browse table view.
    cy.reload();
    cy.waitForAsyncRequest();

    //Verify if the facet, search text and view persists.
    browsePage.getClearFacetSearchSelection("mapCustomersJSON").should("exist");
    browsePage.getAppliedFacets("adamscole@nutralab.com").should("exist");
    browsePage.getAppliedFacets("coleadams39@nutralab.com").should("exist");
    browsePage.getAppliedFacetName("adamscole@nutralab.com").should("be.equal", "email: adamscole@nutralab.com");
    browsePage.getAppliedFacetName("coleadams39@nutralab.com").should("be.equal", "email: coleadams39@nutralab.com");
    browsePage.getSearchBar().should("have.value", "Adams Cole");
    browsePage.getTableView().should("have.css", "color", "rgb(57, 68, 148)");

    //Navigating to detail view
    cy.waitForAsyncRequest();
    cy.waitUntil(() => browsePage.getTableViewSourceIcon()).click();
    cy.waitForAsyncRequest();
    browsePage.waitForSpinnerToDisappear();
    detailPage.getDocumentJSON().should("exist");
    detailPage.getDocumentEntity().should("contain", "Customer");
    detailPage.getDocumentTimestamp().should("exist");
    detailPage.getDocumentSource().should("contain", "CustomerSourceName");
    detailPage.getDocumentRecordType().should("contain", "json");

    //Refresh the browser page at Detail view.
    cy.reload();
    cy.waitForAsyncRequest();
    browsePage.waitForSpinnerToDisappear();
    //Verify if the detail view is intact after page refresh
    detailPage.getDocumentEntity().should("contain", "Customer");
    detailPage.getDocumentTimestamp().should("exist");
    detailPage.getDocumentSource().should("contain", "CustomerSourceName");
    detailPage.getDocumentRecordType().should("contain", "json");

    detailPage.clickBackButton(); //Click on Back button to navigate back to the browse table view.

    cy.waitForAsyncRequest();
    browsePage.waitForSpinnerToDisappear();
    //Verify navigating back from detail view should persist search options
    entitiesSidebar.getBaseEntityOption("Customer").should("be.visible");
    browsePage.getDatabaseButton("final").should("have.attr", "checked");
    browsePage.getClearFacetSearchSelection("mapCustomersJSON").should("exist");
    browsePage.getSearchBar().should("have.value", "Adams Cole");
    browsePage.getTableView().should("have.css", "color", "rgb(57, 68, 148)");
  });

  it.skip("search for multiple facets, switch to snippet view, delete a facet, switch to table view, verify search query", () => {
    entitiesSidebar.openBaseEntityDropdown();
    entitiesSidebar.selectBaseEntityOption("Customer");
    entitiesSidebar.getBaseEntityOption("Customer").should("be.visible");
    browsePage.waitForSpinnerToDisappear();

    //TODO: re-test facet search without using ml-tooltip-container
    //verify the popover doesn't display for the short facet name.
    // browsePage.getFacetName("Adams Cole").trigger("mouseover");
    // cy.wait(1000);
    // browsePage.getTooltip("Adams Cole").should("not.exist");
    // browsePage.getFacetItemCheckbox("name", "Adams Cole").click();
    // //verify the popover displays for the long facet name.
    // browsePage.getFacetName("adamscole@nutralab.com").trigger("mouseover");
    // cy.wait(1000);
    // browsePage.getTooltip("adamscole\\@nutralab\\.com").should("be.exist");

    browsePage.getFacetItemCheckbox("email", "adamscole@nutralab.com").click();
    browsePage.getSelectedFacets().should("exist");
    // TODO DHFPROD-7711 skip since fails for Ant Design components
    // browsePage.getGreySelectedFacets("Adams Cole").should("exist");
    browsePage.getFacetApplyButton().click();
    browsePage.clickFacetView();
    // TODO DHFPROD-7711 skip since fails for Ant Design components
    // browsePage.getClearFacetSearchSelection("Adams Cole").should("contain", "name: Adams Cole");
    // browsePage.getClearFacetSearchSelection("adamscole@nutralab.com").should("exist");
    browsePage.getTotalDocuments().should("be.equal", 1);
    // TODO DHFPROD-7711 skip since fails for Ant Design components
    // browsePage.clickClearFacetSearchSelection("adamscole@nutralab.com");
    browsePage.clickTableView();
    browsePage.getClearAllFacetsButton().click({force: true});
    // TODO DHFPROD-7711 skip since fails for Ant Design components
    // browsePage.getClearFacetSearchSelection("Adams Cole").should("exist");
    // browsePage.getTotalDocuments().should("be.equal", 2);
  });

  it("verify hub properties grey facets are not being removed when entity properties are selected", () => {
    entitiesSidebar.openBaseEntityDropdown();
    entitiesSidebar.selectBaseEntityOption("Customer");
    entitiesSidebar.getBaseEntityOption("Customer").should("be.visible");
    browsePage.waitForSpinnerToDisappear();
    entitiesSidebar.openBaseEntityFacets(BaseEntityTypes.CUSTOMER);
    browsePage.getFacetItemCheckbox("name", "Adams Cole").click();
    browsePage.getGreySelectedFacets("Adams Cole").should("exist");
    browsePage.getFacetApplyButton().click();
    entitiesSidebar.backToMainSidebar();
    cy.wait(1000);
    browsePage.getFacetItemCheckbox("flow", "CurateCustomerJSON").click({force: true});
    browsePage.getFacetItemCheckbox("flow", "CurateCustomerJSON").should("exist");
    browsePage.getFacetItemCheckbox("flow", "CurateCustomerJSON").should("be.checked");

    browsePage.getFacetItemCheckbox("source-name", "CustomerSourceName").click();
    browsePage.getFacetItemCheckbox("source-name", "CustomerSourceName").should("exist");
    browsePage.getFacetItemCheckbox("source-name", "CustomerSourceName").should("be.checked");

    browsePage.getFacetItemCheckbox("source-type", "CustomerSourceType").click();
    browsePage.getFacetItemCheckbox("source-type", "CustomerSourceType").should("exist");
    browsePage.getFacetItemCheckbox("source-type", "CustomerSourceType").should("be.checked");

    browsePage.getGreySelectedFacets("CurateCustomerJSON").should("exist");
    browsePage.getGreySelectedFacets("CustomerSourceName").should("exist");
    browsePage.getGreySelectedFacets("CustomerSourceType").should("exist");

    browsePage.clickClearFacetSearchSelection("Adams Cole");
    browsePage.getGreySelectedFacets("Adams Cole").should("not.exist");
    entitiesSidebar.openBaseEntityFacets(BaseEntityTypes.CUSTOMER);
    browsePage.getFacetItemCheckbox("name", "Adams Cole").click();
    browsePage.getGreySelectedFacets("CurateCustomerJSON").should("exist");
    browsePage.getGreySelectedFacets("CustomerSourceName").should("exist");
    browsePage.getGreySelectedFacets("CustomerSourceType").should("exist");
    browsePage.getGreySelectedFacets("Adams Cole").should("exist");
    browsePage.getFacetApplyButton().click();
    browsePage.getSelectedFacet("CurateCustomerJSON").should("exist");
    browsePage.getSelectedFacet("Adams Cole").should("exist");
    entitiesSidebar.backToMainSidebar();
    cy.wait(5000);
    browsePage.waitForSpinnerToDisappear();
    // });

    // it("apply multiple facets, select and discard new facet, verify original facets checked", () => {
    cy.log("*apply multiple facets, select and discard new facet, verify original facets checked*");
    browsePage.getClearAllFacetsButton().click();
    cy.wait(3000);
    entitiesSidebar.toggleEntitiesView();
    entitiesSidebar.openBaseEntityFacets(BaseEntityTypes.CUSTOMER);
    browsePage.getShowMoreLink("name").click();
    browsePage.getFacetItemCheckbox("name", "Jacqueline Knowles").click();
    browsePage.getFacetItemCheckbox("name", "Lola Dunn").click();
    browsePage.getGreySelectedFacets("Jacqueline Knowles").should("exist");
    browsePage.getGreySelectedFacets("Lola Dunn").should("exist");
    browsePage.getFacetApplyButton().click();
    browsePage.getFacetItemCheckbox("name", "Jacqueline Knowles").should("be.checked");
    browsePage.getFacetItemCheckbox("name", "Lola Dunn").should("be.checked");
    browsePage.getFacetItemCheckbox("email", "jacquelineknowles@nutralab.com").click();
    browsePage.getGreySelectedFacets("jacquelineknowles@nutralab.com").should("exist");
    browsePage.getClearGreyFacets().click();
    browsePage.getFacetItemCheckbox("name", "Jacqueline Knowles").should("be.checked");
    browsePage.getFacetItemCheckbox("name", "Lola Dunn").should("be.checked");
    browsePage.getFacetItemCheckbox("email", "jacquelineknowles@nutralab.com").should("not.be.checked");
  });

  it("apply multiple facets, deselect them, apply changes, apply multiple, clear them, verify no facets checked", () => {
    entitiesSidebar.backToMainSidebar();
    entitiesSidebar.openBaseEntityDropdown();
    entitiesSidebar.selectBaseEntityOption("Customer");
    entitiesSidebar.getBaseEntityOption("Customer").should("be.visible");
    browsePage.getClearAllFacetsButton().click();
    browsePage.waitForSpinnerToDisappear();
    entitiesSidebar.openBaseEntityFacets(BaseEntityTypes.CUSTOMER);
    browsePage.getShowMoreLink("name").click();
    browsePage.getFacetItemCheckbox("name", "Adams Cole").click();
    browsePage.getGreySelectedFacets("Adams Cole").should("exist");
    browsePage.getFacetItemCheckbox("name", "Adams Cole").should("be.checked");
    browsePage.getFacetApplyButton().click();
    browsePage.selectDateRange();
    browsePage.getSelectedFacet("birthDate:").should("exist");
    browsePage.getFacetItemCheckbox("email", "adamscole@nutralab.com").click();
    browsePage.getGreySelectedFacets("adamscole@nutralab.com").should("exist");
    browsePage.getFacetApplyButton().click();
    browsePage.clickClearFacetSearchSelection("birthDate");
    browsePage.getFacetItemCheckbox("email", "adamscole@nutralab.com").should("be.checked");
    browsePage.getFacetItemCheckbox("name", "Adams Cole").click();
    browsePage.getFacetItemCheckbox("email", "adamscole@nutralab.com").click();
    browsePage.getFacetItemCheckbox("name", "Adams Cole").should("not.be.checked");
    browsePage.getFacetItemCheckbox("email", "adamscole@nutralab.com").should("not.be.checked");
    browsePage.getGreySelectedFacets("Adams Cole").should("not.exist");
    browsePage.getGreySelectedFacets("adamscole@nutralab.com").should("not.exist");
    cy.waitForAsyncRequest();
    browsePage.getFacetItemCheckbox("name", "Adams Cole").click();
    browsePage.getFacetItemCheckbox("email", "adamscole@nutralab.com").click();
    browsePage.getFacetApplyButton().click();
    browsePage.clickClearFacetSearchSelection("Adams Cole");
    browsePage.clickClearFacetSearchSelection("adamscole@nutralab.com");
    browsePage.getFacetItemCheckbox("name", "Adams Cole").should("not.be.checked");
    browsePage.getFacetItemCheckbox("email", "adamscole@nutralab.com").should("not.be.checked");
    browsePage.getGreySelectedFacets("Adams Cole").should("not.exist");
    browsePage.getGreySelectedFacets("adamscole@nutralab.com").should("not.exist");
  });


  it("Verify facets can be selected, applied and cleared using clear text", () => {
    entitiesSidebar.backToMainSidebar();
    entitiesSidebar.openBaseEntityDropdown();
    entitiesSidebar.selectBaseEntityOption("Person");
    entitiesSidebar.getBaseEntityOption("Person").should("be.visible");
    browsePage.waitForSpinnerToDisappear();
    entitiesSidebar.openBaseEntityFacets(BaseEntityTypes.PERSON);
    browsePage.getShowMoreLink("fname").click();
    browsePage.getFacetItemCheckbox("fname", "Gary").click();
    browsePage.getGreySelectedFacets("Gary").should("exist");
    browsePage.getFacetApplyButton().click();
    browsePage.getFacetItemCheckbox("fname", "Gary").should("be.checked");
    browsePage.getFacetSearchSelectionCount("fname").should("contain", "1");
    browsePage.getClearFacetSelection("fname").click();
    browsePage.waitForSpinnerToDisappear();
    browsePage.getFacetItemCheckbox("fname", "Gary").should("not.be.checked");
    browsePage.getGreySelectedFacets("Gary").should("not.exist");
  });

  it("Apply facets, unchecking them should not recheck original facets", () => {
    entitiesSidebar.backToMainSidebar();
    entitiesSidebar.openBaseEntityDropdown();
    entitiesSidebar.selectBaseEntityOption("Customer");
    entitiesSidebar.getBaseEntityOption("Customer").should("be.visible");
    browsePage.waitForSpinnerToDisappear();
    entitiesSidebar.openBaseEntityFacets(BaseEntityTypes.CUSTOMER);
    browsePage.getShowMoreLink("name").click();
    browsePage.getFacetItemCheckbox("name", "Mcgee Burch").click();
    browsePage.getFacetItemCheckbox("name", "Powers Bauer").click();
    browsePage.getGreySelectedFacets("Mcgee Burch").should("exist");
    browsePage.getGreySelectedFacets("Powers Bauer").should("exist");
    browsePage.getFacetApplyButton().click();
    browsePage.getFacetItemCheckbox("name", "Mcgee Burch").should("be.checked");
    browsePage.getFacetItemCheckbox("name", "Powers Bauer").should("be.checked");
    browsePage.getFacetItemCheckbox("email", "mcgeeburch@nutralab.com").click();
    browsePage.getFacetItemCheckbox("name", "Mcgee Burch").click();
    browsePage.waitForSpinnerToDisappear();
    browsePage.getFacetItemCheckbox("name", "Powers Bauer").click();
    browsePage.getShowMoreLink("email").click();
    browsePage.getFacetItemCheckbox("email", "mcgeeburch@nutralab.com").click();
    browsePage.getFacetItemCheckbox("name", "Mcgee Burch").should("not.be.checked");
    browsePage.getFacetItemCheckbox("name", "Powers Bauer").should("not.be.checked");
    browsePage.getFacetItemCheckbox("email", "mcgeeburch@nutralab.com").should("not.be.checked");
  });
});
