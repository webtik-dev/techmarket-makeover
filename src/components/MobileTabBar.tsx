import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, GitCompareArrows, User, ShoppingCart } from "lucide-react";
import faviAsset from "@/assets/favi.svg.asset.json";

const items = [
  { to: "/", label: "Начало", icon: null as null | typeof Heart },
  { to: "/profile", label: "Любими", icon: Heart, badge: 3 },
  { to: "/profile", label: "Сравни", icon: GitCompareArrows, badge: 2 },
  { to: "/profile", label: "Профил", icon: User },
  { to: "/cart", label: "Количка", icon: ShoppingCart, badge: 2 },
];

export function MobileTabBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Бърза навигация"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-5">
        {items.map((it, i) => {
          const Icon = it.icon;
          const active = pathname === it.to && (i === 0 || pathname !== "/");
          return (
            <li key={it.label}>
              <Link
                to={it.to}
                className={`relative flex flex-col items-center justify-center gap-1 py-2 text-[10px] font-medium transition ${
                  active ? "text-brand" : "text-ink-soft"
                }`}
              >
                <span className="relative grid h-6 w-6 place-items-center">
                  {Icon ? (
                    <Icon className="h-[20px] w-[20px]" strokeWidth={1.9} />
                  ) : (
                    <img src={faviAsset.url} alt="" aria-hidden className="h-6 w-6" />
                  )}
                  {it.badge !== undefined && (
                    <span className="absolute -right-2 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[9px] font-bold text-white">
                      {it.badge}
                    </span>
                  )}
                </span>
                <span className="truncate">{it.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
