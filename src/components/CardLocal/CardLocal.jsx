import "./CardLocal.css"

export default function CardLocal({ dados }) {
    return (
        <div className="card" data-theme={dados.tema}>
            <div className="card-header">
                <h2 className="card-title">{dados.titulo}</h2>
            </div>

            <div className="tags-container">
                {/* 1. Faixa Etária */}
                <div className="tag-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <span>{dados.faixaEtaria}</span>
                </div>

                {/* 2. 🔥 SEGUNDA PÍLULA: Vira link apenas se tiver o endereço do Maps configurado */}
                {dados.linkMaps ? (
                    <a 
                        href={dados.linkMaps} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="tag-item tag-link-maps"
                        title="Clique para abrir no Google Maps"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span style={{ textDecoration: "underline" }}>{dados.local}</span>
                    </a>
                ) : (
                    <div className="tag-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>{dados.local}</span>
                    </div>
                )}

                {/* 3. Telefone */}
                <div className="tag-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>{dados.telefone}</span>
                </div>

                {/* 4. Horário */}
                <div className="tag-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>{dados.horario}</span>
                </div>
            </div>
        </div>
    );
}
