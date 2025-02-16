export interface UserLocation {
    ip: string;
    city ?: string;
    region ?: string;
    country ?: string;
    latitude ?: number | null;
    longitude ?: number | null;
    timezone ?: string;
    error ?: string;
};