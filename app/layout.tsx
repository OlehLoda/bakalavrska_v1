import "./globals.css";
import NextAuthProvider from "./NextAuthWrapper";
import Header from "@/components/global/header/header";
import GlobalContextProvider from "@/components/context/provider";

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
      <head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${"AIzaSyCGq7bOvkrJN5G7T78FlOgFEd3Z7zNHZWE"}&libraries=places`}
        />
      </head>
      <body>
        <NextAuthProvider>
          <GlobalContextProvider>
            <Header />
            <main className="wrapApp">{children}</main>
          </GlobalContextProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
