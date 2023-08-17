import Section from './Section'
const SectionList = ({ books }) => {
  const reading = books.filter((book) => book.status === 'reading')
  const finished = books.filter((book) => book.status === 'finished')
  const planning = books.filter((book) => book.status === 'planning')

  return (
    <>
      <h2>Reading</h2>
      <Section books={reading} />
      <h2>Finished</h2>
      <Section books={finished} />
      <h2>Planning</h2>
      <Section books={planning} />
    </>
  )
}

export default SectionList
