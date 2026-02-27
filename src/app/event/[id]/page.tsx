import type { Metadata } from "next";
import { getEventById } from "@/lib/cms";
import { EventDetailView } from "@/features/events/event-detail-view";

type EventDetailPageProps = {
    params: Promise<{ locale: string; id: string }>;
};

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
    const { locale, id } = await params;
    const event = await getEventById(locale, id);
    return {
        title: event?.title ?? "Event Detail",
        description: event?.description
            ? event.description.replace(/<[^>]*>/g, "").slice(0, 160)
            : "Event details at Fincha Sugar Factory.",
    };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
    const { id } = await params;

    return (
        // EventDetailView fetches on the client so it can react to auth / locale context.
        // The id is passed as a prop so the page is still a Server Component.
        <EventDetailView id={id} />
    );
}
