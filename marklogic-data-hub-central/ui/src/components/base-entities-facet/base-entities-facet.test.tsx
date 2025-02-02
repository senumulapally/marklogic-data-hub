import React from "react";
import {render, cleanup, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BaseEntitiesFacet from "./base-entities-facet";

describe("Base Entities Facet", () => {

  const entities = [
    {name: "Person", color: "#CEE0ED", icon: "faUser", relatedEntities: []}
  ];

  afterEach(cleanup);

  test("Render base entities", () => {

    const {getByLabelText} = render(
      <BaseEntitiesFacet
        currentBaseEntities={[]}
        setCurrentBaseEntities={jest.fn()}
        setActiveAccordionRelatedEntities={jest.fn()}
        activeKey={["baseEntities"]}
        setEntitySpecificPanel={jest.fn()}
        allBaseEntities={entities}/>
    );
    const dropdown = getByLabelText("base-entities-dropdown-list");
    expect(dropdown).toBeInTheDocument();
  });

  test("Render base entities dropdown options", () => {
    const {getByLabelText} = render(
      <BaseEntitiesFacet
        currentBaseEntities={entities}
        setCurrentBaseEntities={jest.fn()}
        setActiveAccordionRelatedEntities={jest.fn()}
        activeKey={["baseEntities"]}
        setEntitySpecificPanel={jest.fn()}
        allBaseEntities={entities}/>
    );
    const dropdown = getByLabelText("base-entities-dropdown-list");
    fireEvent.keyDown(dropdown, {key: "ArrowDown"});
    expect(getByLabelText("base-option-All Entities")).toBeInTheDocument();
  });

});
