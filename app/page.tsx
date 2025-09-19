import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, CreditCard, FileText, QrCode } from "lucide-react"
import Image from "next/image"
import Link from "next/link";
import { Header } from "@/components/header";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header/>

      <section className="py-20 bg-background min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Sistema de Validação de Identidades
            </h1>
            <p className="text-xl text-muted-foreground mb-12 text-pretty">
              Valide crachas, Card ID, cartas e certificados através do QR Code de forma rápida e segura.
            </p>

            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-xl font-semibold mb-16"
            >
              <Link href="/scan">
                <QrCode className="w-6 h-6 mr-3"/>
                Validar Documento
              </Link>
            </Button>

            <div className="max-w-xs mx-auto">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="w-32 h-32 mx-auto bg-muted rounded-lg flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-primary"/>
                </div>
                <p className="text-sm text-muted-foreground mt-4">Escaneie o QR Code do documento</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Documentos Suportados</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CreditCard className="w-6 h-6 text-primary"/>
                </div>
                <CardTitle className="text-lg">Crachas</CardTitle>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CreditCard className="w-6 h-6 text-primary"/>
                </div>
                <CardTitle className="text-lg">Cartões</CardTitle>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-primary"/>
                </div>
                <CardTitle className="text-lg">Cartas</CardTitle>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-primary"/>
                </div>
                <CardTitle className="text-lg">Certificados</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <Image
              src="/logo-full.png"
              alt="ANEP"
              width={ 150 }
              height={ 45 }
              className="h-8 w-auto mx-auto brightness-0 invert"
            />
          </div>
          <p className="text-primary-foreground/80 text-sm">
            © 2025 ANEP - Sistema oficial de validação de identidades
          </p>
        </div>
      </footer>
    </div>
  )
}
