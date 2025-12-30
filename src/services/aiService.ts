import { GoogleGenerativeAI } from "@google/generative-ai";

// Note: In a production app, this should be handled on the backend
// For this demo, we use a placeholder or provided API key
const API_KEY = process.env.GOOGLE_API_KEY || "";

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

    const modelsToTry = ["gemini-2.5-flash"];

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
