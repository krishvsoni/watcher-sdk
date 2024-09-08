function Cron(msg)
	local to_remind = {}
	-- Read remaining reminders which have timestamp older than current message' Timestamp
	for row in db:nrows(string.format([[
    	SELECT * FROM Reminders WHERE Completed = false AND Timestamp < %d
    ]], msg.Timestamp)) do
		table.insert(to_remind, row)
	end

	for _,reminder in ipairs(to_remind) do
		Send({
			Target = ao.id,
			Action = "Reminder",
			Data = reminder.Message,
		})
		-- Update the entry to be completed after sending the reminder message
		db:exec(string.format([[
        	UPDATE Reminders SET Completed = 1 WHERE ID = %d
      	]], reminder.ID))
	end
end

Handlers.add("CronTick",
	Handlers.utils.hasMatchingTag("Action", "Cron"),
	function (msg)
		handle_run(Cron, msg)
	end
)
function handle_run(func, msg)
    local ok, err = pcall(func, msg)
    if not ok then
        local clean_err = err:match(":%d+: (.+)") or err
        print(msg.Action .. " - " .. err)
        if not msg.Target == ao.id then
            ao.send({
                Target = msg.From,
                Data = clean_err,
                Result = "error"
            })
        end
    end
end