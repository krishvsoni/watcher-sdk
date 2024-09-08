local M={}
function M.setup(watcher)
    Handlers.add("W1",Handlers.utils.hasMatchingTag("Action", "RequestMessages"),
    function(msg)
        print ("HANDLER RAN " .. msg.From)
        if(#Inbox%2==0) then
            print("SENDING TO WATCHER")
            Send({Target=watcher, Action="RespondMessages", Data=require("json").encode(Inbox)})
        end
    end)    
    return "FUNC RAN ".. watcher
end
_G.package.loaded["Watcher"]=M

-- Write code for analysis
-- localunAllowedTags=[USER INPUT]
