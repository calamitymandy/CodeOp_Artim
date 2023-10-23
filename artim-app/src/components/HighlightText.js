import React from 'react';

// Colour pick https://g.co/kgs/TuJajt

function HighlightText({ highlight, value }) {
  // Function to highlight search terms
  function getHighlightedText(text, highlight) {
    // Split text on highlight term, include term itself into parts, ignore case
    var parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part.toLowerCase() === highlight.toLowerCase() ? (
          <b style={{ backgroundColor: "#faeb19" }}>{part}</b>
        ) : (
          part
        )}
      </React.Fragment>
    ));
  }

  return (
    <p>
      {getHighlightedText(value, highlight)}
    </p>
  );
}

export default HighlightText;
