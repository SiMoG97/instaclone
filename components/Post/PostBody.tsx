import React, { ReactNode } from "react";
import styles from "./postStyles.module.scss";

type PostBodyProps = {
  children: ReactNode;
};

const PostBody = ({ children }: PostBodyProps) => {
  return <div className={styles.postBody}>{children}</div>;
};

export default PostBody;
