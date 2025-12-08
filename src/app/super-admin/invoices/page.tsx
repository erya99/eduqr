import { PrismaClient } from "@prisma/client";
import { isSuperAdmin } from "@/lib/check-super-admin";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { markInvoiceAsProcessed } from "@/actions/invoice-actions";
import { CheckCircle, History } from "lucide-react";

// Cache'i devre dışı bırak
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export default async function InvoicesPage() {
  if (!await isSuperAdmin()) return <div>Yetkisiz Erişim</div>;

  // 1. Bekleyen fatura taleplerini çek
  const requests = await prisma.tempInvoiceRequest.findMany({
    orderBy: { createdAt: 'desc' },
    include: { restaurant: true }
  });

  // 2. Tamamlanmış (Loglanmış) işlemleri çek
  const logs = await prisma.invoiceLog.findMany({
    orderBy: { issuedAt: 'desc' },
    include: { restaurant: true },
    take: 20 // Son 20 işlem
  });

  return (
    <div className="p-10 max-w-7xl mx-auto space-y-12">
      
      {/* --- BÖLÜM 1: BEKLEYENLER --- */}
      <div>
        <h1 className="text-3xl font-bold mb-6 text-red-600 flex items-center gap-2">
            ⚠️ Fatura Bekleyen İşlemler
        </h1>
        <p className="mb-4 text-gray-500">
            Buradaki hassas veriler faturayı kestikten sonra silinmelidir.
        </p>

        <div className="border rounded-lg bg-white shadow overflow-hidden">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Tarih</TableHead>
                <TableHead>Restoran</TableHead>
                <TableHead>Fatura Bilgileri (Açık)</TableHead>
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
                        <div className="font-bold text-red-700">{req.legalName}</div>
                        <div>VN/TC: {req.taxNumber}</div>
                        <div className="text-gray-500 text-xs">{req.address}</div>
                    </TableCell>
                    <TableCell>{Number(req.amount)} ₺</TableCell>
                    <TableCell className="text-right">
                    <form action={async () => {
                        "use server";
                        await markInvoiceAsProcessed(req.id);
                    }}>
                        <Button size="sm" variant="destructive">
                            <CheckCircle className="w-4 h-4 mr-2"/>
                            Kestim & Sil
                        </Button>
                    </form>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
      </div>

      {/* --- BÖLÜM 2: TAMAMLANANLAR (Loglar) --- */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-700 flex items-center gap-2">
            <History className="w-6 h-6"/> Geçmiş İşlemler (Anonim)
        </h2>
        <div className="border rounded-lg bg-gray-50 shadow-sm overflow-hidden">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>İşlem Tarihi</TableHead>
                <TableHead>Restoran</TableHead>
                <TableHead>Kayıt (Maskelenmiş)</TableHead>
                <TableHead>Tutar</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {logs.map((log) => (
                <TableRow key={log.id}>
                    <TableCell>{log.issuedAt.toLocaleDateString('tr-TR')}</TableCell>
                    <TableCell>{log.restaurant.name}</TableCell>
                    <TableCell className="text-sm font-mono text-gray-600">
                        <div>{log.maskedName}</div>
                        <div>{log.maskedTaxNo}</div>
                    </TableCell>
                    <TableCell>{Number(log.amount)} ₺</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
      </div>

    </div>
  );
}