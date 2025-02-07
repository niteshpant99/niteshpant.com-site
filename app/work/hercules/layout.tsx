export default function WideLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="w-full max-w-[1200px] mx-auto">
        {children}
      </div>
    );
  }