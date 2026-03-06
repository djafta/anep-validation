"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, FileText, User } from "lucide-react";

type ValidationProps = {
  data: {
    template: {
      publicId: string;
      name: string;
      subject: string;
      recipient: string;
      createdAt: string;
      updatedAt: string | null;
      deletedAt: string | null;
      version: string;
    };
    owner: {
      name: string;
      email: string;
    };
  };
};

export default function SgexValidationResult({ data }: ValidationProps) {
  const { template, owner } = data;

  return (
    <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl space-y-6">

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="bg-green-100 text-green-600 p-4 rounded-full">
              <BadgeCheck size={36} />
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-semibold">
            Documento válido
          </h1>

          <p className="text-muted-foreground text-sm md:text-base">
            Este documento foi verificado com sucesso pelo sistema SGEX.
          </p>
        </div>

        {/* Template info */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center gap-2">
            <FileText className="w-5 h-5 text-muted-foreground" />
            <CardTitle className="text-lg">Informações do Documento</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4 text-sm md:grid-cols-2">

            <Field label="Nome do template" value={template.name} />
            <Field label="Versão" value={template.version} />

            <Field label="Assunto" value={template.subject} />
            <Field label="Destinatário" value={template.recipient} />

            <Field
              label="Criado em"
              value={new Date(template.createdAt).toLocaleString()}
            />

            <Field label="Identificador" value={template.publicId} mono />

          </CardContent>
        </Card>

        {/* Owner */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center gap-2">
            <User className="w-5 h-5 text-muted-foreground" />
            <CardTitle className="text-lg">Responsável</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4 text-sm md:grid-cols-2">

            <Field label="Nome" value={owner.name} />
            <Field label="Email" value={owner.email} />

          </CardContent>
        </Card>

      </div>
    </div>
  );
}

function Field({
                 label,
                 value,
                 mono,
               }: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span
        className={`font-medium break-all ${
          mono ? "font-mono text-xs" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}