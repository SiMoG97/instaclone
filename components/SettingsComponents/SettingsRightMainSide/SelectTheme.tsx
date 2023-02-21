import { RadioInput } from "../../FormComponents/RadioInput";
import styles from "../settings.module.scss";
import { MiniSection } from "./MiniSection";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useThemeContext } from "../../../context/themeContext";

const themes = ["dark", "light"] as const;

const schema = z.object({
  theme: z.enum(themes),
});
type ThemesType = z.infer<typeof schema>;

export function SelectTheme() {
  const { theme, toggle } = useThemeContext();
  const {
    register,
    watch,
    setValue,
    getValues,
    handleSubmit,
    setFocus,
    control,
    formState: { errors, isValid },
  } = useForm<ThemesType>({
    resolver: zodResolver(schema),
    defaultValues: { theme },
  });

  useEffect(() => {
    toggle(getValues("theme") === "dark");
  }, [watch("theme")]);

  useEffect(() => {
    setValue("theme", theme);
  }, [theme]);

  return (
    <div className={styles.selectThemeContainer}>
      <form>
        <MiniSection smallHeading="Set theme">
          <div className={styles.radiosParent}>
            {themes.map((theme, i) => (
              <RadioInput
                key={theme}
                id={`${"theme" + theme}`}
                value={theme}
                {...register("theme")}
              />
            ))}
          </div>
        </MiniSection>
      </form>
    </div>
  );
}
