"use client";

import Pagina from "@/components/Pagina";
import React, { use } from "react";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { FaEdit, FaPlusSquare, FaTrashAlt } from "react-icons/fa";

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
      <div className="text-end mb-2">
        <Button href="/joias/form">
          <FaPlusSquare /> Novo
        </Button>
      </div>

      <Row md={4}>
        {joias.map((joia) => {
          return (
            <Card className="text-center m-2" as={Col}>
              <Card.Title>
                {joia.tipo}: {joia.nome}
              </Card.Title>
              <Card.Body>
                <Card.Img style={{ width: "100%" }} src={joia.foto.imagem} />
              </Card.Body>
              <Card.Footer className="text-end">
                {joia.estoque}
                <br></br>
                <Button className="me-2" href={`/joias/form?id=${joia.id}`}>
                  <FaEdit />
                </Button>
                <Button variant="danger" onClick={() => apagar(joia)}>
                  <FaTrashAlt />
                </Button>
              </Card.Footer>
            </Card>
          );
        })}
      </Row>
    </Pagina>
  );
}
