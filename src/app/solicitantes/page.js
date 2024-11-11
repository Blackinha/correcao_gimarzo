"use client";

import Pagina from "@/components/Pagina";
import React, { useEffect, useState, useMemo } from "react";
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaPlusSquare, FaTrashAlt } from "react-icons/fa";

export default function SolicitantesInicialPage() {
  const [solicitantes, setSolicitantes] = useState([]);

  // Carregar os solicitantes do localStorage
  useEffect(() => {
    const solicitantesLocalStorage =
      JSON.parse(localStorage.getItem("solicitantes")) || [];
    setSolicitantes(solicitantesLocalStorage);
    console.log(solicitantesLocalStorage);
  }, []);

  // Função para excluir um solicitante
  function apagar(solicitante) {
    if (
      window.confirm(`Deseja mesmo excluir o solicitante ${solicitante.nome}?`)
    ) {
      const novaLista = solicitantes.filter(
        (item) => item.id !== solicitante.id
      );
      setSolicitantes(novaLista); // Atualiza o estado
      localStorage.setItem("solicitantes", JSON.stringify(novaLista)); // Atualiza o localStorage
      alert("Solicitante excluído com sucesso!");
    }
  }

  return (
    <Pagina titulo="Solicitantes">
      <div className="text-end mb-2">
        <Button href="/solicitantes/form">
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
            <th>País:</th>
            <th>Estado:</th>
            <th>Renda:</th>
            <th>Jóia Solicitada</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {solicitantes.map((solicitante) => {
            return (
              <tr key={solicitante.id} className="text-center">
                <td>
                  {solicitante.foto && solicitante.foto.imagem ? (
                    <img
                      src={solicitante.foto.imagem}
                      width={80}
                      alt="Foto do solicitante"
                    />
                  ) : (
                    <span>Sem Foto</span> // Caso não tenha foto
                  )}
                </td>
                <td>{solicitante.nome}</td>
                <td>{solicitante.email}</td>
                <td>{solicitante.telefone}</td>
                <td>{solicitante.pais}</td>
                <td>{solicitante.estado}</td>
                <td>{solicitante.renda}</td>
                <td>{solicitante.joia}</td>
                <td className="text-center">
                  <Button
                    className="me-2"
                    href={`/solicitantes/form?id=${solicitante.id}`}
                  >
                    <FaEdit />
                  </Button>
                  <Button variant="danger" onClick={() => apagar(solicitante)}>
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
