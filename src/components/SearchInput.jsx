function SearchInput({onTextChange}) {

  return (
    <div className='component-search-input'>
      <div>
      <input
        placeholder='Recherche par titre, symbole, mot-clé'
        onChange={e => onTextChange(e.target.value)}
      />
      </div>
    </div>
  )
}
export default SearchInput