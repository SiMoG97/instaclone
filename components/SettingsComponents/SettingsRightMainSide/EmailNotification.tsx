import { RAdioInput } from "../../FormComponents/RadioInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styles from "../settings.module.scss";
import { MiniSection } from "./MiniSection";

const onOff = ["off", "on"] as const;
const schema = z.object({
  feedbackEmails: z.enum(onOff),
  reminderEmails: z.enum(onOff),
  productEmails: z.enum(onOff),
  newsEmails: z.enum(onOff),
  supportEmails: z.enum(onOff),
});

type EmailNotificationFormType = z.infer<typeof schema>;

export function EmailNotification() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    setFocus,
    control,
    formState: { errors, isValid },
  } = useForm<EmailNotificationFormType>({
    resolver: zodResolver(schema),
  });
  console.log(errors);
  return (
    <div className={styles.emailNotifSection}>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        {sections.map((item) => (
          <MiniSection
            key={item.name}
            smallHeading={item.title}
            description={item.description}
          >
            <div className={styles.radiosParent}>
              {item.values.map((value, i) => (
                <RAdioInput
                  key={value}
                  id={`${item.name + i}`}
                  value={value}
                  {...register(item.name)}
                />
              ))}
            </div>
          </MiniSection>
        ))}
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

type SectionT = {
  title: string;
  name: keyof EmailNotificationFormType;
  values: ["off", "on"];
  description: string;
}[];

const sections: SectionT = [
  {
    title: "Feedback Emails",
    name: "feedbackEmails",
    values: ["off", "on"],
    description: "Give feedback on Instagram.",
  },
  {
    title: "Reminder Emails ",
    name: "reminderEmails",
    values: ["off", "on"],
    description: "Get notifications you may have missed.",
  },
  {
    title: "Product Emails",
    name: "productEmails",
    values: ["off", "on"],
    description: "Get tips and resources about Instagram's tools.",
  },
  {
    title: "News Emails",
    name: "newsEmails",
    values: ["off", "on"],
    description: "Learn about new Instagram features.",
  },
  {
    title: "Support Emails",
    name: "supportEmails",
    values: ["off", "on"],
    description:
      "Get updates on reports and violations of our Community Guidelines.",
  },
];
