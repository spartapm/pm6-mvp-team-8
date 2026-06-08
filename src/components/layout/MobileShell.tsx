type MobileShellProps = {
  children: React.ReactNode;
};

export default function MobileShell({ children }: MobileShellProps) {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-[#8f8f90]">
      <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col overflow-x-hidden bg-white shadow-lg">
        {children}
      </div>
    </div>
  );
}
