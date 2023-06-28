import { MongoClient } from 'mongodb';

const url = `mongodb+srv://mayurbhoi200:Golubhoi20@@cluster0.xfhauzh.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true })
// async function connectToDatabase() {
// 	try {
// 		const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
// 		await client.connect();
// 		console.log('Connected to the database');
// 		// Perform database operations here
// 		// ...
// 	} catch (error) {
// 		console.error('Error connecting to the database', error);
// 	}
// }

// export default const abhinab =  {
// 	async fetch(request, env, ctx) {

// 	  if (request.method === 'OPTIONS') {
// 	    const headers = {
// 	      'Access-Control-Allow-Origin': '*',
// 	      'Access-Control-Allow-Methods': 'POST',
// 	      'Access-Control-Allow-Headers': 'Authorization, Content-Type'
// 	    }
// 	    return new Response(null, { status: 204, headers: headers })
// 	  }

// // add freeze
// 	  const responseMsg = Object.freeze( {
// 	    msg: "success",
// 	    data: {}
// 	  });

// 	  if (request.method === "POST") {
// 	    const data = await request.json()
// 	    if (data.type === 'status') {
// 	      let reportId = data.reportId;
// 	      let status = data.status;
// 	      console.log(reportId, status)
// 	      const response = await changeStatus(reportId, status)
// 	      console.log(response)
// 	      return new Response(JSON.stringify(response), {
// 		status: 200,
// 		headers: {
// 		  "Access-Control-Allow-Origin": "*",
// 		  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
// 		  "Access-Control-Allow-Headers": "Content-Type",
// 		  "Content-Type": "application/json"
// 		}
// 	      });
// 	    } else {
// 	      const reportId = data.to.toString() + Date.now();
// 	      await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/data-rzpqp/endpoint/data/v1/action/insertOne', {
// 		method: "POST",
// 		headers: {
// 		  'Content-Type': 'application/json',
// 		  'Access-Control-Request-Headers': '*',
// 		  'api-key': 'YzbnY0uzeNZC8G0oZrLeexJ9c3FqwToAzMvcxBziPVk6W6czeZk0g01vOPiVWqvE',
// 		},
// 		body: JSON.stringify({
// 		  "collection": "report",
// 		  "database": "Gamesapp",
// 		  "dataSource": "Cluster0",
// 		  "document": {
// 		    "from": data.from.toString(),
// 		    "to": data.to.toString(),
// 		    "message": data.message,
// 		    "reportId": reportId,
// 		    "reason": data.reason,
// 		    "status": data.status
// 		  }
// 		})
// 	      })
// 	      responseMsg.data = {
// 		reportId: reportId
// 	      };
// 	      return new Response(JSON.stringify(responseMsg), {
// 		status: 200,
// 		headers: {
// 		  'Access-Control-Allow-Origin': '*'
// 		}
// 	      });
// 	    }
// 	  }
// 	  else if (request.method === "GET") {
// 	    const url = new URL(request.url);
// 	    const playerId = url.searchParams.get("playerId");
// 	    const reportId = url.searchParams.get("reportId");
// 	    let allData;
// 	    if (playerId || reportId)
// 	      allData = await getAllData(playerId, reportId);
// 	    else
// 	      allData = await getAllData();
// 	    if (!allData || allData.length == 0) {
// 	      responseMsg.msg = "no documents";
// 	      return new Response(JSON.stringify(responseMsg), {
// 		status: 400,
// 		headers: {
// 		  'Access-Control-Allow-Origin': '*'
// 		}
// 	      });
// 	    } else {
// 	      responseMsg.data = allData;
// 	      return new Response(JSON.stringify(responseMsg), {
// 		status: 200,
// 		headers: {
// 		  'Access-Control-Allow-Origin': '*'
// 		}
// 	      });
// 	    }
// 	  }
// 	}
//       };

//       async function getAllData(playerId, reportId) {
// 	const response = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/data-rzpqp/endpoint/data/v1/action/find', {
// 	  method: "POST",
// 	  headers: {
// 	    'Content-Type': 'application/json',
// 	    'Access-Control-Request-Headers': '*',
// 	    'api-key': 'YzbnY0uzeNZC8G0oZrLeexJ9c3FqwToAzMvcxBziPVk6W6czeZk0g01vOPiVWqvE',
// 	  },
// 	  body: JSON.stringify({
// 	    "collection": "report",
// 	    "database": "Gamesapp",
// 	    "dataSource": "Cluster0",
// 	    "filter": playerId ? { "to": playerId } : { "reportId": reportId },
// 	    "limit": 10
// 	  }),
// 	});
// 	const responseData = await response.json();
// 	const documents = responseData.documents || [];
// 	return documents;
//       }
//       async function changeStatus(reportId, status) {
// 	const response = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/data-rzpqp/endpoint/data/v1/action/updateOne', {
// 	  method: "POST",
// 	  headers: {
// 	    'Content-Type': 'application/json',
// 	    'Access-Control-Request-Headers': '*',
// 	    'api-key': 'YzbnY0uzeNZC8G0oZrLeexJ9c3FqwToAzMvcxBziPVk6W6czeZk0g01vOPiVWqvE',
// 	  },
// 	  body: JSON.stringify({
// 	    "collection": "report",
// 	    "database": "Gamesapp",
// 	    "dataSource": "Cluster0",
// 	    "filter": { 'reportId': reportId },
//     "update": {
//       "$set": { 'status': status }
//     }
// 	  }),
// 	});
// 	const responseData = await response.json();
// 	return responseData
//       }

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

export default client;


// {
//         "documents": [
//           {
//             "_id": "6499640d05fd69f0de9c5427",
//             "name": "Mia Anderson",
//             "DOB": "31/12/1990"
//           },
//           {
//             "_id": "6499640d05fd69f0de9c5422",
//             "name": "William Davis",
//             "DOB": "28/02/1996"
//           },
//           {
//             "_id": "6499640d05fd69f0de9c5425",
//             "name": "Ava Jones",
//             "DOB": "25/03/1976"
//           },
//           {
//             "_id": "6499640d05fd69f0de9c5420",
//             "name": "Michael Williams",
//             "DOB": "22/04/1979"
//           },
//           {
//             "_id": "6499640d05fd69f0de9c5426",
//             "name": "Benjamin Taylor",
//             "DOB": "18/10/1999"
//           },
//           {
//             "_id": "6499640d05fd69f0de9c5423",
//             "name": "Olivia Miller",
//             "DOB": "15/09/1984"
//           },
//           {
//             "_id": "6499640d05fd69f0de9c5421",
//             "name": "Sophia Brown",
//             "DOB": "09/11/1988"
//           },
//           {
//             "_id": "6499640d05fd69f0de9c5424",
//             "name": "James Wilson",
//             "DOB": "07/06/1991"
//           },
//           {
//             "_id": "6499640d05fd69f0de9c541f",
//             "name": "Emily Johnson",
//             "DOB": "03/07/1996"
//           }
//         ]
//       }
