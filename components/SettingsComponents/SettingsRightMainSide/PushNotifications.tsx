import { RadioInput } from "../../FormComponents/RadioInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styles from "../settings.module.scss";
import { MiniSection } from "./MiniSection";
import SwitchButton from "../../FormComponents/SwitchButton";

const onOff = ["off", "on"] as const;
const threeOprions = ["off", "From People I Follow", "From Everyone"] as const;
const schema = z.object({
  pauseAll: z.boolean(),
  likes: z.enum(threeOprions),
  LikesandCommentsOnPhotosOfYou: z.enum(threeOprions),
  comments: z.enum(threeOprions),
  commentLikes: z.enum(onOff),
  firstPostsAndStories: z.enum(threeOprions),
  followerRequests: z.enum(onOff),
  acceptedFollowRequests: z.enum(onOff),
  accountSuggestions: z.enum(onOff),
  messageRequests: z.enum(onOff),
  messages: z.enum(onOff),
  messageReminders: z.enum(onOff),
  groupRequests: z.enum(onOff),
  videoChats: z.enum(onOff),
  liveVideos: z.enum(onOff),
  recentlyUploadedReels: z.enum(onOff),
  mostWatchedReels: z.enum(onOff),
  yourFundraisers: z.enum(onOff),
  fundraisersByOthers: z.enum(onOff),
  reminders: z.enum(onOff),
  productAnnouncementsAndFeedback: z.enum(onOff),
  supportRequests: z.enum(onOff),
  unrecognizedLogins: z.enum(onOff),
});
type FormType = z.infer<typeof schema>;

export function PushNotifications() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    setFocus,
    control,
    formState: { errors, isValid },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  return (
    <div className={styles.emailNotifSection} style={{ margin: "2.4rem" }}>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <MiniSection smallHeading="Push Notifications" border={false}>
          <div className={styles.flexSpaceBetween}>
            <div>Pause All</div>
            <SwitchButton
              id="pauseAll"
              variation="large"
              {...register("pauseAll")}
            />
          </div>
        </MiniSection>
        {data.map((item) => (
          <MiniSection
            key={item.name}
            smallHeading={item.title}
            description={item.description}
            border={item.underLine}
          >
            <div className={styles.radiosParent}>
              {item.values.map((value, i) => (
                <RadioInput
                  key={value}
                  id={`${item.name + i}`}
                  value={value}
                  {...register(item.name)}
                />
              ))}
            </div>
          </MiniSection>
        ))}
      </form>
    </div>
  );
}

type dataStructureType = {
  title: string;
  name: keyof Omit<FormType, "pauseAll">;
  values: typeof onOff | typeof threeOprions;
  description: string;
  underLine: boolean;
}[];
const data: dataStructureType = [
  {
    title: "Likes",
    name: "likes",
    values: threeOprions,
    description: "johnappleseed liked your photo.",
    underLine: true,
  },
  {
    title: "Likes and Comments on Photos of You",
    name: "LikesandCommentsOnPhotosOfYou",
    values: threeOprions,
    description: "johnappleseed commented on a post you're tagged in.",
    underLine: true,
  },
  {
    title: "Comments",
    name: "comments",
    values: threeOprions,
    description: 'johnappleseed commented: "Nice shot!"',
    underLine: true,
  },
  {
    title: "Comment Likes",
    name: "commentLikes",
    values: onOff,
    description: "johnappleseed liked your comment: Nice shot!",
    underLine: true,
  },
  {
    title: "First Posts and Stories",
    name: "firstPostsAndStories",
    values: onOff,
    description:
      "See johnappleseed's first story on Instagram, and other similar notifications.",
    underLine: false,
  },
  {
    title: "Follower Requests",
    name: "followerRequests",
    values: onOff,
    description: "John Appleseed (@johnappleseed) has requested to follow you.",
    underLine: true,
  },
  {
    title: "Accepted Follow Requests",
    name: "acceptedFollowRequests",
    values: onOff,
    description: "John Appleseed (johnappleseed) accepted your follow request.",
    underLine: true,
  },
  {
    title: "Account Suggestions",
    name: "accountSuggestions",
    values: onOff,
    description:
      "johnappleseed, who you might know, is on Instagram, and other similar notifications.",
    underLine: false,
  },
  {
    title: "Message Requests",
    name: "messageRequests",
    values: onOff,
    description: "johnappleseed wants to send you a message.",
    underLine: true,
  },
  {
    title: "Messages",
    name: "messages",
    values: onOff,
    description: "johnappleseed sent you a message.",
    underLine: true,
  },
  {
    title: "Message Reminders",
    name: "messageReminders",
    values: onOff,
    description: "johnappleseed sent you a message (1d ago).",
    underLine: true,
  },
  {
    title: "Group Requests",
    name: "groupRequests",
    values: onOff,
    description: "johnappleseed wants to add janeappleseed to your group.",
    underLine: false,
  },
  {
    title: "Video Chats",
    name: "videoChats",
    values: onOff,
    description: "Incoming video chat from johnappleseed.",
    underLine: false,
  },
  {
    title: "Live Videos",
    name: "liveVideos",
    values: onOff,
    description: "johnappleseed started a live video. Watch it before it ends!",
    underLine: true,
  },
  {
    title: "Recently Uploaded Reels",
    name: "recentlyUploadedReels",
    values: onOff,
    description:
      "johnappleseed, johndoe and janedoe recently shared new reels.",
    underLine: true,
  },
  {
    title: "Most Watched Reels",
    name: "mostWatchedReels",
    values: onOff,
    description: "Check out the most watched reels in your location today.",
    underLine: false,
  },
  {
    title: "Your Fundraisers",
    name: "yourFundraisers",
    values: onOff,
    description: "johnappleseed donated to your fundraiser.",
    underLine: true,
  },
  {
    title: "Fundraisers by Others",
    name: "fundraisersByOthers",
    values: onOff,
    description: "johnappleseed started a fundraiser.",
    underLine: false,
  },
  {
    title: "Reminders",
    name: "reminders",
    values: onOff,
    description:
      "You have unseen notifications, and other similar notifications.",
    underLine: true,
  },
  {
    title: "Product Announcements & Feedback",
    name: "productAnnouncementsAndFeedback",
    values: onOff,
    description: "Download Boomerang, Instagram's latest app.",
    underLine: true,
  },
  {
    title: "Support Requests",
    name: "supportRequests",
    values: onOff,
    description: "Your support request from July 10 was just updated.",
    underLine: true,
  },
  {
    title: "Unrecognized Logins",
    name: "unrecognizedLogins",
    values: onOff,
    description:
      "An unrecognized Apple iPhone 11 has logged in from Foster City, CA, USA.",
    underLine: true,
  },
];
