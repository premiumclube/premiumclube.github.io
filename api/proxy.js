export default async function handler(req, res) {
    // Permite que seu site se comunique com este proxy
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
                // O Token gigante do cURL é obrigatório até pro login!
                'Authorization': token || '', 
                'Accept': '*/*',
                
                // --- DISFARCE DE NAVEGADOR (Clone do seu cURL) ---
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
                'HeaderUsuario': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
                'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
                'LocalAcesso': 'Consultor',
                'Origin': 'https://novoev.premiumclube.org.br',
                'Referer': 'https://novoev.premiumclube.org.br/',
                'Rota': 'https://novoev.premiumclube.org.br/',
                'DNT': '1',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-site'
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