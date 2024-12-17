import { writable } from "svelte/store";

import { githubIssues } from "../stores";

// Initialize the token from sessionStorage or null
export const googleToken = writable(sessionStorage.getItem("google_token") || null);

// Update sessionStorage whenever the token changes
googleToken.subscribe((value) => {
  if (value) {
    sessionStorage.setItem("google_token", value);
  } else {
    sessionStorage.removeItem("google_token");
  }
});

export const githubToken = writable(sessionStorage.getItem("github_token") || null);

githubToken.subscribe((value) => {
  if (value) {
    sessionStorage.setItem("github_token", value);
  } else {
    sessionStorage.removeItem("github_token");
  }
});


export async function validateGoogleToken(token) {
    console.log("Validating Google token...");
    try {
      const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?access_token=${token}`);
      if (!response.ok) {
        throw new Error("Token is invalid or expired");
      }
      return true; // Token is valid
    } catch (error) {
      console.error("Google token validation failed:", error);
      return false;
    }
  }

  // Function to log out (clear google token and reset app state)
export const logOutGoog = () => {
    console.log("Logging out and clearing Google token...");
    googleToken.set(null);
    sessionStorage.removeItem("google_token");
  };

  export const logOutGithub = () => {
    console.log("Logging out and clearing GitHub token...");
    githubToken.set(null);
    githubIssues.set([]);
    sessionStorage.removeItem("github_token");
    };

    // Function to log out (clear tokens and reset app state)
    export async function revokeGithubToken() {
        console.log('revoking github token')
        const token = sessionStorage.getItem("github_token");
    
        if (!token) {
            console.error("No GitHub token found.");
            return;
        }
    
        try {
            const response = await fetch(`https://ghauth.netlify.app/.netlify/functions/revoke-github-token`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
            });
    
            if (response.ok) {
                console.log("GitHub token revoked successfully.");
                githubToken.set(null);
                sessionStorage.removeItem("github_token");
            } else {
                console.error("Failed to revoke GitHub token:", response.status);
            }
        } catch (error) {
            console.error("Error revoking GitHub token:", error);
        }
    }

 export async function revokeGoogleToken() {
    let token = sessionStorage.getItem("google_token") || null;
    try {
      const response = await fetch(`https://accounts.google.com/o/oauth2/revoke?token=${token}`, {
        method: "POST",
      });
  
      if (response.ok) {
        console.log("Google token revoked successfully.");
        googleToken.set(null);
      } else {
        console.error("Failed to revoke Google token:", response.status);
      }
    } catch (error) {
      console.error("Error revoking Google token:", error);
    }
  }