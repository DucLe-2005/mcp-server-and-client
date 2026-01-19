# MCP Server                                                                                                                                     
                                                                                                                                                                     
  This server is a minimal example of an MCP server implemented in TypeScript using `@modelcontextprotocol/sdk`. It shows how to expose **tools**, **resources**,    
  **prompts**, and how to use **sampling** and **elicitation**.                                                                                                      
                                                                                                                                                                     
  ---                                                                                                                                                                
                                                                                                                                                                     
  ## MCP Server Basics                                                                                                                                               
                                                                                                                                                                     
  - Uses `McpServer` from `@modelcontextprotocol/sdk/server/mcp`.                                                                                                    
  - Communicates over **stdio** using `StdioServerTransport`.                                                                                                        
  - Declares capabilities for:                                                                                                                                       
    - `tools`                                                                                                                                                        
    - `resources`                                                                                                                                                    
    - `prompts`                                                                                                                                                      
    - (and uses `sampling` & `elicitation` via requests to the client)                                                                                               
                                                                                                                                                                                                                                       
  ---                                                                                                                                                                
                                                                                                                                                                     
  ## Tools                                                                                                                                                                                                                                                                                            
  - **Structured inputs** using `zod` schemas.                                                                                                                       
  - **Server-initiated elicitation**: if the tool is missing some arguments, it sends an `elicitation/create` request so the client can ask the user for more info.  
  - **Using sampling in tools**: a tool can call `sampling/createMessage` to ask the client’s model to generate data (e.g. fake user info), then use that result.    
                                                                                                                                                                     
  This is the important MCP pattern:                                                                                                                                 
                                                                                                                                                                     
  - Tools are defined on the server.                                                                                                                                 
  - The server can call back to the client via MCP (sampling/elicitation) to:                                                                                        
    - Get model-generated content.                                                                                                                                   
    - Ask the human user for missing details.                                                                                                                        
                                                                                                                                                                     
  ---                                                                                                                                                                
                                                                                                                                                                     
  ## Resources & Resource Templates                                                                                                                                  
                                                                                                                                                                     
  The server registers:                                                                                                                                              
                                                                                                                                                                     
  - A **resource** that returns a collection (e.g. all users).                                                                                                       
  - A **resource template** with a URI like `users://{userId}/profile`.                                                                                              
                                                                                                                                                                     
  These show how to:                                                                                                                                                 
                                                                                                                                                                     
  - Expose data as MCP resources with `mimeType` and descriptions.                                                                                                   
  - Use URI templates with parameters (`{userId}`) so the client can fill them in at runtime.                                                                        
                                                                                                                                                                     
  From an MCP perspective:                                                                                                                                           
                                                                                                                                                                     
  - Resources are read-only data endpoints.                                                                                                                          
  - Resource templates let you define parameterized URIs for more dynamic access.                                                                                    
                                                                                                                                                                     
  ---                                                                                                                                                                
                                                                                                                                                                     
  ## Prompts                                                                                                                                                         
                                                                                                                                                                     
  The server also registers **prompts**:                                                                                                                             
                                                                                                                                                                     
  - A prompt is defined on the server as a named template.                                                                                                           
  - It returns a list of messages (e.g. user messages) that the client can send to an LLM.                                                                           
                                                                                                                                                                     
  This demonstrates:                                                                                                                                                 

  - Centralizing prompt templates on the MCP server.                                                                                                                 
  - Letting the client discover and use them (`listPrompts` / `getPrompt`).                                                                                          
                                                                                                                                                                     
  ---                                                                                                                                                                
                                                                                                                                                                     
  ## Storage (Non-MCP Detail, Just Context)                                                                                                                          
                                                                                                                                                                     
  - Data is stored in a local JSON file (`src/data/users.json`), just as a simple example.                                                                           
  - The important MCP idea is that tools/resources *could* be backed by any system (DB, API, files, etc.).                                                           
                                                                                                                                                            