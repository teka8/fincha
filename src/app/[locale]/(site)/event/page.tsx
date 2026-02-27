import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";
import { EventListView } from "@/features/events/event-list-view";

type EventsPageProps = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: EventsPageProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "common" });
    return {
        title: t("navigation.events", { default: "Events" }),
        description:
            "Explore upcoming events, workshops, and summits hosted by Fincha Sugar Factory.",
    };
}

export default async function EventsPage({ params }: EventsPageProps) {
    await params;
    return (
        <div className="flex flex-col">
            {/* Page header */}
            <section className="bg-white dark:bg-slate-900 pt-24 pb-12">
                <div className="max-w-layout mx-auto px-8">
                    <SectionHeading
                        eyebrow="What's Next"
                        title="Upcoming Events"
                        description="Stay updated with our latest activities, workshops, and community initiatives."
                        align="left"
                    />
                </div>
            </section>

            {/* Interactive calendar / list */}
            <SectionContainer className="pt-4 pb-20">
                <EventListView />
            </SectionContainer>
        </div>
    );
}
