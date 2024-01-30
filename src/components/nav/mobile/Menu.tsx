"use client";
import styles from "./Menu.module.css";
import Dropdown from "@/components/nav/mobile/Dropdown/Dropdown";
import { useState } from "react";
import Link from "next/link";
import HamburgerButton from "@/components/hamburger-menu/HamburgerButton";

type MenuProps = {
    session: any;
    user: any;
};

const Menu = ({ session, user }: MenuProps) => {
    const [state, setState] = useState(false);
    return (
        <section className={styles.container}>
            <Link href="/">
                <p className={styles.name}>MyAIResumes</p>
            </Link>
            <div
                className={styles.buttonContainer}
                onClick={() => setState(!state)}
            >
                <HamburgerButton
                    isOpen={state}
                    strokeWidth="1.5"
                    color="black"
                    lineProps={{ strokeLinecap: "round" }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    width="16"
                    height="12"
                />
            </div>
            <Dropdown
                session={session}
                user={user}
                state={state}
                setState={setState}
                links={
                    session
                        ? [
                              { name: "Home", to: "/", id: "home" },
                              {
                                  name: "Dashboard",
                                  to: "/dashboard",
                                  id: "dashboard",
                              },
                              {
                                  name: "Account",
                                  to: "/account",
                                  id: "account",
                              },
                          ]
                        : [
                              { name: "Home", to: "/", id: "home" },
                              {
                                  name: "Create a Resume",
                                  to: "/sign-up",
                                  id: "sign-up",
                              },
                          ]
                }
            />
        </section>
    );
};

export default Menu;
