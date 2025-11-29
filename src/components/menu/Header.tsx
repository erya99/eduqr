import Image from "next/image";

interface HeaderProps {
  name: string;
  logoUrl?: string | null;
  coverUrl?: string | null;
}

export default function Header({ name, logoUrl, coverUrl }: HeaderProps) {
  return (
    <div className="relative w-full bg-white shadow-sm pb-4 mb-2">
      {/* Kapak Fotoğrafı */}
      <div className="relative h-48 w-full bg-gray-200">
        {coverUrl && (
          <Image 
            src={coverUrl} 
            alt="Kapak Fotoğrafı" 
            fill 
            className="object-cover"
            priority // Sayfa açılır açılmaz yüklensin
          />
        )}
      </div>

      {/* Logo ve İsim Alanı */}
      <div className="px-4 -mt-10 relative flex flex-col items-center text-center">
        <div className="relative w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md bg-white">
          {logoUrl ? (
            <Image 
              src={logoUrl} 
              alt={`${name} Logo`} 
              fill 
              className="object-cover" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-2xl font-bold text-gray-400">
              {name.charAt(0)}
            </div>
          )}
        </div>
        
        <h1 className="mt-3 text-2xl font-bold text-gray-900">{name}</h1>
        <p className="text-sm text-gray-500 mt-1">Hoş geldiniz, sipariş için garsonu çağırabilirsiniz.</p>
      </div>
    </div>
  );
}