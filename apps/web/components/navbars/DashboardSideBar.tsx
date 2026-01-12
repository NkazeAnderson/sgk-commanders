"use client";

import { sideBarMenuItems } from "@/constants";
import { SideBarMenuItem } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

function DashboardSideBar() {
  return (
    <div className="w-full flex flex-col gap-1 flex-grow overflow-y-scroll">
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
        className={`p-4 font-semibold  rounded-md flex gap-2 ${
          !isActive
            ? "text-blue-black bg-blue-300"
            : "text-blue-100 bg-blue-black "
        } `}
      >
        {
          //@ts-ignore
        <Icon />
        }
        {props.displayText}
      </div>
    </Link>
  );
}

export default DashboardSideBar;
