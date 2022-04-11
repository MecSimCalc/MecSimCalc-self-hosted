import { GetServerSidePropsContext } from "next";
import { App } from "../../components/types";
import AppNotFound from "../../components/ViewApp/AppNotFound";
import ViewApp from "../../components/ViewApp/ViewApp";
import api from "../api/axios";

interface Props {
  app: App;
  status: number;
  statusText?: string;
}
export default function ViewAppPage({ app, status }: Props) {
  if (status == 404) return <AppNotFound />;

  return <ViewApp app={app} />;
}

// `getServerSideProps` is called before page render, must get `app` before page render
// in order to add to <meta> tags
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const app_id = context.query.app;
  try {
    const { data, status } = await api.get(`/app/${app_id}`);
    return {
      props: { app: data, status },
    };
  } catch (e: any) {
    const { data = null, status = null, statusText = null } = e.response || {};
    return {
      props: { app: data, status, statusText },
    };
  }
}
