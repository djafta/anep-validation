import Image from "next/image";

export function Header() {

  return (
    <header
      className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center">
          <Image
            src="/logo-full.png"
            alt="ANEP - Autoridade Nacional da Educação Profissional"
            width={ 200 }
            height={ 60 }
            className="h-12 w-auto"
          />
        </div>
      </div>
    </header>
  )
}