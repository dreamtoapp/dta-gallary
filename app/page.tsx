"use client";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Fake client names
const clientNames = [
  "شركة ألف",
  "مؤسسة بيت التصميم",
  "عميل تجريبي",
  "مؤسسة الإبداع",
  "شركة المستقبل",
  "تصاميم العرب",
  "مؤسسة الرؤية",
  "شركة الفن الحديث",
  "عميل مميز",
  "مؤسسة التميز"
];

// Design type enum for use across the app
export enum DesignType {
  Logo = "شعار",
  Identity = "هوية",
  Website = "موقع",
  Print = "مطبوعة",
  Ad = "إعلان",
  App = "تطبيق",
}

const designTypes = [
  DesignType.Logo,
  DesignType.Identity,
  DesignType.Website,
  DesignType.Print,
  DesignType.Ad,
  DesignType.App,
];

// Generate 100 fake images with deterministic client names and design types
const fakeImages = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  url: `https://picsum.photos/id/${i + 10}/500/700`,
  width: 500,
  height: 700,
  client: clientNames[i % clientNames.length],
  type: designTypes[i % designTypes.length],
}));

console.log('Fake images with clients:', fakeImages);

export default function HomePage() {
  const [images, setImages] = useState(fakeImages.slice(0, 20));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreImages = () => {
    setTimeout(() => {
      const next = images.length + 20;
      if (next >= fakeImages.length) {
        setImages(fakeImages);
        setHasMore(false);
      } else {
        setImages(fakeImages.slice(0, next));
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-white p-0">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8">
        <h1 className="text-4xl font-bold heading-elegant mb-8 text-center">معرض التصاميم</h1>
        <InfiniteScroll
          dataLength={images.length}
          next={fetchMoreImages}
          hasMore={hasMore}
          loader={<div className="text-center py-8 text-gray-400">جاري التحميل...</div>}
          endMessage={<div className="text-center py-8 text-gray-400">تم عرض جميع الصور</div>}
        >
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns:
                "repeat(auto-fill, minmax(240px, 1fr))",
              direction: "rtl",
            }}
          >
            {images.map((img) => (
              <Card
                key={img.id}
                className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group relative rounded-2xl bg-gray-50"
                style={{ breakInside: "avoid" }}
              >
                <CardHeader className="flex flex-row items-center justify-between p-3 pb-0">
                  {/* Client Avatar/Badge */}
                  <div className="flex items-center gap-2">
                    <Avatar className="w-7 h-7 bg-blue-700 text-white text-xs font-bold border-2 border-white shadow">
                      <AvatarFallback>{img.client?.slice(0,2) || "؟"}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-bold text-blue-800">{img.client || "عميل غير معروف"}</span>
                  </div>
                  {/* Design type badge */}
                  <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow border border-white/70">
                    {img.type}
                  </span>
                </CardHeader>
                <CardContent className="p-0">
                  <Image
                    src={img.url}
                    alt={`تصميم رقم ${img.id}`}
                    width={img.width}
                    height={img.height}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="/public/window.svg"
                  />
                </CardContent>
                <CardFooter className="flex justify-end p-2">
                  <span className="bg-black/70 text-white text-xs font-bold px-2 py-1 rounded shadow">
                    تصميم رقم {img.id}
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}
