import React, { useState, useEffect } from 'react';
import { generate } from 'generate-password';
import { Container, Row, Col, Form, Toast, ToastContainer } from 'react-bootstrap';
import { Header, InputRange, InputCheck } from './components';

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
  toastShow: boolean;
  toastDelay: number;
  onClickPassword: (event: React.MouseEvent<HTMLInputElement>) => void;
  onChangeRange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeNumbers: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeSymbols: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCloseToast: (isShow: boolean) => void;
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
  toastShow,
  toastDelay,
  onClickPassword,
  onChangeRange,
  onChangeSymbols,
  onChangeNumbers,
  onCloseToast,
}: Props): JSX.Element => {
  return (
    <div>
      <Header />
      <Container className="mt-4" fluid="sm">
        <Row className="justify-content-md-center">
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
        <Row>
          <Col xs={6}>
            <ToastContainer position="top-center">
              <Toast onClose={() => onCloseToast(false)} show={toastShow} delay={toastDelay} autohide>
                <Toast.Body>Password Copied!</Toast.Body>
              </Toast>
            </ToastContainer>
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
  const [toastShow, setToastShow] = useState(false);

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
    event.currentTarget.select();
    navigator.clipboard.writeText(event.currentTarget.value).then(() => {
      setToastShow(true);
    });
  };

  const handleCloseToast = (isShow: boolean): void => {
    setToastShow(isShow);
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
      onCloseToast={handleCloseToast}
      toastDelay={1500}
      toastShow={toastShow}
    />
  );
};

export default App;
