import { CertificatePage } from "@/components/certificate/certificate.page";
import { api } from "@/modules/certificate/certificate.api";
import { notFound } from "next/navigation";

export type PageProps = {
  params: Promise<{
    code: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { code } = await params;
  const data = await api.getCertificateData(code)
  if (!data) {
    return notFound();
  }
  return (
    <div>
      <CertificatePage certificateData={ data }/>
    </div>
  )
}