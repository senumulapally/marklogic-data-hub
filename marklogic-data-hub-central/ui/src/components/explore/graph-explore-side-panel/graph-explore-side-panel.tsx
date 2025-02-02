import {faCode, faThList} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useContext, useEffect, useState, useRef} from "react";
import {getDetails} from "@api/record";
import {Tab, Tabs} from "react-bootstrap";
import {ChevronRight, XLg, ArrowRightSquare} from "react-bootstrap-icons";
import {Link} from "react-router-dom";
import {SearchContext} from "@util/search-context";
import styles from "./graph-explore-side-panel.module.scss";
import {xmlParser, xmlDecoder, xmlFormatter, jsonFormatter} from "@util/record-parser";
import TableView from "@components/table-view/table-view";
import {HCTooltip} from "@components/common";

type Props = {
    onCloseSidePanel:() => void;
    graphView: boolean,
};

const DEFAULT_TAB = "instance";
const INSTANCE_TITLE =  <span aria-label="instanceTab"><i><FontAwesomeIcon icon={faThList} size="sm" /></i> Instance</span>;

const GraphExploreSidePanel: React.FC<Props> = (props) => {
  const {onCloseSidePanel, graphView} = props;

  const {
    searchOptions,
    savedNode
  } = useContext(SearchContext);
  const  {database, entityTypeIds, selectedFacets, query, sortOrder} = searchOptions;
  const {entityName, group, primaryKey, sources, entityInstance, label} = savedNode;
  const docUri = savedNode["docURI"] || savedNode["docUri"] || savedNode["uri"];
  const [currentTab, setCurrentTab] = useState(DEFAULT_TAB);
  const [details, setDetails] = useState<any>(null);
  const entityInstanceTitle = group ? group.split("/").pop() : entityName;
  const [currentLabel, setCurrentLabel] = useState<string>("");

  //To view record info on graph instance view side panel
  const [content, setContent] = useState<any>(null);
  const [contentType, setContentType] = useState<string>("");
  const [xml, setXml] = useState();
  const data = useRef<any[]>();
  const RECORD_TITLE =  <span aria-label="recordTab">{contentType.toUpperCase()=== "XML" ? <i className={styles.xmlIcon} aria-label="xmlTypeData"><FontAwesomeIcon icon={faCode} size="sm" /></i>
    : <span className={styles.jsonIcon} aria-label="jsonTypeData"></span>}{contentType ? contentType.toUpperCase() : ""}</span>;

  useEffect(() => {
    let uri;
    if (savedNode && !docUri && !label) { // case where exploring from table/snippet
      uri = savedNode["uri"];
    } else {
      uri = docUri;
    }
    if (uri && label !== currentLabel) {
      setCurrentLabel(label);
      const getNodeData = async (uri, database) => {
        const result = await getDetails(uri, database);
        data.current! = result.data;
        setContentData();
        const {entityInstanceProperties} = result.data;
        setDetails(entityInstanceProperties);
      };
      getNodeData(uri, database);
    }
  }, [details, label, currentLabel]);

  const handleTabChange = (key) => {
    setCurrentTab(key);
  };

  //To set the respective record type data(json, xml and text)
  const setContentData = () => {
    const info = data.current!;
    let recordType=info["recordType"];
    if (recordType === "json") {
      setContentType("json");
      setContent(info);
    } else if (recordType === "xml") {
      setContentType("xml");
      let xmlData=info["data"];
      const decodedXml = xmlDecoder(xmlData);
      const document = xmlParser(decodedXml);
      setContent(document);
      setXml(xmlData);
    } else {
      setContentType("text");
      setContent(info["data"]);
    }
  };

  const displayPanelContent = () => {
    let block;
    if (currentTab === DEFAULT_TAB) {
      return (
        <div aria-label="instance-view">
          <TableView document={details} contentType="json" location={{}} isEntityInstance={true} isSidePanel={true}/>
        </div>
      );
    } else {
      if (contentType === "json") {
        block = (content) && <pre data-testid="graphView-json-container">{jsonFormatter(content["data"])}</pre>;
      } else if (contentType === "xml") {
        block = (xml) && <pre data-testid="graphView-xml-container">{xmlFormatter(xml)}</pre>;
      } else {
        block = (content) && <pre data-testid="graphView-text-container">{content}</pre>;
      }
      return block;
    }
  };

  const pathname = "/tiles/explore/detail"
  ;
  let primaryKeyValue;
  if (primaryKey && Object.keys(primaryKey).length) {
    primaryKeyValue = primaryKey.propertyValue;
  }

  const entityInstanceLabel = label ? label : primaryKeyValue;

  const state = {
    selectedValue: "instance",
    entity: entityTypeIds,
    pageNumber: 1,
    start: 1,
    searchFacets: selectedFacets,
    query,
    tableView: false,
    sortOrder,
    sources,
    primaryKey: primaryKeyValue,
    uri: docUri,
    entityInstance,
    targetDatabase: database,
    graphView,
  };

  return (
    <div data-testid="graphSidePanel" className={styles.sidePanel}>
      <div>
        <span className={styles.selectedEntityHeading}  data-testid="entityHeading">
          {entityInstanceTitle}
          <ChevronRight className={styles.arrowRight}/>
          {entityInstanceLabel}
        </span>
        <HCTooltip text="View full details" id="processed-data-tooltip" placement="top-end">
          <Link to={{pathname, state}} id="instance" data-cy="instance">
            <ArrowRightSquare className={styles.arrowRightSquare} aria-label="graphViewRightArrow"/>
          </Link>
        </HCTooltip>
        <span>
          <i className={styles.close} aria-label="closeGraphExploreSidePanel" onClick={onCloseSidePanel}>
            <XLg />
          </i>
        </span>
      </div>
      <div>
        {docUri && <span className={styles.selectedNodeUri} data-testid="uriLabel" aria-label={docUri}>URI: {docUri}</span>}
      </div>
      <Tabs defaultActiveKey={DEFAULT_TAB} activeKey={currentTab} onSelect={handleTabChange} className={styles.tabsContainer}>
        <Tab
          eventKey="instance"
          aria-label="instanceTabInSidePanel"
          id="instanceTabInSidePanel"
          title={INSTANCE_TITLE}
          className={styles.instanceTabContainer}/>
        <Tab
          eventKey="record"
          aria-label="recordTabInSidePanel"
          id="recordTabInSidePanel"
          title={RECORD_TITLE}/>
      </Tabs>
      {displayPanelContent()}
    </div>
  );
};

export default GraphExploreSidePanel;
