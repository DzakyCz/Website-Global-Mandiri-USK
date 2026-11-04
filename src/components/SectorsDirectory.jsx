'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { businessUnits, businessCategories, businessCatalogs } from '../data/business-units';
import ArrowIcon from './icons/ArrowIcon';
import SectorCatalogDialog from './SectorCatalogDialog';

const ExportGlobe = dynamic(() => import('./ExportGlobe'), { ssr: false });

// Sama dengan scroll-padding-top pada html di site.css
const HEADER_OFFSET = 92;

export default function SectorsDirectory() {
  const nilamDialogRef = useRef(null);
  const [activeCatalog, setActiveCatalog] = useState(null);
  const [currentNilamPage, setCurrentNilamPage] = useState(0);
  const [isNilamDialogOpen, setIsNilamDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageChangedByUser = useRef(false);
  const pageSize = 6;
  const query = searchQuery.trim().toLocaleLowerCase('id');
  const visibleBusinessUnits = businessUnits.filter((unit) =>
    (selectedCategories === null || selectedCategories.includes(unit.category))
    && unit.name.toLocaleLowerCase('id').includes(query)
  );
  const pageCount = Math.max(1, Math.ceil(visibleBusinessUnits.length / pageSize));
  const pageStart = (currentPage - 1) * pageSize;
  const paginatedBusinessUnits = visibleBusinessUnits.slice(pageStart, pageStart + pageSize);
  const firstVisibleUnit = visibleBusinessUnits.length === 0 ? 0 : pageStart + 1;
  const lastVisibleUnit = Math.min(pageStart + pageSize, visibleBusinessUnits.length);
  const openNilamDialog = () => {
    setCurrentNilamPage(0);
    setIsNilamDialogOpen(true);
    nilamDialogRef.current?.showModal();
  };
  // Perdagangan Minyak Nilam memakai dialog khususnya sendiri; sisanya katalog halaman PDF.
  const hasDialogFor = (name) => name === 'Perdagangan Minyak Nilam' || name in businessCatalogs;
  const openDialogForUnit = (name) => {
    if (name === 'Perdagangan Minyak Nilam') {
      openNilamDialog();
    } else if (name in businessCatalogs) {
      setActiveCatalog({ name, ...businessCatalogs[name] });
    }
  };
  const goToPage = (nextPage) => {
    if (nextPage === currentPage) return;
    pageChangedByUser.current = true;
    setCurrentPage(nextPage);
  };

  // Gulirkan setelah daftar baru dirender, dan hanya jika awal daftar sudah
  // terlewat ke atas. Kalau awal daftar masih terlihat, biarkan posisi pembaca.
  useEffect(() => {
    if (!pageChangedByUser.current) return;
    pageChangedByUser.current = false;

    const sectors = document.getElementById('sectors');
    if (!sectors) return;
    if (sectors.getBoundingClientRect().top < HEADER_OFFSET) sectors.scrollIntoView();
  }, [currentPage]);

  return (
    <>
      <div className="sector-search" data-reveal="rise" style={{ '--reveal-delay': '240ms' }}>
        <label className="sector-search-label" htmlFor="sector-search-input">
          Cari bidang usaha
        </label>
        <div className="sector-search-controls">
          <div className="sector-filter">
            <button
              className={`sector-filter-toggle${selectedCategories?.length ? ' is-active' : ''}`}
              type="button"
              aria-expanded={isFilterOpen}
              aria-controls="sector-category-options"
              onClick={() => setIsFilterOpen((isOpen) => !isOpen)}
            >
              <Image src="/Images/filter.avif" alt="" width={20} height={20} />
              <span>Filter</span>
              {!!selectedCategories?.length && (
                <span className="sector-filter-badge">{selectedCategories.length}</span>
              )}
            </button>
          </div>
          <div className="sector-search-field">
            <input
              id="sector-search-input"
              type="search"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Contoh: Nilam, Digital Printing..."
              aria-describedby="sector-search-count"
            />
          </div>
        </div>
        {isFilterOpen && (
          <div className="sector-filter-options" id="sector-category-options" aria-label="Kategori bidang usaha">
            <p>Kategori bidang usaha</p>
            <div className="sector-filter-options-list">
              <button
                type="button"
                className={selectedCategories === null ? 'is-selected' : ''}
                aria-pressed={selectedCategories === null}
                onClick={() => {
                  setSelectedCategories(null);
                  setCurrentPage(1);
                }}
              >
                Semua kategori
              </button>
              {businessCategories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={selectedCategories?.includes(category) ? 'is-selected' : ''}
                  aria-pressed={selectedCategories?.includes(category) ?? false}
                  onClick={() => {
                    setSelectedCategories((selected) => {
                      const current = selected ?? [];
                      return current.includes(category)
                        ? current.filter((item) => item !== category)
                        : [...current, category];
                    });
                    setCurrentPage(1);
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
        <p className="sector-search-count" id="sector-search-count" aria-live="polite">
          Menampilkan {firstVisibleUnit}–{lastVisibleUnit} dari {visibleBusinessUnits.length} bidang usaha
        </p>
      </div>
      {visibleBusinessUnits.length > 0 ? (
        <>
          <div className="sector-directory-grid">
            {paginatedBusinessUnits.map((unit, index) => {
              const hasDialog = hasDialogFor(unit.name);
              return (
              <article
                className={`sector-directory-card${hasDialog ? ' is-clickable' : ''}`}
                key={unit.image}
                data-reveal="rise"
                style={{ '--reveal-delay': `${Math.min(index * 60, 360)}ms` }}
              >
                {hasDialog ? (
                  <button
                    type="button"
                    className="sector-directory-card-trigger"
                    onClick={() => openDialogForUnit(unit.name)}
                  >
                    <div className="sector-directory-image">
                      <Image
                        src={unit.image}
                        alt={unit.name}
                        fill
                        sizes="(max-width: 760px) 100vw, (max-width: 1050px) 50vw, 33vw"
                        quality={70}
                        priority={index === 0}
                      />
                    </div>
                    <h3>{unit.name}</h3>
                  </button>
                ) : (
                  <>
                    <div className="sector-directory-image">
                      <Image
                        src={unit.image}
                        alt={unit.name}
                        fill
                        sizes="(max-width: 760px) 100vw, (max-width: 1050px) 50vw, 33vw"
                        quality={70}
                        priority={index === 0}
                      />
                    </div>
                    <h3>{unit.name}</h3>
                  </>
                )}
              </article>
              );
            })}
          </div>
          {pageCount > 1 && (
            <nav className="news-pagination" aria-label="Halaman bidang usaha">
              <button
                type="button"
                className="news-pagination-nav"
                onClick={() => goToPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                aria-label="Halaman sebelumnya"
              >
                <span aria-hidden="true"><ArrowIcon direction="left" /></span> <span className="news-pagination-nav-label">Sebelumnya</span>
              </button>
              <div className="news-pagination-pages">
                {Array.from({ length: pageCount }, (_, i) => i + 1).map((pageNumber) => (
                  <button
                    type="button"
                    key={pageNumber}
                    className={pageNumber === currentPage ? 'is-active' : ''}
                    aria-current={pageNumber === currentPage ? 'page' : undefined}
                    onClick={() => goToPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="news-pagination-nav"
                onClick={() => goToPage(Math.min(pageCount, currentPage + 1))}
                disabled={currentPage === pageCount}
                aria-label="Halaman selanjutnya"
              >
                <span className="news-pagination-nav-label">Selanjutnya</span> <span aria-hidden="true"><ArrowIcon direction="right" /></span>
              </button>
            </nav>
          )}
        </>
      ) : (
        <p className="sector-search-empty" role="status">
          Tidak ada bidang usaha yang cocok dengan “{searchQuery.trim()}”.
        </p>
      )}
      <SectorCatalogDialog
        key={activeCatalog?.folder ?? 'none'}
        catalog={activeCatalog}
        onClose={() => setActiveCatalog(null)}
      />
      <dialog
        className="sector-product-dialog"
        ref={nilamDialogRef}
        aria-labelledby="sector-nilam-dialog-title"
        onCancel={(event) => {
          event.preventDefault();
          event.currentTarget.close();
        }}
        onClose={() => setIsNilamDialogOpen(false)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            setCurrentNilamPage((page) => Math.max(0, page - 1));
          } else if (event.key === 'ArrowRight') {
            setCurrentNilamPage((page) => Math.min(2, page + 1));
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
            <h2 id="sector-nilam-dialog-title">Perdagangan Minyak Nilam</h2>
            <button
              className="sector-product-dialog-close"
              type="button"
              onClick={() => nilamDialogRef.current?.close()}
              aria-label="Tutup detail Perdagangan Minyak Nilam"
            >
              ×
            </button>
          </div>
          <div className="sector-product-dialog-carousel" aria-label="Carousel jalur ekspor minyak nilam">
            <div className="sector-product-dialog-frame sector-product-dialog-frame--nilam">
              <div
                className="sector-product-dialog-track"
                style={{ transform: `translateX(-${currentNilamPage * 100}%)` }}
                aria-live="polite"
              >
                <div className="sector-product-dialog-slide" aria-hidden={currentNilamPage !== 0}>
                  <div className="ne-hero-slide">
                    <div>
                      <div className="ne-hero-eyebrow">✈ Perdagangan Global · Minyak Nilam Aceh</div>
                      <h3>Menembus pasar dunia dari <em>Aceh</em> menuju jaringan ekspor global.</h3>
                      <p>Minyak nilam Aceh didistribusikan lewat jalur dagang lintas benua, dari hub regional di Asia Tenggara hingga pusat industri parfum di Eropa.</p>
                      <div className="ne-chips">
                        <span className="ne-chip">Asal: Banda Aceh</span>
                        <span className="ne-chip">Komoditas: Minyak Nilam</span>
                        <span className="ne-chip">Jangkauan: Asia · Timur Tengah · Eropa</span>
                      </div>
                    </div>
                    <ExportGlobe active={isNilamDialogOpen && currentNilamPage === 0} />
                  </div>
                </div>

                <div className="sector-product-dialog-slide" aria-hidden={currentNilamPage !== 1}>
                  <div className="ne-market-slide">
                    <div>
                      <div className="ne-slide-kicker">Jalur Distribusi</div>
                      <h3 className="ne-slide-title">Tujuan Pasar Ekspor</h3>
                    </div>
                    <div className="ne-market-grid">
                      <div className="ne-market-card">
                        <span className="ne-flag">🇸🇬</span>
                        <h4>Singapura</h4>
                        <p>Hub perdagangan regional Asia Tenggara — pintu masuk re-ekspor ke berbagai negara mitra.</p>
                      </div>
                      <div className="ne-market-card">
                        <span className="ne-flag">🇦🇪</span>
                        <h4>Dubai, Uni Emirat Arab</h4>
                        <p>Gerbang pasar Timur Tengah untuk minyak atsiri dan bahan baku parfum premium.</p>
                      </div>
                      <div className="ne-market-card">
                        <span className="ne-flag">🇳🇱</span>
                        <h4>Rotterdam, Belanda</h4>
                        <p>Pelabuhan utama Eropa, titik distribusi ke industri parfum dan kosmetik.</p>
                      </div>
                      <div className="ne-market-card">
                        <span className="ne-flag">🇫🇷</span>
                        <h4>Grasse, Prancis</h4>
                        <p>Pusat industri parfum dunia — tujuan akhir minyak nilam kualitas ekspor.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sector-product-dialog-slide" aria-hidden={currentNilamPage !== 2}>
                  <div className="ne-process-slide">
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                      <div>
                        <div className="ne-slide-kicker">Dari Kebun ke Kapal</div>
                        <h3 className="ne-slide-title">Proses Menuju Ekspor</h3>
                      </div>
                      <span className="ne-sample-tag">Contoh — sesuaikan isinya</span>
                    </div>
                    <div className="ne-process-list">
                      <div className="ne-process-step">
                        <div className="ne-process-num">1</div>
                        <div>
                          <h4>Panen &amp; Penyulingan</h4>
                          <p>Daun nilam dari petani mitra di Aceh disuling menjadi minyak atsiri mentah.</p>
                        </div>
                      </div>
                      <div className="ne-process-step">
                        <div className="ne-process-num">2</div>
                        <div>
                          <h4>Uji Kualitas</h4>
                          <p>Setiap batch diuji kemurnian dan kadar patchouli alcohol sesuai standar ekspor.</p>
                        </div>
                      </div>
                      <div className="ne-process-step">
                        <div className="ne-process-num">3</div>
                        <div>
                          <h4>Pengemasan</h4>
                          <p>Dikemas dalam drum food-grade tersegel untuk menjaga kualitas selama pengiriman.</p>
                        </div>
                      </div>
                      <div className="ne-process-step">
                        <div className="ne-process-num">4</div>
                        <div>
                          <h4>Distribusi &amp; Ekspor</h4>
                          <p>Dikirim ke mitra dagang di Singapura, Timur Tengah, dan Eropa.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="sector-product-dialog-arrow is-previous"
                type="button"
                aria-label="Slide sebelumnya"
                disabled={currentNilamPage === 0}
                onClick={() => setCurrentNilamPage((page) => Math.max(0, page - 1))}
              >
                ‹
              </button>
              <button
                className="sector-product-dialog-arrow is-next"
                type="button"
                aria-label="Slide berikutnya"
                disabled={currentNilamPage === 2}
                onClick={() => setCurrentNilamPage((page) => Math.min(2, page + 1))}
              >
                ›
              </button>
            </div>
            <div className="sector-product-dialog-dots" role="group" aria-label="Pilih slide">
              {[0, 1, 2].map((page) => (
                <button
                  className={`sector-product-dialog-dot${currentNilamPage === page ? ' is-active' : ''}`}
                  key={page}
                  type="button"
                  aria-label={`Slide ${page + 1}`}
                  aria-current={currentNilamPage === page ? 'page' : undefined}
                  onClick={() => setCurrentNilamPage(page)}
                />
              ))}
            </div>
          </div>
          <p className="sector-product-dialog-description">
            Menyediakan minyak nilam berkualitas tinggi dari Aceh untuk pasar ekspor internasional, dengan jalur distribusi yang jelas dan standar mutu yang terjaga.
          </p>
        </div>
      </dialog>
    </>
  );
}
