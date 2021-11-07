import React from 'react';
import { Col } from 'react-bootstrap';

interface BoardSectionProps {
  title: String
}

const BoardSection: React.FC<BoardSectionProps> = ({ title }) => {
  return (
    <Col md={3} className="d-flex flex-column p-2">
      <div className="board-section-header d-flex flex-row align-items-center">
        <h3 className="me-auto">{title}</h3>
        <div>add</div>
      </div>
    </Col>
  );
}

export default BoardSection;
