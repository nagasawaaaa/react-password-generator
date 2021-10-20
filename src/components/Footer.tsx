import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export const Footer = (): JSX.Element => {
  return (
    <Container className="mt-4" fluid="sm">
      <Row>
        <Col className="text-center">
          &copy; 2021{' '}
          <a href="https://github.com/nagasawaaaa" target="_blank" rel="noopener noreferrer">
            nagasawaaaa
          </a>
        </Col>
      </Row>
    </Container>
  );
};
