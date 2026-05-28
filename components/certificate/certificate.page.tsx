"use client";

import { CertificateData, Module } from "@/modules/certificate/certificate.types";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export type CertificatePageProps = {
  certificateData: CertificateData
}

export function CertificatePage({ certificateData }: CertificatePageProps) {
  return (
    <div className={ "mx-auto px-4 max-w-6xl flex flex-col space-y-4" }>
      <section className={ "py-3" }>
        <header className={ "flex flex-col gap-4 py-20" }>
          <Image className={ "max-w-60 mx-auto" } width={ 1000 } height={ 600 } src={ "/logo-full.png" }
                 alt={ "Logotipo da ANEP" }/>
          <Badge className={ "text-sm rounded-full mx-auto" }>
            Certificado Válido
          </Badge>
        </header>
        <div className={ "my-10" }>
          <h1 className={ "text-lg font-semibold text-center" }>Certificado de Conclusão da Qualificação</h1>
        </div>
      </section>
      <div>
        <p className={ "text-justify leading-8" }>
          A <strong>Autoridade Nacional de Educação Profissional</strong> certifica
          que <strong>{ certificateData.certificate.trainee.name }</strong> concluiu a
          qualificação <strong>{ certificateData.certificate.certification.title }</strong>
          { " " }
          <strong>{ certificateData.certificate.certification.achievedStatus }</strong>,
          no ano de { certificateData.certificate.certification.completionYear },
          ministrado pelo <strong>{ certificateData.certificate.certification.institution }</strong>, tendo completado
          todas as unidades de competência que compõe a qualificação.
        </p>
      </div>
      <section className={ "py-20 space-y-4" }>
        <header>
          <h1 className={ "text-lg font-semibold uppercase opacity-80 tracking-wider" }>
            Unidades de Competência Concluídas
          </h1>
        </header>
        <main className={ "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-3" }>
          {
            certificateData.certificate.modules
              .sort((m1, m2) => m1.order - m2.order)
              .map((module => <ModuleCard key={ module.id } module={ module }/>))
          }
        </main>
      </section>
    </div>
  )
}

function ModuleCard({ module }: { module: Module }) {
  return (
    <div className="border border-primary rounded-xl p-4 h-full flex flex-col justify-between">
      <Badge>{ module.id }</Badge>
      <h3 className="text-sm font-light">{ module.title }</h3>
      <p className="text-xs text-muted-foreground mt-1 font-semibold">{ module.ects } Créditos</p>
    </div>
  )
}