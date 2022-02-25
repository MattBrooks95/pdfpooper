# PdfPooper
## It shits out PDFs

## How does it work?
1. Express creates a local server, accepts HTTP requests
2. Multer allows that express server to receive multiple files in one request
3. Puppeteer is used to drive a headless browser instance
    1. We can use Puppeteer's DOM to insert data into the document, just like you would for a web page
	2. Puppeteer can convert the page into a pdf
4. Express can just send the data for the pdf over HTTP

## why?
* It is difficult to create PDF templates that can be filled in programmatically without purchasing proprietary software.
* I don't know anyone that actually knows or understands Postscript or Ghostscript
* It can be sort of annoying to set up tools like PDFlib or iText.
* I pdf processing pipeline based on using a headless browser sounds attractive because it will allow web developers who do not know the specifics about PDFs to create documents that satisfy business requirements without needing to learn a pdf library.

## Concerns
* This tool would be useful if it helps people be able to update the PDFs their applications might be building without recompiling or changing the source for their applications.
    * but, maintaining the html template file and the JSON file that holds the input field ID's and values could be just as annoying as changing and rebuilding the original application
	* it shouldn't necessarily have to be a JSON file and an HTML file that get sent over the wire, applications could build the HTML and the JSON object dynamically
* Obviously I haven't done anything about making sure this is secure.
    * In my head it's safe to use this thing as a little microservice on the same machine as your server, but evaluating untrusted javascript or html could be devastating
* The print quality of the PDF may be different from what people could do with tools like PDFlib and iText
    * I have never configured CSS for printing, but I imagine it could be annoying.
	* Similarly, when you actually go to physically print something there're concerns like the DPI and the dimensions of the physical paper
* Holding potentially large HTML or JSON files and running a headless chrome instance per request is a lot of memory and a lot of computer cycles that could be avoided by using tools that are actually designed to work with pdfs.
* I haven't even pretended to care about error handling.
