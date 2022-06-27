import Footer from "../Footer";
import { MutableRefObject, useLayoutEffect, useRef, useState } from "react";
import styles from "./suggestions.module.scss";
import ProfilePic from "../ProfilePic";
import Button from "../Button";
import Link from "next/link";
import PicUsername from "../PicUsername";

type props = {
  postsContainer: MutableRefObject<HTMLDivElement | null>;
  myUserName: string;
  myFullName: string;
};
const Suggestions = ({ postsContainer, myUserName, myFullName }: props) => {
  const suggesEl = useRef<HTMLDivElement | null>(null);
  const [showSugges, setShowSugges] = useState(true);

  const calculatingSuggestPos = () => {
    if (postsContainer.current) {
      if (window.innerWidth <= 1000) {
        setShowSugges(false);
        return;
      }
      setShowSugges(true);
      const SuggestPosLeft =
        postsContainer.current!.offsetLeft +
        postsContainer.current!.offsetWidth;
      suggesEl.current!.style.left = `${SuggestPosLeft + 30}px`;
    }
  };
  useLayoutEffect(() => {
    calculatingSuggestPos();
  }, []);
  useLayoutEffect(() => {
    window.addEventListener("resize", () => {
      calculatingSuggestPos();
    });
  });
  return showSugges ? (
    <div className={styles.suggestions} ref={suggesEl}>
      <div className={`${styles.suggestionHeader} ${styles.suggestionUnit}`}>
        <div className={styles.userInfo}>
          <PicUsername
            src="./pp.jpg"
            size="size-2"
            primaryText={myUserName}
            secondaryText={myFullName}
          />
        </div>
        <Button mainColor={false} mainShape={false}>
          switch
        </Button>
      </div>
      <div className={styles.suggestionForYou}>
        <div>Suggestion For You</div>
        <Link href="/">
          <a>See All</a>
        </Link>
      </div>
      <SuggestionUnit userName="simo_echaarani" />
      <SuggestionUnit userName="simo_echaarani" />
      <SuggestionUnit userName="simo_echaarani" />
      <SuggestionUnit userName="simo_echaarani" />
      <Footer />
    </div>
  ) : (
    <></>
  );
};

export default Suggestions;

export const SuggestionUnit = ({ userName }: { userName: string }) => {
  return (
    <div className={styles.suggestionUnit} style={{ marginBottom: "1.2rem" }}>
      <div className={styles.userInfo}>
        {/* <ProfilePic
          src="/pp.jpg"
          hasStory={false}
          seen={false}
          size="size-4"
          animate={false}
        />
        <div className={styles.anotherUser}>
          <div>{userName}</div>
          <div>Followed by abass_radii + 3 more</div>
        </div> */}
        <PicUsername
          src="./pp.jpg"
          size="size-4"
          primaryText={userName}
          secondaryText="Followed by abass_radii + 3 more"
        />
      </div>
      <Button mainColor={false} mainShape={false}>
        Follow
      </Button>
    </div>
  );
};
