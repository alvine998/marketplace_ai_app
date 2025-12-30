import { GoogleGenerativeAI } from "@google/generative-ai";
import { GOOGLE_API_KEY as API_KEY } from "../config/env";

const genAI = new GoogleGenerativeAI(API_KEY);

// In-memory cache to store previous search results
const searchCache: Record<string, any[]> = {};

export const searchWithAI = async (query: string) => {
    const trimmedQuery = query.trim().toLowerCase();

    // Check if result is already in cache
    if (searchCache[trimmedQuery]) {
        console.log(`Returning cached result for: ${trimmedQuery}`);
        return searchCache[trimmedQuery];
    }

    const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash-lite", "gemini-3-flash"];

    if (!API_KEY) {
        console.error("CRITICAL: GOOGLE_API_KEY is not defined in your environment.");
        return [];
    }

    for (const modelName of modelsToTry) {
        try {
            console.log(`Trying Gemini model: ${modelName}`);
            const model = genAI.getGenerativeModel({ model: modelName });

            const prompt = `You are a helpful assistant for a marketplace app like Tokopedia. 
            The user is searching for: "${query}".
            Provide a list of 5 relevant product names, prices in Rupiah, and short descriptions. 
            Format the response as a JSON array of objects with keys: id, title, price, description.
            Example: [{"id": "ai1", "title": "Product Name", "price": "Rp 100.000", "description": "Short desc"}]
            Return ONLY the JSON array, no other text.`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            const jsonMatch = text.match(/\[.*\]/s);
            if (jsonMatch) {
                const parsedResults = JSON.parse(jsonMatch[0]);
                // Store in cache
                searchCache[trimmedQuery] = parsedResults;
                return parsedResults;
            }
        } catch (error) {
            console.error(`Gemini Error with ${modelName}:`, error);
        }
    }

    return [];
};

export const getHelpFromAI = async (query: string) => {
    const trimmedQuery = query.trim().toLowerCase();

    const modelsToTry = ["gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-3-flash"];

    if (!API_KEY) {
        console.error("CRITICAL: GOOGLE_API_KEY is not defined in your environment.");
        return { title: "Error", content: "Konfigurasi API AI belum lengkap. Harap periksa setelan aplikasi." };
    }

    for (const modelName of modelsToTry) {
        try {
            console.log(`Trying Gemini model for help: ${modelName}`);
            const model = genAI.getGenerativeModel({ model: modelName });

            const prompt = `You are a helpful customer support assistant for a marketplace app like Tokopedia. 
            The user is asking about: "${query}".
            Provide a detailed, helpful, and concise answer or explanation.
            If the query is a category like "Akun" or "Pembayaran", provide an overview of help topics in that category.
            Format the response as a JSON object with keys: title, content.
            Return ONLY the JSON object, no other text.`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            const jsonMatch = text.match(/\{.*\}/s);
            if (jsonMatch) {
                const parsedResult = JSON.parse(jsonMatch[0]);
                return parsedResult;
            }
        } catch (error) {
            console.error(`Gemini Help Error with ${modelName}:`, error);
        }
    }

    return { title: "Error", content: "Maaf, terjadi kesalahan saat mengambil informasi bantuan." };
};
