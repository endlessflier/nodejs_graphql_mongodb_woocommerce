import fetch, { Headers } from "node-fetch"

const PRINTERS = {
    fullSize: "70511943",
    signatureLabel: "70511945",
    concealerLabel: "70511939",
    bottleLabel: "70511944",
}

export const printDocument = async (input) => {
  try {
    const headers = new Headers();
    // Sends apiKey as username and password is left empty
    headers.set('Authorization', 'Basic ' + Buffer.from(process.env.PRINTNODE_API_KEY + ":").toString('base64'));
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')

    const response = await fetch(`${process.env.PRINTNODE_API_URL}/printjobs`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          printerId: input.printerId,
            contentType: "pdf_uri",
            content: input.pdfURI,
        })
    });
    console.info('response', response)

    const json = await response.json();
    console.log(json);
    
    return json
  } catch (err) {
    console.log("PrintNode Authenticaion Error", err);
  }
};

export const printLabelDocument = async (pdf) => {
  try {
    const response = await printDocument({
        pdfURI: pdf,
        printerId: PRINTERS.signatureLabel,
    })
    console.info('response', response)
    return response
  } catch (err) {
    console.log("Error printing label", err);
  }
};

export const printFullSizeDocument = async (pdf) => {
    try {
      const response = await printDocument({
          pdfURI: pdf,
          printerId: PRINTERS.fullSize,
      })
      console.info('response', response)
      return response
    } catch (err) {
      console.log("Error printing full size document", err);
    }
  };