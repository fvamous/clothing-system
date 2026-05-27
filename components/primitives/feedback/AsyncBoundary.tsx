"use client";

interface AsyncBoundaryProps {
  loading?: boolean;

  error?: boolean;

  children: React.ReactNode;

  fallback?: React.ReactNode;

  errorFallback?: React.ReactNode;
}

export default function AsyncBoundary({
  loading,
  error,
  children,
  fallback,
  errorFallback,
}: AsyncBoundaryProps) {
  if (loading) {
    return fallback ?? (
      <div className="p-8 text-sm opacity-70">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      errorFallback ?? (
        <div className="p-8 text-sm text-red-500">
          Something went wrong
        </div>
      )
    );
  }

  return children;
}