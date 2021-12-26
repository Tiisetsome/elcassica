import React from "react";
import { StatusNotifierStyles } from "../Styles/StatusNotifierStyles";

const StatusNotifier = () => {
  return (
    <StatusNotifierStyles className="flex-3">
      <div className="note flex-3">
        <div></div>
        <span>Very Urgent</span>
      </div>
      <div className="note flex-3">
        <div style={{ backgroundColor: "var(--gold-color)" }}></div>
        <span>Not Urgent</span>
      </div>
    </StatusNotifierStyles>
  );
};

export default StatusNotifier;
