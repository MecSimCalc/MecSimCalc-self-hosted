import {
  Code,
  Facebook,
  Link,
  LinkedIn,
  MailOutline,
  Pinterest,
  Reddit,
  Share,
  Twitter,
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { get } from "lodash";
import { useSnackbar } from "notistack";
import { ReactElement, useState } from "react";
import { App } from "../types";

interface ShareItem {
  [key: string]: {
    icon: ReactElement;
    href?: string;
    copyText?: string;
  };
}

interface Props {
  app: App;
}

const POPUP = ["twitter", "facebook", "linkedin", "reddit", "pinterest"];
const HASHTAG = encodeURIComponent("MecSimCalc");

export default function ShareApp({ app }: Props) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const handleClose = () => setOpen(false);
  const { enqueueSnackbar } = useSnackbar();
  const href =
    typeof window !== "undefined" ? get(window, "location.href", "") : "";
  const encodedHref = encodeURIComponent(href);
  const name = encodeURIComponent(app.name);

  const SHARE: ShareItem = {
    link: {
      copyText: href,
      icon: <Link />,
    },
    embed: {
      copyText: `<div style="width: 700px; height: 600px; overflow: hidden;"><iframe src="${href}" width="100%" height="100%" title="MecSimCalc" style="position:relative; left:-45px; top:-48px;" frameborder="0"></iframe></div>`,
      icon: <Code />,
    },
    email: {
      href: `mailto:?subject=${name} | MecSimCalc&body=${encodedHref}`,
      icon: <MailOutline />,
    },
    twitter: {
      href: `https://twitter.com/intent/tweet?url=${encodedHref}&hashtags=${HASHTAG}`,
      icon: <Twitter />,
    },
    facebook: {
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedHref}&hashtag=%23${HASHTAG}`,
      icon: <Facebook />,
    },
    linkedin: {
      href: `https://www.linkedin.com/sharing/share-offsite?url=${encodedHref}`,
      icon: <LinkedIn />,
    },
    reddit: {
      href: `https://reddit.com/submit?url=${encodedHref}&title=${name}`,
      icon: <Reddit />,
    },
    pinterest: {
      href: `https://pinterest.com/pin/create/button?url=${encodedHref}`,
      icon: <Pinterest />,
    },
  };

  const copyText = get(SHARE, [Object.keys(SHARE)[tab], "copyText"], "");
  const handleChange = (e: any, newValue: number) => {
    setTab(newValue);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
    enqueueSnackbar("Copied to clipboard", { variant: "success" });
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Share</DialogTitle>
        <DialogContent>
          <Tabs
            value={tab}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 3 }}
          >
            {Object.keys(SHARE).map((key, i) => (
              <Tab
                key={`share-${i}`}
                icon={SHARE[key]["icon"]}
                label={key}
                {...(POPUP.includes(key)
                  ? {
                      onClick: () =>
                        window.open(
                          SHARE[key]["href"],
                          "pop",
                          "width=600,height=600,scrollbars=no"
                        ),
                    }
                  : {
                      href: SHARE[key]["href"],
                      target: "_blank",
                    })}
              />
            ))}
          </Tabs>

          {!!copyText && (
            <TextField
              autoFocus
              value={copyText}
              onFocus={(e) => e.target.select()}
              InputProps={{
                endAdornment: <Button onClick={handleCopy}>Copy</Button>,
              }}
              fullWidth
            />
          )}
        </DialogContent>
      </Dialog>

      <Button onClick={() => setOpen(true)} startIcon={<Share />}>
        Share
      </Button>
    </>
  );
}
