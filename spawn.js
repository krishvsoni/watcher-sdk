const { createDataItemSigner, spawn, result, message, monitor, unmonitor } = require("@permaweb/aoconnect");
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
            { name: "Cron-Interval", value: "1-minutes" } ,
            // value of cron will be dynamically set by the user
        ],
        data: "Spawn a process to run a cron job",
    });
    console.log('✔️ Process spawned:', processId);
    return processId;
}

async function SetupCron(processId) {
    const result = await monitor({
        process: processId,
        signer: createDataItemSigner(wallet),
    })
}

async function sendCode(processId,targetId) {
    const messageId = await message({
        process: processId,
        signer: createDataItemSigner(wallet),

        tags: [
            { name: "By the way", value: "I am a tag" },
            { name: "Action", value: "Eval" }
        ],
        data: `
local tags = {"Action", "TimeStamp", "From", "Variant"}
local result = {}
Handlers.add("S1",{Action="Cron"},{
Send{Target=${targetId},Action="RequestMessages"}
})
Handlers.add("S2", {Action = "Analyze"},
function(msg)
    -- Iterate through the Data array
    for i = 1, #msg.Data do
        local tagArray = msg.Data[i].TagArray
        local from = msg.Data[i].From
        local id = msg.Data[i].Id
        
        -- Check each entry in TagArray
        for j = 1, #tagArray do
            -- Compare each tag name in tagArray with tags in the local tags list
            for k = 1, #tags do
                if tagArray[j].name == tags[k] then
                    print("Vulnerable tag found: " .. tags[k])
                    print("From: " .. from .. ", ID: " .. id)
                    
                    -- Add to result table
                    table.insert(result, {
                        vulnerable_tag = tags[k],
                        from = from,
                        id = id
                    })
                end
            end
        end
    end
	Send({Target=${targetId},Data=result,Action="ResultResponse"})
end)
 `,
    });
    console.log('✔️ Message sent:', messageId);
}

async function main() {
    const processId = await spawnprocess();
    console.log('✔️ Main process completed');
    // await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 5 seconds
    // await sendCode(processId);
    console.log('✔️ Main process completed');
    const result = await monitor({
        process: processId,
        signer: createDataItemSigner(wallet),
    })
    return processId,result;
}
// main()
async function removecron(processid){
    const result=await unmonitor({
        process: processid,
        signer: createDataItemSigner(wallet),
    })
}
removecron("100cpBJaPx1EyrxtC3sbXIGuyn8-IRGmTrddKPJXuw0")

