import React from "react";
import * as timeago from "timeago.js";

function Tweet({ data }) {
  //Formatea la fecha
  const parseDate = (date) => {
    const oDate = new Date(Date.parse(date));
    return timeago.format(oDate);
  };

  return (
    <div className="tweet">
      <strong>
        👤 @{data.author.username} 🕒 {parseDate(data.createdAt)}
      </strong>
      <p className="text">{data.text}</p>
    </div>
  );
}

export default Tweet;
