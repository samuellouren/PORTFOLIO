export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6 text-center">
      <p className="text-xs text-muted">
        Feito com React + Vite por{" "}
        <span className="text-primary font-medium">Samuel Lourenço</span>
        {" "}·{" "}
        <a
          href="https://github.com/samuellouren"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-text transition-colors"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
}
