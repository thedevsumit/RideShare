import React from 'react'

const StartingLoading = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold'>Starting Loading</h1>
    </div>
  )
}

export default StartingLoading
