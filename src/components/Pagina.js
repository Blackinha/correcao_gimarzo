"use client";

import { Container, Nav, Navbar } from "react-bootstrap";

export default function Pagina({ titulo, children }) {
  return (
    <>
      {/* Barra de Navegação */}
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">GIMARZO</Navbar.Brand>
          <Nav className="me-end">

            <Nav.Link href="/joias">Jóias</Nav.Link>
            <Nav.Link href="/doadores">Doadores</Nav.Link>
            <Nav.Link href="/solicitantes">Solicitantes</Nav.Link>
            <Nav.Link href="/pedidos">Pedidos</Nav.Link>
            <Nav.Link href="/equipe">Equipe</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Barra de Titulo */}
      <div className=" text-center py-2">
        <h1>{titulo}</h1>
      </div>

      {/* Conteudo da Página */}
      <Container className="mt-2">{children}</Container>
    </>
  );
}
