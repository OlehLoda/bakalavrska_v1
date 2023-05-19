import "./globals.css";
import NextAuthProvider from "./NextAuthWrapper";
import Header from "@/components/global/header/header";
import GlobalContextProvider from "@/components/context/provider";
import Alert from "@/components/global/alert/alert";

export const metadata = {
  title: "Oleh Loda",
  description: "Created by Oleh Loda",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <GlobalContextProvider>
            <Alert />
            <Header />
            <main className="wrapApp">{children}</main>
          </GlobalContextProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
