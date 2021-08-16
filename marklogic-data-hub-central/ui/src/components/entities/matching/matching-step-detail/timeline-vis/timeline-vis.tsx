import React, {useEffect, useState} from "react";
import Timeline from "react-visjs-timeline";
import "./timeline-vis.scss";
interface Props {
    items: any;
    options: any;
    clickHandler: (event: any) => void;
}
const TimelineVis: React.FC<Props> = (props) => {

 return (
    <div>
        <Timeline items={props.items} options={props.options} clickHandler={props.clickHandler}></Timeline>
    </div>
 )};

export default TimelineVis