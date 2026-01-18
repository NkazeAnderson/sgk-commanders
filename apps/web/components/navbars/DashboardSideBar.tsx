"use client";

import { sideBarMenuItems } from "@/constants";
import { SideBarMenuItem } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

function DashboardSideBar() {
  return (
    <div className="w-full flex flex-row md:flex-col gap-1 flex-grow overflow-y-scroll md:overflow-y-scroll overflow-x-auto md:overflow-x-hidden">
      {sideBarMenuItems.map((item) => (
        <NavLink key={item.displayText} {...item} />
      ))}
    </div>
  );
}

function NavLink(props: SideBarMenuItem) {
  const Icon = props.icon;
  const isActive = usePathname().toLowerCase() === props.url;

  return (
    <Link href={props.url}>
      <div
        className={`p-2 md:p-4 font-semibold rounded-md flex gap-2 text-sm md:text-base whitespace-nowrap ${
          !isActive
            ? "text-blue-black bg-blue-300"
            : "text-blue-100 bg-blue-black "
        } `}
      >
        {
          //@ts-expect-error Icon is a valid React component
          <Icon size={18} className="md:w-6 md:h-6" />
          }
        <span className="hidden md:inline">{props.displayText}</span>
      </div>
    </Link>
  );
}

export default DashboardSideBar;
