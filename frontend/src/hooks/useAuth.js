/**
 * @file hooks/useAuth.js
 * @description Re-exports the authentication hook. 
 * Components should import `useAuth` from here rather than directly from the Context 
 * to maintain a consistent custom hook architecture.
 */

export { useAuth } from "../context/AuthContext.jsx";