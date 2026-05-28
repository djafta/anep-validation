async function getCredentials(): Promise<{ Token: string, Expires: string } | null> {

  const body = JSON.stringify({
    username: process.env.SEGI_API_USERNAME,
    password: process.env.SEGI_API_PASSWORD,
  });

  console.log({ body })

  const response = await fetch(`${ process.env.SEGI_API_BASE_URL }/login`, {

    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body
  });

  if (response.ok) {
    return response.json();
  }

  return null;
}

async function getCertificateData(token: string) {
  const credentials = await getCredentials();

  console.log({ token, credentials });

  if (!credentials) {
    return null;
  }

  const { Token } = credentials;

  const response = await fetch(`${ process.env.SEGI_API_BASE_URL }/certificates/${ token }/validate`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ Token }`,
    }
  })

  if (response.ok) {
    return response.json();
  }

  return null;
}

export const api = {
  getCertificateData,
}