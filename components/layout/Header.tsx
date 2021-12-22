import React, { useState, useEffect } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const [name, setName] = useState<string>('');
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setName(session.user.name);
    }
  }, [session]);

  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">Project Management</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="p-3">
            Signed in as: <a href="#login">{name}</a>
          </Navbar.Text>
          <Link href="/login>" passHref>
            <Button onClick={() => signOut()}>Log out</Button>
          </Link>
        </Navbar.Collapse>
      </Container>
  </Navbar>
  );
}

export default Header;
