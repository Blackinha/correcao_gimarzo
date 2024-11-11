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

export default function solicitantesFormPage(props) {
  const [joiaFiltrada, setJoiaFiltrada] = useState([]);

  const router = useRouter();

  const joias = JSON.parse(localStorage.getItem("joias"));

  const [paises, setPaises] = useState([]);
  const [estados, setEstados] = useState([]);

  const solicitantes = JSON.parse(localStorage.getItem("solicitantes")) || [];

  const id = props.searchParams.id;
  console.log(props.searchParams.id);
  const solicitanteEditado = solicitantes.find((item) => item.id == id);
  console.log(solicitanteEditado);

  function salvar(dados) {
    if (solicitanteEditado) {
      Object.assign(solicitanteEditado, dados);
      localStorage.setItem("solicitantes", JSON.stringify(solicitantes));
    } else {
      dados.id = v4();
      solicitantes.push(dados);
      localStorage.setItem("solicitantes", JSON.stringify(solicitantes));
    }

    alert("Solicitante adicionado com sucesso!");
    router.push("/solicitantes");
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
  };

  useEffect(() => {
    apiLocalidades.get("/paises").then((response) => {
      console.log("paises >>> ", response.data);
      setPaises(response.data);
    });

    apiLocalidades.get("estados?orderBy=nome").then((response) => {
      console.log("estados >>> ", response.data);
      setEstados(response.data);
    });
  }, []);

  const validationSchema = Yup.object().shape({
    foto: Yup.object().shape({
      imagem: Yup.mixed().required("Campo Obrigatório"),
    }),
    nome: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email().required("Campo Obrigatório"),
    telefone: Yup.string().required("Campo Obrigatório"),
    pais: Yup.string().required("Campo obrigatório"),
    estado: Yup.string().required("Campo Obrigatório"),
    renda: Yup.string().required("Campo Obrigatório"),
    joia: Yup.string().required("Campo Obrigatório"),
  });

  return (
    <Pagina titulo={"Cadastro Solicitantes"}>
      {/* Formulário */}

      <Formik
        initialValues={solicitanteEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {/* construção do template do formulário */}
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
            if (props.searchParams.id) return;
            if (joias.length > 0) {
              setJoiaFiltrada(joias);
            }
          }, [joias]);

          useEffect(() => {
            if (props.searchParams.id && solicitanteEditado) {
              setJoiaFiltrada(
                joias.filter((joia) => joia.nome === solicitanteEditado.Joia)
              );
            }
          }, [solicitanteEditado]);

          return (
            <Form onSubmit={handleSubmit}>
              {/* Campos do form */}
              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Foto:</Form.Label>
                  <Form.Control
                    onChange={(event) =>
                      setFieldValue(
                        "foto.imagem",
                        URL.createObjectURL(event.currentTarget.files[0])
                      )
                    }
                    type="file"
                    name="foto.imagem"
                    onBlur={handleBlur}
                    isValid={touched.foto?.imagem && !errors.foto?.imagem}
                    isInvalid={touched.foto?.imagem && errors.foto?.imagem}
                  />
                  {values.foto.imagem && (
                    <img src={values.foto.imagem} alt="Preview" width="100" />
                  )}
                  <Form.Control.Feedback type="invalid">
                    {errors.foto?.imagem}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Nome:</Form.Label>
                  <Form.Control
                    name="nome"
                    type="text"
                    value={values.nome}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.nome && !errors.nome}
                    isInvalid={touched.nome && errors.nome}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nome}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>E-mail:</Form.Label>
                  <Form.Control
                    placeholder="exemplo@email.com"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.email && !errors.email}
                    isInvalid={touched.email && errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Telefone:</Form.Label>
                  <InputMask
                    mask="(99) 99999-9999"
                    maskPlaceholder={null}
                    value={values.telefone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {(inputProps) => (
                      <Form.Control
                        {...inputProps}
                        name="telefone"
                        isValid={touched.telefone && !errors.telefone}
                        isInvalid={touched.telefone && errors.telefone}
                      />
                    )}
                  </InputMask>

                  <Form.Control.Feedback type="invalid">
                    {errors.telefone}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Renda:</Form.Label>
                  <InputMask
                    maskPlaceholder="R$ 999,99"
                    value={values.renda}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <Form.Control
                      name="renda"
                      isValid={touched.renda && !errors.renda}
                      isInvalid={touched.renda && errors.renda}
                    />
                  </InputMask>
                  <Form.Control.Feedback type="invalid">
                    {errors.renda}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Pais:</Form.Label>
                  <Form.Select
                    name="pais"
                    value={values.pais}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.pais && !errors.pais}
                    isInvalid={touched.pais && errors.pais}
                  >
                    <option value="">Selecione</option>
                    {paises.map((pais) => (
                      <option value={pais.nome}>{pais.nome}</option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.pais}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Estado:</Form.Label>
                  <Form.Select
                    name="estado"
                    value={values.estado}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={values.pais !== "Brasil"}
                    isValid={touched.estado && !errors.estado}
                    isInvalid={touched.estado && errors.estado}
                  >
                    <option value="">Selecione</option>
                    {estados.map((estado) => (
                      <option value={estado.sigla}>{estado.sigla}</option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.estado}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Jóia Solicitada:</Form.Label>
                  <Form.Select
                    name="joia"
                    value={values.joia}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.joia && !errors.joia}
                    isInvalid={touched.joia && errors.joia}
                  >
                    <option value="">Selecione</option>
                    {joiaFiltrada.map((joia) => (
                      <option value={joia.nome}>{joia.nome}</option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.joia}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              {/* botões */}
              <Form.Group className="text-end">
                <Button className="me-2" href="/solicitantes">
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
