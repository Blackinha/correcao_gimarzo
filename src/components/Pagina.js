"use client";

import { Container, Nav, Navbar } from "react-bootstrap";
import styles from "../app/Pagina.module.css"; 

export default function Pagina({ titulo, children }) {
  return (
    <>
      {/* Barra de Navegação */}
      <Navbar className={styles.navbar} data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/" className={styles.navbarBrand}>
            GIMARZO
          </Navbar.Brand>
          <Nav className={`${styles.navLinks} me-end`}>
            <Nav.Link href="/joias" className={styles.navLink}>
              Jóias
            </Nav.Link>
            <Nav.Link href="/doadores" className={styles.navLink}>
              Doadores
            </Nav.Link>
            <Nav.Link href="/solicitantes" className={styles.navLink}>
              Solicitantes
            </Nav.Link>
            <Nav.Link href="/pedidos" className={styles.navLink}>
              Pedidos
            </Nav.Link>
            <Nav.Link href="/equipe" className={styles.navLink}>
              Equipe
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Barra de Titulo */}
      <div className={`text-center py-2 ${styles.titleWrapper}`}>
        <h1 className={styles.title}>{titulo}</h1>
      </div>

      {/* Conteúdo da Página */}
      <Container className={`${styles.contentContainer} mt-2`}>
        {children}
      </Container>
    </>
  );
}
