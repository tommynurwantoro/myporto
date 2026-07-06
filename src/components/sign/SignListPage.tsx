import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  List,
  LogOut,
  Plus,
} from 'lucide-react';
import { AnimatedBackground } from '../ui/AnimatedBackground';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { getVerifyUrl, listSignatures } from '../../lib/signApi';
import type { SignatureRecord } from '../../types/sign';

const PAGE_SIZE = 10;

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function SignListPage() {
  const { session, logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Math.max(1, Number.parseInt(searchParams.get('page') ?? '1', 10) || 1);
  const offset = (page - 1) * PAGE_SIZE;

  const [items, setItems] = useState<SignatureRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages && total > 0) {
      setSearchParams({ page: String(totalPages) }, { replace: true });
    }
  }, [page, totalPages, total, setSearchParams]);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    listSignatures(PAGE_SIZE, offset)
      .then((data) => {
        if (cancelled) return;
        setItems(data.items);
        setTotal(data.total);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Failed to load documents');
        setItems([]);
        setTotal(0);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [offset, page]);

  const goToPage = (nextPage: number) => {
    const clamped = Math.min(Math.max(1, nextPage), totalPages);
    setSearchParams({ page: String(clamped) });
  };

  const rangeStart = total === 0 ? 0 : offset + 1;
  const rangeEnd = Math.min(offset + items.length, total);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      <AnimatedBackground />
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <List className="w-5 h-5" aria-hidden="true" />
              <span className="text-sm font-medium uppercase tracking-wide">Registry</span>
            </div>
            <h1 className="text-3xl font-bold gradient-text">Signed Documents</h1>
            {session && (
              <p className="text-gray-400 text-sm mt-1">Signed in as {session.email}</p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link to="/sign/create">
              <Button variant="primary" size="sm">
                <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
                Register new
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={logout} aria-label="Sign out">
              <LogOut className="w-4 h-4 mr-2" aria-hidden="true" />
              Sign out
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-400">Loading documents...</div>
          ) : error ? (
            <div className="p-12 text-center">
              <p className="text-red-400" role="alert">
                {error}
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" aria-hidden="true" />
              <p className="text-gray-400 mb-6">No signed documents registered yet.</p>
              <Link to="/sign/create">
                <Button variant="primary">Register your first document</Button>
              </Link>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-gray-800">
                {items.map((doc) => (
                  <li key={doc.id} className="p-5 hover:bg-gray-800/30 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h2 className="font-semibold text-lg text-gray-100 truncate">{doc.title}</h2>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-400">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" aria-hidden="true" />
                            Signed {formatDate(doc.signed_at)}
                          </span>
                          <span>by {doc.signer_name}</span>
                        </div>
                        {doc.notes && (
                          <p className="mt-2 text-sm text-gray-500 line-clamp-2">{doc.notes}</p>
                        )}
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <Link to={`/verify/${doc.id}`}>
                          <Button variant="secondary" size="sm">
                            <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                            View
                          </Button>
                        </Link>
                        <a href={getVerifyUrl(doc.id)} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="sm" aria-label={`Open verification page for ${doc.title}`}>
                            <ExternalLink className="w-4 h-4" aria-hidden="true" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 border-t border-gray-800 bg-gray-900/40">
                <p className="text-sm text-gray-500">
                  Showing {rangeStart}–{rangeEnd} of {total}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => goToPage(page - 1)}
                    disabled={page <= 1}
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                    Previous
                  </Button>
                  <span className="text-sm text-gray-400 px-2 min-w-[6rem] text-center">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => goToPage(page + 1)}
                    disabled={page >= totalPages}
                    aria-label="Next page"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
