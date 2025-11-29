import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const prisma = new PrismaClient();

async function createRestaurant(formData: FormData) {
  "use server";
  const user = await currentUser();
  if (!user) return;

  const name = formData.get("name") as string;
  // Slug oluştur (Türkçe karakterleri temizle, boşlukları tire yap)
  const slug = name.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[ıİğĞüÜşŞöÖçÇ]/g, (match) => {
        const map: any = { 'ı': 'i', 'İ': 'i', 'ğ': 'g', 'Ğ': 'g', 'ü': 'u', 'Ü': 'u', 'ş': 's', 'Ş': 's', 'ö': 'o', 'Ö': 'o', 'ç': 'c', 'Ç': 'c' };
        return map[match];
    });

  await prisma.restaurant.create({
    data: {
      name,
      slug,
      userId: user.id
    }
  });

  redirect("/admin");
}

export default async function OnboardingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Restoranını Oluştur</CardTitle>
          <CardDescription>Başlamak için işletmenize bir isim verin.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createRestaurant} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">İşletme Adı</Label>
              <Input id="name" name="name" placeholder="Örn: Paşa Döner" required />
            </div>
            <Button type="submit" className="w-full">Kurulumu Tamamla</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}