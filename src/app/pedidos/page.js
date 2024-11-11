"use client";

import Pagina from "@/components/Pagina";
import React, { use } from "react";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaPlusSquare, FaTrashAlt } from "react-icons/fa";

export default function PedidosInicialPage() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const pedidosLocalStorage =
      JSON.parse(localStorage.getItem("pedidos")) || [];
    setPedidos(pedidosLocalStorage);
    console.log(pedidosLocalStorage);
  }, []);

  function apagar(pedido) {
    if (window.confirm(`Deseja mesmo excluir o pedido ${pedido.nome}?`)) {
      const novaLista = pedidos.filter((item) => item.id !== pedido.id);
      localStorage.setItem("pedidos", JSON.stringify(novaLista));
      setPedidos(novaLista);
      alert("pedido excluído com sucesso!!");
    }
  }

  return (
    <Pagina titulo="Pedidos">
      <div className="text-end mb-2">
        <Button href="/pedidos/form">
          <FaPlusSquare /> Novo
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Solicitante:</th>
            <th>Contato:</th>
            <th>Doador:</th>
            <th>Tipo de Contato:</th>
            <th>Jóia:</th>
            <th>Tipo:</th>
            <th>Quantidade:</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => {
            return (
              <tr key={pedido.id} className="text-center">
                <td>{pedido.solicitante}</td>
                <td>{pedido.solicitanteTelefone}</td>
                <td>{pedido.doador}</td>
                <td>{pedido.doadorPreferencia}</td>
                <td>{pedido.joia}</td>
                <td>{pedido.tipo}</td>
                <td>{pedido.quantidade}</td>
                <td className="text-center">
                  <Button
                    className="me-2"
                    href={`/pedidos/form?id=${pedido.id}`}
                  >
                    <FaEdit />
                  </Button>
                  <Button variant="danger" onClick={() => apagar(pedido)}>
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
