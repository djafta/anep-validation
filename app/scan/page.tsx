import QRScanner from "@/components/qr-scanner";
import { Header } from "@/components/header";

export default function ScanPage() {
  return (
    <div className={ "min-h-screen bg-background flex flex-col" }>
      <Header/>
      <div className={"flex-1 flex items-center justify-center"}>
        <QRScanner/>
      </div>
    </div>
  )
}