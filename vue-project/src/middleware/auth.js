export function authMiddleware(to, user) {
  console.log("user in auth middleware",user)
  if (to.meta.requiresAuth && !(user)) {
    console.log("Inside authmiddleware if")
    return '/login'
  }
}
