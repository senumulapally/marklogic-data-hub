import React, {useState} from "react";
import {Radio} from "antd";
import {MLTooltip} from "@marklogic/design-system";
import styles from "./expand-collapse.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDoubleDown, faAngleDoubleUp} from "@fortawesome/free-solid-svg-icons";

interface Props {
  handleSelection: (option: string) => void;
  currentSelection: string;
}

const ExpandCollapse: React.FC<Props> = (props) => {
  let [enabled, setEnabled] = useState(props.currentSelection);

  const onSelect = (val) => {
    setEnabled(val);
    props.handleSelection(val);
  };

  const radioKeyDownHandler = (event) => {
    if (event.key === "Enter") {
      switch (enabled) {
      case "expand":
        onSelect("collapse");
        break;
      case "collapse":
        onSelect("expand");
        break;
      default:
        break;
      }
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (enabled === "collapse") { onSelect("expand"); }
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      if (enabled === "expand") { onSelect("collapse"); }
    }
    if (event.key === "ArrowUp" || event.key === "ArrowDown") { event.preventDefault(); }
  };

  return (
    <span id="expand-collapse" aria-label="expand-collapse" onKeyDown={radioKeyDownHandler}>
      <Radio.Group
        buttonStyle="outline"
        className={"radioGroupView"}
        name="radiogroup"
        onChange={e => onSelect(e.target.value)}
        size="small"
        // tabIndex={0}
        value={""}
      >
        <Radio.Button id="expandBtn" data-testid="expandBtn" aria-label="radio-button-expand" value={"expand"} checked={enabled === "expand"} >
          <MLTooltip title={"Expand All"}>
            {<FontAwesomeIcon
              id="expandIcon"
              icon={faAngleDoubleDown}
              className={styles.icon}
              size="sm" />}
          </MLTooltip>
        </Radio.Button>
        <Radio.Button id="collapseBtn" data-testid="collapseBtn" aria-label="radio-button-collapse" value={"collapse"} checked={enabled === "collapse"} >
          <MLTooltip title={"Collapse All"}>
            {<FontAwesomeIcon
              id="collapseIcon"
              icon={faAngleDoubleUp}
              className={styles.icon}
              size="sm" />}
          </MLTooltip>
        </Radio.Button>
      </Radio.Group>
    </span>
  );
};

export default ExpandCollapse;