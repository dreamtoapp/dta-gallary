import React from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EyeIcon, MessageCircleIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Mock images for the client
const mockImages = [
  {
    id: "img1",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=200&q=80",
    tag: "عرض",
    status: "قيد الانتظار",
    uploader: "مصمم 1",
    createdAt: "2024-07-01",
    feedbackCount: 2,
  },
  {
    id: "img2",
    url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=200&q=80",
    tag: "منتج",
    status: "تمت الموافقة",
    uploader: "مصمم 2",
    createdAt: "2024-07-02",
    feedbackCount: 0,
  },
  {
    id: "img3",
    url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=200&q=80",
    tag: "منشور اجتماعي",
    status: "تم التعليق",
    uploader: "مصمم 1",
    createdAt: "2024-07-03",
    feedbackCount: 1,
  },
];

export default function AdminClientGalleryPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <Card className="w-full max-w-3xl p-6 flex flex-col gap-4 items-center">
        <h1 className="text-2xl font-bold mb-2">معرض صور العميل</h1>
        <Table className="w-full rtl text-right">
          <TableHeader>
            <TableRow>
              <TableHead>الصورة</TableHead>
              <TableHead>الوسم</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>الرافع</TableHead>
              <TableHead>تاريخ الرفع</TableHead>
              <TableHead>التعليقات</TableHead>
              <TableHead>إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockImages.map((img) => (
              <TableRow key={img.id}>
                <TableCell>
                  <Image src={img.url} alt="صورة" width={48} height={48} className="rounded-md object-cover" />
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{img.tag}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={img.status === "تمت الموافقة" ? "default" : img.status === "تم التعليق" ? "secondary" : "outline"}>{img.status}</Badge>
                </TableCell>
                <TableCell>{img.uploader}</TableCell>
                <TableCell>{img.createdAt}</TableCell>
                <TableCell className="flex items-center gap-1">
                  <MessageCircleIcon className="size-4 text-muted-foreground" />
                  {img.feedbackCount}
                </TableCell>
                <TableCell>
                  <Button size="icon" variant="ghost" aria-label="عرض الصورة">
                    <EyeIcon className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p className="text-xs text-gray-500 mt-4">(جميع البيانات تجريبية للعرض فقط)</p>
      </Card>
    </div>
  );
} 