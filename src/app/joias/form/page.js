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

export default function JoiasFormPage(props) {
  const [doadorFiltrado, setDoadorFiltrado] = useState([]);

  const router = useRouter();

  const doadores = JSON.parse(localStorage.getItem("doadores")) || [];

  const joias = JSON.parse(localStorage.getItem("joias")) || [];

  const id = props.searchParams.id;
  console.log(props.searchParams.id);
  const joiaEditada = joias.find((item) => item.id == id);
  console.log(joiaEditada);

  function salvar(dados) {
    if (joiaEditada) {
      Object.assign(joiaEditada, dados);
      localStorage.setItem("joias", JSON.stringify(joias));
    } else {
      dados.id = v4();
      joias.push(dados);
      localStorage.setItem("joias", JSON.stringify(joias));
    }

    alert("Jóia adicionada com sucesso!");
    router.push("/joias");
  }

  const initialValues = {
    foto: { imagem: "" },
    nome: "",
    tipo: "",
    descricao: "",
    valorEstimado: "",
    condicao: "",
    estoque: "",
    doador: "",
  };

  const validationSchema = Yup.object().shape({
    foto: Yup.object().shape({
      imagem: Yup.mixed().required("Campo Obrigatório"),
    }),
    nome: Yup.string().required("Campo obrigatório"),
    tipo: Yup.string().required("Campo Obrigatório"),
    descricao: Yup.string().required("Campo Obrigatório"),
    valorEstimado: Yup.string().required("Campo Obrigatório"),
    condicao: Yup.string().required("Campo obrigatório"),
    estoque: Yup.number().required("Campo Obrigatório"),
    doador: Yup.string().required("Campo Obrigatório"),
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
    <Pagina titulo={"Cadastro Jóias"}>
      {/* Formulário */}

      <Formik
        initialValues={joiaEditada || initialValues}
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
            // Filtro do doador, mas só quando o campo 'doador' for alterado
            if (props.searchParams.id) return; // Evitar de rodar durante a edição
            if (doadores.length > 0) {
              setDoadorFiltrado(doadores);
            }
          }, [doadores]);

          useEffect(() => {
            if (props.searchParams.id && joiaEditada) {
              setDoadorFiltrado(
                doadores.filter((doador) => doador.nome === joiaEditada.doador)
              );
            }
          }, [joiaEditada]);

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
                  <Form.Label>Nome da Jóia:</Form.Label>
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
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="descricao"
                    type="descricao"
                    value={values.descricao}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.descricao && !errors.descricao}
                    isInvalid={touched.descricao && errors.descricao}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.descricao}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Valor Estimado:</Form.Label>
                  <InputMask
                    mask="R$ 999,99"
                    value={values.valorEstimado}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {(inputProps) => (
                      <Form.Control
                        {...inputProps}
                        name="valorEstimado"
                        isValid={touched.valorEstimado && !errors.valorEstimado}
                        isInvalid={
                          touched.valorEstimado && errors.valorEstimado
                        }
                      />
                    )}
                  </InputMask>
                  <Form.Control.Feedback type="invalid">
                    {errors.valorEstimado}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Tipo:</Form.Label>
                  <Form.Select
                    name="tipo"
                    value={values.tipo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.tipo && !errors.tipo}
                    isInvalid={touched.tipo && errors.tipo}
                  >
                    <option value="">Selecione:</option>
                    <option value="Colar">Colar</option>
                    <option value="Pingente">Pingente</option>
                    <option value="Bracelete">Bracelete</option>
                    <option value="Anel">Anel</option>
                    <option value="Brinco">Brinco</option>
                    <option value="Jóia">Jóia</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.tipo}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Condição:</Form.Label>
                  <Form.Select
                    name="condicao"
                    value={values.condicao}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.condicao && !errors.condicao}
                    isInvalid={touched.condicao && errors.condicao}
                  >
                    <option value="">Selecione:</option>
                    <option value="Nova">Nova</option>
                    <option value="Semi-Nova">Semi-Nova</option>
                    <option value="Usada">Usada</option>
                    <option value="Ruim">Ruim</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.condicao}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Doador:</Form.Label>
                  <Form.Select
                    name="doador"
                    value={values.doador}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.doador && !errors.doador}
                    isInvalid={touched.doador && errors.doador}
                  >
                    <option value="">Selecione</option>
                    {doadorFiltrado.map((doador) => (
                      <option value={doador.nome}>{doador.nome}</option>
                    ))}
                  </Form.Select>

                  <Form.Control.Feedback type="invalid">
                    {errors.doador}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Quantidade em Estoque:</Form.Label>
                  <Form.Control
                    name="estoque"
                    type="number"
                    value={values.estoque}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.estoque && !errors.estoque}
                    isInvalid={touched.estoque && errors.estoque}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.estoque}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              {/* botões */}
              <Form.Group className="text-end">
                <Button className="me-2" href="/joias">
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
