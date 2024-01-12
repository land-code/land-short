const NUMBER_OF_PLACEHOLDER_ROWS = 5

const ShortLinksPlaceholder = (): JSX.Element => {
  return (
    <>
      {[...Array(NUMBER_OF_PLACEHOLDER_ROWS)].map((_, index) => (
        <tr key={index} className='flex flex-col animate-pulse sm:table-row'>
          <td className='font-bold sm:font-normal'>
            <div className='flex justify-center'>
              <div className='h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mt-2 content-center' />
            </div>
          </td>
          <td>
            <div className='flex justify-center'>
              <div className='h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-64 mt-2 content-center' />
            </div>
          </td>
          <td>
            <div className='flex justify-center'>
              <div className='h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-12 mt-2 content-center' />
            </div>
          </td>
          <td>
            <div className='flex justify-center'>
              <div className='h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-12 mt-2 content-center' />
            </div>
          </td>
          <td className='flex justify-center border-b-2 border-zinc-800 sm:border-0'>
            <div className='flex justify-center'>
              <div className='h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mt-2 content-center' />
            </div>
          </td>
        </tr>
      ))}
    </>
  )
}

export default ShortLinksPlaceholder
