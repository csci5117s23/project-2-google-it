
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app, Datastore} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string, bool, number } from 'yup';
import jwtDecode from 'jwt-decode';


// Uncomment near the end
// const userAuth = async (req, res, next) => {
//     try {
//       const { authorization } = req.headers;
//       if (authorization) {
//         const token = authorization.replace('Bearer ','');
//         // NOTE this doesn't validate, but we don't need it to. codehooks is doing that for us.
//         const token_parsed = jwtDecode(token);
//         req.user_token = token_parsed;
		
//       }
//       next();
//     } catch (error) {
//       next(error);
//     } 
//   }
// app.use(userAuth)

// app.use('/bevEntry', (req, res, next) => {
//     if (req.method === "POST") {
//         req.body.userId = req.user_token.sub
//     } else if (req.method === "GET") {
//         req.query.userId = req.user_token.sub
//     }
//     next();
// })

// app.use('/bevEntry/:id', async (req, res, next) => {
//     const id = req.params.ID;
//     const userId = req.user_token.sub
//     // let's check access rights for the document being read/updated/replaced/deleted
//     const conn = await Datastore.open();
//     try {
//         const doc = await conn.getOne('bevEntry', id)
//         if (doc.userId != userId) {
//             // authenticate duser doesn't own this document.
//             res.status(403).end(); // end is like "quit this request"
//             return
//         }
//     } catch (e) {
//         // the document doesn't exist.
//         res.status(404).end(e);
//         return;
//     }
//     // if we don't crash out -- call next and let crudlify deal with the details...
//     next();
// })

const bevEntry = object({
    bevName: string().required(),
	locName: string().required(),
	userId: string.required(),
	desc: string(),
	rating: number(),
	lat: number(),
	lng: number(),
	imgURL: string(),
	userId: string(),
    createdOn: date().default(() => new Date()),
})

// Use Crudlify to create a REST API for any collection
crudlify(app, {bevEntry: bevEntry})

// bind to serverless runtime
export default app.init();
