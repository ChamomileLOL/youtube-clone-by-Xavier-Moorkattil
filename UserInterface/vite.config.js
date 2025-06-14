// First, we bring in a special tool from Vite to set up our project configuration.
import { defineConfig } from 'vite'; // 🧰 "Vite ke garage se ek tool mangwaya hai—yeh config banata hai."

// We also bring in the React plugin—because we’re building a React app, duh!
import react from '@vitejs/plugin-react'; // ⚛️ "React ki machine bhi lagayi hai, bina iske toh React code chalega nahi!"

// Here's the full plan (configuration) we're giving to Vite to make our app run smoothly.
export default defineConfig({
  // Telling Vite to use the React plugin we just imported.
  plugins: [react()], // 🛠️ "React plugin ko system me fit kiya gaya hai—yeh zaroori engine hai!"

  // Now comes the server section—imagine this like a kitchen where all food orders (requests) are handled.
  server: {
    // Inside the kitchen, we have a special waiter called 'proxy'.
    // This waiter knows how to secretly take your request to another restaurant (the backend) and bring food back.
    proxy: {
      // If a customer (browser) asks for anything that starts with "/api/v1/", the waiter says:
      // “Let me talk to my friend at the backend restaurant.”
      '/api/v1/': {
        // The real backend restaurant is cooking at port 5000 on localhost.
        target: 'http://localhost:5000', // 🍲 "Backend chef yahin kaam kar raha hai—localhost:5000 pe."

        // This tells the proxy waiter, “When you knock on their door, pretend you’re from there too.”
        // This helps avoid security guards (CORS) getting suspicious.
        changeOrigin: true, // 🎭 "Apni asli pehchaan chhupake dusre ki tarah dikhna—takraav se bachaav!"

        // This line handles how to rewrite the request path—like a forwarding address.
        // It says: "If someone says /api/v1/something, just pass it along as-is to the backend."
        rewrite: (path) => path.replace(/^\/api\/v1/, '/api/v1') // 🔁 "Sirf confirm kar rahe hain ki rasta sahi hai—galti se bhi kahin aur na chale jaaye."
      }
    }
  }
});
