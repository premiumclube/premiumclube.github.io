export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, LocalAcesso, Rota');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { path } = req.query;
    const targetUrl = `https://service-provisorio.premiumclube.org.br${path}`;

    try {
        const response = await fetch(targetUrl, {
            method: req.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.authorization || '',
                'LocalAcesso': 'Consultor',
                'Origin': 'https://novoev.premiumclube.org.br',
                'Referer': 'https://novoev.premiumclube.org.br/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            body: req.method === 'POST' ? JSON.stringify(req.body) : null
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        res.status(500).json({ erro: 'Erro no Proxy', detalhes: error.message });
    }
}