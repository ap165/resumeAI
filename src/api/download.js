import axios from "axios"

const BASE_URL = "http://127.0.0.1:5000/download/pdf";

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

        let filename = "resume.pdf";

        if (disposition) {
            const match = disposition.match(/filename="?(.+)"?/);
            if (match.length === 2) {
            filename = match[1];
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