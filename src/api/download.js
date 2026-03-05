import axios from "axios"
// random string generator for filename
import { v4 as uuidv4 } from 'uuid';

const BASE_URL = "https://api.resumeai.arijit.co.in/download/pdf";

const downloadResume = async (resumeData, theme) => {
    try {
        const response = await axios.post(`${BASE_URL}/${theme}`, resumeData, {
            responseType: 'blob', // Important for handling binary data
        });
        // Create a URL for the blob and trigger a download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;

        const disposition = response.headers["content-disposition"];

        let filename = `resume_${uuidv4()}.pdf`; // Default filename with random string
        if (disposition && disposition.indexOf('attachment') !== -1) {
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(disposition);
            if (matches != null && matches[1]) { 
                filename = matches[1].replace(/['"]/g, ''); // Remove any quotes around the filename
            }
        }

        link.setAttribute('download', filename);    
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        throw error;
    }
};

export { downloadResume };