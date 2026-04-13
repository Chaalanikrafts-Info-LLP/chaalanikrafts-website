import "./globals.css";

export const metadata = {
  title: "Chaalanikrafts - AI-powered Fleet Management",
  description: "AI-powered fleet management for smarter logistics. Track vehicles live and reduce delays.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
