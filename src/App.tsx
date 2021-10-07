import React, { useState } from 'react';
import { generate } from 'generate-password';
import { Container, Row, Col, Form } from 'react-bootstrap';

const App = (): JSX.Element => {
  const [range, setRange] = useState<number>(18);
  const handleChangeRange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRange(Number(event.target.value));
  };

  const generatePassword = ({ range }: { range: number }) => {
    return generate({
      length: range,
    });
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Form>
              <Form.Group className="mb-3" controlId="formGroupExecPw">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="text" value={generatePassword({ range })} readOnly />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Container>
                  <Form.Label>Password length: {range}</Form.Label>
                  <Row>
                    <Col xs={1} className="text-center">
                      4
                    </Col>
                    <Col xs={10}>
                      <Form.Range min={4} max={32} value={range} onChange={handleChangeRange} />
                    </Col>
                    <Col xs={1} className="text-center">
                      32
                    </Col>
                  </Row>
                </Container>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
