import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

interface Props {
  children: JSX.Element | JSX.Element[] | string;
  length: number;
  min: number;
  max: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputRange = (props: Props): JSX.Element => {
  return (
    <>
      <Form.Label>{props.children}</Form.Label>
      <Row>
        <Col xs={1} className="text-center">
          {props.min}
        </Col>
        <Col xs={10}>
          <Form.Range min={props.min} max={props.max} value={props.length} onChange={props.onChange} />
        </Col>
        <Col xs={1} className="text-center">
          {props.max}
        </Col>
      </Row>
    </>
  );
};
