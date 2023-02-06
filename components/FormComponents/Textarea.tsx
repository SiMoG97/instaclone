import { CSSProperties, forwardRef, useRef, useState } from "react";
import { FieldValues, UseFormRegister, UseFormWatch } from "react-hook-form";
import { UseFormRegisterReturn } from "react-hook-form/dist/types";
import { CustomEmojiPicker } from "./CustomEmojiPicker";
import styles from "./style.module.scss";
// type TextreaProps = {
//   resizable?: boolean;
//   emojis?: boolean;
//   fixedHeight?: boolean;
//   border?: boolean;
//   placeholder?: string;
//   TextareaCss?: CSSProperties;
//   register: UseFormRegister<FieldValues>;
//   name: "postDescription" | "Bio";
//   watch: UseFormWatch<FieldValues>;
// };

// export function Textarea({
//   register,
//   TextareaCss,
//   border,
//   emojis,
//   fixedHeight,
//   placeholder,
//   resizable,
//   name,
//   watch,
// }: TextreaProps) {
//   const taRef = useRef<HTMLTextAreaElement | null>(null);
//   const [_, setIsTaEmpty] = useState(true);
//   const { ref, ...rest } = register(name);
//   const numberOfChars = new Intl.NumberFormat().format(watch(name).length);
//   return (
//     <div className={styles.textareaContainer}>
//       <div>
//         <textarea
//           style={TextareaCss}
//           ref={(e) => {
//             ref(e);
//             taRef.current = e;
//           }}
//           {...rest}
//           placeholder={placeholder ? placeholder : ""}
//           className={`${!resizable ? styles.notResize : ""}
//            ${!border ? styles.noBorder : ""}
//             ${fixedHeight ? styles.fixedHeight : ""}`}
//         ></textarea>
//       </div>
//       <div className={styles.taBottomPart}>
//         {emojis ? (
//           <CustomEmojiPicker
//             taRef={taRef}
//             setIsTaEmpty={setIsTaEmpty}
//             EmojiPickerCss={{
//               position: "absolute",
//               top: "42rem",
//               left: "1.2rem",
//               transform: "scale(.8)",
//             }}
//           />
//         ) : null}
//         <div className={`${styles.charCounter} ${styles.dangers}`}>
//           {numberOfChars}/2,200
//         </div>
//       </div>
//     </div>
//   );
// }

type TextreaProps = {
  resizable?: boolean;
  emojis?: boolean;
  fixedHeight?: boolean;
  border?: boolean;
  placeholder?: string;
  TextareaCss?: CSSProperties;
  taRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  numberOfChars: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextreaProps>(
  (
    {
      TextareaCss = {},
      border = false,
      children,
      emojis = false,
      fixedHeight = false,
      placeholder,
      resizable = false,
      taRef,
      numberOfChars,
      ...restProps
    },
    ref
  ) => {
    const [_, setIsTaEmpty] = useState(true);
    return (
      <div className={styles.textareaContainer}>
        <div>
          <textarea
            style={TextareaCss}
            ref={ref}
            placeholder={placeholder ? placeholder : ""}
            className={`${!resizable ? styles.notResize : ""}
            ${!border ? styles.noBorder : ""}
            ${fixedHeight ? styles.fixedHeight : ""}`}
            {...restProps}
          ></textarea>
        </div>
        <div className={styles.taBottomPart}>
          {emojis ? (
            <CustomEmojiPicker
              taRef={taRef}
              setIsTaEmpty={setIsTaEmpty}
              EmojiPickerCss={{
                position: "absolute",
                top: "42rem",
                left: "1.2rem",
                transform: "scale(.8)",
              }}
            />
          ) : null}
          <div className={`${styles.charCounter} ${styles.dangers}`}>
            {numberOfChars}/2,200
          </div>
        </div>
      </div>
    );
  }
);
