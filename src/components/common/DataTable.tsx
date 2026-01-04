import React, { useState, useMemo, useRef, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Plus, ArrowUp, ArrowDown } from "lucide-react";

/* =========================
   Types
========================= */

type SortDirection = "asc" | "desc" | null;

export interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T extends { id: string | number }> {
  title: string;
  subtitle?: string;
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  onAdd?: () => void;
}

/* =========================
   Component
========================= */

export function DataTable<T extends { id: string | number }>({
  title,
  subtitle,
  columns,
  data,
  loading = false,
  onAdd,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);
  const [selected, setSelected] = useState<Set<T["id"]>>(new Set());

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const selectAllRef = useRef<HTMLInputElement>(null);

  /* =========================
     Filter + Sort + Pagination
  ========================= */

  const { rows: processedData, total } = useMemo(() => {
    let rows = [...data];

    if (search) {
      rows = rows.filter((row) =>
        Object.values(row)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (sortKey && sortDir) {
      rows.sort((a, b) => {
        const x = a[sortKey];
        const y = b[sortKey];

        if (x == null) return 1;
        if (y == null) return -1;

        if (typeof x === "number" && typeof y === "number") {
          return (x - y) * (sortDir === "asc" ? 1 : -1);
        }

        return (
          String(x).localeCompare(String(y)) * (sortDir === "asc" ? 1 : -1)
        );
      });
    }

    const total = rows.length;
    const start = (page - 1) * pageSize;
    const paged = rows.slice(start, start + pageSize);

    return { rows: paged, total };
  }, [data, search, sortKey, sortDir, page, pageSize]);

  /* =========================
     Selection Logic
  ========================= */

  const toggleRow = (id: T["id"]) => {
    const copy = new Set(selected);
    if (copy.has(id)) {
      copy.delete(id);
    } else {
      copy.add(id);
    }
    setSelected(copy);
  };

  const toggleAll = () => {
    if (selected.size === processedData.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(processedData.map((r) => r.id)));
    }
  };

  useEffect(() => {
    if (!selectAllRef.current) return;
    selectAllRef.current.indeterminate =
      selected.size > 0 && selected.size < processedData.length;
  }, [selected, processedData.length]);

  /* =========================
     Sorting Logic
  ========================= */

  const handleSort = (key: keyof T) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
    } else {
      setSortDir(
        sortDir === "asc" ? "desc" : sortDir === "desc" ? null : "asc"
      );
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [search, pageSize]);

  const totalPages = Math.ceil(total / pageSize);

  /* =========================
     Render
  ========================= */

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>

        <div className="flex gap-3">
          <input
            className="ps-2 border border-primary rounded-lg focus:outline-none "
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            
          />

          {onAdd && (
            <Button onClick={onAdd}>
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <Card className="overflow-hidden rounded-xl border shadow-sm">
        <table className="w-full">
          <thead className="bg-muted/40">
            <tr>
              <th className="px-4 text-left">
                <input
                  ref={selectAllRef}
                  type="checkbox"
                  checked={
                    selected.size === processedData.length &&
                    processedData.length > 0
                  }
                  onChange={toggleAll}

                />
              </th>

              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`px-5 py-3 text-left text-xs font-semibold uppercase text-muted-foreground ${
                    col.sortable ? "cursor-pointer select-none" : ""
                  }`}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {sortKey === col.key &&
                      (sortDir === "asc" ? (
                        <ArrowUp size={14} />
                      ) : sortDir === "desc" ? (
                        <ArrowDown size={14} />
                      ) : null)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={columns.length + 1} className="py-12 text-center">
                  Loading...
                </td>
              </tr>
            )}

            {!loading && processedData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="py-12 text-center text-muted-foreground"
                >
                  No results found
                </td>
              </tr>
            )}

            {!loading &&
              processedData.map((row) => (
                <tr
                  key={row.id}
                  className="border-t hover:bg-muted/30 transition"
                >
                  <td className="px-4">
                    <input
                      type="checkbox"
                      checked={selected.has(row.id)}
                      onChange={() => toggleRow(row.id)}
                    />
                  </td>

                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-5 py-4">
                      {col.render ? col.render(row) : String(row[col.key])}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4">
        <div className="text-sm text-muted-foreground">
          Showing {(page - 1) * pageSize + 1} –{" "}
          {Math.min(page * pageSize, total)} of {total}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </Button>

          <span className="text-sm">
            Page {page} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
