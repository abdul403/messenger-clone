"use client";

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import MobileFooterItem from "./MobileFooterItem";

const MobileFooter = () => {
  const { isOpen } = useConversation();
  const routes = useRoutes();

  if (isOpen) {
    return null;
  }

  return (
    <div
      className="
    fixed 
    justify-between 
    w-full 
    bottom-0 
    z-40 
    flex 
    items-center 
    bg-white 
    border-t-[1px]
    lg:hidden"
    >
      {routes.map((route) => (
        <MobileFooterItem
          key={route.href}
          icon={route.icon}
          active={route.active}
          onClick={route.onClick}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default MobileFooter;
