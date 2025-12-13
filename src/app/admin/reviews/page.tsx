import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Star, MessageCircle, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const prisma = new PrismaClient();

export default async function ReviewsPage() {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");

  const restaurant = await prisma.restaurant.findFirst({
    where: { userId: user.id },
    include: {
      reviews: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!restaurant) return <div>Restoran bulunamadı.</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Müşteri Değerlendirmeleri</h2>
        <p className="text-muted-foreground">
          Müşterilerinizden gelen gizli geri bildirimler burada listelenir.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {restaurant.reviews.length === 0 ? (
          <div className="col-span-full text-center py-10 text-muted-foreground bg-muted/20 rounded-lg">
            Henüz bir değerlendirme almadınız.
          </div>
        ) : (
          restaurant.reviews.map((review) => (
            <Card key={review.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {review.contactInfo || "Anonim Müşteri"}
                </CardTitle>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 italic">
                  "{review.comment}"
                </div>
                <div className="mt-4 flex items-center text-xs text-muted-foreground gap-2">
                  <MessageCircle className="h-3 w-3" />
                  {new Date(review.createdAt).toLocaleDateString('tr-TR')}
                  <span className="text-gray-300">|</span>
                  {new Date(review.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute:'2-digit' })}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}