// const GetEVAL = async (entityId) => {
//     const res = await fetch("https://arweave-search.goldsky.com/graphql", {
//         "headers": {
//             "accept": "application/graphql-response+json, application/graphql+json, application/json, text/event-stream, multipart/mixed",
//             "accept-language": "en-US,en;q=0.9",
//             "content-type": "application/json",
//             "priority": "u=1, i",
//             "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Opera\";v=\"113\", \"Chromium\";v=\"127\"",
//             "sec-ch-ua-mobile": "?0",
//             "sec-ch-ua-platform": "\"Windows\"",
//             "sec-fetch-dest": "empty",
//             "sec-fetch-mode": "cors",
//             "sec-fetch-site": "cross-site"
//         },
//         "referrer": "https://www.ao.link/",
//         "referrerPolicy": "strict-origin-when-cross-origin",
//         "body": JSON.stringify({
//             query: `query ($entityId: String!, $limit: Int!, $sortOrder: SortOrder!, $cursor: String) {
//                 transactions(
//                     sort: $sortOrder
//                     first: $limit
//                     after: $cursor
//                     tags: [{name: "Action", values: ["Eval"]}]
//                     recipients: [$entityId]
//                     ingested_at: {min: 1696107600}
//                 ) {
//                     count
//                     ...MessageFields
//                     __typename
//                 }
//             }
//             fragment MessageFields on TransactionConnection {
//                 edges {
//                     cursor
//                     node {
//                         id
//                         ingested_at
//                         recipient
//                         block {
//                             timestamp
//                             height
//                             __typename
//                         }
//                         tags {
//                             name
//                             value
//                             __typename
//                         }
//                         data {
//                             size
//                             __typename
//                         }
//                         owner {
//                             address
//                             __typename
//                         }
//                         __typename
//                     }
//                     __typename
//                 }
//                 __typename
//             }`,
//             variables: {
//                 cursor: "",
//                 entityId: entityId,
//                 limit: 25,
//                 sortOrder: "INGESTED_AT_DESC"
//             }
//         }),
//         "method": "POST",
//         "mode": "cors",
//         "credentials": "omit"
//     });
//     const data = await res.json();

//     console.log(data.data.transactions.edges[0].node.tags);

// }
async function getMessages(entityId) {
    const query = {
        query: `
            query ($entityId: String!, $limit: Int!, $sortOrder: SortOrder!, $cursor: String) {
                transactions(
                    sort: $sortOrder
                    first: $limit
                    after: $cursor
                    recipients: [$entityId]
                    ingested_at: {min: 1696107600}
                ) {
                    count
                    ...MessageFields
                    __typename
                }
            }
            fragment MessageFields on TransactionConnection {
                edges {
                    cursor
                    node {
                        id
                        ingested_at
                        recipient
                        block {
                            timestamp
                            height
                            __typename
                        }
                        tags {
                            name
                            value
                            __typename
                        }
                        data {
                            size
                            __typename
                        }
                        owner {
                            address
                            __typename
                        }
                        __typename
                    }
                    __typename
                }
                __typename
            }
        `,
        variables: {
            entityId: entityId,
            limit: 25,
            sortOrder: 'INGESTED_AT_DESC',
            cursor: ""
        }
    };

    const response = await fetch("https://arweave-search.goldsky.com/graphql", {
        method: "POST",
        headers: {
            "accept": "application/graphql-response+json, application/graphql+json, application/json, text/event-stream, multipart/mixed",
            "content-type": "application/json",
            "Referer": "https://www.ao.link/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        body: JSON.stringify(query)
    });

    const data = await response.json();
    const evalMessages=[];
    // if(data.data.transactions.edges[0].node.tags.name==="Action"){
    //     evalMessages.push(data.data.transactions.edges[0].node.tags);
    //     console.log(evalMessages);
    // }
    return data.data.transactions.edges[0].node.tags.name;
  
}
// getMessages("XKX4f3qVzO-P5panzJKY720aEH0YNZpKKUk17cy_5KU").then(console.log);
async function getCode(messageID){
    const response=await fetch("https://arweave.net/"+messageID);
    const data=await response.text();
    console.log(data);
    return data;

}
getCode("3hnCklkdYiyQ6nWHizHEjqq10J-AScM0y58O_QNWf1U").then(console.log);