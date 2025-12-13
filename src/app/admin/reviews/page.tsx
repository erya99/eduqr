import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Star, MessageCircle, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReviewDeleteButton from "@/components/admin/ReviewDeleteButton"; // 👈 İMPORT ETTİK

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
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Müşteri Değerlendirmeleri</h2>
            <p className="text-muted-foreground">
            Müşterilerinizden gelen gizli geri bildirimler.
            </p>
        </div>
        <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border shadow-sm">
            <span className="text-2xl font-bold text-primary mr-2">{restaurant.reviews.length}</span>
            <span className="text-sm text-gray-500">Toplam Yorum</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {restaurant.reviews.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-muted-foreground bg-muted/20 rounded-xl border-2 border-dashed">
            <MessageCircle className="w-10 h-10 mb-4 opacity-20" />
            <p>Henüz bir değerlendirme almadınız.</p>
          </div>
        ) : (
          restaurant.reviews.map((review) => (
            <Card key={review.id} className="group hover:shadow-lg transition-all duration-300 relative border-l-4 border-l-primary/50">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="space-y-1">
                    <CardTitle className="text-base font-semibold">
                    {review.contactInfo || "Anonim Müşteri"}
                    </CardTitle>
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200 dark:text-gray-700"
                            }`}
                            />
                        ))}
                    </div>
                </div>

                {/* SİLME BUTONU BURAYA EKLENDİ */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ReviewDeleteButton reviewId={review.id} />
                </div>

              </CardHeader>
              <CardContent>
                <div className="mt-3 text-sm text-gray-600 dark:text-gray-300 italic bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                  "{review.comment}"
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    {new Date(review.createdAt).toLocaleDateString('tr-TR')}
                  </div>
                  <span className="opacity-60">
                    {new Date(review.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute:'2-digit' })}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}