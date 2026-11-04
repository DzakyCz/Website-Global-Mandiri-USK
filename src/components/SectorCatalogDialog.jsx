'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function SectorCatalogDialog({ catalog, onClose }) {
  const dialogRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  // Induk memberi key per katalog, jadi komponen ini selalu terpasang ulang
  // dalam keadaan bersih dan halaman tidak perlu direset di sini.
  useEffect(() => {
    if (catalog) dialogRef.current?.showModal();
  }, [catalog]);

  if (!catalog) return null;

  const { name, folder, pages, description } = catalog;
  const catalogPages = Array.from({ length: pages }, (_, index) => ({
    src: `/Images/bidang/${folder}/halaman-${String(index + 1).padStart(2, '0')}.jpg`,
    page: index + 1,
  }));
  const lastPage = catalogPages.length - 1;
  const titleId = `sector-${folder}-dialog-title`;
  const clamp = (page) => Math.min(lastPage, Math.max(0, page));
  const stepPage = (delta) => setCurrentPage((page) => clamp(page + delta));
  const showPage = (page) => setCurrentPage(clamp(page));

  return (
    <dialog
      className="sector-product-dialog"
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        event.currentTarget.close();
      }}
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') {
          stepPage(-1);
        } else if (event.key === 'ArrowRight') {
          stepPage(1);
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          event.currentTarget.close();
        }
      }}
    >
      <div className="sector-product-dialog-content">
        <div className="sector-product-dialog-header">
          <h2 id={titleId}>{name}</h2>
          <button
            className="sector-product-dialog-close"
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label={`Tutup detail ${name}`}
          >
            ×
          </button>
        </div>
        <div className="sector-product-dialog-carousel" aria-label={`Carousel katalog ${name}`}>
          <div className="sector-product-dialog-frame">
            <div
              className="sector-product-dialog-track"
              style={{ transform: `translateX(-${currentPage * 100}%)` }}
              aria-live="polite"
            >
              {catalogPages.map(({ src, page }) => (
                <div className="sector-product-dialog-slide" key={src} aria-hidden={currentPage !== page - 1}>
                  <Image
                    className="sector-product-dialog-page"
                    src={src}
                    alt={`Halaman ${page} katalog ${name}`}
                    fill
                    sizes="(max-width: 760px) 100vw, 900px"
                    priority={page === 1}
                  />
                </div>
              ))}
            </div>
            <button
              className="sector-product-dialog-arrow is-previous"
              type="button"
              aria-label="Halaman katalog sebelumnya"
              disabled={currentPage === 0}
              onClick={() => stepPage(-1)}
            >
              ‹
            </button>
            <button
              className="sector-product-dialog-arrow is-next"
              type="button"
              aria-label="Halaman katalog berikutnya"
              disabled={currentPage === lastPage}
              onClick={() => stepPage(1)}
            >
              ›
            </button>
          </div>
          <div className="sector-product-dialog-dots" role="group" aria-label="Pilih halaman katalog">
            {catalogPages.map(({ page }) => (
              <button
                className={`sector-product-dialog-dot${currentPage === page - 1 ? ' is-active' : ''}`}
                key={page}
                type="button"
                aria-label={`Buka halaman ${page}`}
                aria-current={currentPage === page - 1 ? 'page' : undefined}
                onClick={() => showPage(page - 1)}
              />
            ))}
          </div>
        </div>
        <p className="sector-product-dialog-description">{description}</p>
      </div>
    </dialog>
  );
}
