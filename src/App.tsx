import React, { useState, useEffect } from 'react';
import { generate } from 'generate-password';
import { Container, Row, Col, Form } from 'react-bootstrap';

interface PasswordOptions {
  length: number;
  numbers?: boolean;
  symbols?: boolean;
}

const App = (): JSX.Element => {
  const [length, setLength] = useState<number>(16);
  const [numbers, setUseNumberState] = useState<boolean>(false);
  const [symbols, setUseSymbolState] = useState<boolean>(false);
  const [options, setOptions] = useState<PasswordOptions>({ length, numbers, symbols });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [password, setPassword] = useState<string>(generate({ length }));

  const handleChangeRange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLength(Number(event.target.value));
  };

  const handleChangeNumber = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUseNumberState(event.target.checked);
  };

  const handleChangeSymbol = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUseSymbolState(event.target.checked);
  };

  const handleClickInput = (event: React.MouseEvent<HTMLInputElement>): void => {
    event.preventDefault();
    event.currentTarget.select();
    navigator.clipboard.writeText(event.currentTarget.value);
  };

  useEffect(() => {
    setOptions({ length, numbers, symbols });
  }, [length, numbers, symbols]);

  useEffect(() => {
    setPassword(generate(options));
  }, [options]);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Form>
              <Form.Group className="mb-3" controlId="formGroupExecPw">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="text" value={password} readOnly onClick={handleClickInput} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Password length: {length}</Form.Label>
                <Row>
                  <Col xs={1} className="text-center">
                    4
                  </Col>
                  <Col xs={10}>
                    <Form.Range min={4} max={32} value={length} onChange={handleChangeRange} />
                  </Col>
                  <Col xs={1} className="text-center">
                    32
                  </Col>
                </Row>
                <Row>
                  <Form.Check
                    id="includeNumbers"
                    type="checkbox"
                    label="パスワードに数字を含める"
                    onChange={handleChangeNumber}
                  />
                </Row>
                <Row>
                  <Form.Check
                    id="includeSymbols"
                    type="checkbox"
                    label="特殊文字に数字を含める"
                    onChange={handleChangeSymbol}
                  />
                </Row>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
