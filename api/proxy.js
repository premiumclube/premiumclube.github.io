export default async function handler(req, res) {
    // Cabeçalhos de CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { url, data, token } = req.body;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token || '',
                'LocalAcesso': 'Consultor',
                'Origin': 'https://novoev.premiumclube.org.br',
                'Referer': 'https://novoev.premiumclube.org.br/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        return res.status(response.status).json(result);
    } catch (error) {
        console.error("Erro no Proxy:", error);
        return res.status(500).json({ error: "Erro interno no servidor proxy", detalhes: error.message });
    }
}