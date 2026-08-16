import RequireAuth from "@/components/RequireAuth";
import BottomNav from "@/components/BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <div className="flex flex-col min-h-dvh bg-white">
        <div className="flex-1">{children}</div>
        <BottomNav />
      </div>
    </RequireAuth>
  );
}
