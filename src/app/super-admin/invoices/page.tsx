import { PrismaClient } from "@prisma/client";
import { isSuperAdmin } from "@/lib/check-super-admin";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { markInvoiceAsProcessed } from "@/actions/invoice-actions";
import { CheckCircle } from "lucide-react";

// Cache'i devre dışı bırak
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export default async function InvoicesPage() {
  if (!await isSuperAdmin()) return <div>Yetkisiz Erişim</div>;

  // Bekleyen fatura taleplerini çek
  const requests = await prisma.tempInvoiceRequest.findMany({
    orderBy: { createdAt: 'desc' },
    include: { restaurant: true } // Hangi restoran olduğunu görmek için
  });

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Fatura Bekleyen İşlemler 🧾</h1>
      <p className="mb-8 text-gray-500">
        Buradaki bilgiler faturayı kestikten sonra "İşlendi Olarak İşaretle" butonuyla silinmelidir.
      </p>

      <div className="border rounded-lg bg-white shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tarih</TableHead>
              <TableHead>Restoran</TableHead>
              <TableHead>Fatura Bilgileri</TableHead>
              <TableHead>Tutar</TableHead>
              <TableHead className="text-right">İşlem</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.length === 0 && (
                <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-gray-500">Bekleyen fatura talebi yok.</TableCell>
                </TableRow>
            )}
            
            {requests.map((req) => (
              <TableRow key={req.id}>
                <TableCell>{req.createdAt.toLocaleDateString('tr-TR')}</TableCell>
                <TableCell className="font-medium">{req.restaurant.name}</TableCell>
                <TableCell className="text-sm">
                    <div className="font-bold">{req.legalName}</div>
                    <div>VN/TC: {req.taxNumber} ({req.taxOffice || '-'})</div>
                    <div className="text-gray-500 truncate max-w-xs" title={req.address}>{req.address}</div>
                </TableCell>
                <TableCell>{Number(req.amount)} ₺</TableCell>
                <TableCell className="text-right">
                  <form action={async () => {
                    "use server";
                    await markInvoiceAsProcessed(req.id);
                  }}>
                    <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="w-4 h-4 mr-2"/>
                        Faturayı Kestim, SİL
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}