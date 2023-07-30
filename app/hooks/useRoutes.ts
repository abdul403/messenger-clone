"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import useConversation from "./useConversation";
import { HiChat } from "react-icons/hi";
import { signOut } from "next-auth/react";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";

const useRoutes = () => {
  const { conversationId } = useConversation();

  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: HiChat,
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: HiUsers,
        active: pathname === "/users",
      },
      {
        label: "Logout",
        href: "#",
        icon: HiArrowLeftOnRectangle,
        onClick: () => signOut(),
      },
    ],
    [pathname, conversationId]
  );
  return routes;
};

export default useRoutes;
