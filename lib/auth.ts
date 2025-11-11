export async function isUserAdmin(userId: string) {
  // In a real app, check user role in database
  // For now, check if user email ends with @admin.academy.ai
  return userId.includes("admin")
}

export function verifyAdminSession(userId: string | undefined): boolean {
  return !!userId && userId.includes("admin")
}
