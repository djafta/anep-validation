"use client"

import { startTransition, useActionState, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Camera, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import QRScanner from "@/components/qr-scanner";
import { Result } from "react-zxing";
import { validateQRAction } from "@/actions/validate-qr.action";
import SgexValidationResult from "@/components/sgex-validation-result";

export default function ScanPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<"success" | "error" | null>(null)
  const [state, dispatch, isPending] = useActionState(validateQRAction, null);

  function onDecodeResult(result: Result) {
    const code = result.getText();
    if (code) {
      const formData = new FormData();
      formData.append("code", code);
      startTransition(() => {
        dispatch(formData);
      })
    }
  }

  if (state && state.success) {
    return <SgexValidationResult data={ state.payload }/>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */ }
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4"/>
                Voltar
              </Button>
            </Link>
            <Image src="/logo-full.png" alt="ANEP" width={ 120 } height={ 40 } className="h-8 w-auto"/>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        { !scanResult ? (
          <div className="max-w-md mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-foreground">Validar Documento</h1>
              <p className="text-muted-foreground">Posicione o QR code do documento dentro da área de captura</p>
            </div>

            {/* Scanner Area */ }
            <Card className="relative overflow-hidden aspect-square bg-muted py-0">
              { isScanning ? (
                <div className="relative w-full h-full">
                  <QRScanner onDecodeResult={ onDecodeResult }/>

                  {/* Scanning Overlay */ }
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-48 h-48 border-2 border-primary rounded-lg relative">
                        <div
                          className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-secondary rounded-tl-lg"></div>
                        <div
                          className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-secondary rounded-tr-lg"></div>
                        <div
                          className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-secondary rounded-bl-lg"></div>
                        <div
                          className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-secondary rounded-br-lg"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-0.5 bg-secondary animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Instructions */ }
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/70 text-white px-3 py-2 rounded-lg text-sm text-center">
                      Posicione o QR code dentro da área destacada
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-4">
                    <Camera className="h-16 w-16 text-muted-foreground mx-auto"/>
                    <p className="text-muted-foreground">Toque para ativar a câmera</p>
                  </div>
                </div>
              ) }
            </Card>

            {/* Action Buttons */ }
            <div className="space-y-3">
              { !isScanning ? (
                <Button onClick={ () => setIsScanning(true) } className="w-full h-12 text-lg" size="lg">
                  <Camera className="h-5 w-5 mr-2"/>
                  Ativar Câmera
                </Button>
              ) : (
                <Button onClick={ () => setIsScanning(false) } className="w-full h-12 text-lg" size="lg">
                  Cancelar
                </Button>
              ) }
            </div>

            {/* Supported Documents */ }
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Documentos suportados:</p>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                <span className="bg-muted px-2 py-1 rounded">Crachas</span>
                <span className="bg-muted px-2 py-1 rounded">Card ID</span>
                <span className="bg-muted px-2 py-1 rounded">Cartas</span>
                <span className="bg-muted px-2 py-1 rounded">Certificados</span>
              </div>
            </div>
          </div>
        ) : (
          /* Results */
          <div className="max-w-md mx-auto space-y-6">
            <div className="text-center space-y-4">
              { scanResult === "success" ? (
                <>
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto"/>
                  <h1 className="text-2xl font-bold text-green-600">Documento Válido</h1>
                </>
              ) : (
                <>
                  <XCircle className="h-16 w-16 text-red-500 mx-auto"/>
                  <h1 className="text-2xl font-bold text-red-600">Documento Inválido</h1>
                </>
              ) }
            </div>

            { scanResult === "error" && (
              <Card className="p-6 bg-red-50 border-red-200">
                <div className="text-center space-y-2">
                  <p className="text-red-700 font-medium">Documento não reconhecido ou inválido</p>
                  <p className="text-red-600 text-sm">Verifique se o QR code está legível e tente novamente</p>
                </div>
              </Card>
            ) }
          </div>
        ) }
      </main>
    </div>
  )
}
