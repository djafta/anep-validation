import SgexValidationResult from "@/components/sgex-validation-result";
import { notFound } from "next/navigation";

export default async function ValidateCodePage({ params }: { params: Promise<{ code: string }> }) {
  try {


    const { code } = await params;

    if (code.startsWith('sgex_')) {
      const response = await fetch(`${ process.env.SGEX_API_URL }/templates/validate/${ code }`)

      if (!response.ok) {
        throw new Error('Erro ao validar o QR Code');
      }

      const data = await response.json();

      return (
        <SgexValidationResult data={ data }/>
      )
    }
  } catch {
    return notFound();
  }
}