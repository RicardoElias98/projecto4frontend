import React from "react";

function MainSB() {
  return (
    <>
      <div className="total-column">
        <div className="column-header" id="to-do-header">
          <h2>To Do</h2>
        </div>

        <div className="board-container" id="to-do-container">
          <section className="board-column" id="to-do-column">
            {/* tasks */}
          </section>
        </div>
      </div>
      <div className="total-column">
        <div className="column-header" id="doing-header">
          <h2>Doing</h2>
        </div>
        <div className="board-container" id="doing-container">
          <section className="board-column" id="doing-column">
            {/* tasks */}
          </section>
        </div>
      </div>
      <div className="total-column">
        <div className="column-header" id="done-header">
          <h2>Done</h2>
        </div>
        <div className="board-container" id="done-container">
          <section className="board-column" id="done-column">
            {/* tasks */}
          </section>
        </div>
      </div>
      </>
  );
}

export default MainSB;
