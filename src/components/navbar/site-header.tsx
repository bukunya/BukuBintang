import Link from "next/link";
import {
  Phone,
  Mail,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
} from "lucide-react";
import { topInfo } from "./navcontents";

export function SiteHeader() {
  return (
    <header className="w-full font-sans">
      <div className="bg-secondary text-white py-3 px-4 md:px-8 text-sm font-bold">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{topInfo.phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>{topInfo.email}</span>
            </div>
          </div>
          <div>
            <span>{topInfo.info}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Follow Us :</span>
            <div className="flex gap-3">
              <Link href={topInfo.instagram}>
                <Instagram className="h-4 w-4 cursor-pointer hover:text-gray-200" />
              </Link>
              <Link href={topInfo.youtube}>
                <Youtube className="h-4 w-4 cursor-pointer hover:text-gray-200" />
              </Link>
              <Link href={topInfo.facebook}>
                <Facebook className="h-4 w-4 cursor-pointer hover:text-gray-200" />
              </Link>
              <Link href={topInfo.twitter}>
                <Twitter className="h-4 w-4 cursor-pointer hover:text-gray-200" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
