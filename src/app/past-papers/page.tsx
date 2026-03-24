'use client';

import React, { useState } from 'react';

const papers = [
  {
    year: '2014',
    papers: [
      { id: 'h1-2014', name: 'Higher Level Paper 1', level: 'Higher', path: '/past-papers/gaeilge/higherlevel.p1.2014.pdf' },
      { id: 'h2-2014', name: 'Higher Level Paper 2', level: 'Higher', path: '/past-papers/gaeilge/higherlevel.p2.2014.pdf' },
      { id: 'o-2014', name: 'Ordinary Level', level: 'Ordinary', path: '/past-papers/gaeilge/ordinarylevel.2014.pdf' },
      { id: 'f-2014', name: 'Foundation Level', level: 'Foundation', path: '/past-papers/gaeilge/foundationlevel.2014.pdf' },
    ]
  },
  {
    year: '2013',
    papers: [
      { id: 'h1-2013', name: 'Higher Level Paper 1', level: 'Higher', path: '/past-papers/gaeilge/higherlevel.p1.2013.pdf' },
      { id: 'h2-2013', name: 'Higher Level Paper 2', level: 'Higher', path: '/past-papers/gaeilge/higherlevel.p2.2013.pdf' },
      { id: 'o-2013', name: 'Ordinary Level', level: 'Ordinary', path: '/past-papers/gaeilge/ordinarylevel.2013.pdf' },
      { id: 'f-2013', name: 'Foundation Level', level: 'Foundation', path: '/past-papers/gaeilge/foundationlevel.2013.pdf' },
    ]
  }
];

export default function PastPapersPage() {
  const [selectedPaper, setSelectedPaper] = useState(papers[0].papers[0]);

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
        <nav style={{
        width: '320px',
        background: '#f8fafc',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.5rem',
        overflowY: 'auto'
      }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          Past Papers
        </h1>

        {papers.map((group) => (
          <div key={group.year} style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: '#64748b', marginBottom: '0.75rem', paddingLeft: '0.5rem' }}>
              {group.year} - Gaeilge
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {group.papers.map((paper) => (
                <button
                  key={paper.id}
                  onClick={() => setSelectedPaper(paper)}
                  style={{
                    background: selectedPaper.id === paper.id ? '#2563eb' : 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    padding: '0.75rem 1rem',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: selectedPaper.id === paper.id ? 'white' : '#0f172a',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem'
                  }}
                >
                  <span>{paper.name}</span>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    width: 'fit-content',
                    background: selectedPaper.id === paper.id ? 'rgba(255, 255, 255, 0.2)' : 
                      paper.level === 'Higher' ? '#fee2e2' : 
                      paper.level === 'Ordinary' ? '#fef9c3' : '#dcfce7',
                    color: selectedPaper.id === paper.id ? 'white' :
                      paper.level === 'Higher' ? '#991b1b' : 
                      paper.level === 'Ordinary' ? '#854d0e' : '#166534'
                  }}>
                    {paper.level}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Viewer */}
      <main style={{ flex: 1, background: '#f1f5f9', display: 'flex', flexDirection: 'column', padding: '2rem', height: '100%' }}>
        <div style={{ width: '100%', height: '85vh', background: 'white', borderRadius: '0.75rem', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', overflow: 'hidden' }}>
          <iframe
            id="pdf-viewer"
            src={selectedPaper.path}
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="PDF Viewer"
          ></iframe>
        </div>
      </main>
    </div>
  );
}
