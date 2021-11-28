const fetch = require("node-fetch");

const token = process.env.DOCAMATIC_API_KEY

export const generatePDFFromHTML = async (html, width, height) => {
    const testMode = !!process.env.DOCAMATIC_TEST_MODE
    const response = await fetch(`${process.env.DOCAMATIC_URL}/pdf`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            source: html,
            format: "A4",
            width,
            height,
            unit: 'in',
            media: "print",
            test: testMode
        })
    });

    const json = await response.json();
    console.log(json);

    return json?.document
}

export const generateTemplate = async (params) => {
    console.info('PARAMS', params)
    const response = await fetch(`${process.env.DOCAMATIC_URL}/template`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            template: params.template,
            data: params.data,
            test: process.env !== 'PROD'
        })
    });

    const json = await response.json();
    console.log(json);

    return json?.document
}