/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 * api_key
 * l2RRChwIjsAMhrvQ4KuGyuzU0E4EnMi89AjnqvdjxIpxP953IsXAQjE9MOl6UJ6L
 */
// const { Api_key } = SECRETS;
// const apiKey = process.env.API_KEY;

// import { ObjectId } from 'mongodb';

export default {
	async fetch(request, env, ctx) {
		const method = request.method;
		const hd = {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
		};
		if (method === 'OPTIONS') {
			const headers = {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
				'Access-Control-Allow-Headers': 'Authorization, Content-Type',
			};
			return new Response(null, { status: 204, headers });
		}

		if (request.url.match('/findBy') && method == 'POST') {
			
			const DataForFinf = await request.json();
			const data = await getData('findOne', { filter: DataForFinf });

			return new Response(JSON.stringify(data), hd);
		} else if (method == 'GET') {
			const currentDate = new Date();
			const currentMonth = currentDate.getMonth() + 1; // Adding 1 to get the actual month (January is 0-based)
			const currentDay = currentDate.getDate();

			console.log(currentDay + ' ' + currentMonth);

			const data = await getData('find');

			const PastDOB = [];

			const result = data.documents.filter((element) => {
				if (element.Month >= currentMonth) {
					if (element.Month == currentMonth) {
						if (element.Day < currentDay) {
							PastDOB.push(element);
							return;
						}
					}
					return element;
				} else {
					PastDOB.push(element);
				}
			});

			result.sort((a, b) => {
				const monthComparison = a.Month.localeCompare(b.Month);
				if (monthComparison !== 0) {
					return monthComparison;
				} else {
					return a.Day.localeCompare(b.Day);
				}
			});
			PastDOB.sort((a, b) => {
				const monthComparison = a.Month.localeCompare(b.Month);
				if (monthComparison !== 0) {
					return monthComparison;
				} else {
					return a.Day.localeCompare(b.Day);
				}
			});

			return new Response(JSON.stringify({ data: result, pastDOB: PastDOB }), hd);
		} else if (method == 'POST') {
			// post data

			const DataForInsert = await request.json();
			const [day, month, year] = DataForInsert.DOB.split('/');
			DataForInsert['Day'] = day;
			DataForInsert['Month'] = month;
			DataForInsert['ID'] = (new Date().getTime() % 10e5) + '';
			const data = await getData('insertOne', { document: DataForInsert });
			return new Response(JSON.stringify(data), hd);
		} else if (method == 'PUT') {
			// upadate document
			const DataForUpdate = await request.json();
             
			const [day, month, year] = DataForUpdate.DOB.split('/');
			DataForUpdate['Day'] = day;
			DataForUpdate['Month'] = month;

			const { ID, ...otherAllData } = DataForUpdate;
			const data = await getData('updateOne', { filter: { ID: ID } }, { update: { $set: {...otherAllData } });

			return new Response(JSON.stringify(data), hd);
		} else if (method == 'DELETE') {
			const DataForDelete = await request.json();
			const { ID } = DataForDelete;

			const data = await getData('deleteOne', { filter: { ID: ID } });
			return new Response(JSON.stringify(data), hd);
		}
		return new Response('No Rout Match');
	},
};

// ***********************************************************************************
// ///////////////////////////////////////////////////////////////////////////////////
// ********************************************************************************

async function getData(query, filterBY, updates) {
	const url = 'https://ap-south-1.aws.data.mongodb-api.com/app/data-myvhz/endpoint/data/v1/action/' + query;
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Request-Headers': '*',
				'api-key': 'l2RRChwIjsAMhrvQ4KuGyuzU0E4EnMi89AjnqvdjxIpxP953IsXAQjE9MOl6UJ6L',
			},
			body: JSON.stringify({
				collection: 'userData',
				database: 'user',
				dataSource: 'Cluster0',
				...filterBY,
				...updates,
			}),
		});
		const data = await response.json();

		return data;
		// return new Response(JSON.stringify(data));
	} catch (error) {
		console.log(error.massege);
		return { sms: error.massege };
	}
}
