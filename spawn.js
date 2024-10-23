const { createDataItemSigner, spawn, result, message } = require("@permaweb/aoconnect");
const fs = require('fs');
const wallet = JSON.parse(fs.readFileSync('wallet.json', 'utf8'));
// const scheduler = require("@permaweb/aoconnect").scheduler;

async function spawnprocess() {
    console.log('✔️ Spawning process');
    const processId = await spawn({
        module: "bkjb55i07GUCUSWROtKK4HU1mBS_X0TyH3M5jMV6aPg",
        scheduler: "_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA",
        signer: createDataItemSigner(wallet),
        tags: [
            { name: "Cron-Interval", value: "1-minutes" } // value of cron will be dynamically set by the user
        ],
        data: "Spawn a process to run a cron job",
    });
    console.log('✔️ Process spawned:', processId);
    return processId;
}

async function sendCode(processId) {
    const messageId = await message({
        process: processId,
        signer: createDataItemSigner(wallet),
      
        tags: [
            { name: "By the way", value: "I am a tag" },
            { name: "Action", value: "Eval" }
        ],
        data: `
local tags = {"Action","TimeStamp","From","Variant"}
Handlers.add("Cron-Handler",{Action="Cron"},
function(msg)
    Send{Target="KmiQ2f9EYJHHl1F2dTQBXm6WZpMnYUKB8PPEZnV_D40",Data="Cron Job Triggered"}// Target is the process id of user process that needs to be triggered
end)
Handlers.add("S1", {Action="RespondMessages"},
function(msg)
    -- print(msg.Data)
    -- print(msg.TagArray)

    for i=1, #msg.TagArray, 1 do
        for j=1,#tags,1 do
            if msg.TagArray[i].name==tags[j] then
                print("VULNERABLE TAG FOUND")
                Send{Target=msg.From,Data="Vulnerable Tag Found" ..tags[j]}
                -- Send{Target=msg.From,Data="Vulnerable Tag Identified"}
            end
        end
        -- print(msg.TagArray[i]);
    end
    -- print("OK")
end)`,
    });
    console.log('✔️ Message sent:', messageId);
}

async function main() {
    const processId = await spawnprocess();
    console.log('✔️ Main process completed');
    // await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 5 seconds
    // await sendCode(processId);
    console.log('✔️ Main process completed');
    return processId;
}
// main()
sendCode("45J0m2bJu360nZCn_CLnJ3UKKWPf-9Sb6EfyzvSpTfY")


