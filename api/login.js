export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    const LOGIN_AUTH_KEY = "dnFBaUoxV1J0QzVNYzFtUXMyNUxIZGdTcUMxVUhxV1R2TWIxZnZrYm5DUFVjWVdSdlVBbFhuNXBIT21ZcWtiVnJwV2xYa0lPbkZZQkhZbUxvcVpJSGRmTnZDUG9xMVdXdk1tSVpkdGFmclptSjFvMHMwQXVIZGNTdEZXcnExa1dyMll1ZzAxcXFyZmxKMXgwclljVmN4OXh2cmZjcWtrNXJGV21aa2tHblVmaWdPalBycFd1dDA1VHFVWndxeG9hcm5xcUpuUHpsVTFCY1U1SXNVcWRKWVdzckZXQlhuVTJsdlJ2WmRmYmxDUE1jVXFXcnhmdXFrV3NyRldvcU9ZdXZVZm1mVVlMRXhxSnRPa2duTWtMZmtabmxZZkF0cmtQcTFBVnJZYlB2Rm1ucXhXZHJub1ZFcW9SWGtobGNxczBxMUFWRUNxVGNyb29YWW13c3ZMUGMxdHFuVW9mcUNWMnFkMTByMVc1bHBmbUowc1BveFpJWkNmUkh6b292a21Wc01iMEpuOVdsQ2tsdDFtMHF6aFV2Q3FkSjNZcUh2QWlzdlBMZll0cW9rWkFjemg1bll0ZXN2a0x2RmZuY2R0dm9ub0xmQ3hPRXg1WUhuMFZxZDFWckNnVmNucWxxeG9Kb3ZMMUVZdFJzMllDbnIwOQ";

    try {
        const response = await fetch("https://service-provisorio.premiumclube.org.br/Login/Login/", {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Authorization": LOGIN_AUTH_KEY,
                "Content-Type": "application/json",
                "headerusuario": req.headers['user-agent'],
                "ipacesso": "179.54.223.136", // Ou pegue do req
                "localacesso": "Consultor",
                "rota": "https://novoev.premiumclube.org.br/conta"
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        return res.status(200).json(data);
        
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao conectar com a Premium', details: error.message });
    }
}