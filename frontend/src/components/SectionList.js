import Section from './Section'
const SectionList = ({ books }) => {
  return (
    <>
      <Section books={books.filter((book) => book.status === 'reading')} />
      <h2>Finished</h2>
      <Section books={books.filter((book) => book.status === 'finished')} />
      <h2>Planning</h2>
      <Section books={books.filter((book) => book.status === 'planning')} />
    </>
  )
}

export default SectionList
