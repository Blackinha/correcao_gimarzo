"use client";

import Pagina from "@/components/Pagina";
import React, { use } from "react";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaPlusSquare, FaTrashAlt } from "react-icons/fa";

export default function DoadoresInicialPage() {
  const [doadores, setDoadores] = useState([]);

  useEffect(() => {
    const doadoresLocalStorage =
      JSON.parse(localStorage.getItem("doadores")) || [];
    setDoadores(doadoresLocalStorage);
    console.log(doadoresLocalStorage);
  }, []);

  function apagar(doador) {
    if (window.confirm(`Deseja mesmo excluir o doador ${doador.nome}?`)) {
      const novaLista = doadores.filter((item) => item.id !== doador.id);
      localStorage.setItem("doadores", JSON.stringify(novaLista));
      setDoadores(novaLista);
      alert("Doador excluído com sucesso!!");
    }
  }

  return (
    <Pagina titulo="Doadores">
      <div className="text-end mb-2">
        <Button href="/doadores/form">
          <FaPlusSquare /> Novo
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Foto:</th>
            <th>Nome:</th>
            <th>E-mail:</th>
            <th>Telefone:</th>
            <th>CPF:</th>
            <th>País:</th>
            <th>Estado:</th>
            <th>Preferência de Contato</th>
          </tr>
        </thead>
        <tbody>
          {doadores.map((doador) => {
            return (
              <tr key={doador.id} className="text-center">
                <td>
                  <img
                    src={doador.foto.imagem}
                    width={80}
                    alt="Foto do Doador"
                  />
                </td>
                <td>{doador.nome}</td>
                <td>{doador.email}</td>
                <td>{doador.telefone}</td>
                <td>{doador.cpf}</td>
                <td>{doador.pais}</td>
                <td>{doador.estado}</td>
                <td>{doador.preferencia}</td>
                <td className="text-center">
                  <Button
                    className="me-2"
                    href={`/doadores/form?id=${doador.id}`}
                  >
                    <FaEdit />
                  </Button>
                  <Button variant="danger" onClick={() => apagar(doador)}>
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Pagina>
  );
}
