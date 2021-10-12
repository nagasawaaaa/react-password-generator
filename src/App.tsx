import React, { useState, useEffect } from 'react';
import { generate } from 'generate-password';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { InputRange, InputCheck } from './components';

interface PasswordOptions {
  length: number;
  numbers?: boolean;
  symbols?: boolean;
}

interface Props {
  password: string;
  length: number;
  min: number;
  max: number;
  numbersId: string;
  numbersLabel: string;
  symbolsId: string;
  symbolsLabel: string;
  onClickPassword: (event: React.MouseEvent<HTMLInputElement>) => void;
  onChangeRange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeNumbers: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeSymbols: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Component = ({
  password,
  length,
  numbersId,
  numbersLabel,
  min,
  max,
  symbolsId,
  symbolsLabel,
  onClickPassword,
  onChangeRange,
  onChangeSymbols,
  onChangeNumbers,
}: Props): JSX.Element => {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Form>
              <Form.Group className="mb-3" controlId="formGroupExecPw">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="text" value={password} readOnly onClick={onClickPassword} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <InputRange max={max} min={min} length={length} onChange={onChangeRange}>
                  <>Password length: {length}</>
                </InputRange>
                <InputCheck id={numbersId} label={numbersLabel} onChange={onChangeNumbers} />
                <InputCheck id={symbolsId} label={symbolsLabel} onChange={onChangeSymbols} />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const App = (): JSX.Element => {
  const [length, setLength] = useState<number>(16);
  const [numbers, setUseNumberState] = useState<boolean>(false);
  const [symbols, setUseSymbolState] = useState<boolean>(false);
  const [options, setOptions] = useState<PasswordOptions>({ length, numbers, symbols });
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
    <Component
      onClickPassword={handleClickInput}
      max={32}
      min={4}
      length={length}
      onChangeRange={handleChangeRange}
      password={password}
      numbersId="includeNumbers"
      numbersLabel="パスワードに数字を含める"
      onChangeNumbers={handleChangeNumber}
      symbolsId="includeSymbols"
      symbolsLabel="パスワードに特殊文字を含める"
      onChangeSymbols={handleChangeSymbol}
    />
  );
};

export default App;
