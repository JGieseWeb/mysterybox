import React from "react";
import styles from "./Credential.module.css";
import type { Credential as CredentialType } from "../../types";

type CredentialProps = {
  credential: CredentialType;
};

function Credential({ credential }: CredentialProps): JSX.Element {
  return (
    <ul className={styles.credential}>
      {credential.service}
      {credential.username}
      {credential.password}

      <li>
        <button className={styles.deletebutton}>🚮</button>
      </li>
    </ul>
  );
}

export default Credential;
