## Project Structure
```
┣ 📂public                   // Public assets
┣ 📂src
┃ ┣ 📂app                    // Next js App router, global styles, providers
┃ ┃ ┣ 📂(pages)              // Group for all routes
┃ ┃ ┣ 📂providers            // Project providers
┃ ┃ ┣ 📂styles               // Global styles
┃ ┃ ┃ ┃ ┗ 📜extend.css       // CSS that imports all blocks
┃ ┃ ┃ ┗ 📜globals.css
┃ ┃ ┣ 📜layout.tsx           // Root layout
┃ ┃ ┗ 📜page.tsx             // Root route
┃ ┃ 
┃ ┣ 📂entities               // Domain entities that the project works with
┃ ┃ 
┃ ┣ 📂features               // Reused implementations of entire product features
┃ ┃ 
┃ ┣ 📂shared                 // Reusable functionality
┃ ┃ 
┃ ┣ 📂views                  // Full pages or large parts of a page
┃ ┃ 
┃ ┣ 📂widgets                // self-contained chunks of functionality or UI, delivering a use case
```
## Getting Started

```bash
npm install
# &
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



