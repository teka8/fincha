import { redirect } from "next/navigation";

import { locales } from "@/i18n/routing";

export default function Index() {
  redirect(`/${locales[0]}`);
}
