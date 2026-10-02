export default function MarginNote({ children }: { children: string }) {
  return (
    <p className="max-w-[200px] text-[0.875rem] italic leading-[1.5] text-fumo min-[900px]:ml-auto">
      {children}
    </p>
  );
}
