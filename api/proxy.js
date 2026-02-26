export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') return res.status(200).end();

    // Adicionamos o 'method' no body recebido do nosso HTML
    const { url, data, token, method } = req.body;
    const targetMethod = method || 'POST'; // Padrão é POST se não for informado

    try {
        const response = await fetch(url, {
            method: targetMethod,
            headers: {
                // Se for POST, envia JSON. Se for GET, o Content-Type muda.
                'Content-Type': targetMethod === 'POST' ? 'application/json' : 'text/plain',
                'Authorization': token || '',
                'LocalAcesso': 'Consultor',
                'Origin': 'https://novoev.premiumclube.org.br',
                'Referer': 'https://novoev.premiumclube.org.br/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36'
            },
            // GET não pode ter body
            body: targetMethod === 'POST' ? JSON.stringify(data) : null
        });

        const result = await response.json();
        return res.status(response.status).json(result);
    } catch (error) {
        console.error("Erro no Proxy Vercel:", error);
        return res.status(500).json({ error: "Erro interno", detalhes: error.message });
    }
}