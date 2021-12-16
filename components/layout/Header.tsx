import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import Link from 'next/link'

const Header = () => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">Project Management</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="p-3">
            Signed in as: <a href="#login">John Doe</a>
          </Navbar.Text>
          <Link href="/login>" passHref>
            <Button>Log out</Button>
          </Link>
        </Navbar.Collapse>
      </Container>
  </Navbar>
  );
}

export default Header;
