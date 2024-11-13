"use client";

import Pagina from "@/components/Pagina";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { FaEdit, FaPlusSquare, FaTrashAlt } from "react-icons/fa";
import styles from "../Joias.module.css";

export default function JoiasInicialPage() {
  const [joias, setJoias] = useState([]);

  useEffect(() => {
    const joiasLocalStorage = JSON.parse(localStorage.getItem("joias")) || [];
    setJoias(joiasLocalStorage);
    console.log(joiasLocalStorage);
  }, []);

  function apagar(joia) {
    if (window.confirm(`Deseja mesmo excluir a jóia ${joia.nome}?`)) {
      const novaLista = joias.filter((item) => item.id !== joia.id);
      localStorage.setItem("joias", JSON.stringify(novaLista));
      setJoias(novaLista);
      alert("Jóia excluída com sucesso!!");
    }
  }

  return (
    <Pagina titulo="Jóias">
      <div className={styles.textEnd}>
        <Button href="/joias/form" className={styles.newButton}>
          <FaPlusSquare /> Novo
        </Button>
      </div>

      <Row md={3} className={styles.cardRow}>
        {joias.map((joia) => {
          return (
            <Card
              className={`${styles.card} text-center m-2`}
              as={Col}
              key={joia.id}
            >
              <Card.Title className={styles.cardTitle}>
                {joia.tipo}: {joia.nome}
              </Card.Title>
              <Card.Body className={styles.cardBody}>
                <Card.Img style={{ width: "100%" }} src={joia.foto.imagem} />
              </Card.Body>
              <Card.Footer className={styles.cardFooter}>
                <div className={styles.stockInfo}>Estoque: {joia.estoque}</div>
                <div className={styles.cardActions}>
                  <Button
                    className={`${styles.buttonBase} me-2`}
                    href={`/joias/form?id=${joia.id}`}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    className={styles.buttonDanger}
                    onClick={() => apagar(joia)}
                  >
                    <FaTrashAlt />
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          );
        })}
      </Row>
    </Pagina>
  );
}
