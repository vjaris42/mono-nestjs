import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function MainLayout({ children, title, description }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {title && (
        <head>
          <title>{title}</title>
          {description && <meta name="description" content={description} />}
        </head>
      )}
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  header?: React.ReactNode;
}

export function DashboardLayout({ children, sidebar, header }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {header && (
        <header className="border-b bg-card">
          {header}
        </header>
      )}
      
      <div className="flex">
        <aside className="w-64 border-r bg-card min-h-screen">
          {sidebar}
        </aside>
        
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
