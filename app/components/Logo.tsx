import Image from 'next/image';

interface LogoProps {
  className?: string;
  priority?: boolean;
}

const Logo = ({ className = "w-auto h-12", priority = false }: LogoProps) => {
  return (
    <div className="flex items-center">
      <Image
        src="/logo.png"
        alt="LayerNLooms Logo"
        width={180}
        height={109}
        className={`${className} object-contain dark:invert`}
        priority={priority}
      />
    </div>
  );
};

export default Logo;

