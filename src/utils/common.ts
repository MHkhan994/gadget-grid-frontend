export function isValidUrl(url: string): boolean {
    try {
        // Validate URL format
        new URL(url);

        return true;
    } catch (_) {
        // Invalid URL format
        return false;
    }
}
