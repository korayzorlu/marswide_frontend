import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import Row from '../grid/Row';
import Col from '../grid/Col';

function BackAndHeader(props) {
    const {children} = props;

    const navigate = useNavigate();

    return (
      <Row addClass="g-0">
          <Col addClass="text-start fw-bold m-0">
            <Button type="button" color="tertary" addClass="shadow-0 p-0 fs-5" onClick={()=>navigate(-1)}><i className="fas fa-arrow-left"></i></Button>
          </Col>
          <Col addClass="text-end fw-bold m-0">
            {children}
          </Col>
      </Row>
    )
}

export default BackAndHeader
