// import type { HttpContext } from '@adonisjs/core/http'
// import type { NextFn } from '@adonisjs/core/types/http'

// export default class InjectTokenMiddleware {
//    async handle({ request }: HttpContext, next: NextFn) {
//     console.log("Inside InjectTokenMiddleware")
//     console.log("Request Header : ",request.headers())
//     const jwt = request.cookies().jwt
// const oat = request.cookies().oat

// console.log('jwt:', jwt)
// console.log('oat:', oat)

//     const token = jwt ?? oat 
//     console.log("token", token)

//     if (token) {
//       request.request.headers['authorization'] = `Bearer ${token }`
//     }

//     await next()
//   }
// }