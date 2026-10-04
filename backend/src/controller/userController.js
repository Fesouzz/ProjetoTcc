const db = require("../config/pool.js");
const jwt = require("jsonwebtoken");

const ListarUsuarios = async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT id, nome, email, telefone, endereco, dt_nasc, tipo_acesso FROM cadusers"
        );
        res.status(200).json({
            sucesso: true,
            total: rows.length,
            dados: rows
        });
    } catch (error) {
        res.status(500).json({ sucesso: false, mensagem: "Erro ao listar usuários", erro: error.message });
    }
};

const adicionarUsuario = async (req, res) => {
    try {
        const { nome, email, telefone, endereco, dt_nasc, senha, tipo_acesso } = req.body;

        if (!nome || !email || !telefone || !endereco || !dt_nasc || !senha) {
            return res.status(400).json({ sucesso: false, mensagem: "Preencha todos os campos obrigatórios." });
        }

        const [usuarios] = await db.query("SELECT id FROM cadusers WHERE email = ?", [email]);
        if (usuarios.length > 0) {
            return res.status(400).json({ sucesso: false, mensagem: "Este e-mail já está cadastrado." });
        }

        await db.query(
            "INSERT INTO cadusers (nome, email, telefone, endereco, dt_nasc, senha, tipo_acesso) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [nome, email, telefone, endereco, dt_nasc, senha, tipo_acesso || 'comum']
        );

        res.status(201).json({ sucesso: true, mensagem: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        res.status(500).json({ sucesso: false, mensagem: error.message });
    }
};

const efetuarLogin = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ sucesso: false, mensagem: "E-mail e senha são obrigatórios." });
        }

        // Busca o usuário correspondente na tabela oficial cadusers
        const [linhas] = await db.query(
            "SELECT id, nome, email, senha, tipo_acesso FROM cadusers WHERE email = ?",
            [email]
        );

        if (linhas.length === 0) {
            return res.status(404).json({ sucesso: false, mensagem: "Usuário ou e-mail não encontrado." });
        }

        // 🔥 CORREÇÃO CIRÚRGICA: Pega estritamente o PRIMEIRO objeto da linha retornada pelo MySQL
        const usuario = linhas[0];

        // Agora a validação de segurança lê a propriedade de forma correta e sem travar
        if (usuario.senha !== senha) {
            return res.status(401).json({ sucesso: false, mensagem: "Senha incorreta." });
        }

        // Assina o Payload do JWT com as informações essenciais para o React interpretar o controle de acesso
        const token = jwt.sign(
            {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                tipo_acesso: usuario.tipo_acesso
            },
            process.env.JWT_SECRET || "",
            { expiresIn: "6h" }
        );

        return res.status(200).json({
            sucesso: true,
            mensagem: "Autenticação efetuada com sucesso!",
            token
        });

    } catch (error) {
        // Exibe o erro exato no terminal do VS Code para ajudar no diagnóstico se algo mais der errado
        console.error("Erro interno no login:", error.message);
        return res.status(500).json({ sucesso: false, mensagem: "Erro interno de autenticação", erro: error.message });
    }
};

module.exports = {
    ListarUsuarios,
    adicionarUsuario,
    efetuarLogin
};
