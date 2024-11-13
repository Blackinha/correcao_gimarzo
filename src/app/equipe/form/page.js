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

export default function EquipesFormPage(props) {
  const router = useRouter();

  const [paises, setPaises] = useState([]);
  const [estados, setEstados] = useState([]);

  const equipes = JSON.parse(localStorage.getItem("equipes")) || [];

  const id = props.searchParams.id;
  console.log(props.searchParams.id);
  const equipeEditada = equipes.find((item) => item.id == id);
  console.log(equipeEditada);

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

  function salvar(dados) {
    if (equipeEditada) {
      Object.assign(equipeEditada, dados);
      localStorage.setItem("equipes", JSON.stringify(equipes));
    } else {
      dados.id = v4();
      equipes.push(dados);
      localStorage.setItem("equipes", JSON.stringify(equipes));
    }

    alert("Membro criado com sucesso!");
    router.push("/equipe");
  }

  const initialValues = {
    foto: { imagem: "" },
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    pais: "Brasil",
    estado: "",
    funcao: "",
  };

  const validationSchema = Yup.object().shape({
    foto: Yup.object().shape({
      imagem: Yup.mixed().required("Campo Obrigatório"),
    }),
    nome: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email().required("Campo Obrigatório"),
    telefone: Yup.string().required("Campo Obrigatório"),
    cpf: Yup.string().required("Campo Obrigatório"),
    pais: Yup.string().required("Campo obrigatório"),
    estado: Yup.string().required("Campo Obrigatório"),
    funcao: Yup.string().required("Campo obrigatório"),
  });

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  return (
    <Pagina titulo={"Cadastro Equipe"}>
      {/* Formulário */}

      <Formik
        initialValues={equipeEditada || initialValues}
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
          return (
            <Form onSubmit={handleSubmit}>
              {/* Campos do form */}
              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Foto:</Form.Label>
                  <Form.Control
                    onChange={async (event) => {
                      const file = event.currentTarget.files[0];
                      const base64 = await convertToBase64(file);
                      setFieldValue("foto.imagem", base64);
                    }}
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
                    name="email"
                    type="email"
                    placeholder="exemplo@email.com"
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
                  <Form.Label>CPF:</Form.Label>
                  <InputMask
                    mask="999.999.999-99"
                    maskPlaceholder={null}
                    value={values.cpf}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {(inputProps) => (
                      <Form.Control
                        {...inputProps}
                        name="cpf"
                        isValid={touched.cpf && !errors.cpf}
                        isInvalid={touched.cpf && errors.cpf}
                      />
                    )}
                  </InputMask>
                  <Form.Control.Feedback type="invalid">
                    {errors.cpf}
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
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Função:</Form.Label>
                  <Form.Control
                    name="funcao"
                    value={values.funcao}
                    as="textarea"
                    rows={5}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.funcao && !errors.funcao}
                    isInvalid={touched.funcao && errors.funcao}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.funcao}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              {/* botões */}
              <Form.Group className="text-end">
                <Button className="me-2" href="/equipes">
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
