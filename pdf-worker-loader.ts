import * as pdfjsLib from 'pdfjs-dist/build/pdf';

// Use the worker source from a CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/cjs/react.production.min.js";

export default pdfjsLib;