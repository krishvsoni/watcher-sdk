local tags = {"eval"}

Handlers.add("S1", {Action="RespondMessages"},
function(msg)
    -- print(msg.From)
    -- print(msg.Data)
    print("OK")
end)

