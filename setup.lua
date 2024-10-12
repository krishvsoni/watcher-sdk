local M = {}
function M.setup(watcher)
    local index = 1;
    local watcher=watcher
    Handlers.add("W1", {
        Action = "RequestMessages"
    }, function(msg)
      
        local messages = {}
        for i = index, #Inbox, 1 do
            table.insert(messages, Inbox[i])
        end
        Send({
            Target = watcher,
            Action = "RespondMessages",
            Data = require"json".encode(Inbox)
        })
        index = #Inbox;
        print("MSG SENT" .. index)


    end)
    return "FUNC RAN " .. watcher
end
_G.package.loaded["Watcher"] = M
