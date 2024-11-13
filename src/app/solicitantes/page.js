"use client";

import Pagina from "@/components/Pagina";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaPlusSquare, FaTrashAlt } from "react-icons/fa";
import styles from "../PagePic.module.css";

export default function SolicitantesInicialPage() {
  const [solicitantes, setSolicitantes] = useState([]);

  useEffect(() => {
    const solicitantesLocalStorage =
      JSON.parse(localStorage.getItem("solicitantes")) || [];
    setSolicitantes(solicitantesLocalStorage);
  }, []);

  function apagar(solicitante) {
    if (
      window.confirm(`Deseja mesmo excluir o solicitante ${solicitante.nome}?`)
    ) {
      const novaLista = solicitantes.filter(
        (item) => item.id !== solicitante.id
      );
      setSolicitantes(novaLista);
      localStorage.setItem("solicitantes", JSON.stringify(novaLista));
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

      <div className={styles.tableWrapper}>
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
                        alt="Foto do solicitante"
                      />
                    ) : (
                      <span className={styles.noImageText}>Sem Foto</span>
                    )}
                  </td>
                  <td>{solicitante.nome}</td>
                  <td>{solicitante.email}</td>
                  <td>{solicitante.telefone}</td>
                  <td>{solicitante.pais}</td>
                  <td>{solicitante.estado}</td>
                  <td>{solicitante.renda}</td>
                  <td>{solicitante.joia}</td>
                  <td className={styles.tableActions}>
                    <Button
                      className="me-2"
                      href={`/solicitantes/form?id=${solicitante.id}`}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => apagar(solicitante)}
                    >
                      <FaTrashAlt />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Pagina>
  );
}
