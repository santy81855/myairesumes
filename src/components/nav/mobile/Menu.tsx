"use client";
import styles from "./Menu.module.css";
import Dropdown from "@/components/nav/mobile/Dropdown/Dropdown";
import { useState } from "react";
import Link from "next/link";

type MenuProps = {
    session: any;
};

const Menu = ({ session }: MenuProps) => {
    const [state, setState] = useState(false);
    return (
        <section className={styles.container}>
            <Link href="/">
                <p className={styles.name}>MyAIResumes</p>
            </Link>
            <button
                className={styles.menuButton}
                onClick={() => setState(!state)}
            >
                <i className="fa-solid fa-bars"></i>
            </button>
            <Dropdown
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
                              {
                                  name: "Sign Out",
                                  to: "/api/auth/signout",
                                  id: "sign-out",
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
