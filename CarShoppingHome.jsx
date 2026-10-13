import React, { useMemo, useState } from 'react'

const BODY_STYLES = [
  { id: 'all', label: 'All' },
  { id: 'suv', label: 'SUV' },
  { id: 'sedan', label: 'Sedan' },
  { id: 'truck', label: 'Truck' },
  { id: 'ev', label: 'Electric' },
  { id: 'coupe', label: 'Coupe' },
]

const POPULAR_MAKES = [
  { name: 'Toyota', emoji: '🚗' },
  { name: 'Honda', emoji: '🚙' },
  { name: 'Tesla', emoji: '⚡' },
  { name: 'Ford', emoji: '🛻' },
  { name: 'BMW', emoji: '🏁' },
]

const RECENT_SEARCHES = ['Toyota RAV4', 'Used SUV under $25k', 'Tesla Model 3']

const LISTINGS = [
  {
    id: 1,
    year: 2022,
    make: 'Toyota',
    model: 'RAV4 XLE',
    body: 'suv',
    price: 27450,
    miles: 31200,
    city: 'Boston, MA',
    deal: 'Great Deal',
    photos: 24,
    accent: '#E4F5FE',
  },
  {
    id: 2,
    year: 2021,
    make: 'Tesla',
    model: 'Model 3 Long Range',
    body: 'ev',
    price: 31900,
    miles: 24800,
    city: 'Cambridge, MA',
    deal: 'Good Deal',
    photos: 18,
    accent: '#EFE7FB',
  },
  {
    id: 3,
    year: 2023,
    make: 'Honda',
    model: 'Civic Sport',
    body: 'sedan',
    price: 24300,
    miles: 12050,
    city: 'Quincy, MA',
    deal: 'Great Deal',
    photos: 31,
    accent: '#E8F6EC',
  },
  {
    id: 4,
    year: 2020,
    make: 'Ford',
    model: 'F-150 Lariat',
    body: 'truck',
    price: 38750,
    miles: 48900,
    city: 'Lowell, MA',
    deal: 'Fair Deal',
    photos: 15,
    accent: '#FDEFE6',
  },
  {
    id: 5,
    year: 2022,
    make: 'BMW',
    model: '430i Coupe',
    body: 'coupe',
    price: 42100,
    miles: 19400,
    city: 'Newton, MA',
    deal: 'Good Deal',
    photos: 27,
    accent: '#EEF1F6',
  },
]

const usd = (n) => `$${n.toLocaleString('en-US')}`
const miles = (n) => `${n.toLocaleString('en-US')} mi`

const DEAL_STYLES = {
  'Great Deal': { bg: '#E8F6EC', fg: '#136B32' },
  'Good Deal': { bg: '#E4F5FE', fg: '#05317B' },
  'Fair Deal': { bg: '#FDF3E3', fg: '#7A5406' },
}

function Icon({ name, size = 20, color = 'currentColor' }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
  switch (name) {
    case 'search':
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      )
    case 'close':
      return (
        <svg {...common}>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      )
    case 'pin':
      return (
        <svg {...common}>
          <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      )
    case 'bell':
      return (
        <svg {...common}>
          <path d="M18 16V11a6 6 0 1 0-12 0v5l-1.5 2.5h15L18 16Z" />
          <path d="M10 20a2 2 0 0 0 4 0" />
        </svg>
      )
    case 'heart':
      return (
        <svg {...common}>
          <path d="M12 20s-7-4.6-7-9.5A4 4 0 0 1 12 7a4 4 0 0 1 7 3.5c0 4.9-7 9.5-7 9.5Z" />
        </svg>
      )
    case 'sliders':
      return (
        <svg {...common}>
          <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
          <circle cx="16" cy="7" r="2" />
          <circle cx="10" cy="17" r="2" />
        </svg>
      )
    case 'camera':
      return (
        <svg {...common}>
          <path d="M3 8.5h3l1.5-2h9L18 8.5h3v10H3v-10Z" />
          <circle cx="12" cy="13" r="3" />
        </svg>
      )
    case 'tag':
      return (
        <svg {...common}>
          <path d="M3 11.5 11.5 3H21v9.5L12.5 21 3 11.5Z" />
          <circle cx="16.5" cy="7.5" r="1.3" />
        </svg>
      )
    case 'user':
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c1.3-3.5 4-5 7-5s5.7 1.5 7 5" />
        </svg>
      )
    default:
      return null
  }
}

function CarPhoto({ accent, photos }) {
  return (
    <div className="relative h-[172px] w-full overflow-hidden" style={{ background: accent }}>
      {/* stylised car silhouette stands in for listing photography */}
      <svg viewBox="0 0 320 172" className="h-full w-full">
        <ellipse cx="160" cy="138" rx="118" ry="11" fill="#00002D" opacity="0.07" />
        <path
          d="M44 118c-8 0-13-5-13-13 0-11 7-17 18-20l20-26c5-7 12-10 21-10h66c10 0 18 4 24 11l18 22 21 5c13 3 20 9 20 18 0 8-5 13-13 13H44Z"
          fill="#05317B"
          opacity="0.85"
        />
        <path
          d="M91 62c3-4 7-6 12-6h53c6 0 11 2 15 7l13 16H78l13-17Z"
          fill="#FFFFFF"
          opacity="0.75"
        />
        <circle cx="94" cy="118" r="18" fill="#00002D" />
        <circle cx="94" cy="118" r="8" fill="#C3CDD5" />
        <circle cx="214" cy="118" r="18" fill="#00002D" />
        <circle cx="214" cy="118" r="8" fill="#C3CDD5" />
      </svg>

      <button
        type="button"
        aria-label="Save vehicle"
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,45,0.18)] active:scale-95"
      >
        <Icon name="heart" size={18} color="#3A4871" />
      </button>

      <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-[rgba(0,0,45,0.62)] px-2.5 py-1">
        <Icon name="camera" size={13} color="#FFFFFF" />
        <span className="font-graphik text-[11px] font-medium text-white">{photos}</span>
      </div>
    </div>
  )
}

function ListingCard({ car }) {
  const deal = DEAL_STYLES[car.deal]
  return (
    <article className="overflow-hidden rounded-2xl border border-[#E1E6EC] bg-white shadow-[0_1px_3px_rgba(0,0,45,0.06)]">
      <CarPhoto accent={car.accent} photos={car.photos} />
      <div className="p-3.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-graphik text-[15px] font-semibold leading-tight text-text-black">
            {car.year} {car.make} {car.model}
          </h3>
          <span className="font-graphik shrink-0 text-[17px] font-bold text-text-black">
            {usd(car.price)}
          </span>
        </div>
        <p className="font-graphik mt-1 text-[13px] text-text-midtone-4">
          {miles(car.miles)} · {car.city}
        </p>
        <span
          className="font-graphik mt-2.5 inline-block rounded-md px-2 py-1 text-[11px] font-semibold"
          style={{ background: deal.bg, color: deal.fg }}
        >
          {car.deal}
        </span>
      </div>
    </article>
  )
}

export default function CarShoppingHome() {
  const [query, setQuery] = useState('')
  const [body, setBody] = useState('all')
  const [focused, setFocused] = useState(false)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return LISTINGS.filter((car) => {
      const matchesBody = body === 'all' || car.body === body
      const matchesQuery =
        !q ||
        `${car.year} ${car.make} ${car.model} ${car.body} ${car.city}`.toLowerCase().includes(q)
      return matchesBody && matchesQuery
    })
  }, [query, body])

  const searching = query.trim().length > 0 || body !== 'all'

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return LISTINGS.filter((car) =>
      `${car.make} ${car.model}`.toLowerCase().includes(q)
    ).slice(0, 4)
  }, [query])

  return (
    <div className="flex min-h-screen justify-center bg-[#EEF1F6] py-6">
      {/* phone frame */}
      <div className="relative flex h-[844px] w-[390px] flex-col overflow-hidden rounded-[38px] border-[10px] border-[#00002D] bg-[#F7F9FB] shadow-[0_18px_50px_rgba(0,0,45,0.28)]">
        {/* status bar */}
        <div className="font-graphik flex items-center justify-between px-6 pb-1 pt-3 text-[12px] font-semibold text-text-black">
          <span>9:41</span>
          <span className="tracking-[2px]">▪▪▪ ⌁ ▮</span>
        </div>

        {/* header + search */}
        <header className="bg-white px-4 pb-4 pt-2 shadow-[0_1px_0_rgba(0,0,45,0.07)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-graphik text-[12px] text-text-midtone-4">Shopping near</p>
              <button type="button" className="mt-0.5 flex items-center gap-1">
                <Icon name="pin" size={15} color="#0763D3" />
                <span className="font-graphik text-[15px] font-semibold text-text-black">
                  Boston, MA 02116
                </span>
              </button>
            </div>
            <button
              type="button"
              aria-label="Notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#F2F5F9]"
            >
              <Icon name="bell" size={19} color="#3A4871" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#D42E2E]" />
            </button>
          </div>

          <div
            className={`mt-3.5 flex items-center gap-2 rounded-xl border bg-white px-3 transition-colors ${
              focused ? 'border-functional-blue ring-2 ring-[#0763D3]/15' : 'border-border-color'
            }`}
          >
            <Icon name="search" size={19} color={focused ? '#0763D3' : '#3A4871'} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Search make, model, or keyword"
              aria-label="Search cars"
              className="font-graphik h-12 flex-1 bg-transparent text-[15px] text-text-black outline-none placeholder:text-neutral-40"
            />
            {query && (
              <button type="button" aria-label="Clear search" onClick={() => setQuery('')}>
                <Icon name="close" size={17} color="#3A4871" />
              </button>
            )}
            <span className="h-6 w-px bg-border-color" />
            <button
              type="button"
              aria-label="Filters"
              className="flex items-center gap-1 pl-1 pr-0.5"
            >
              <Icon name="sliders" size={19} color="#0763D3" />
            </button>
          </div>

          {/* type-ahead suggestions */}
          {suggestions.length > 0 && (
            <ul className="mt-2 overflow-hidden rounded-xl border border-[#E1E6EC] bg-white">
              {suggestions.map((car) => (
                <li key={car.id}>
                  <button
                    type="button"
                    onClick={() => setQuery(`${car.make} ${car.model}`)}
                    className="font-graphik flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-[14px] text-text-black active:bg-[#F2F5F9]"
                  >
                    <Icon name="search" size={15} color="#999999" />
                    {car.make} {car.model}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* body style chips */}
          <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {BODY_STYLES.map((style) => {
              const active = body === style.id
              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setBody(style.id)}
                  aria-pressed={active}
                  className={`font-graphik shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${
                    active
                      ? 'border-bg-navy bg-bg-navy font-semibold text-white'
                      : 'border-border-color bg-white text-text-midtone-4'
                  }`}
                >
                  {style.label}
                </button>
              )
            })}
          </div>
        </header>

        {/* scrollable body */}
        <main className="flex-1 overflow-y-auto px-4 pb-24 pt-4">
          {!searching && (
            <>
              <section>
                <h2 className="font-graphik text-[13px] font-semibold uppercase tracking-wide text-text-midtone-4">
                  Recent searches
                </h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {RECENT_SEARCHES.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="font-graphik flex items-center gap-1.5 rounded-full border border-border-color bg-white px-3 py-1.5 text-[13px] text-text-black"
                    >
                      <Icon name="search" size={13} color="#3A4871" />
                      {term}
                    </button>
                  ))}
                </div>
              </section>

              <section className="mt-6">
                <h2 className="font-graphik text-[13px] font-semibold uppercase tracking-wide text-text-midtone-4">
                  Browse by make
                </h2>
                <div className="-mx-4 mt-2.5 flex gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {POPULAR_MAKES.map((make) => (
                    <button
                      key={make.name}
                      type="button"
                      onClick={() => setQuery(make.name)}
                      className="flex w-[72px] shrink-0 flex-col items-center gap-1.5"
                    >
                      <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#E1E6EC] bg-white text-[26px]">
                        {make.emoji}
                      </span>
                      <span className="font-graphik text-[12px] text-text-black">{make.name}</span>
                    </button>
                  ))}
                </div>
              </section>
            </>
          )}

          <section className="mt-6">
            <div className="flex items-baseline justify-between">
              <h2 className="font-graphik text-[17px] font-bold text-text-black">
                {searching ? 'Search results' : 'Deals near you'}
              </h2>
              <span className="font-graphik text-[13px] text-text-midtone-4">
                {results.length} {results.length === 1 ? 'car' : 'cars'}
              </span>
            </div>

            {results.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-dashed border-border-card bg-white px-5 py-10 text-center">
                <p className="font-graphik text-[15px] font-semibold text-text-black">
                  No matches for “{query.trim()}”
                </p>
                <p className="font-graphik mt-1 text-[13px] text-text-midtone-4">
                  Try a different make, model, or clear your filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('')
                    setBody('all')
                  }}
                  className="font-graphik mt-4 rounded-full bg-bg-blue px-5 py-2.5 text-[14px] font-semibold text-white"
                >
                  Reset search
                </button>
              </div>
            ) : (
              <div className="mt-3 flex flex-col gap-3.5">
                {results.map((car) => (
                  <ListingCard key={car.id} car={car} />
                ))}
              </div>
            )}
          </section>
        </main>

        {/* bottom nav */}
        <nav className="absolute bottom-0 left-0 right-0 border-t border-[#E1E6EC] bg-white pb-5 pt-2">
          <div className="flex items-start justify-around">
            {[
              { name: 'search', label: 'Search', active: true },
              { name: 'tag', label: 'Sell', active: false },
              { name: 'heart', label: 'Saved', active: false },
              { name: 'user', label: 'Account', active: false },
            ].map((tab) => (
              <button key={tab.label} type="button" className="flex w-16 flex-col items-center gap-1">
                <Icon name={tab.name} size={22} color={tab.active ? '#0763D3' : '#3A4871'} />
                <span
                  className="font-graphik text-[11px]"
                  style={{
                    color: tab.active ? '#0763D3' : '#3A4871',
                    fontWeight: tab.active ? 600 : 400,
                  }}
                >
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}
