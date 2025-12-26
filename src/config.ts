declare global {
    interface Window {
        _ENV_: {
            VITE_API_URL: string;
        };
    }
}
export const API_URL = window._ENV_?.VITE_API_URL || import.meta.env.VITE_API_URL || "https://awards-api.animefoda.top";