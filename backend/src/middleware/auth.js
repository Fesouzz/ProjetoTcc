const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
    const authHeader = req.headers.authorization; // formato: "Bearer TOKEN_AQUI"

    if (!authHeader) {
        return res.status(401).json({ sucesso: false, mensagem: "Token não fornecido." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const dados = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = dados; // disponibiliza os dados do usuário pras próximas funções
        next(); // deixa a requisição continuar
    } catch (error) {
        return res.status(401).json({ sucesso: false, mensagem: "Token inválido ou expirado." });
    }
}

module.exports = verificarToken;