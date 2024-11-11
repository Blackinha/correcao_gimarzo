"use client";

import Pagina from "@/components/Pagina";
import React, { use } from "react";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaPlusSquare, FaTrashAlt } from "react-icons/fa";

export default function EquipeInicialPage() {
  const [equipes, setEquipes] = useState([]);

  useEffect(() => {
    const equipesLocalStorage =
      JSON.parse(localStorage.getItem("equipes")) || [];
    setEquipes(equipesLocalStorage);
    console.log(equipesLocalStorage);
  }, []);

  function apagar(membro) {
    if (window.confirm(`Deseja mesmo excluir o membro ${membro.nome}?`)) {
      const novaLista = equipes.filter((item) => item.id !== membro.id);
      localStorage.setItem("equipes", JSON.stringify(novaLista));
      setEquipes(novaLista);
      alert("Membro excluído com sucesso!!");
    }
  }

  return (
    <Pagina titulo="Membros da Equipe">
      <div className="text-end mb-2">
        <Button href="/equipe/form">
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
          </tr>
        </thead>
        <tbody>
          {equipes.map((membro) => {
            return (
              <tr key={membro.id} className="text-center">
                <td>
                  <img
                    src={membro.foto.imagem}
                    width={80}
                    alt="Foto do membro"
                  />
                </td>
                <td>{membro.nome}</td>
                <td>{membro.email}</td>
                <td>{membro.telefone}</td>
                <td>{membro.cpf}</td>
                <td>{membro.pais}</td>
                <td>{membro.estado}</td>
                <td>{membro.preferencia}</td>
                <td className="text-center">
                  <Button
                    className="me-2"
                    href={`/equipe/form?id=${membro.id}`}
                  >
                    <FaEdit />
                  </Button>
                  <Button variant="danger" onClick={() => apagar(membro)}>
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
