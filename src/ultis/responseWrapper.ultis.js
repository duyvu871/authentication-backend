export function responseTemplate(res) {
    return res.header('Access-Control-Allow-Origin', '*')
        .header('Access-Control-Allow-Headers', '*')
        .header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        .header('Access-Control-Allow-Credentials', true)
        .header('Access-Control-Max-Age', '86400')
        .header('Access-Control-Expose-Headers', 'Content-Length, Content-Range')
        // .header('Content-Type', 'application/json; charset=utf-8')
        // .header('Content-Length', res.body ? JSON.stringify(res.body).length : 0)
        // .status(res.status)
        // .send(res.body);
}