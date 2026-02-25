export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { url, data, token } = req.body;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token || '',
                'Accept': '*/*',
                // Cabeçalhos essenciais capturados do seu cURL:
                'LocalAcesso': 'Consultor',
                'Origin': 'https://novoev.premiumclube.org.br',
                'Referer': 'https://novoev.premiumclube.org.br/',
                'Rota': 'https://novoev.premiumclube.org.br/',
                'HeaderUsuario': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            body: JSON.stringify(data)
        });

        const text = await response.text();
        const jsonStart = text.indexOf('{');
        const cleanJson = jsonStart !== -1 ? JSON.parse(text.substring(jsonStart)) : { error: text };

        return res.status(200).json(cleanJson);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}