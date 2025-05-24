interface ApiRequestOptions extends RequestInit {
    headers?: Record<string, string>;
}
export async function api(endpoint: string, options: ApiRequestOptions = {}) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const url = `${baseUrl}${endpoint}`;

    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            // You could customize error handling based on status codes
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || `API error: ${response.status}`);
            console.log(error);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        // throw error;
    }
}
