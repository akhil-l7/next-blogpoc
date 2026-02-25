export type PrismicPyload = {
    type: "api-update" | "test-trigger";
    masterRef?: string;
    releases?: {};
    masks?: {};
    tags?: {};
    experiments?: {};
    documents?: string[];
    domain: string;
    apiUrl: string;
    secret: string;
}