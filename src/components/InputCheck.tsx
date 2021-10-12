import React from 'react';
import { Form, Row } from 'react-bootstrap';

interface Props {
  id: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputCheck = (props: Props): JSX.Element => {
  return (
    <>
      <Row>
        <Form.Check id={props.id} type="checkbox" label={props.label} onChange={props.onChange} />
      </Row>
    </>
  );
};
