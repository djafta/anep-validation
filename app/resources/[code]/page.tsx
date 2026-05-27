import { CertificatePage } from "@/components/certificate/certificate.page";
import data from "@/modules/certificate/data.json";

export default async function Page() {
  return (
    <div>
      <CertificatePage certificateData={ data }/>
    </div>
  )
}