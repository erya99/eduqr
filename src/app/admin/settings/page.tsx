import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getRestaurantFromUser } from "@/actions/restaurant-actions";
import SettingsForm from "@/components/admin/SettingsForm";

export default async function SettingsPage() {
  // auth() artık bir promise, await eklemeyi unutma
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const restaurant = await getRestaurantFromUser();

  if (!restaurant) {
    redirect("/onboarding");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Restoran Ayarları</h1>
        <p className="text-gray-600">Restoranınızın genel bilgilerini, görsellerini ve sosyal medya linklerini düzenleyin.</p>
      </div>
      
      <SettingsForm restaurant={restaurant} />
    </div>
  );
}