"use client";

import Pagina from "@/components/Pagina";
import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

const doadores = JSON.parse(localStorage.getItem("doadores")) || [];
const joias = JSON.parse(localStorage.getItem("joias")) || [];
const solicitantes = JSON.parse(localStorage.getItem("solicitantes")) || [];
const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
const transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

export default function Homepage() {
  const objeto = [
    {
      caminho: "/doadores",
      quantidade: doadores.length,
      nome: "Doadores",
      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX1YchYUw7JOsMR8A0Ayl-HCQ4ZNDn7BlZ4Q&s.jpg",
    },
    {
      caminho: "/joias",
      quantidade: joias.length,
      nome: "Jóias",
      imagem:
        "https://ae01.alicdn.com/kf/S90ed20ac28104cd48ab215611f11be84g.jpg_640x640q90.jpg",
    },
    {
      caminho: "/solicitantes",
      quantidade: solicitantes.length,
      nome: "Solicitantes",
      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFvSa-PFm3TFY3Yp3-oGoqWDfr5xJMoRpn8Q&s.jpg",
    },
    {
      caminho: "/pedidos",
      quantidade: pedidos.length,
      nome: "Pedidos",
      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi8MX5E-NVfoP4XhFmF48D6CfTTGj3jJ6w8A&s.jpg",
    },
    {
      caminho: "/equipe",
      quantidade: transacoes.length,
      nome: "Equipe",
      imagem:
        "https://hermosajewelry.com/cdn/shop/files/Hermosa_Jewelry_Team_69cfa854-5937-4a15-8920-5e6b593bb232.jpg?v=1700615650&width=2000.jpg",
    },
  ];
  return (
    <>
      <Pagina titulo="Gimarzo">
        <Row md={4}>
          {objeto.map((item) => (
            <Col className="py-2">
              <Card style={{ height: "100%", width: "100%" }}>
                <Card.Img
                  src={item.imagem}
                  style={{ height: "100%", width: "100%" }}
                ></Card.Img>
                <Card.Body className="text-center">
                  <Card.Title>
                    <b>{item.nome}</b>
                  </Card.Title>
                  Cadastrados: {item.quantidade}
                </Card.Body>
                <Card.Footer className="text-end">
                  <Button href={item.caminho}>Lista</Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Pagina>
    </>
  );
}
