import { api } from "@/modules/certificate/certificate.api";

async function test() {
  const data = await api.getCertificateData("8ddb75f21b2c277fbe7b808844547d42fcfde32a5bd90f17c6c62b357d7da389_CERT");

  console.log(JSON.stringify(data));
}

test();