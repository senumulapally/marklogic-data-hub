import React, {useContext, useEffect, useState} from "react";
import styles from "./entity-specific-sidebar.module.scss";
import Facet from "@components/facet/facet";
import DateFacet from "@components/date-facet/date-facet";
import DateTimeFacet from "@components/date-time-facet/date-time-facet";
import dayjs from "dayjs";
import {SearchContext} from "@util/search-context";
import DynamicIcons from "@components/common/dynamic-icons/dynamic-icons";
import {ExploreGraphViewToolTips} from "@config/tooltips.config";
import NumericFacet from "@components/numeric-facet/numeric-facet";
import {exploreSidebar} from "@config/explore.config";

interface Props {
  entitySelected: any;
  entityFacets: any,
  checkFacetRender: (facets: any) => void;
  facetRender: (facets: any) => void;
  updateSpecificFacets: boolean;
}

const EntitySpecificSidebar: React.FC<Props> = (props) => {
  const {
    entitySelected: {name, icon, isDefinitionInvalid},
    entityFacets,
    updateSpecificFacets,
    checkFacetRender,
    facetRender
  } = props;

  const {
    searchOptions,
    clearConstraint,
    clearFacet,
    clearGreyFacet,
    clearRangeFacet,
    clearGreyRangeFacet,
    greyedOptions,
    setAllGreyedOptions,
    // setQueryGreyedOptions
  } = useContext(SearchContext);

  const [allSelectedFacets, setAllSelectedFacets] = useState<any>(searchOptions.selectedFacets);
  // const [entitySpecificSearch, setEntitySpecificSearch] = useState<string>("");

  let integers = exploreSidebar.entitySpecificSidebar.integers;
  let decimals = exploreSidebar.entitySpecificSidebar.decimals;

  useEffect(() => {
    if (entityFacets || updateSpecificFacets) {
      if (Object.entries(searchOptions.selectedFacets).length !== 0) {
        let selectedFacets: any[] = [];
        for (let constraint in searchOptions.selectedFacets) {
          let displayName = "";
          let entityFacet = entityFacets && entityFacets.find(facet => facet.facetName === constraint);
          if (entityFacet && entityFacet.propertyPath !== constraint) {
            displayName = entityFacet.propertyPath;
          }
          if (constraint === "createdOnRange") {
            selectedFacets.push({constraint, facet: searchOptions.selectedFacets[constraint], displayName});
          } else {
            let datatype = searchOptions.selectedFacets[constraint].dataType;
            if (datatype === "xs:string" || datatype === "string") {
              searchOptions.selectedFacets[constraint]["stringValues"].forEach(facet => {
                selectedFacets.push({constraint, facet, displayName});
              });
            } else if (integers.includes(datatype) || decimals.includes(datatype)) {
              let rangeValues = searchOptions.selectedFacets[constraint].rangeValues;
              selectedFacets.push({constraint, rangeValues, displayName});
            } else if (datatype === "xs:date" || datatype === "date") {
              let rangeValues = searchOptions.selectedFacets[constraint].rangeValues;
              selectedFacets.push({constraint, rangeValues, displayName});
            } else if (datatype === "xs:dateTime" || datatype === "dateTime") {
              let rangeValues = searchOptions.selectedFacets[constraint].rangeValues;
              selectedFacets.push({constraint, rangeValues, displayName});
            }
          }
          facetRender(selectedFacets);
        }
      } else {
        if (updateSpecificFacets) {
          facetRender([]);
          setAllSelectedFacets({});
        }
      }
    }
  }, [searchOptions.selectedFacets, updateSpecificFacets]);

  useEffect(() => {
    if (Object.entries(greyedOptions.selectedFacets).length !== 0) {
      let checkedFacets: any[] = [];
      for (let constraint in greyedOptions.selectedFacets) {
        let displayName = "";
        let entityFacet = entityFacets && entityFacets.find(facet => facet.facetName === constraint);
        if (entityFacet && entityFacet.propertyPath !== constraint) {
          displayName = entityFacet.propertyPath;
        }
        if (constraint === "createdOnRange") {
          checkedFacets.push({constraint, facet: greyedOptions.selectedFacets[constraint], displayName});
        } else {
          let datatype = greyedOptions.selectedFacets[constraint].dataType;
          if (datatype === "xs:string" || datatype === "string") {
            greyedOptions.selectedFacets[constraint]["stringValues"].map(facet => {
              checkedFacets.push({constraint, facet, displayName});
            });
          } else if (integers.includes(datatype) || decimals.includes(datatype)) {
            let rangeValues = greyedOptions.selectedFacets[constraint].rangeValues;
            checkedFacets.push({constraint, rangeValues, displayName});
          } else if (datatype === "xs:date" || datatype === "date") {
            let rangeValues = greyedOptions.selectedFacets[constraint].rangeValues;
            checkedFacets.push({constraint, rangeValues, displayName});
          } else if (datatype === "xs:dateTime" || datatype === "dateTime") {
            let rangeValues = greyedOptions.selectedFacets[constraint].rangeValues;
            checkedFacets.push({constraint, rangeValues, displayName});
          }
        }
        checkFacetRender(checkedFacets);
      }
    } else {
      if (Object.entries(searchOptions.selectedFacets).length === 0) {
        setAllSelectedFacets({});
      } else {
        setAllSelectedFacets(searchOptions.selectedFacets);
      }
      checkFacetRender([]);
    }
  }, [greyedOptions]);

  // useEffect(() => {
  //   setEntitySpecificSearch(searchOptions.query);
  //   searchOptions.query && setQueryGreyedOptions(searchOptions.query);
  // }, [searchOptions]);

  const onDateFacetChange = (datatype, facet, value, isNested) => {
    let updateFacets = {...allSelectedFacets};
    if (value.length > 1 && value[0]) {
      updateFacets = {...updateFacets, [facet]: {dataType: datatype, rangeValues: {lowerBound: dayjs(value[0]).format("YYYY-MM-DD"), upperBound: dayjs(value[1]).format("YYYY-MM-DD")}}};
      setAllGreyedOptions(updateFacets);
      setAllSelectedFacets(updateFacets);
    } else if (value.length === 0) {
      clearRangeFacet(facet);
      clearGreyRangeFacet(facet);
    }
  };

  // const updateEntitySpecifSearch = ({target}) => {
  //   const {value} = target;
  //   setQueryGreyedOptions(value);
  //   setEntitySpecificSearch(value);
  // };

  const onDateTimeFacetChange = (datatype, facet, value, isNested) => {
    let updateFacets = {...allSelectedFacets};
    if (value.length > 1) {
      updateFacets = {...updateFacets, [facet]: {dataType: datatype, rangeValues: {lowerBound: dayjs(value[0]).format("YYYY-MM-DDTHH:mm:ss"), upperBound: dayjs(value[1]).format("YYYY-MM-DDTHH:mm:ss")}}};
      setAllGreyedOptions(updateFacets);
      setAllSelectedFacets(updateFacets);
    } else if (value.length === 0) {
      clearRangeFacet(facet);
      clearGreyRangeFacet(facet);
    }
  };

  const onNumberFacetChange = (datatype, facet, value, isNested) => {
    let updateFacets = {...allSelectedFacets};
    if (value.length > 1) {
      updateFacets = {...updateFacets, [facet]: {dataType: datatype, rangeValues: {lowerBound: value[0].toString(), upperBound: value[1].toString()}}};
    }
    setAllSelectedFacets(updateFacets);
    setAllGreyedOptions(updateFacets);
  };

  const updateSelectedFacets = (constraint: string, vals: string[], datatype: string, isNested: boolean, toDelete = false, toDeleteAll: boolean = false) => {
    let facets = {...allSelectedFacets};
    let greyFacets = {...greyedOptions.selectedFacets};
    let type = "";
    let valueKey = "";
    let facetName = constraint;

    switch (datatype) {
    case "xs:string":
    case "collection": {
      type = "xs:string";
      valueKey = "stringValues";
      break;
    }
    case "xs:integer": {
      type = "xs:integer";
      valueKey = "rangeValues";
      break;
    }
    case "xs:decimal": {
      type = "xs:decimal";
      valueKey = "rangeValues";
      break;
    }
    default:
      break;
    }

    if (vals.length > 0) {
      facets = {
        ...facets,
        [facetName]: {
          dataType: type,
          [valueKey]: vals
        }
      };
      greyFacets = {
        ...greyFacets,
        [facetName]: {
          dataType: type,
          [valueKey]: vals
        }
      };
    } else {
      delete facets[facetName];
    }
    if (toDelete) {
      if (Object.entries(searchOptions.selectedFacets).length > 0 && searchOptions.selectedFacets.hasOwnProperty(constraint)) {
        clearFacet(constraint, vals[0]);
      } else if (Object.entries(greyedOptions.selectedFacets).length > 0 && greyedOptions.selectedFacets.hasOwnProperty(constraint)) {
        clearGreyFacet(constraint, vals[0]);
      }
    } else if (toDeleteAll) {
      clearConstraint(constraint);
    } else {
      setAllSelectedFacets(facets);
      setAllGreyedOptions(greyFacets);
    }
  };


  const addFacetValues = (constraint: string, vals: string[], dataType: string, facetCategory: string) => {
    let newAllSelectedfacets = {...allSelectedFacets};
    let valueKey = "stringValues";
    if (dataType === "xs:string") {
      valueKey = "stringValues";
    }
    let type = "";
    switch (dataType) {
    case "xs:string":
    case "collection": {
      type = "xs:string";
      valueKey = "stringValues";
      break;
    }
    case "xs:integer": {
      type = "xs:integer";
      valueKey = "rangeValues";
      break;
    }
    case "xs:decimal": {
      type = "xs:decimal";
      valueKey = "rangeValues";
      break;
    }
    default:
      break;
    }
    if (vals.length > 0) {
      newAllSelectedfacets = {
        ...newAllSelectedfacets,
        [constraint]: {
          dataType: type,
          [valueKey]: vals
        }
      };
    } else {
      delete newAllSelectedfacets[constraint];
    }

    setAllSelectedFacets(newAllSelectedfacets);
    setAllGreyedOptions(newAllSelectedfacets);
  };

  return (
    <div aria-label={`specif-sidebar-${name}`} className={styles.specificSidebar}>
      <div className={styles.entityHeader}>
        <span aria-label={`specif-icon-${name}`} className={styles.entityHeaderIcon}>
          <DynamicIcons name={icon} />
        </span>
        <span className={styles.entityHeaderName} aria-label={`specif-title-${name}`}>{name}</span>
      </div>
      <div className={styles.entitySearchText} aria-label="specif-search-field">
        {/* <HCInput
          aria-label="specif-search-field"
          id="specif-search-input"
          suffix={<FontAwesomeIcon icon={faSearch} size="sm" className={styles.searchIcon} />}
          placeholder="Search"
          size="sm"
          onChange={updateEntitySpecifSearch}
          value={entitySpecificSearch ? entitySpecificSearch : " "} /> */}
      </div>
      <div>
        {isDefinitionInvalid ? <div aria-label={`invalidDefinition-${name}`}>{ExploreGraphViewToolTips.invalidDefinition}</div>
          : entityFacets.length
            ? entityFacets.map((facet, index) => {
              let datatype = "";
              let step;
              switch (facet.type) {
              case "xs:string": {
                return Object.entries(facet).length !== 0 && facet.facetValues.length > 0 && (
                  <Facet
                    name={facet.propertyPath}
                    constraint={facet.facetName}
                    facetValues={facet.facetValues}
                    key={facet.facetName}
                    tooltip=""
                    facetType={facet.type}
                    facetCategory="entity"
                    referenceType={facet.referenceType}
                    entityTypeId={facet.entityTypeId}
                    propertyPath={facet.propertyPath}
                    updateSelectedFacets={updateSelectedFacets}
                    addFacetValues={addFacetValues}
                  />
                );
              }
              case "xs:date": {
                datatype = "date";
                return Object.entries(facet).length !== 0 && (
                  <DateFacet
                    constraint={facet.facetName}
                    name={facet.propertyPath}
                    datatype={datatype}
                    key={facet.facetName}
                    propertyPath={facet.propertyPath}
                    onChange={onDateFacetChange}
                  />
                );
              }
              case "xs:dateTime": {
                datatype = "dateTime";
                return Object.entries(facet).length !== 0 && (
                  <DateTimeFacet
                    constraint={facet.facetName}
                    name={facet.propertyPath}
                    datatype={datatype}
                    key={facet.facetName}
                    propertyPath={facet.propertyPath}
                    onChange={onDateTimeFacetChange}
                  />
                );
              }
              case "xs:int": {
                datatype = "int";
                step = 1;
                break;
              }
              case "xs:integer": {
                datatype = "integer";
                step = 1;
                break;
              }
              case "xs:short": {
                datatype = "short";
                step = 1;
                break;
              }
              case "xs:long": {
                datatype = "long";
                step = 1;
                break;
              }
              case "xs:decimal": {
                datatype = "decimal";
                step = 0.1;
                break;
              }
              case "xs:double": {
                datatype = "double";
                step = 0.1;
                break;
              }
              case "xs:float": {
                datatype = "float";
                step = 0.1;
                break;
              }
              //add date type cases

              default:
                break;
              }
              if (step && facet.facetValues.length) {
                return (
                  <div key={index}>
                    <NumericFacet
                      constraint={facet.facetName}
                      name={facet.propertyPath}
                      step={step}
                      referenceType={facet.referenceType}
                      entityTypeId={facet.entityTypeId}
                      propertyPath={facet.propertyPath}
                      datatype={datatype}
                      key={facet.facetName}
                      onChange={onNumberFacetChange}
                    />
                  </div>
                );
              }
            })
            : <div aria-label={isDefinitionInvalid ? `invalidDefinition-${name}` : `no-facets-${name}`}>{isDefinitionInvalid ? ExploreGraphViewToolTips.invalidDefinition : ExploreGraphViewToolTips.noFacetToolTip}</div>}
      </div>
    </div>
  );
};

export default EntitySpecificSidebar;
