 # MCP Client                                                                                                                            
                                                                                                                                                                     
  This client is a minimal MCP **client** implementation that connects to the server over stdio, uses Gemini as the LLM, and exposes a small CLI menu to explore     
  MCP features.                                                                                                                                                      
                                                                                                                                                                     
  ---                                                                                                                                                                
                                                                                                                                                                     
  ## MCP Client Basics                                                                                                                                               
                                                                                                                                                                     
  - Uses `Client` from `@modelcontextprotocol/sdk/client`.                                                                                                           
  - Communicates with the server over **stdio** using `StdioClientTransport`.                                                                                        
  - Declares capabilities for:                                                                                                                                       
    - `sampling`                                                                                                                                                     
    - `elicitation`                                                                                                                                                                                                      
                                                                                                                                                                     
  ---                                                                                                                                                                
                                                                                                                                                                     
  ## Connection & Discovery                                                                                                                                          
                                                                                                                                                                     
  On startup, the client:                                                                                                                                            
                                                                                                                                                                     
  1. Connects to the server via stdio.                                                                                                                               
  2. Calls:                                                                                                                                                          
     - `listTools()`                                                                                                                                                 
     - `listResources()`                                                                                                                                             
     - `listResourceTemplates()`                                                                                                                                     
     - `listPrompts()`                                                                                                                                               
  3. Uses these results to build the interactive CLI menu.                                                                          
  
  ---                                                                                                                                                                
                                                                                                                                                                     
  ## Handling Sampling                                                                                                                                               
                                                                                                                                                                     
  The client implements a handler for `sampling/createMessage`:                                                                                                      
                                                                                                                                                                     
  - When the server requests sampling, the client:                                                                                                                   
    - Receives the messages.                                                                                                                                         
    - Uses Gemini (via `@ai-sdk/google` and `ai`) to generate text.                                                                                                  
    - Sends a `sampling/createMessage` result back to the server.                                                                                                    
                                                                                                                                                                     
  Key MCP idea:                                                                                                                                                      
                                                                                                                                                                     
  - **Sampling is model execution controlled by the client**.                                                                                                        
  - The server does not talk to the LLM directly; it asks the client to do it.                                                                                       
                                                                                                                                                                     
  ---                                                                                                                                                                
                                                                                                                                                                     
  ## Handling Elicitation (Conceptually)                                                                                                                             
                                                                                                                                                                     
  The client declares `elicitation` capability (and the project also includes a separate “elicitation-aware” transport example in the build output).                 
                                                                                                                                                                     
  Conceptually:                                                                                                                                                      
                                                                                                                                                                     
  - When the server sends `elicitation/create`, the client:                                                                                                          
    - Shows the question/prompt to the human user.                                                                                                                   
    - Collects answers via the CLI.                                                                                                                                  
    - Sends back structured data that the server can use (e.g. missing tool arguments).                                                                              
                                                                                                                                                                     
  Key MCP idea:                                                                                                                                                      
                                                                                                                                                                     
  - **Elicitation is human feedback controlled by the client**.                                                                                                      
  - The server can request more information, but the client is responsible for actually asking the user.                                                             
                                                                                                                                                                     
  ---                                                                                                                                                                
                                                                                                                                                                     
  ## CLI Menu                                                                                                                                                        
                                                                                                                                                                     
  The client offers four main actions:                                                                                                                               
                                                                                                                                                                     
  - **Query**                                                                                                                                                        
    - Free-text question to the LLM.                                                                                                                                 
    - The LLM can call MCP tools (function calling) using the server’s tool definitions.                                                                             
  - **Tools**                                                                                                                                                        
    - Lists MCP tools from the server.                                                                                                                               
    - Lets the user fill in arguments and call them.                                                                                                                 
  - **Resources**                                                                                                                                                    
    - Lists resources and templates.                                                                                                                                 
    - Lets the user fill in URI parameters and read the resource contents.                                                                                           
  - **Prompts**                                                                                                                                                      
    - Lists server-defined prompts.                                                                                                                                  
    - Lets the user run a prompt and optionally send it to the LLM.                                                          