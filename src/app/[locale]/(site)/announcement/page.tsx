import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/ui/page-hero";
import { AnnouncementListView } from "@/features/announcements/announcement-list-view";

type AnnouncementPageProps = {
    params: Promise<{
        locale: string;
    }>;
};

export async function generateMetadata({ params }: AnnouncementPageProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "common" });

    return {
        title: t("navigation.announcement"),
        description: "Access official announcements, vacancy notices, and tender documents from Fincha Sugar Factory.",
    };
}

export default async function AnnouncementPage({ params }: AnnouncementPageProps) {
    const { locale } = await params;
    await getTranslations({ locale, namespace: "common" });

    return (
        <div className="flex flex-col">
            <PageHero
                title="Official Announcements"
                subtitle="Stay informed with the latest organizational updates, official directives, and critical communications from Fincha."
                image="/images/4.jpg"
                badge="Updates & Notices"
            />

            {/* Interactive Announcement List */}
            <SectionContainer className="pt-4">
                <AnnouncementListView />
            </SectionContainer>

            {/* Quick Access Archive */}
            <div className="bg-slate-50">
                <SectionContainer className="py-16">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-12 rounded-[40px] bg-white shadow-sm border border-slate-200/50">
                        <div className="max-w-md">
                            <h3 className="text-2xl font-bold mb-2">Notice Archive</h3>
                            <p className="text-sm text-slate-500">
                                Are you looking for a message that has already been archived? You can find all past official notices here.
                            </p>
                        </div>
                        <div className="flex w-full md:w-auto gap-3">
                            <button className="flex-1 md:flex-none px-8 py-3.5 rounded-2xl bg-primary text-white font-bold transition-all hover:bg-primary-600 hover:shadow-lg hover:shadow-primary/20">
                                View Archives
                            </button>
                        </div>
                    </div>
                </SectionContainer>
            </div>
        </div>
    );
}
