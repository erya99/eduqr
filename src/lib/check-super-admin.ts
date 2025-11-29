import { currentUser } from "@clerk/nextjs/server";

// Buraya kendi Clerk'e giriş yaptığın e-posta adresini yaz
const SUPER_ADMINS = [
  "eraygumusbas7@gmail.com", 
  "diger.ortak@adresin.com"
];

export async function isSuperAdmin() {
  const user = await currentUser();
  
  if (!user) return false;
  
  const email = user.emailAddresses[0].emailAddress;
  return SUPER_ADMINS.includes(email);
}