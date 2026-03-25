type BasePrismicPayload = {
    domain: string;
    apiUrl: string;
    secret?: string;
};

type ApiUpdatePayload = BasePrismicPayload & {
    type: 'api-update';
    masterRef?: string;
    releases?: object;
    masks?: object;
    tags?: object;
    experiments?: object;
    documents: string[];
};

type TestTriggerPayload = BasePrismicPayload & {
    type: 'test-trigger';
};

export type PrismicPayload = ApiUpdatePayload | TestTriggerPayload;