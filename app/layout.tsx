export const metadata = {
  title: 'Sales Copilot - Dashboard',
  description: 'Intelligent Sales Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  )
}
