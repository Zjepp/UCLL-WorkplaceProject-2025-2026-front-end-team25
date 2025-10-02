import { Team } from '@types'

type Props = {
  teams: Team[]
}

const TeamOverview: React.FC<Props> = ({ teams }: Props) => {

  return (
    <>
      <section className="mt-5">
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Town</th>
              <th scope="col">Foundation Year</th>
            </tr>
          </thead>
          <tbody>
            {teams &&
              teams.length > 0 &&
              teams.map((team, index) => (
                <tr key={index}>
                  <td>
                    {team.name}
                  </td>
                  <td>
                    {team.town}
                  </td>
                  <td>
                    {team.foundationYear}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default TeamOverview
