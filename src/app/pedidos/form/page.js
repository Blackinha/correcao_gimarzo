"use client";

import Pagina from "@/components/Pagina";
import apiLocalidades from "@/services/apiLocalidades";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";
import InputMask from "react-input-mask";

export default function PedidosFormPage(props) {
  const [joiaFiltrada, setJoiaFiltrada] = useState([]);
  const [doadorFiltrado, setDoadorFiltrado] = useState([]);
  const [solicitanteFiltrado, setSolicitanteFiltrado] = useState([]);

  const router = useRouter();

  const joias = JSON.parse(localStorage.getItem("joias")) || [];
  const doadores = JSON.parse(localStorage.getItem("doadores")) || [];
  const solicitantes = JSON.parse(localStorage.getItem("solicitantes")) || [];

  const [paises, setPaises] = useState([]);
  const [estados, setEstados] = useState([]);

  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  const id = props.searchParams.id;
  const pedidoEditado = pedidos.find((item) => item.id == id);

  function salvar(dados) {
    if (pedidoEditado) {
      Object.assign(pedidoEditado, dados);
      localStorage.setItem("pedidos", JSON.stringify(pedidos));
    } else {
      dados.id = v4();
      pedidos.push(dados);
      localStorage.setItem("pedidos", JSON.stringify(pedidos));
    }
    alert("Pedido adicionado com sucesso!");
    router.push("/pedidos");
  }

  const initialValues = {
    foto: { imagem: "" },
    nome: "",
    email: "",
    telefone: "",
    pais: "Brasil",
    estado: "",
    renda: "",
    joia: "",
    valor: "",
    parcelas: "",
  };

  useEffect(() => {
    apiLocalidades.get("/paises").then((response) => setPaises(response.data));
    apiLocalidades
      .get("estados?orderBy=nome")
      .then((response) => setEstados(response.data));
  }, []);

  const validationSchema = Yup.object().shape({
    solicitante: Yup.string().required("Campo obrigatório"),
    solicitanteTelefone: Yup.string().required("Campo obrigatório"),
    doador: Yup.string().required("Campo obrigatório"),
    doadorPreferencia: Yup.string().required("Campo obrigatório"),
    joia: Yup.string().required("Campo obrigatório"),
    tipo: Yup.string().required("Campo obrigatório"),
    valor: Yup.string().required("Campo obrigatório"),
    parcelas: Yup.string().required("Campo obrigatório"),
  });

  return (
    <Pagina titulo={"Cadastro pedidos"}>
      <Formik
        initialValues={pedidoEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => {
          useEffect(() => {
            if (joias.length > 0) setJoiaFiltrada(joias);
          }, [joias]);

          useEffect(() => {
            if (doadores.length > 0) setDoadorFiltrado(doadores);
          }, [doadores]);

          useEffect(() => {
            if (solicitantes.length > 0) setSolicitanteFiltrado(solicitantes);
          }, [solicitantes]);

          useEffect(() => {
            if (values.joia) {
              const joiaSelecionada = joias.find(
                (joia) => joia.nome === values.joia
              );
              setFieldValue("valor", joiaSelecionada?.valorEstimado || "");
            } else {
              setFieldValue("valor", "");
            }
          }, [values.joia, setFieldValue, joias]);

          return (
            <Form onSubmit={handleSubmit}>
              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Solicitante:</Form.Label>
                  <Form.Select
                    name="solicitante"
                    value={values.solicitante}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldValue("solicitanteTelefone", "");
                    }}
                    onBlur={handleBlur}
                    isValid={touched.solicitante && !errors.solicitante}
                    isInvalid={touched.solicitante && errors.solicitante}
                  >
                    <option value="">Selecione</option>
                    {solicitanteFiltrado.map((solicitante) => (
                      <option key={solicitante.nome} value={solicitante.nome}>
                        {solicitante.nome}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.solicitante}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Telefone:</Form.Label>
                  <Form.Select
                    name="solicitanteTelefone"
                    value={values.solicitanteTelefone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={!values.solicitante}
                    isValid={
                      touched.solicitanteTelefone && !errors.solicitanteTelefone
                    }
                    isInvalid={
                      touched.solicitanteTelefone && errors.solicitanteTelefone
                    }
                  >
                    <option value="">Selecione</option>
                    {solicitanteFiltrado
                      .filter((sol) => sol.nome === values.solicitante)
                      .map((sol) => (
                        <option key={sol.telefone} value={sol.telefone}>
                          {sol.telefone}
                        </option>
                      ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.solicitanteTelefone}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Doador:</Form.Label>
                  <Form.Select
                    name="doador"
                    value={values.doador}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldValue("doadorPreferencia", "");
                    }}
                    onBlur={handleBlur}
                    isValid={touched.doador && !errors.doador}
                    isInvalid={touched.doador && errors.doador}
                  >
                    <option value="">Selecione</option>
                    {doadorFiltrado.map((doador) => (
                      <option key={doador.nome} value={doador.nome}>
                        {doador.nome}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.doador}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Contato Principal:</Form.Label>
                  <Form.Select
                    name="doadorPreferencia"
                    value={values.doadorPreferencia}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={!values.doador}
                    isValid={
                      touched.doadorPreferencia && !errors.doadorPreferencia
                    }
                    isInvalid={
                      touched.doadorPreferencia && errors.doadorPreferencia
                    }
                  >
                    <option value="">Selecione</option>
                    {doadorFiltrado
                      .filter((doador) => doador.nome === values.doador)
                      .map((doador) => (
                        <option key={doador.telefone} value={doador.telefone}>
                          {doador.telefone}
                        </option>
                      ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.doadorPreferencia}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Jóia Solicitada:</Form.Label>
                  <Form.Select
                    name="joia"
                    value={values.joia}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldValue("tipo", "");
                    }}
                    onBlur={handleBlur}
                    isValid={touched.joia && !errors.joia}
                    isInvalid={touched.joia && errors.joia}
                  >
                    <option value="">Selecione</option>
                    {joiaFiltrada.map((joia) => (
                      <option key={joia.nome} value={joia.nome}>
                        {joia.nome}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.joia}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Tipo da Jóia:</Form.Label>
                  <Form.Select
                    name="tipo"
                    value={values.tipo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={!values.joia}
                    isValid={touched.tipo && !errors.tipo}
                    isInvalid={touched.tipo && errors.tipo}
                  >
                    <option value="">Selecione</option>
                    {joiaFiltrada
                      .filter((j) => j.nome === values.joia)
                      .map((joia) => (
                        <option key={joia.tipo} value={joia.tipo}>
                          {joia.tipo}
                        </option>
                      ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.tipo}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Valor Estimado (R$):</Form.Label>
                  <Form.Control
                    type="text"
                    name="valor"
                    value={values.valor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.valor && !errors.valor}
                    isInvalid={touched.valor && errors.valor}
                    disabled
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.valor}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Percelas:</Form.Label>
                  <InputMask
                    mask="99x"
                    value={values.parcelas}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {(inputProps) => (
                      <Form.Control
                        {...inputProps}
                        name="parcelas"
                        isValid={touched.parcelas && !errors.parcelas}
                        isInvalid={touched.parcelas && errors.parcelas}
                      />
                    )}
                  </InputMask>
                  <Form.Control.Feedback type="invalid">
                    {errors.parcelas}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Form.Group className="text-end">
                <Button className="me-2" href="/pedidos">
                  <FaArrowLeft /> Voltar
                </Button>
                <Button type="submit" variant="success">
                  <FaCheck /> Enviar
                </Button>
              </Form.Group>
            </Form>
          );
        }}
      </Formik>
    </Pagina>
  );
}
