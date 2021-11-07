import React from 'react';
import { Row } from 'react-bootstrap';
import BoardSection from '../components/BoardSection';

const Board = () => {
  const sections: Array<String> = ['Backlog', 'In-Progress', 'Review', 'Done'];

  return (
    <div className="pt-3">
      <Row>
        <h1>Project Title</h1>
      </Row>
      <div className="board-container d-flex flex-row">
        {sections.map((section, index) => {
          return (
            <BoardSection
              title={section}
              key={index}
              ></BoardSection>
          )
        })}
      </div>
    </div>
  );
};

export default Board;
