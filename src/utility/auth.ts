/**
 * Microsoft Entra ID (formerly Azure AD) authentication config for MSAL.js
 * Replace the placeholder values with your actual Entra ID app registration details.
 */

export const msalConfig = {
    auth: {
        clientId: "b3dfa995-5ee7-4d62-842d-0f52f206ae86", // Application (client) ID from Entra ID
        authority: "https://login.microsoftonline.com/chandankcloudxcent.onmicrosoft.com", // Directory (tenant) ID
        redirectUri: "http://localhost:3000", // Change to your app's redirect URI
    },
    cache: {
        cacheLocation: "sessionStorage", // or "sessionStorage"
        storeAuthStateInCookie: false, // Set to true for IE11/Edge support
    },
};

export const loginRequest = {
    scopes: ["User.Read"], // Add other scopes as needed
};