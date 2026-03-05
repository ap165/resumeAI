const BASE_URL = "https://api.resumeai.arijit.co.in/ai/response";

import axios from "axios";

const getAiResponse = async (text) => {
    try {
        const response = await axios.post(BASE_URL, {"text": text});
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { getAiResponse };



// {"choices":[{"finish_reason":"stop","index":0,"logprobs":null,"message":{"content":"Apologies, but there isn't any information provided on the resume skills section that needs enhancement. Please provide the list of skills or competencies, so I can help to enhance them effectively.","reasoning":null,"refusal":null,"role":"assistant"},"native_finish_reason":"stop"}],"created":1772553497,"id":"gen-1772553497-8r335vgemoeAQZU6SNKK","model":"openai/gpt-4","object":"chat.completion","provider":"OpenAI","usage":{"completion_tokens":38,"completion_tokens_details":{"audio_tokens":0,"image_tokens":0,"reasoning_tokens":0},"cost":0.00384,"cost_details":{"upstream_inference_completions_cost":0.00228,"upstream_inference_cost":0.00384,"upstream_inference_prompt_cost":0.00156},"is_byok":false,"prompt_tokens":52,"prompt_tokens_details":{"audio_tokens":0,"cache_write_tokens":0,"cached_tokens":0,"video_tokens":0},"total_tokens":90}}