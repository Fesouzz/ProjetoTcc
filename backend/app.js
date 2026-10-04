const express = require("express");
const path = require("path");
const cors = require("cors");

// 🔥 BLINDAGEM MÁXIMA: Tenta carregar o arquivo .env apontando de forma absoluta para a raiz da pasta backend
require("dotenv").config({
    path: path.resolve(__dirname, ".env")
});

// 🔥 CASO O SEU ARQUIVO .ENV NÃO SEJA LIDO, ESTA LINHA CONFIGURA A CHAVE DIRETAMENTE NA MEMÓRIA PARA O JWT NÃO DAR ERRO 500:
if (!process.env.JWT_SECRET) {
    process.env.JWT_SECRET = "CHAVE_SECRET_TCC_COMUNA";
}

const userRoutes = require("./src/routes/routes.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Endpoints principais da sua API
app.use("/api", userRoutes);

// Página inicial de teste da API
app.get("/", (req, res) => {
    res.json({
        mensagem: "API Comuna Esportes - Conectada via Pool MySQL com Sucesso!",
        status: "online"
    });
});

// Tratamento de Rota 404
app.use((req, res) => {
    res.status(404).json({
        sucesso: false,
        mensagem: "Rota não encontrada na API"
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor do TCC rodando com sucesso na porta ${PORT}!`);
});
