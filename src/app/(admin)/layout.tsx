import SidePanel from "@/components/sidepanel/SidePanel";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex"> 
      <SidePanel role={"admin"} />
      {children}
    </div>
  );
}
