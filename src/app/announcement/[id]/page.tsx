import type { Metadata } from "next";
import { getAnnouncementById } from "@/lib/cms";
import { AnnouncementDetailView } from "@/features/announcements/announcement-detail-view";

type Props = {
    params: Promise<{
        locale: string;
        id: string;
    }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, id } = await params;
    const announcement = await getAnnouncementById(locale, id);

    return {
        title: announcement?.title ?? "Announcement Detail",
        description: announcement?.excerpt ?? "Official announcement from Fincha Sugar Factory.",
    };
}

export default async function AnnouncementPage({ params }: Props) {
    const { id } = await params;

    return (
        <div className="bg-white min-h-screen">
            <AnnouncementDetailView id={id} />
        </div>
    );
}
