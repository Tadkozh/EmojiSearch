function Header({nbFound}) {
  return (
    <div className='component-header'>
      <div>Recherche Emoji</div>
      <div className='result-found'>
        {nbFound > 0 ? `${nbFound} emojis trouvés`: 'Aucun résultat'}
      </div>
    </div>
  )
}
export default Header