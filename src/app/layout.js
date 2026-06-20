import "./globals.css";
import ClientInit from "@/components/ClientInit";

export const metadata = {
  title: "Shahid Khan - Freelance Full Stack Developer",
  description: "Building modern websites, business platforms, and digital experiences that drive growth and engagement.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Load Inter font and Material Symbols icons */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background-custom text-text-main antialiased overflow-x-hidden" suppressHydrationWarning>
        <ClientInit />
        {children}
      </body>
    </html>
  );
}
