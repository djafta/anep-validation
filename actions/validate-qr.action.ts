'use server';

export async function validateQRAction(state: unknown, formData: FormData) {
  try {
    const code = formData.get('code') as string;

    if (code.startsWith('sgex_')) {
      const response = await fetch(`${ process.env.SGEX_API_URL }/validate/${ code }`)

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