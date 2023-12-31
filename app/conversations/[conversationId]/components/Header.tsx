"use client";

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Avatar from "@/app/components/Avatar";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDarwerOpen] = useState(false);
  const { members } = useActiveList();

  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const satusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members `;
    }
    return isActive ? "Active" : "Offline";
  }, [conversation, isActive]);

  const [domlaoded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  });

  return (
    <>
      {domlaoded && (
        <>
          <ProfileDrawer
            data={conversation}
            isOpen={drawerOpen}
            onClose={() => setDarwerOpen(false)}
          />
          <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-4 lg:px-6 justify-between items-center shadow-sm">
            <div className="flex gap-3 items-center">
              <Link
                href={"/conversations"}
                className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
              >
                <HiChevronLeft size={32} />
              </Link>
              {conversation.isGroup ? (
                <AvatarGroup users={conversation.users} />
              ) : (
                <Avatar user={otherUser} />
              )}
              <div className="flex flex-col">
                <div>{conversation.name || otherUser.name} </div>
                <div
                  className="
                    text-sm 
                    font-light
                    text-neutral-500
                    
                    "
                >
                  {satusText}
                </div>
              </div>
            </div>
            <HiEllipsisHorizontal
              size={32}
              onClick={() => setDarwerOpen(true)}
              className="
            text-sky-500
            cursor-pointer
            hover:text-sky-600
            transition
            "
            />
          </div>
        </>
      )}
    </>
  );
};

export default Header;
