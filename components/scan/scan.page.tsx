"use client"

import { useActionState, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertTriangle, ArrowLeft, Camera, RefreshCw, XCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import QRScanner from "@/components/qr-scanner"
import { Result } from "react-zxing"
import { validateQRAction } from "@/actions/validate-qr.action"
import SgexValidationResult from "@/components/sgex-validation-result"
import { useRouter } from "next/navigation";

type ScanState = "idle" | "scanning" | "pending"

function StepIndicator({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center gap-1.5">
      { [1, 2, 3].map((s) => (
        <div
          key={ s }
          className={ `w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
            s <= step ? "bg-emerald-500" : "bg-muted-foreground/30"
          }` }
        />
      )) }
    </div>
  )
}

export function ScanPage() {
  const [scanState, setScanState] = useState<ScanState>("idle")
  const [state, dispatch, isPending] = useActionState(validateQRAction, null)
  const router = useRouter();

  function onDecodeResult(result: Result) {
    const code = result.getText()
    if (!code) return
    router.push(`/resources/${ code }`)
  }

  function handleCancel() {
    setScanState("idle")
  }

  if (state?.success) {
    return <SgexValidationResult data={ state.payload }/>
  }

  const step = scanState === "idle" ? 1 : scanState === "scanning" ? 2 : 3
  const hasError = state && !state.success && scanState === "pending"

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4"/>
              Voltar
            </Button>
          </Link>
          <Image src="/logo-full.png" alt="ANEP" width={ 120 } height={ 40 } className="h-8 w-auto"/>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto space-y-5">
          <div className="text-center space-y-3">
            <h1 className="text-2xl font-bold text-foreground">Validar documento</h1>
            <p className="text-muted-foreground">
              Posicione o QR code do documento dentro da área de captura
            </p>
            <div className="flex justify-center">
              <StepIndicator step={ step }/>
            </div>
          </div>

          { scanState === "scanning" && (
            <div className="flex justify-center">
              <span
                className="inline-flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
                A capturar...
              </span>
            </div>
          ) }

          <Card
            className={ `relative overflow-hidden aspect-square bg-muted py-0 transition-all duration-300 ${
              scanState === "idle" ? "cursor-pointer hover:border-primary/50" : ""
            }` }
            onClick={ () => scanState === "idle" && setScanState("scanning") }
          >
            { scanState === "idle" && !hasError && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-background/80 flex items-center justify-center mx-auto">
                    <Camera className="h-7 w-7 text-muted-foreground"/>
                  </div>
                  <p className="text-muted-foreground text-sm">Toque para ativar a câmera</p>
                </div>
              </div>
            ) }

            { (scanState === "scanning" || scanState === "pending") && (
              <div className="relative w-full h-full">
                <QRScanner onDecodeResult={ onDecodeResult }/>

                {/* Overlay com moldura */ }
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    {/* Cantos da moldura */ }
                    { [
                      "top-0 left-0 border-t-[3px] border-l-[3px] rounded-tl-lg",
                      "top-0 right-0 border-t-[3px] border-r-[3px] rounded-tr-lg",
                      "bottom-0 left-0 border-b-[3px] border-l-[3px] rounded-bl-lg",
                      "bottom-0 right-0 border-b-[3px] border-r-[3px] rounded-br-lg",
                    ].map((cls, i) => (
                      <div key={ i } className={ `absolute w-6 h-6 border-primary ${ cls }` }/>
                    )) }
                    {/* Linha de scan */ }
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full h-0.5 bg-primary animate-scan"/>
                    </div>
                  </div>
                </div>

                { scanState === "pending" && (
                  <div
                    className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3 animate-in fade-in">
                    <div className="w-9 h-9 border-2 border-white/20 border-t-secondary rounded-full animate-spin"/>
                    <p className="text-white/80 text-sm">A validar documento...</p>
                  </div>
                ) }

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/70 text-white px-3 py-2 rounded-lg text-sm text-center">
                    Centralize o QR code na área destacada
                  </div>
                </div>
              </div>
            ) }

            { hasError && (
              <div
                className="absolute inset-0 bg-red-950 flex flex-col items-center justify-center gap-3 animate-in zoom-in-95">
                <XCircle className="h-12 w-12 text-red-400"/>
                <p className="text-red-200 font-semibold text-base">Documento inválido</p>
                <p className="text-red-400 text-xs text-center px-6">
                  QR code não reconhecido ou expirado
                </p>
              </div>
            ) }
          </Card>

          { hasError && (
            <Card className="p-4 border-red-200 bg-red-50 animate-in slide-in-from-bottom-2">
              <div className="flex gap-3 items-start">
                <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                  <AlertTriangle className="h-4 w-4 text-red-600"/>
                </div>
                <div>
                  <p className="text-red-700 font-medium text-sm">Documento não reconhecido</p>
                  <p className="text-red-500 text-xs mt-0.5">
                    Verifique se o QR code está legível e tente novamente
                  </p>
                </div>
              </div>
            </Card>
          ) }

          <div className="space-y-2">
            { (scanState === "scanning" || scanState === "pending") && (
              <Button
                onClick={ handleCancel }
                variant="outline"
                className="w-full h-12 text-base"
                size="lg"
              >
                Cancelar
              </Button>
            ) }

            { hasError && (
              <Button
                onClick={ () => {
                  setScanState("scanning")
                } }
                className="w-full h-12 text-base"
                size="lg"
              >
                <RefreshCw className="h-4 w-4 mr-2"/>
                Tentar novamente
              </Button>
            ) }
          </div>

          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">Documentos suportados:</p>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              { ["Crachás", "Card ID", "Cartas", "Certificados"].map((tag) => (
                <span key={ tag } className="bg-muted px-2 py-1 rounded border text-muted-foreground">
                  { tag }
                </span>
              )) }
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}