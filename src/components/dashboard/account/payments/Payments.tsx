import styles from "./Payments.module.css";
import { redirect } from "next/navigation";
import Card from "@/components/dashboard/cards/dashboard-cards/Card";
import { getStripeCustomerInvoices } from "@/lib/stripe";
import Link from "next/link";
import { nextIcon, previousIcon } from "@/components/icons/iconSVG";
import { UpdateUrl } from "@/lib/updateUrl";

type PaymentsProps = {
    currentUser: any;
    searchParams?: { [key: string]: string | string[] | undefined };
};

const Payments = async ({ currentUser, searchParams }: PaymentsProps) => {
    const { stripeCustomerId } = currentUser;
    const invoices = await getStripeCustomerInvoices(stripeCustomerId);
    const getColor = (status: string) => {
        if (status === "paid") return "#00E200";
        if (status === "open") return "#FFAF3D";
        if (status === "draft") return "#64D9FF";
        return "#FF2A04";
    };
    const maxInvoices = 5;
    const invoicePage = searchParams?.invoicePage || null;
    if (!invoicePage) {
        redirect(
            UpdateUrl(
                searchParams ? searchParams : {},
                [{ key: "invoicePage", value: "1" }],
                "/dashboard"
            )
        );
    }
    const start = invoicePage
        ? (parseInt(invoicePage as string) - 1) * maxInvoices
        : 0;
    const end = invoicePage ? start + maxInvoices : maxInvoices;
    const paginatedInvoices =
        invoices && invoices.length > 0 ? invoices.slice(start, end) : [];
    // make an array of numbers going from 1 to the number of pages
    const pages = Array.from(
        { length: Math.ceil(invoices.length / maxInvoices) },
        (_, i) => i + 1
    );
    const nextPage = parseInt(invoicePage as string) + 1;
    const prevPage = parseInt(invoicePage as string) - 1;

    return (
        <Card gridArea="payments" title="Payment History">
            <section className={styles.itemContainer}>
                {paginatedInvoices.map((invoice: any, index: number) => (
                    <section key={index} className={styles.item}>
                        <section className={styles.column}>
                            <p className={styles.label}>Status</p>
                            <section className={styles.statusContainer}>
                                <div
                                    className={styles.status}
                                    style={{
                                        backgroundColor: getColor(
                                            invoice.status
                                        ),
                                    }}
                                ></div>
                                <p className={styles.value}>{invoice.status}</p>
                            </section>
                        </section>
                        <section className={styles.column}>
                            <p className={styles.label}>Amount</p>
                            <p className={styles.value}>
                                ${invoice.total / 100}
                            </p>
                        </section>
                        <section className={styles.column}>
                            <p className={styles.label}>Date</p>
                            <p className={styles.value}>
                                {" "}
                                {new Date(
                                    invoice.effective_at * 1000
                                ).toLocaleString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </p>
                        </section>
                    </section>
                ))}
            </section>
            {invoices && invoices.length > 0 && (
                <section className={styles.paginationContainer}>
                    <Link
                        href={UpdateUrl(
                            searchParams ? searchParams : {},
                            [
                                { key: "menu", value: "account" },
                                { key: "invoicePage", value: "1" },
                            ],
                            "/dashboard"
                        )}
                        className={styles.longButton}
                    >
                        First
                    </Link>
                    <Link
                        href={UpdateUrl(
                            searchParams ? searchParams : {},
                            [
                                { key: "menu", value: "account" },
                                {
                                    key: "invoicePage",
                                    value: (prevPage > 0
                                        ? prevPage
                                        : pages.length
                                    ).toString(),
                                },
                            ],
                            "/dashboard"
                        )}
                        className={styles.button}
                    >
                        <div className={styles.iconContainer}>
                            {previousIcon}
                        </div>
                    </Link>
                    {pages.map((page: number) => (
                        <Link
                            key={page}
                            href={UpdateUrl(
                                searchParams ? searchParams : {},
                                [
                                    { key: "menu", value: "account" },
                                    {
                                        key: "invoicePage",
                                        value: page.toString(),
                                    },
                                ],
                                "/dashboard"
                            )}
                            className={`${styles.buttonNumber} ${
                                parseInt(invoicePage as string) === page &&
                                styles.active
                            }`}
                        >
                            {page}
                        </Link>
                    ))}
                    <Link
                        href={UpdateUrl(
                            searchParams ? searchParams : {},
                            [
                                { key: "menu", value: "account" },
                                {
                                    key: "invoicePage",
                                    value: (nextPage <= pages.length
                                        ? nextPage
                                        : 1
                                    ).toString(),
                                },
                            ],
                            "/dashboard"
                        )}
                        className={styles.button}
                    >
                        <div className={styles.iconContainer}>{nextIcon}</div>
                    </Link>
                    <Link
                        href={UpdateUrl(
                            searchParams ? searchParams : {},
                            [
                                { key: "menu", value: "account" },
                                {
                                    key: "invoicePage",
                                    value: pages.length.toString(),
                                },
                            ],
                            "/dashboard"
                        )}
                        className={styles.longButton}
                    >
                        Last
                    </Link>
                </section>
            )}
        </Card>
    );
};

export default Payments;
