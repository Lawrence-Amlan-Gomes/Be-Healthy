import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "./providers/AuthProvider";

import { dbConnect } from "@/services/mongo";
import ThemeProvider from "./providers/ThemeProvider";
import HoursProvider from "./providers/HoursProvider";
import DaysProvider from "./providers/DaysProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Time Track",
  description: "Improve a person self with life track",
};

export default async function RootLayout({ children }) {
  await dbConnect();
  return (
    <html lang="en">
      <body>
        <DaysProvider>
          <HoursProvider>
            <ThemeProvider>
              <AuthProvider>
                <div className="h-screen overflow-hidden">
                  <Navbar />
                  <main className="h-[90%]">{children}</main>
                </div>
              </AuthProvider>
            </ThemeProvider>
          </HoursProvider>
        </DaysProvider>
      </body>
    </html>
  );
}
