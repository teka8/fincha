import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/ui/page-hero";
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
            <PageHero
                title="Upcoming Events"
                subtitle="Stay updated with our latest activities, workshops, and community initiatives."
                image="/images/5.jpg"
                badge="What's Next"
            />

            {/* Interactive calendar / list */}
            <SectionContainer className="pt-4 pb-20">
                <EventListView />
            </SectionContainer>
        </div>
    );
}
