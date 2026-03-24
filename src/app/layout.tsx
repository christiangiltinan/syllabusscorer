import React from 'react';

export const metadata = {
  title: 'SyllabusScorer',
  description: 'Master Topical Past Papers & Revision Notes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
