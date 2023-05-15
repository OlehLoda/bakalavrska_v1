import "./globals.css";
import NextAuthProvider from "./NextAuthWrapper";
import Header from "@/components/global/header/header";
import Footer from "@/components/global/footer/footer";
import GlobalContextProvider from "@/components/context/provider";
import Cards from "@/components/global/cards/cards";

// метадані додатку
export const metadata = {
  title: "Vladyslav Broda",
  description: "Created by Vladyslav Broda",
};

// повертаємо всі дочірні компоненти сторінок, хедер та футер,
// обгорнуті головним лейаутом додатку та провайдерами для NextAuth і глобального контексту
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
            <Header />
            {children}
            <Footer />
            <Cards />
          </GlobalContextProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
