export const metadata = {
  title: 'Sales Copilot',
  description: 'Dashboard intelligent',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased bg-gray-50">{children}</body>
    </html>
  );
}
