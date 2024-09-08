function setup(watcher)
    Handlers.add("W1",Handlers.utils.hasMatchingTag("Action", "RequestMessages"),
    function(msg)
        print ("HANDLER RAN " .. msg.From)
        Send({Target=watcher, Action="RespondMessages", Data=require("json").encode(Inbox)})
    end)
    return "FUNC RAN ".. watcher
end
