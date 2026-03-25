'use server';

export async function validateQRAction(state: unknown, formData: FormData) {
  try {
    let code = formData.get('code') as string;

    if (code.startsWith('http')) {
      const url = new URL(code);
      code = url.pathname.split('/').pop() as string;
    }

    if (code.startsWith('sgex_')) {
      const response = await fetch(`${ process.env.SGEX_API_URL }/templates/validate/${ code }`)

      if (!response.ok) {
        throw new Error('Erro ao validar o QR Code');
      }

      const data = await response.json();

      return {
        success: true,
        payload: data,
      }
    }
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: 'Erro ao validar o QR Code',
    }
  }
}