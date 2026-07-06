CREATE TABLE IF NOT EXISTS signatures (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    signed_at TIMESTAMPTZ NOT NULL,
    signer_name TEXT NOT NULL DEFAULT 'Tommy Nurwantoro',
    notes TEXT,
    image_path TEXT,
    created_by TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_signatures_created_by ON signatures(created_by);
CREATE INDEX IF NOT EXISTS idx_signatures_created_at ON signatures(created_at DESC);
