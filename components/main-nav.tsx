"use client"

import { useParams, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathName = usePathname();
  const params = useParams();

  const routes = [{
    href: `/${params.storeId}/settings`,
    label: 'Settings',
    active: pathName === `/${params.storeId}/settings`
  }];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {routes.map((route,index) => (
        <Link
          key={index}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors",
            route.active ? "text-black" : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
