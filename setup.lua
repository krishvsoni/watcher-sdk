local M={}
function M.setup(watcher)
    -- Handlers.add("W1",Handlers.utils.hasMatchingTag("Action", "RequestMessages"),
    Handlers.add("W1",
        {Action="RequestMessages"},
        function(msg)
            print("SETUP WATCHER "..watcher)
            Send({Target=watcher, Action="RespondMessages", Data="HELLO FROM TARGET"})
            
            -- if(#Inbox%2==0) then
            --     print("SENDING TO WATCHER")
            --     Send({Target=watcher, Action="RespondMessages", Data=require("json").encode(Inbox)})
            -- end
        end)    
    return "FUNC RAN ".. watcher
end
_G.package.loaded["Watcher"]=M
