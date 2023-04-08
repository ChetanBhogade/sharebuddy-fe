import React from "react";
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <p className={styles.textCenter}>
          <span>
            &copy; {new Date().getFullYear()}{" "}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.myLink}
            >
              Design and Developed By ShareBuddy team.
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
