export default async function handler(req, res) {
    // Habilita CORS para que seu HTML fale com essa API
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
                'Authorization': token,
                'Accept': '*/*'
            },
            body: JSON.stringify(data)
        });

        const text = await response.text();
        
        // Limpeza de lixo PHP antes de enviar para o seu HTML
        const jsonStart = text.indexOf('{');
        const cleanJson = jsonStart !== -1 ? JSON.parse(text.substring(jsonStart)) : { error: text };

        return res.status(200).json(cleanJson);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}