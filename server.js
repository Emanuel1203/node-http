const http = require("http");
const {getRouteInfo} = require("./utils");
const port=3000;

const requestHandler = (req, res) => {
    const chunks = [];

    req.on("data", (chunk) => chunks.push(chunk));

    req.on("end", () =>  {
        const {method, url} = req;
        let reqBody;
        try{
            reqBody = JSON.parse(Buffer.concat(chunks).toString());
        } catch (err) {
            console.error("Request body cannot be parsed to JSON");
            reqBody = null;
        }
    
    const {statusCode, contentType, content } = getRouteInfo(
        method,
        url,
        reqBody
    );
    res.writeHead(statusCode,{"content-type": contentType });
    res.write(content);
    res.end();
    })
    
}
