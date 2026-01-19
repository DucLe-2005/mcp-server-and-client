# MCP Server & Client (Learning Project)                                                                                                                                                                       
                                                                                                                                                                                                                 
  This is my personal attempt to learn the Model Context Protocol (MCP) by building a simple TypeScript **MCP server** and **MCP client** that talk over stdio and use Gemini as the model.                      
                                                                                                                                                                                                                 
  ---                                                                                                                                                                                                            
                                                                                                                                                                                                                 
  ## Setup                                                                                                                                                                                                       
                                                                                                                                                                                                                 
  ### Install dependencies                                                                                                                                                                                       
                                                                                                                                                                                                                 
                                                                                                                                                                                                                 
  npm install                                                                                                                                                                                                    
                                                                                                                                                                                                                 
                                                                                                                                                                                                                 
  ### Build the server                                                                                                                                                                                           
                                                                                                                                                                                                                 
                                                                                                                                                                                                                 
  npm run server:build                                                                                                                                                                                           
                                                                                                                                                                                                                 
                                                                                                                                                                                                                 
  ### (Optional) Watch and rebuild on changes                                                                                                                                                                    
                                                                                                                                                                                                                 
                                                                                                                                                                                                                 
  npm run server:build:watch                                                                                                                                                                                     
                                                                                                                                                                                                                 
                                                                                                                                                                                                                 
  ### Environment variables                                                                                                                                                                                      
                                                                                                                                                                                                                 
  Create a `.env` file in the project root:                                                                                                                                                                      
                                                                                                                                                                                                                 
                                                                                                                                                                                                                 
  GEMINI_API_KEY=your_gemini_api_key_here                                                                                                                                                                        
                                                                                                                                                                                                                 
                                                                                                                                                                                                                 
  ---                                                                                                                                                                                                            
                                                                                                                                                                                                                 
  ## Run                                                                                                                                                                                                         
                                                                                                                                                                                                                 
  ### Server (dev, TypeScript)                                                                                                                                                                                   
                                                                                                                                                                                                                 
                                                                                                                                                                                                                 
  npm run server:dev
                                                                                                                                                                                                                 
                                                                                                                                                                                                                 
  ### Client (CLI)                                                                                                                                                                                               
                                                                                                                                                                                                                 
                                                                                                                                                                                                                 
  npm run client:dev                                                                                                                                                                                             
                                                                                                                                                                                                                 
                                                                                                                                                                                                                 
  - `server:build:watch` keeps the compiled `build/server.js` in sync as you edit `src/server.ts`.                                                                                                               
  ---

  ## Docs

  - Server details: [Server.md](./Server.md)
  - Client details: [Client.md](./Client.md)

  If you’d like, I can next help you add a short “What I learned about MCP” section to one of these docs.


› wraps the command code in code syntax


• Here’s the same concise README.md, with all command blocks wrapped in language-tagged code fences:
                                                                                                                                                                                                                 
  # MCP Server & Client (Learning Project)                                                                                                                                                                       
                                                                                                                                                                                                                 
  This is my personal attempt to learn the Model Context Protocol (MCP) by building a simple TypeScript **MCP server** and **MCP client** that talk over stdio and use Gemini as the model.                      
                                                                                                                                                                                                                 
  ---                                                                                                                                                                                                            
                                                                                                                                                                                                                 
  ## Setup                                                                                                                                                                                                       
                                                                                                                                                                                                                 
  ### Install dependencies                                                                                                                                                                                       
                                                                                                                                                                                                                 
  ```bash                                                                                                                                                                                                        
  npm install                                                                                                                                                                                                    
                                                                                                                                                                                                                 
  ### Build the server                                                                                                                                                                                           
                                                                                                                                                                                                                 
  npm run server:build                                                                                                                                                                                           
                                                                                                                                                                                                                 
  ### (Optional) Watch and rebuild on changes                                                                                                                                                                    
                                                                                                                                                                                                                 
  npm run server:build:watch                                                                                                                                                                                     
                                                                                                                                                                                                                 
  ### Environment variables                                                                                                                                                                                      
                                                                                                                                                                                                                 
  Create a .env file in the project root:                                                                                                                                                                        
                                                                                                                                                                                                                 
  GEMINI_API_KEY=your_gemini_api_key_here                                                                                                                                                                        
                                                                                                                                                                                                                 
  ———
                                                                                                                                                                                                                 
  ## Run                                                                                                                                                                                                         
                                                                                                                                                                                                                 
  ### Server (dev, TypeScript)                                                                                                                                                                                   
                                                                                                                                                                                                                 
  npm run server:dev                                                                                                                                                                                             
                                                                                                                                                                                                                 
  ### Client (CLI)                                                                                                                                                                                               
                                                                                                                                                                                                                 
  npm run client:dev                                                                                                                                                                                             
                                                                                                                                                                                                                 
  - server:build:watch keeps the compiled build/server.js in sync as you edit src/server.ts.                                                                                                                     
  - The client launches node build/server.js and shows a menu to explore tools, resources, prompts, and queries.                                                                                                 
                                                                                                                                                                                                                 
  ———                                                                                                                                                                                                            
                                                                                                                                                                                                                 
  ## Docs                                                                                                                                                                                                        
                                                                                                                                                                                                                 
  - Server details: Server.md (./Server.md)                                                                                                                                                                      
  - Client details: Client.md (./Client.md)   