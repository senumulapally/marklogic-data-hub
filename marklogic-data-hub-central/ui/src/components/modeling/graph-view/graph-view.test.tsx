import React from "react";
import {render, screen, wait, cleanup} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GraphView from "./graph-view";
import {ModelingContext} from "../../../util/modeling-context";
import {ModelingTooltips} from "../../../config/tooltips.config";
import {getEntityTypes, hubCentralConfig} from "../../../assets/mock-data/modeling/modeling";
import {isModified} from "../../../assets/mock-data/modeling/modeling-context-mock";
import "jest-canvas-mock";

jest.mock("../../../api/modeling");
jest.mock("../../../api/environment");

describe("Graph View Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  const withEntityAs = (entityName) => {
    let entityTypeNamesArrayUpdated = [...isModified.modelingOptions.entityTypeNamesArray,
      {
        name: entityName,
        entityTypeId: `http://marklogic.com/example/${entityName}-0.0.1/${entityName}`
      }
    ];
    let isModifiedUpdated = {...isModified, modelingOptions: {...isModified.modelingOptions, selectedEntity: entityName, entityTypeNamesArray: entityTypeNamesArrayUpdated}};
    return (<ModelingContext.Provider value={isModifiedUpdated}>
      <GraphView
        entityTypes={getEntityTypes}
        canReadEntityModel={true}
        canWriteEntityModel={true}
        deleteEntityType={jest.fn()}
        relationshipModalVisible={false}
        toggleRelationshipModal={jest.fn()}
        updateSavedEntity={jest.fn()}
        setEntityTypesFromServer={jest.fn()}
        hubCentralConfig={hubCentralConfig}
        updateHubCentralConfig={jest.fn()}
      />
    </ModelingContext.Provider>
    );
  };

  test("can view and close side panel for a selected entity within graph view", async () => {

    const mockDeleteEntity = jest.fn();

    const {getByTestId, getByLabelText, queryByLabelText, rerender} =  render(
      <ModelingContext.Provider value={isModified}>
        <GraphView
          entityTypes={getEntityTypes}
          canReadEntityModel={true}
          canWriteEntityModel={true}
          deleteEntityType={mockDeleteEntity}
          relationshipModalVisible={false}
          toggleRelationshipModal={jest.fn()}
          updateSavedEntity={jest.fn()}
          setEntityTypesFromServer={jest.fn()}
          hubCentralConfig={hubCentralConfig}
          updateHubCentralConfig={jest.fn()}
        />
      </ModelingContext.Provider>
    );

    expect(queryByLabelText("Product-selectedEntity")).not.toBeInTheDocument();

    rerender(withEntityAs("Product"));
    await wait(() => expect(getByLabelText("Product-selectedEntity")).toBeInTheDocument());

    //Verify side panel content

    userEvent.hover(getByTestId("Product-delete"));
    await wait(() => expect(screen.getByText(ModelingTooltips.deleteIcon)).toBeInTheDocument());

    expect(getByLabelText("closeGraphViewSidePanel")).toBeInTheDocument();
    expect(getByLabelText("propertiesTabInSidePanel")).toBeInTheDocument();
    expect(getByLabelText("entityTypeTabInSidePanel")).toBeInTheDocument();

    //Closing side panel
    userEvent.click(getByLabelText("closeGraphViewSidePanel"));
  });

  test("can view, check properties as empty description and close side panel for selected entities within graph view", async () => {

    const mockDeleteEntity = jest.fn();

    const {getByTestId, getByLabelText, queryByLabelText, rerender, queryByPlaceholderText} =  render(
      <ModelingContext.Provider value={isModified}>
        <GraphView
          entityTypes={getEntityTypes}
          canReadEntityModel={true}
          canWriteEntityModel={true}
          deleteEntityType={mockDeleteEntity}
          relationshipModalVisible={false}
          toggleRelationshipModal={jest.fn()}
          updateSavedEntity={jest.fn()}
          setEntityTypesFromServer={jest.fn()}
          hubCentralConfig={hubCentralConfig}
          updateHubCentralConfig={jest.fn()}
        />
      </ModelingContext.Provider>
    );

    expect(queryByLabelText("Product-selectedEntity")).not.toBeInTheDocument();

    rerender(withEntityAs("Product"));
    await wait(() => expect(getByLabelText("Product-selectedEntity")).toBeInTheDocument());

    //Verify side panel content
    await (() => expect(getByTestId("description")).toHaveValue("ajx"));

    //Render new entity and verify side panel content
    expect(queryByLabelText("Order-selectedEntity")).not.toBeInTheDocument();
    rerender(withEntityAs("Order"));
    await wait(() => expect(getByLabelText("Order-selectedEntity")).toBeInTheDocument());
    expect(queryByPlaceholderText("Enter description"));

    userEvent.hover(getByTestId("Order-delete"));
    await wait(() => expect(screen.getByText(ModelingTooltips.deleteIcon)).toBeInTheDocument());

    expect(getByLabelText("closeGraphViewSidePanel")).toBeInTheDocument();
    expect(getByLabelText("propertiesTabInSidePanel")).toBeInTheDocument();
    expect(getByLabelText("entityTypeTabInSidePanel")).toBeInTheDocument();

    //Closing side panel
    userEvent.click(getByLabelText("closeGraphViewSidePanel"));
  });

  test("Publish button should be disabled when user don't have permission to write entity model", async () => {

    const mockDeleteEntity = jest.fn();

    const {getByLabelText} =  render(
      <ModelingContext.Provider value={isModified}>
        <GraphView
          entityTypes={getEntityTypes}
          canReadEntityModel={true}
          canWriteEntityModel={false}
          deleteEntityType={mockDeleteEntity}
          relationshipModalVisible={false}
          toggleRelationshipModal={jest.fn()}
          updateSavedEntity={jest.fn()}
          setEntityTypesFromServer={jest.fn()}
          hubCentralConfig={hubCentralConfig}
          updateHubCentralConfig={jest.fn()}
        />
      </ModelingContext.Provider>
    );

    expect(getByLabelText("publish-to-database")).toBeDisabled();
  });
});