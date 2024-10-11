import { useRouter } from "next/router";

interface HeaderProps {}

export function Header(props: HeaderProps) {
  const path = useRouter().pathname;

  return (
    <div className={`flex shadow-[0px_2px_15px_rgba(0,0,0,.05)] bg-white`}>
      <a
        href={'/'} 
        className={`p-[8px]`}>
        <img 
          className={`h-[24px] object-contain`}
          src={'/logo.svg'} />
      </a>
      <div className={`flex-1 flex`}>
        {
          [
            ['Varian Jenis', '/p/varian-jenis'],
            ['Merk', '/p/merk'],
            ['Kendaraan', '/p/kendaraan'],
            ['Variasi Kendaraan', '/p/varian-kendaraan'],
            ['Sales', '/p/sales'],
            ['Produk Sales', '/p/produk-sales'],
            ['Promo Sales', '/p/promo-sales']
          ].map(([label, href], i: number) => (
            <a
              href={href} 
              className={`${path == href ? 'bg-slate-200' : ''} hover:bg-slate-100 hover:border-b hover:border-b-[2px] hover:border-b-slate-400 cursor-pointer flex items-center justify-center px-[12px]`}
              key={i}>
              { label }
            </a>
          ))
        }
      </div>
      <a 
        href={'/api/logout'}
        className={`flex items-center justify-center px-[12px] hover:bg-red-100 hover:text-red-500 cursor-pointer`}>
        Logout
      </a>
    </div>
  );
}
