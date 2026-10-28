type AnimatedLabelProps = {
  children: string;
};

export function AnimatedLabel({ children }: AnimatedLabelProps) {
  const renderCharacters = (variant: "base" | "hover") =>
    Array.from(children).map((character, index) => (
      <span
        key={`${variant}-${index}`}
        style={{ transitionDelay: `${index * 8}ms` }}
      >
        {character === " " ? "\u00a0" : character}
      </span>
    ));

  return (
    <span className="animated-label">
      <span className="animated-label__accessible">{children}</span>
      <span className="animated-label__line animated-label__line--base" aria-hidden="true">
        {renderCharacters("base")}
      </span>
      <span className="animated-label__line animated-label__line--hover" aria-hidden="true">
        {renderCharacters("hover")}
      </span>
    </span>
  );
}
