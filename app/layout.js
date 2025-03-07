import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "./providers/AuthProvider";

import { dbConnect } from "@/services/mongo";
import ThemeProvider from "./providers/ThemeProvider";
import DaysProvider from "./providers/DaysProvider";
import TaskProvider from "./providers/TaskProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Be Healthy",
  description: "Improve a person's life with a healthy lifestyle",
};

export default async function RootLayout({ children }) {
  await dbConnect();
  return (
    <html lang="en">
      <body>
        <TaskProvider>
          <DaysProvider>
              <ThemeProvider>
                <AuthProvider>
                  <div className="h-screen overflow-hidden">
                    <Navbar />
                    <div className="h-[90%] overflow-hidden">{children}</div>
                  </div>
                </AuthProvider>
              </ThemeProvider>
          </DaysProvider>
        </TaskProvider>
      </body>
    </html>
  );
}
