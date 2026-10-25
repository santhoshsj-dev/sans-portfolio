import Link from "next/link";

export function HomeWorkMarquee() {
  return (
    <Link
      href="/works"
      className="home__work-marquee"
      aria-label="View all works"
    >
      <span className="home__marquee-track" aria-hidden="true">
        {[0, 1].map((group) => (
          <span className="home__marquee-group" key={group}>
            {Array.from({ length: 8 }, (_, index) => (
              <span key={index}>/　 VIEW ALL WORKS</span>
            ))}
          </span>
        ))}
      </span>
    </Link>
  );
}
