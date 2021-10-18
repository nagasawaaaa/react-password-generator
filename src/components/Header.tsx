import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

export const Header = (): JSX.Element => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>React Password Generator</Navbar.Brand>
      </Container>
    </Navbar>
  );
};
