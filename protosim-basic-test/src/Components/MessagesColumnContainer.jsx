// function MessagesColumnContainer({ children }) {
//   const middleIndex = Math.floor(children.length / 2);
//   const firstColumn = children.slice(0, middleIndex);
//   const secondColumn = children.slice(middleIndex);
//   return (
//     <div className="column-container">
//       <div className="column-wrapper">
//         {firstColumn.map((child, index) => (
//           <div key={index}>{child}</div>
//         ))}
//       </div>
//       <div className="column-wrapper">
//         {secondColumn.map((child, index) => (
//           <div key={index}>{child}</div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useEffect } from "react";

// export default MessagesColumnContainer;
function MessagesColumnContainer({ children }) {
  const totalColumns = 3;
  const columns = Array.from({ length: totalColumns }, (_, columnIndex) => []);
  // if(children.length === 0) return;
  React.Children.toArray(children).forEach((child, index) => {
    const targetColumnIndex = index % totalColumns;
    columns[targetColumnIndex].push(child);
  });

  return (
    <div className="column-container">
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="column-wrapper">
          {column.map((child, index) => (
            <div key={index}>{child}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MessagesColumnContainer;
