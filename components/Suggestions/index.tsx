import Footer from "../Footer";
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./suggestions.module.scss";
import Button from "../Button";
import Link from "next/link";
import PicUsername from "../PicUsername";
import useWindowEventHandler from "../../Hooks/useWindowEventHandler";

type props = {
  postsContainer: MutableRefObject<HTMLDivElement | null>;
  myUserName: string;
  myFullName: string;
  picSrc: string;
};
const Suggestions = ({
  postsContainer,
  myUserName,
  myFullName,
  picSrc,
}: props) => {
  const suggesEl = useRef<HTMLDivElement | null>(null);
  const [showSugges, setShowSugges] = useState(true);

  const calculatingSuggestPos = useCallback(() => {
    if (!postsContainer.current) return;

    if (window.innerWidth <= 1000) {
      setShowSugges(false);
      return;
    }
    setShowSugges(true);
    const SuggestPosLeft =
      postsContainer.current.offsetLeft + postsContainer.current.offsetWidth;

    suggesEl.current!.style.left = `${SuggestPosLeft + 30}px`;
  }, [postsContainer]);

  useLayoutEffect(() => {
    calculatingSuggestPos();
  }, [calculatingSuggestPos]);

  useWindowEventHandler(calculatingSuggestPos, [], "resize", 20);

  return showSugges ? (
    <div className={styles.suggestions} ref={suggesEl}>
      <div className={`${styles.suggestionHeader} ${styles.suggestionUnit}`}>
        <div className={styles.userInfo}>
          <PicUsername
            src={picSrc}
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
      <SuggestionUnit userName="Kyrie_Farrell" />
      <SuggestionUnit userName="Coraline_Pennington" />
      <SuggestionUnit userName="Angelo_Barrett" />
      <SuggestionUnit userName="Cristian_Griffin" />
      <Footer centered={false} />
    </div>
  ) : (
    <></>
  );
};

export default Suggestions;

const randomNames = [
  "Aya_Padila",
  "Karson_Baret",
  "Marley_Graves",
  "Ellis_Costa",
  "Charli_Litle",
  "Francis_Linsy",
  "Duke_Estes",
  "Mohamed_Barber",
  "Serena_Brid",
  "Bellamy_Cal",
  "Lily_Stokes",
  "Noah_Bond",
  "Enzo_Cmings",
];
export const SuggestionUnit = ({ userName }: { userName: string }) => {
  function randomNumber(max: number, min: number = 0) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  return (
    <div className={styles.suggestionUnit} style={{ marginBottom: "1.2rem" }}>
      <div className={styles.userInfo}>
        <PicUsername
          src={`https://i.pravatar.cc/100?u=${Math.random() * 1000}`}
          size="size-4"
          primaryText={randomNames[randomNumber(randomNames.length)]}
          secondaryText={`Followed by ${
            randomNames[randomNumber(randomNames.length)]
          } + ${randomNumber(9, 1)} more`}
        />
      </div>
      <Button mainColor={false} mainShape={false}>
        Follow
      </Button>
    </div>
  );
};
