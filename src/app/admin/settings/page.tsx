import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import SettingsForm from "@/components/admin/SettingsForm";

const prisma = new PrismaClient();

export default async function SettingsPage() {
  const user = await currentUser();
  if (!user) return <div>Giriş yapınız.</div>;

  const restaurant = await prisma.restaurant.findFirst({
    where: { userId: user.id }
  });

  if (!restaurant) return <div>Restoran bulunamadı.</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800">Restoran Ayarları</h1>
      <SettingsForm restaurant={restaurant} />
    </div>
  );
}