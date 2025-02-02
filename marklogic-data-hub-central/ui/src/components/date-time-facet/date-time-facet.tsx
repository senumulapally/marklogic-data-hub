import React, {useState, useEffect, useContext} from "react";
import {SearchContext} from "@util/search-context";
import dayjs from "dayjs";
import styles from "./date-time-facet.module.scss";
import {HCDateTimePicker, HCTooltip} from "@components/common";

interface Props {
  name: any
  constraint: string;
  datatype: any
  key: any
  propertyPath: string
  onChange: (datatype: any, facetName: any, value: any[], isNested: boolean) => void;
}

const DateTimeFacet: React.FC<Props> = (props) => {
  const {
    searchOptions,
    greyedOptions,
  } = useContext(SearchContext);
  const [dateTimePickerValue, setDateTimePickerValue] = useState<any[]>([null, null]);

  const onChange = (element, picker) => {
    const dateArray = [picker && picker.startDate, picker && picker.endDate];
    let isNested = props.constraint === props.propertyPath ? false : true;
    if (dateArray.length && dateArray[0] && dateArray[0].isValid()) {
      props.onChange(props.datatype, props.constraint, dateArray, isNested);
      (dateArray[0] && dateArray[1]) && setDateTimePickerValue([dayjs(dateArray[0].format("YYYY-MM-DDTHH:mm:ss")), dayjs(dateArray[1].format("YYYY-MM-DDTHH:mm:ss"))]);
    } else {
      props.onChange(props.datatype, props.constraint, !dateArray[0] || !dateArray[0].isValid() ? [] : dateArray, isNested);
    }
  };

  useEffect(() => {
    if (Object.entries(searchOptions.selectedFacets).length !== 0 && searchOptions.selectedFacets.hasOwnProperty(props.constraint)) {
      for (let facet in searchOptions.selectedFacets) {
        if (facet === props.constraint) {
          setDateTimePickerValue([dayjs(searchOptions.selectedFacets[facet].rangeValues.lowerBound), dayjs(searchOptions.selectedFacets[facet].rangeValues.upperBound)]);
        }
      }
    } else if (Object.entries(greyedOptions.selectedFacets).length !== 0 && greyedOptions.selectedFacets.hasOwnProperty(props.constraint)) {
      for (let facet in greyedOptions.selectedFacets) {
        if (facet === props.constraint) {
          setDateTimePickerValue([dayjs(greyedOptions.selectedFacets[facet].rangeValues.lowerBound), dayjs(greyedOptions.selectedFacets[facet].rangeValues.upperBound)]);
        }
      }
    } else {
      setDateTimePickerValue([null, null]);
    }
  }, [searchOptions, greyedOptions]);

  const formatTitle = () => {
    let objects = props.name.split(".");
    if (objects.length > 2) {
      let first = objects[0];
      let last = objects.slice(-1);
      // returns an array for rendering that looks like "first > ... > last"
      return <p>{first} &gt; ... &gt; <b>{last}</b></p>;
    } else if (objects.length === 2) {
      let first = objects[0];
      let last = objects.slice(-1);
      return <p>{first} &gt; <b>{last}</b></p>;
    }
    return <b>{props.name}</b>;
  };

  return (
    <div className={styles.name} data-testid="facet-date-time-picker" id={`${props.name}-facet-date-picker`}>
      <p className={styles.facetName}><HCTooltip text={props.name.replace(/\./g, " > ")} id={props.name+"-tooltip"} placement="top">{formatTitle()}</HCTooltip></p>
      <HCDateTimePicker key={props.name} name={props.name}
        time={true}
        placeholder={["Start Date Time", "End Date Time"]}
        onOk={onChange}
        bindChange={onChange}
        value={dateTimePickerValue}
        parentEl={`#${props.name}-facet-date-picker`}
      />
    </div>
  );
};

export default DateTimeFacet;
