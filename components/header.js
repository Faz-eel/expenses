import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import Nav from "./nav";
import styles from "./header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <Nav />
            <div className={styles.auth}>
                <Show when="signed-out">
                    <SignInButton />
                    <SignUpButton />
                </Show>
                <Show when="signed-in">
                    <UserButton />
                </Show>
            </div>
        </header>
    )
}
