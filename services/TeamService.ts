const getAll = () => {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    return fetch(apiUrl + '/teams', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  
const TeamService = {
    getAll,
  }
  
export default TeamService
  