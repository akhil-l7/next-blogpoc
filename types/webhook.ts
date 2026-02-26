type BasePrismicPayload = {
    domain: string;
    apiUrl: string;
    secret?: string;
};

type ApiUpdatePayload = BasePrismicPayload & {
    type: 'api-update';
    masterRef?: string;
    releases?: {};
    masks?: {};
    tags?: {};
    experiments?: {};
    documents: string[];
};

type TestTriggerPayload = BasePrismicPayload & {
    type: 'test-trigger';
};

export type PrismicPayload = ApiUpdatePayload | TestTriggerPayload;