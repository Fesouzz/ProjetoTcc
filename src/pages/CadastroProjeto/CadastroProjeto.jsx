import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CadastroProj.css";

// Enquanto não houver API, usamos esta lista. Os ids batem com a tabela Modalidades.
// Depois, troque por um fetch: GET /modalidades (apenas aprovada = TRUE).
const MODALIDADES_CATALOGO = [
  { id_mod: 1, modalidade: "Artes marciais" },
  { id_mod: 2, modalidade: "Futebol" },
  { id_mod: 3, modalidade: "Basquete" },
  { id_mod: 4, modalidade: "Vôlei" },
];

const DIAS_SEMANA = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

const MAX_MODALIDADES = 6;
const MAX_CARACTERES_OUTRA = 50;
const IDADE_LIMITE = 100;

const estadoInicial = {
  projeto: "",
  cnpj: "",
  idadeMinima: "",
  idadeMaxima: "",
  horaInicio: "",
  horaFim: "",
  local: "",
  telefone: "",
  email: "",
  descricao: "",
};

/* ---------- Funções auxiliares ---------- */

// Primeira letra maiúscula, sem espaços extras
function normalizar(texto) {
  const limpo = texto.trim().replace(/\s+/g, " ");
  return limpo.charAt(0).toUpperCase() + limpo.slice(1).toLowerCase();
}

// Aceita CNPJ numérico e o alfanumérico (novo formato). Mantém só letras e números.
function limparCNPJ(valor) {
  return valor.toUpperCase().replace(/[^0-9A-Z]/g, "").slice(0, 14);
}

// 00.000.000/0000-00
function mascararCNPJ(valor) {
  const c = limparCNPJ(valor);
  let r = c.slice(0, 2);
  if (c.length > 2) r += "." + c.slice(2, 5);
  if (c.length > 5) r += "." + c.slice(5, 8);
  if (c.length > 8) r += "/" + c.slice(8, 12);
  if (c.length > 12) r += "-" + c.slice(12, 14);
  return r;
}

// Valida formato e dígitos verificadores (vale para numérico e alfanumérico)
function cnpjValido(valor) {
  const c = limparCNPJ(valor);
  if (!/^[0-9A-Z]{12}[0-9]{2}$/.test(c)) return false;
  if (/^(.)\1+$/.test(c)) return false; // todos os caracteres iguais

  const calcDV = (base, pesos) => {
    const soma = base
      .split("")
      .reduce((acc, ch, i) => acc + (ch.charCodeAt(0) - 48) * pesos[i], 0);
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const dv1 = calcDV(c.slice(0, 12), [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const dv2 = calcDV(
    c.slice(0, 12) + dv1,
    [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  );
  return c.slice(12) === `${dv1}${dv2}`;
}

// (11) 99999-9999 ou (11) 9999-9999
function mascararTelefone(valor) {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10)
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/* ---------- Componente ---------- */

export default function InscreverProjeto() {
  const navigate = useNavigate();
  const [form, setForm] = useState(estadoInicial);
  const [modalidadesSel, setModalidadesSel] = useState([]);
  const [outraAtiva, setOutraAtiva] = useState(false);
  const [outraTexto, setOutraTexto] = useState("");
  const [diasSel, setDiasSel] = useState([]);
  const [erros, setErros] = useState({});

  function limparErro(campo) {
    setErros((e) => (e[campo] ? { ...e, [campo]: undefined } : e));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((anterior) => ({ ...anterior, [name]: value }));
    limparErro(name);
    if (name === "idadeMinima" || name === "idadeMaxima") limparErro("idade");
    if (name === "horaInicio" || name === "horaFim") limparErro("horario");
  }

  function handleCNPJ(e) {
    setForm((a) => ({ ...a, cnpj: mascararCNPJ(e.target.value) }));
    limparErro("cnpj");
  }

  function handleTelefone(e) {
    setForm((a) => ({ ...a, telefone: mascararTelefone(e.target.value) }));
    limparErro("telefone");
  }

  function toggleModalidade(id) {
    limparErro("modalidades");
    setModalidadesSel((atual) =>
      atual.includes(id) ? atual.filter((x) => x !== id) : [...atual, id]
    );
  }

  function toggleOutra(e) {
    limparErro("modalidades");
    setOutraAtiva(e.target.checked);
    if (!e.target.checked) setOutraTexto("");
  }

  function toggleDia(dia) {
    limparErro("dias");
    setDiasSel((atual) =>
      atual.includes(dia) ? atual.filter((d) => d !== dia) : [...atual, dia]
    );
  }

  // "Capoeira, Natação" -> ["Capoeira", "Natação"] (sem vazios e sem repetidos)
  function extrairOutras() {
    if (!outraAtiva) return [];
    const lista = outraTexto
      .split(",")
      .map(normalizar)
      .filter((t) => t.length > 0);
    return [...new Set(lista)];
  }

  function validar(outras) {
    const e = {};

    if (!cnpjValido(form.cnpj)) e.cnpj = "CNPJ inválido. Confira os dígitos.";

    const min = Number(form.idadeMinima);
    const max = Number(form.idadeMaxima);
    if (form.idadeMinima === "" || form.idadeMaxima === "") {
      e.idade = "Informe a idade mínima e a máxima.";
    } else if (min < 0 || max > IDADE_LIMITE) {
      e.idade = `As idades devem ficar entre 0 e ${IDADE_LIMITE}.`;
    } else if (min > max) {
      e.idade = "A idade mínima não pode ser maior que a máxima.";
    }

    if (form.horaInicio && form.horaFim && form.horaFim <= form.horaInicio) {
      e.horario = "O horário de término deve ser depois do início.";
    }

    if (diasSel.length === 0) e.dias = "Selecione pelo menos um dia.";

    const telDigitos = form.telefone.replace(/\D/g, "");
    if (telDigitos.length < 10) e.telefone = "Telefone incompleto.";

    const total = modalidadesSel.length + outras.length;
    if (outraAtiva && outras.length === 0) {
      e.modalidades =
        "Digite o nome da outra modalidade ou desmarque a opção.";
    } else if (total === 0) {
      e.modalidades = "Selecione pelo menos uma modalidade.";
    } else if (total > MAX_MODALIDADES) {
      e.modalidades = `Escolha no máximo ${MAX_MODALIDADES} modalidades.`;
    } else if (outras.some((t) => t.length > MAX_CARACTERES_OUTRA)) {
      e.modalidades = `Cada modalidade pode ter no máximo ${MAX_CARACTERES_OUTRA} caracteres.`;
    }

    return e;
  }

  function handleSubmit(ev) {
    ev.preventDefault();

    const outras = extrairOutras();
    const novosErros = validar(outras);
    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      // Leva a pessoa ao primeiro erro
      setTimeout(() => {
        document
          .querySelector("[data-erro='true']")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 0);
      return;
    }

    // Nomes iguais aos da tabela Projeto. O id_usuario vem da sessão no back-end.
    const payload = {
      nome: form.projeto.trim(),
      cnpj: limparCNPJ(form.cnpj), // 14 caracteres, sem pontuação
      idade_minima: Number(form.idadeMinima),
      idade_maxima: Number(form.idadeMaxima),
      local: form.local.trim(),
      hora_inicio: form.horaInicio, // "HH:MM"
      hora_fim: form.horaFim,
      dias_funcionamento: DIAS_SEMANA.filter((d) => diasSel.includes(d)).join(
        ", "
      ),
      telefone: form.telefone,
      email: form.email.trim(),
      descricao: form.descricao.trim(),
      modalidades: modalidadesSel, // ids do catálogo
      outras_modalidades: outras, // viram sugestão (aprovada = FALSE)
    };

    // TODO: enviar `payload` para a sua API
    console.log(payload);

    alert(
      "Proposta enviada com sucesso! Nossa equipe entrará em contato para validar o cadastro."
    );
    navigate("/");
  }

  // Atributos para marcar o campo com erro (acessibilidade + scroll)
  const erroProps = (campo) => ({
    "aria-invalid": erros[campo] ? "true" : undefined,
    "data-erro": erros[campo] ? "true" : undefined,
  });

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Inscreva seu Projeto</h1>
        <p>
          Deixe a sua proposta e traga o racha, quadro ou coletivo cultural da
          sua quebrada para o mapa oficial do Comuna Esportes.
        </p>
      </div>

      <form className="project-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          
          <label htmlFor="projeto"  className="obrigatorio" >Nome do Projeto, Time ou Crew</label>

          <input type="text" id="projeto" name="projeto" maxLength={120}
            placeholder="Ex: Ritmo e Poesia Crew"
            value={form.projeto}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cnpj" className="obrigatorio" >CNPJ da organização</label>
          <input
            type="text"
            id="cnpj"
            name="cnpj"
            inputMode="text"
            autoComplete="off"
            placeholder="00.000.000/0000-00"

            value={form.cnpj}
            onChange={handleCNPJ}
            required
            {...erroProps("cnpj")}
          />
          {erros.cnpj && <p className="campo-erro" role="alert">{erros.cnpj}</p>}
        </div>

        <fieldset className="form-group modalidades-fieldset" >
          <legend  className="obrigatorio" >Modalidades atendidas</legend>
          <p className="campo-ajuda">Marque todas as que o projeto oferece.</p>

          <div className="checkbox-grid" {...erroProps("modalidades")}>
            {MODALIDADES_CATALOGO.map((m) => (
              <label key={m.id_mod} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={modalidadesSel.includes(m.id_mod)}
                  onChange={() => toggleModalidade(m.id_mod)}
                />
                <span>{m.modalidade}</span>
              </label>
            ))}

            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={outraAtiva}
                onChange={toggleOutra}
              />
              <span>Outra</span>
            </label>
          </div>

          {outraAtiva && (
            <div className="outra-campo">
              <label htmlFor="outraModalidade">Qual modalidade?</label>
              <input
                type="text"
                id="outraModalidade"
                placeholder="Ex: Capoeira (separe várias por vírgula)"
                value={outraTexto}
                onChange={(e) => {
                  limparErro("modalidades");
                  setOutraTexto(e.target.value);
                }}
                autoFocus
              />
              <small className="campo-ajuda">
                Modalidades novas passam por aprovação da nossa equipe.
              </small>
            </div>
          )}

          {erros.modalidades && (
            <p className="campo-erro" role="alert">{erros.modalidades}</p>
          )}
        </fieldset>

        <fieldset className="form-group modalidades-fieldset">
          <legend  className="obrigatorio"  >Faixa etária atendida</legend>
          <div className="linha-dupla" {...erroProps("idade")}>
            <div className="campo-inline">
              <label htmlFor="idadeMinima">De (anos)</label>
              <input
                type="number"
                id="idadeMinima"
                name="idadeMinima"
                min="0"
                max={IDADE_LIMITE}
                placeholder="Ex: 10"
                value={form.idadeMinima}
                onChange={handleChange}
                required
              />
            </div>
            <div className="campo-inline">
              <label htmlFor="idadeMaxima">Até (anos)</label>
              <input
                type="number"
                id="idadeMaxima"
                name="idadeMaxima"
                min="0"
                max={IDADE_LIMITE}
                placeholder="Ex: 16"
                value={form.idadeMaxima}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {erros.idade && <p className="campo-erro" role="alert">{erros.idade}</p>}
        </fieldset>

        <fieldset className="form-group modalidades-fieldset chips" >
          <legend  className="obrigatorio"  >Dias e horário das atividades</legend>

          <div className="checkbox-grid dias-grid" {...erroProps("dias")}>
            {DIAS_SEMANA.map((dia) => (
              <label key={dia} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={diasSel.includes(dia)}
                  onChange={() => toggleDia(dia)}
                />
                <span>{dia}</span>
              </label>
            ))}
          </div>
          {erros.dias && <p className="campo-erro" role="alert">{erros.dias}</p>}

          <div className="linha-dupla" {...erroProps("horario")}>
            <div className="campo-inline">
              <label htmlFor="horaInicio">Início</label>
              <input
                type="time"
                id="horaInicio"
                name="horaInicio"
                value={form.horaInicio}
                onChange={handleChange}
                required
              />
            </div>
            <div className="campo-inline">
              <label htmlFor="horaFim">Término</label>
              <input
                type="time"
                id="horaFim"
                name="horaFim"
                value={form.horaFim}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {erros.horario && (
            <p className="campo-erro" role="alert">{erros.horario}</p>
          )}
        </fieldset>

        <div className="form-group">
          <label htmlFor="local"  className="obrigatorio" >Local das Atividades / Ensaios</label>
          <input
            type="text"
            id="local"
            name="local"
            maxLength={200}
            placeholder="Ex: Galpão Cultural, Quadra do Bairro, CDC, etc."
            value={form.local}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefone">Telefone / WhatsApp do projeto</label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            autoComplete="tel"
            placeholder="(11) 99999-9999"
            value={form.telefone}
            onChange={handleTelefone}
            required
            {...erroProps("telefone")}
          />
          {erros.telefone && (
            <p className="campo-erro" role="alert">{erros.telefone}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email"  className="obrigatorio" >E-mail do projeto</label>
          <input
            type="email"
            id="email"
            name="email"
            maxLength={100}
            autoComplete="email"
            placeholder="email@comunidade.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição e objetivos da proposta</label>
          <textarea
            id="descricao"
            name="descricao"
            rows="4"
            placeholder="Conte como funciona o projeto, quem da comunidade pode participar e qual é o objetivo..."
            value={form.descricao}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-submit">
          Enviar Proposta
        </button>
      </form>
    </div>
  );
}