// components/whatsapp-float.tsx
"use client";
import { SITE } from "@/lib/site";

export default function WhatsappFloat() {
  const url = SITE.links.whatsapp;
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
      style={{ backgroundColor: "#25D366" }}
      aria-label="WhatsApp"
    >
      <svg width="26" height="26" viewBox="0 0 32 32" fill="#fff" aria-hidden>
        <path d="M19.11 17.39c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.58-1.5-1.85-.16-.27-.02-.42.12-.55.13-.13.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01s-.48.07-.73.34c-.25.27-.96.94-.96 2.29s.98 2.66 1.12 2.84c.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.58.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.83-1.29.23-.64.23-1.18.16-1.29-.07-.11-.25-.18-.52-.32z"/>
        <path d="M26.62 5.38A12.62 12.62 0 1014 27.62h.01a12.58 12.58 0 006.1-1.64l3.92 1.03-1.05-3.83A12.6 12.6 0 0026.62 5.38zm-1.86 19.14a10.43 10.43 0 01-5.45 1.54H19A10.46 10.46 0 118 8.48a10.43 10.43 0 0115.23 14.98l.53 1.92-1.99-.53z"/>
      </svg>
    </a>
  );
}
